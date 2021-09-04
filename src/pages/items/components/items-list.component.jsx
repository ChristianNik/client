import React from 'react';
import ItemsListItem from './items-list-item.component';

const ItemsList = ({ items, ...rest }) => {
	return (
		<ul style={{ display: 'grid', gap: '8px' }}>
			{(items || []).map((item) => (
				<ItemsListItem key={item.id} item={item} {...rest} />
			))}
		</ul>
	);
};

export default ItemsList;
