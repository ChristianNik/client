import React, { useMemo, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Input, RouteAnimationWrapper } from '../../components';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import queryString from 'query-string';
import ItemsList from './components/items-list.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons';
import useScrollTop from '../../hooks/use-scroll-top';
import Title from '../../components/title/title.component';

const ItemsPage = () => {
	useScrollTop();
	const { lang } = useLanguage();
	const { items, removeItem } = useItems();
	const history = useHistory();

	const location = useLocation();
	const { view } = queryString.parse(location.search);

	const [filterText, setFilterText] = useState('');
	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			if (!filterText) return true;
			if (filterText === '::noimage' || filterText === ':!img') {
				return !item.image;
			}
			if (filterText === '::noname') {
				return !item.name;
			}
			if (filterText === '::nodesc') {
				return !item.description;
			}

			const regex = new RegExp(filterText, 'gi');

			return (
				(item.name &&
					item.name.toLowerCase().includes(filterText.toLowerCase())) ||
				(item.description &&
					item.description.toLowerCase().includes(filterText.toLowerCase())) ||
				(item.tags && item.tags.some((t) => t.trim().match(regex))) ||
				(item.type &&
					item.type.toLowerCase().includes(filterText.toLowerCase()))
			);
		});
	}, [items, filterText]);

	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuLocation, setContextMenuLocation] = useState({
		x: 0,
		y: 0,
	});
	const [activeId, setActiveId] = useState('');

	const itemsListProps = {
		items: filteredItems.filter((v) => !v.flag_mark_deleted),
		onItemClick: (item) => {
			history.push(`/items/${item.id}`);
		},
		onItemRemoveClick: (item) => {
			removeItem(item.id);
		},
		onItemContextMenu: (item, e) => {
			e.preventDefault();
			setActiveId(item.id);
			setContextMenuLocation(e.target.getBoundingClientRect());
			setShowContextMenu(!showContextMenu);
		},
	};

	const handleDeleteItem = (item) => {
		removeItem(item.id);
		setShowContextMenu(false);
	};

	return (
		<RouteAnimationWrapper
			style={{
				padding: '16px',
				color: 'var(--on-background)',
			}}
		>
			{showContextMenu && (
				<div
					style={{
						position: 'fixed',
						transform: `translate(0, ${contextMenuLocation.y}px)`,
						zIndex: 100,
						background: 'red',
					}}
				>
					<ul>
						<li onClick={() => handleDeleteItem({ id: activeId })}>Delete</li>
					</ul>
				</div>
			)}
			<Title
				h2
				style={{
					textAlign: 'center',
				}}
			>
				{lang('ui/items/page', 'pageTitle')}
			</Title>

			<Title>Search</Title>
			<Input
				value={filterText}
				onChange={(e) => setFilterText(e.target.value)}
			/>

			<Title
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-end',
				}}
			>
				<div>
					{lang('ui/items/list', 'itemsTitle')} [
					{filteredItems.filter((v) => !v.flag_mark_deleted).length}/
					{items.filter((v) => !v.flag_mark_deleted).length}]
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						fontSize: '16px',
					}}
				>
					<div
						style={{
							display: 'flex',
							textDecoration: 'none',
							color: 'var(--primary)',
							marginLeft: 'auto',
						}}
					>
						<NavLink
							style={{
								textDecoration: 'none',
								color: 'var(--inactive, #fff)',
								padding: '8px',
							}}
							exact
							activeStyle={{ color: 'inherit' }}
							isActive={() => !view || view === 'list'}
							to='/items?view=list'
						>
							<FontAwesomeIcon icon={faList} size='lg' />
						</NavLink>
						<NavLink
							style={{
								textDecoration: 'none',
								color: 'var(--inactive, #fff)',
								padding: '8px',
							}}
							exact
							activeStyle={{ color: 'inherit' }}
							isActive={() => view === 'gallery'}
							to='/items?view=gallery'
						>
							<FontAwesomeIcon icon={faThLarge} size='lg' />
						</NavLink>
					</div>
				</div>
			</Title>

			{view === 'gallery' ? (
				<ItemsList {...itemsListProps} compact />
			) : view === 'list' ? (
				<ItemsList {...itemsListProps} />
			) : (
				<ItemsList {...itemsListProps} />
			)}

			{filteredItems.filter((v) => v.flag_mark_deleted).length > 0 && (
				<>
					<h2>
						{lang('ui/items/list', 'trashTitle')} [
						{filteredItems.filter((v) => v.flag_mark_deleted).length}/
						{items.filter((v) => v.flag_mark_deleted).length}]
					</h2>
					<ItemsList
						items={items.filter((v) => v.flag_mark_deleted)}
						onItemClick={(item) => {
							history.push(`/items/${item.id}`);
						}}
						onItemRemoveClick={() => handleDeleteItem(item)}
					/>
				</>
			)}
		</RouteAnimationWrapper>
	);
};

export default ItemsPage;
