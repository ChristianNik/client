import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Input } from '../../components';
import EmojiButton from '../../components/emojibutton';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import { deleteItem, sync } from '../../utils/server';
import queryString from 'query-string';

const CompactItemsList = ({ items, ...rest }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
				gap: '4px',
			}}
		>
			{(items || []).map((item) =>
				item.image ? (
					<div
						key={item.id}
						style={{
							width: 'minmax(100px, 150px)',
							height: '100px',
						}}
					>
						<img
							style={{
								objectFit: 'cover',
								width: '100%',
								height: '100px',
							}}
							src={item.image}
							onClick={(e) => rest.onItemClick && rest.onItemClick(item, e)}
						/>
					</div>
				) : (
					<div
						style={{
							backgroundColor: `hsl(220, 13%, ${
								Math.random() * (26 - 0) + 26
							}%)`,
							width: 'minmax(100px, 150px)',
							height: '100px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							padding: '8px',
						}}
						onClick={(e) => rest.onItemClick && rest.onItemClick(item, e)}
						onContextMenu={(e) => {
							e.preventDefault();
							rest.onItemRemoveClick && rest.onItemRemoveClick(item, e);
						}}
					>
						<div
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.name || item.description || item.id}
						</div>
					</div>
				)
			)}
		</div>
	);
};
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

	const location = useLocation();
	const { view } = queryString.parse(location.search);

	const [filterText, setFilterText] = useState('');
	const filteredItems = items.filter((item) => {
		if (!filterText) return true;
		const regex = new RegExp(filterText, 'gi');
		return (
			(item.name &&
				item.name.toLowerCase().includes(filterText.toLowerCase())) ||
			(item.description &&
				item.description.toLowerCase().includes(filterText.toLowerCase())) ||
			(item.tags && item.tags.some((t) => t.trim().match(regex))) ||
			(item.type && item.type.toLowerCase().includes(filterText.toLowerCase()))
		);
	});
	// return <div>dsa</div>;
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h2>Verwaltung</h2>
				<div
					style={{
						display: 'flex',
						textDecoration: 'none',
					}}
				>
					<Link
						style={{
							textDecoration: 'none',
						}}
						to='/items?view=list'
					>
						📄
					</Link>
					<Link
						style={{
							textDecoration: 'none',
						}}
						to='/items?view=gallery'
					>
						🖼️
					</Link>
				</div>
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
			<Input
				text='Search'
				value={filterText}
				onChange={(e) => setFilterText(e.target.value)}
			/>

			<h2>
				{lang('items/list', 'itemsTitle')} [
				{filteredItems.filter((v) => !v.flag_mark_deleted).length}/
				{items.filter((v) => !v.flag_mark_deleted).length}]
			</h2>
			{view === 'gallery' && (
				<CompactItemsList
					items={filteredItems.filter((v) => !v.flag_mark_deleted)}
					onItemClick={(item) => {
						history.push(`/items/${item.id}`);
					}}
					onItemRemoveClick={(item) => {
						removeItem(item.id);
					}}
				/>
			)}
			{(view === 'list' || !view) && (
				<ItemsList
					items={filteredItems.filter((v) => !v.flag_mark_deleted)}
					onItemClick={(item) => {
						history.push(`/items/${item.id}`);
					}}
					onItemRemoveClick={(item) => {
						removeItem(item.id);
					}}
				/>
			)}
			{filteredItems.filter((v) => v.flag_mark_deleted).length > 0 && (
				<>
					<h2>
						{lang('items/list', 'trashTitle')} [
						{filteredItems.filter((v) => v.flag_mark_deleted).length}/
						{items.filter((v) => v.flag_mark_deleted).length}]
					</h2>
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
