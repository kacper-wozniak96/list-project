import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'sass/modules/animatedList.scss';

const AnimatedList = ({ children, type, className, condition }) => {
	return (
		<AnimatePresence>
			{condition && (
				<motion.ul
					className={className}
					data-list-type={type}
					exit={{ y: -20, opacity: 0 }}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
				>
					{children}
				</motion.ul>
			)}
		</AnimatePresence>
	);
};

export default AnimatedList;
