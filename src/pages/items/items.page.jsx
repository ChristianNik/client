import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Input } from '../../components';
import EmojiButton from '../../components/emojibutton';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import { deleteItem, sync } from '../../utils/server';
import queryString from 'query-string';
import ItemsList from './components/items-list.component';
import CompactItemsList from './components/items-list-compact.component';

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
