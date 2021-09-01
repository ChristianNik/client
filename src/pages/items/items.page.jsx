import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '../../components';
import EmojiButton from '../../components/emojibutton';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import { deleteItem, sync } from '../../utils/server';

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

const ItemsList = ({ items, ...rest }) => {
	return (
		<ul style={{ display: 'grid', gap: '18px' }}>
			{(items || []).map((item) => (
				<ItemsListItem key={item.id} item={item} {...rest} />
			))}
		</ul>
	);
};

const ItemsPage = () => {
	const { lang } = useLanguage();
	const { items, setItems, removeItem } = useItems();
	const history = useHistory();
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<EmojiButton
					onClick={() => {
						sync(items, (data) => {
							setItems(data);
						});
					}}
					size='md'
				>
					🔄
				</EmojiButton>
			</div>

			<h2>{lang('items/list', 'itemsTitle')}</h2>
			<ItemsList
				items={items.filter((v) => !v.flag_mark_deleted)}
				onItemClick={(item) => {
					history.push(`/items/${item.id}`);
				}}
				onItemRemoveClick={(item) => {
					removeItem(item.id);
				}}
			/>
			{items.filter((v) => v.flag_mark_deleted).length > 0 && (
				<>
					<h2>{lang('items/list', 'trashTitle')}</h2>
					<ItemsList
						items={items.filter((v) => v.flag_mark_deleted)}
						onItemClick={(item) => {
							history.push(`/items/${item.id}`);
						}}
						onItemRemoveClick={(item) => {
							deleteItem(item.id);
						}}
					/>
				</>
			)}
		</div>
	);
};

export default ItemsPage;
