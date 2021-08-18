import AnimatedList from './AnimatedList';
import 'sass/modules/list.scss';

const List = ({ itemData, showList, handleShowList, parentType }) => {
	const { id, type, elements, name } = itemData;

	const nestedLists = (elements || []).map((item) => {
		return (
			<List
				key={item.id}
				itemData={item}
				showList={showList}
				handleShowList={handleShowList}
				parentType={type}
			/>
		);
	});

	return (
		<li className="listItem" data-list-id={id}>
			<div className="listItem__name">
				{elements ? (
					<>
						<input
							type={parentType}
							id={id}
							checked={showList[id] ? true : false}
							onChange={(e) => handleShowList(e, id)}
						/>
						<label htmlFor={id}>{name}</label>
					</>
				) : (
					<span>{name}</span>
				)}
			</div>
			<AnimatedList condition={showList[id] && nestedLists} type={type} className="sublist">
				{nestedLists}
			</AnimatedList>
		</li>
	);
};

export default List;
