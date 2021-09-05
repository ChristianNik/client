import React from 'react';
import ItemsImage from '../../pages/items/components/items-image';
import './itemslistitemskeleton.style.css';

const ItemsListItemSkeleton = ({ compact }) => {
	const creationDate = window.innerWidth > 600;

	return (
		<li
			style={{
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
		>
			<ItemsImage
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
			/>
			{!compact && (
				<>
					<div
						style={{
							marginRight: '16px',
							width: '100%',
							overflow: 'auto',
							whiteSpace: 'nowrap',
						}}
					>
						<div
							className='skeleton-animation skeleton-text'
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								width: '70%',
							}}
						/>
						<p
							className='skeleton-animation skeleton-text'
							style={{
								marginTop: '4px',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						/>
					</div>
					{creationDate && (
						<div
							className='skeleton-animation skeleton-text'
							style={{ marginLeft: 'auto', display: 'grid', width: '130px' }}
						/>
					)}
				</>
			)}
		</li>
	);
};

export default ItemsListItemSkeleton;
