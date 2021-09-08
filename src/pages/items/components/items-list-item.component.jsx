import React from 'react';
import ItemsImage from './items-image';

const ItemsListItem = (props) => {
	const { item, compact } = props;

	const creationDate =
		window.innerWidth > 600 && item.created
			? new Date(item.created)
					.toISOString()
					.split('T')[0]
					.split('-')
					.reverse()
					.join('/')
			: '';

	return (
		<li
			style={{
				cursor: 'pointer',
				transition: 'all 300ms',
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
				background: 'var(--surface)',
				...(!compact && {
					padding: '14px',
					borderRadius: '8px',
				}),
			}}
			onClick={(e) => props.onItemClick && props.onItemClick(item, e)}
			onContextMenu={(e) =>
				props.onItemContextMenu && props.onItemContextMenu(item, e)
			}
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
