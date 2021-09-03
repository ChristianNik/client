import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.style.css';
import {
	faHome,
	faClipboard,
	faPlus,
	faCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textDecoration: 'none',
	color: '#fff',
	opacity: 0.6,
	// padding: '0 32px',
};

const navLinkProps = {
	style: iconStyle,
	activeStyle: {
		opacity: 1,
	},
};

const Sidebar = (props) => {
	return (
		<nav
			className='Sidebar'
			style={{
				backgroundColor: 'hsl(220, 13%, 50%)',
				zIndex: 100,
			}}
		>
			<div
				style={{
					display: 'grid',
					gridAutoFlow: 'column',
					gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',

					margin: '0 auto',

					width: '100%',
					maxWidth: '600px',
					minHeight: '56px',
				}}
			>
				<NavLink to='/' exact {...navLinkProps}>
					<FontAwesomeIcon icon={faHome} size='lg' />
					<span>Home</span>
				</NavLink>
				<NavLink to='/items' {...navLinkProps}>
					<FontAwesomeIcon icon={faClipboard} size='lg' />
					<span>Items</span>
				</NavLink>
				<NavLink to='/items/add' {...navLinkProps}>
					<FontAwesomeIcon icon={faPlus} size='lg' />
					<span>Add</span>
				</NavLink>
				<NavLink to='/settings' {...navLinkProps}>
					<FontAwesomeIcon icon={faCog} size='lg' />
					<span>Settings</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default Sidebar;
