import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ItemsListItemSkeleton } from '../../../components';
import ItemsListItem from './items-list-item.component';

const ItemsList = ({ items, ...rest }) => {
	return (
		<ul style={{ display: 'grid', gap: '8px' }}>
			{(items || []).map((item) => (
				<LazyLoadComponent
					key={item.id}
					placeholder={<ItemsListItemSkeleton />}
				>
					<ItemsListItem item={item} {...rest} />
				</LazyLoadComponent>
			))}
		</ul>
	);
};

export default ItemsList;
