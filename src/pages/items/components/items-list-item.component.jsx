import React from 'react';
import { Avatar, EmojiButton } from '../../../components';

const ItemsListItem = (props) => {
	const { item } = props;

	return (
		<li
			style={{
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
			}}
			onClick={(e) => props.onItemClick && props.onItemClick(item, e)}
		>
			<Avatar
				src={item.image}
				style={{
					marginRight: '16px',
				}}
			/>

			<div
				style={{
					overflow: 'auto',
				}}
			>
				{!item.name && !item.description ? (
					<div
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{item.id}
					</div>
				) : (
					<div
						style={{
							whiteSpace: 'nowrap',
						}}
					>
						<h3
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.name}
						</h3>
						<p
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.description}
						</p>
					</div>
				)}
			</div>
			<div style={{ marginLeft: 'auto', display: 'grid' }}>
				<EmojiButton
					size={'sm'}
					onClick={(e) => {
						e.stopPropagation();
						props.onItemRemoveClick && props.onItemRemoveClick(item, e);
					}}
				>
					✖️
				</EmojiButton>
			</div>
		</li>
	);
};

export default ItemsListItem;
