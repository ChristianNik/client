import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/language.context';
import './sidebar.style.css';

const Sidebar = (props) => {
	const { lang } = useLanguage();

	return (
		<nav
			className='Sidebar'
			style={{
				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',

				position: 'fixed',
				top: 'calc(100% - 56px)',

				width: '100%',
				minHeight: '56px',
				backgroundColor: 'hsl(220, 13%, 50%)',
			}}
		>
			<NavLink to='/items'>{lang('menuItems')}</NavLink>
			<NavLink to='/items/add'>{lang('menuItemsAdd')}</NavLink>
		</nav>
	);
};

export default Sidebar;
