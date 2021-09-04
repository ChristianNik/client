import React from 'react';
import ItemsImage from './items-image';

const ItemsListItem = (props) => {
	const { item } = props;

	const creationDate =
		window.innerWidth > 600 &&
		new Date(item.created)
			.toISOString()
			.split('T')[0]
			.split('-')
			.reverse()
			.join('/');

	return (
		<li
			style={{
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
				background: 'hsl(220, 13%, 16%)',
				padding: '14px',
				borderRadius: '8px',
			}}
			onClick={(e) => props.onItemClick && props.onItemClick(item, e)}
		>
			<ItemsImage
				src={item.image}
				style={{
					marginRight: '16px',
				}}
			/>

			<div
				style={{
					overflow: 'auto',
					whiteSpace: 'nowrap',
				}}
			>
				<div
					style={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{item.name || item.description ? '' : item.id}
				</div>
				{item.description && (
					<p
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{item.description}
					</p>
				)}
			</div>
			{creationDate && (
				<div style={{ marginLeft: 'auto', display: 'grid' }}>
					{creationDate}
				</div>
			)}
		</li>
	);
};

export default ItemsListItem;
