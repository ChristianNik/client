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
				return !item.mainImage;
			}
			if (filterText === '::notitle') {
				return !item.title;
			}
			if (filterText === '::nodesc') {
				return !item.description;
			}

			const regex = new RegExp(filterText, 'gi');

			return [
				item.title || '',
				item.description || '',
				item._type,
				...item.tags,
			].some((v) => v.trim().match(regex));
		});
	}, [items, filterText]);

	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuLocation, setContextMenuLocation] = useState({
		x: 0,
		y: 0,
	});
	const [activeId, setActiveId] = useState('');

	const itemsListProps = {
		items: filteredItems,
		onItemClick: (item) => {
			history.push(`/items/${item._id}`);
		},
		onItemRemoveClick: (item) => {
			removeItem(item._id);
		},
		onItemContextMenu: (item, e) => {
			e.preventDefault();
			setActiveId(item._id);
			setContextMenuLocation(e.target.getBoundingClientRect());
			setShowContextMenu(!showContextMenu);
		},
	};

	const handleDeleteItem = (item) => {
		removeItem(item._id);
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

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h2
					style={{
						margin: '24px 0',
					}}
				>
					{lang('ui/items/page', 'pageTitle')}
				</h2>
				<div
					style={{
						display: 'flex',
						textDecoration: 'none',
						color: 'var(--primary)',
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
			<Input
				text='Search'
				value={filterText}
				onChange={(e) => setFilterText(e.target.value)}
			/>

			<h2
				style={{
					margin: '24px 0',
				}}
			>
				{lang('ui/items/list', 'itemsTitle')} [{filteredItems.length}/
				{items.length}]
			</h2>

			{view === 'gallery' ? (
				<ItemsList {...itemsListProps} compact />
			) : view === 'list' ? (
				<ItemsList {...itemsListProps} />
			) : (
				<ItemsList {...itemsListProps} />
			)}
		</RouteAnimationWrapper>
	);
};

export default ItemsPage;
