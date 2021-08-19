import React, { useState, useEffect } from 'react';
import AnimatedList from 'components/AnimatedList';
import List from 'components/List';
import 'sass/modules/app.scss';
import 'sass/global/global.scss';

function App() {
	const [list, setList] = useState();
	const [showList, setShowList] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const dataJson = await fetch('data.json');
			const data = await dataJson.json();

			setList(data);
		};

		fetchData();
	}, []);

	const handleShowList = (e, listId) => {
		const grandParent = e.target.closest('[data-list-type]');

		if (grandParent.dataset.listType === 'radio') {
			[...grandParent.children]
				.map((child) => child.dataset.listId)
				.forEach((id) => {
					setShowList((prevState) => {
						return {
							...prevState,
							[id]: false,
						};
					});
				});
		}

		setShowList((prevState) => {
			return {
				...prevState,
				[listId]: !prevState[listId],
			};
		});
	};

	return (
		<div className="App">
			{list &&
				Object.keys(list).map((element, index) => {
					const { id, type, name, elements } = list[element];

					return (
						<div key={index} className="mainContainer" data-list-type="checkbox">
							<div className="mainContainer__title">
								<input
									className="mainContainer__input"
									type="checkbox"
									id={id}
									checked={showList[id] ? true : false}
									onChange={(e) => handleShowList(e, id)}
								/>
								<label className="mainContainer__label" htmlFor={id}>
									{name}
								</label>
							</div>
							<AnimatedList condition={showList[id]} className="mainlist" type={type}>
								{elements.map((item) => (
									<List
										key={item.id}
										itemData={item}
										showList={showList}
										handleShowList={handleShowList}
										parentType={type}
									/>
								))}
							</AnimatedList>
						</div>
					);
				})}
		</div>
	);
}

export default App;
