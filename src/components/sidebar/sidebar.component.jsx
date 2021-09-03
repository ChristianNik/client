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

				width: '100%',
				minHeight: '56px',
				backgroundColor: 'hsl(220, 13%, 50%)',

				zIndex: 100,
			}}
		>
			<NavLink
				to='/'
				style={{
					textDecoration: 'none',
					fontSize: '24px',
				}}
			>
				📊
			</NavLink>
			<NavLink
				to='/items'
				style={{
					textDecoration: 'none',
					fontSize: '24px',
				}}
			>
				📑
			</NavLink>
			<NavLink
				to='/items/add'
				style={{
					textDecoration: 'none',
					filter: 'hue-rotate(40deg)',
					fontSize: '24px',
				}}
			>
				➕
			</NavLink>
			<NavLink
				to='/settings'
				style={{
					textDecoration: 'none',
					fontSize: '24px',
				}}
			>
				⚙️
			</NavLink>
		</nav>
	);
};

export default Sidebar;
