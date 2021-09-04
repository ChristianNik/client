import React from 'react';
import ItemsImage from './items-image';

const ItemsListItem = (props) => {
	const { item, compact } = props;

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
				transition: 'all 300ms',
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
				background: 'hsl(220, 13%, 16%)',
				...(!compact && {
					padding: '14px',
					borderRadius: '8px',
				}),
			}}
			onClick={(e) => props.onItemClick && props.onItemClick(item, e)}
		>
			<ItemsImage
				src={item.image}
				style={{
					...(compact && {
						objectFit: 'cover',
						width: '100%',
						height: '100px',
						borderRadius: 0,
					}),
					...(!compact && {
						marginRight: '16px',
					}),
				}}
			>
				{compact && (
					<div
						style={{
							padding: '8px',
							height: '100%',
							width: '100%',
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: `hsl(220, 13%, ${
								Math.random() * (26 - 0) + 26
							}%)`,
						}}
					>
						<div
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								textAlign: 'center',
							}}
						>
							{item.name || item.description ? '' : item.id}
						</div>
					</div>
				)}
			</ItemsImage>
			{!compact && (
				<>
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
				</>
			)}
		</li>
	);
};

export default ItemsListItem;
