import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '../../components';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import { deleteItem, sync } from '../../utils/server';

const ItemsListItem = (props) => {
	const { item } = props;
	const { lang } = useLanguage();
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
				<button
					onClick={(e) => {
						e.stopPropagation();
						props.onItemRemoveClick && props.onItemRemoveClick(item, e);
					}}
				>
					{lang('items/list', 'removeItemLabel')}
				</button>
			</div>
		</li>
	);
};

const ItemsList = ({ items, ...rest }) => {
	return (
		<ul>
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
			<button
				onClick={() => {
					sync(items, (data) => {
						setItems(data);
					});
				}}
			>
				{lang('items/list', 'syncLabel')}
			</button>
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
