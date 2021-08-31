import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.style.css';

const Sidebar = (props) => {
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
			<NavLink to='/items'>Items</NavLink>
			<NavLink to='/items/add'>New</NavLink>
		</nav>
	);
};

export default Sidebar;
