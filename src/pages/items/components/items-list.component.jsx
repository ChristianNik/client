import { motion } from 'framer-motion';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ItemsListItemSkeleton } from '../../../components';
import ItemsListItem from './items-list-item.component';

const variants = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const ItemsList = ({ items, compact, ...rest }) => {
	return (
		<motion.ul
			animate='show'
			initial='hidden'
			variants={variants}
			style={{
				display: 'grid',
				gap: '8px',
				...(compact && {
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
					gap: '4px',
				}),
			}}
		>
			{items.slice(0, 20).map((item, i) => {
				const itemVariants = {
					hidden: {
						opacity: 0,
					},
					show: {
						opacity: 1,
						transition: {
							delay: i * 0.08,
						},
					},
				};

				return (
					<motion.div
						whileHover={{
							scale: 1.05,
						}}
						variants={itemVariants}
						key={item.id}
						style={{
							width: '100%',
						}}
					>
						<LazyLoadComponent
							style={{
								width: '100%',
							}}
							key={item.id}
							placeholder={
								<ItemsListItemSkeleton
									style={{
										width: '100%',
									}}
									compact={compact}
								/>
							}
						>
							<ItemsListItem item={item} {...rest} compact={compact} />
						</LazyLoadComponent>
					</motion.div>
				);
			})}
		</motion.ul>
	);
};

export default ItemsList;
