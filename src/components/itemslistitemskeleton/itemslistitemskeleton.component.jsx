import React from 'react';
import ItemsImage from '../../pages/items/components/items-image';
import './itemslistitemskeleton.style.css';

const ItemsListItemSkeleton = (props) => {
	const creationDate = window.innerWidth > 600;
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
		>
			<ItemsImage
				className='skeleton-animation'
				style={{
					marginRight: '16px',
				}}
			/>

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
					style={{ marginLeft: 'auto', display: 'grid', width: '90px' }}
				/>
			)}
		</li>
	);
};

export default ItemsListItemSkeleton;
