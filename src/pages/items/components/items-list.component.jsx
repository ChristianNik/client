import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ItemsListItemSkeleton } from '../../../components';
import ItemsListItem from './items-list-item.component';

const ItemsList = ({ items, compact, ...rest }) => {
	return (
		<ul
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
			{(items || []).map((item) => (
				<LazyLoadComponent
					key={item.id}
					placeholder={<ItemsListItemSkeleton compact={compact} />}
				>
					<ItemsListItem item={item} {...rest} compact={compact} />
				</LazyLoadComponent>
			))}
		</ul>
	);
};

export default ItemsList;
