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
import { useLanguage } from '../../context/language.context';

const iconStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textDecoration: 'none',
	color: '#fff',
	opacity: 0.6,
};

const navLinkProps = {
	exact: true,
	style: iconStyle,
	activeStyle: {
		opacity: 1,
	},
};

const NavItem = ({ to, icon, text }) => (
	<NavLink to={to} {...navLinkProps}>
		<FontAwesomeIcon icon={icon} size='lg' />
		<small style={{ marginTop: '4px' }}>{text}</small>
	</NavLink>
);

const Sidebar = (props) => {
	const { lang } = useLanguage();
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
				<NavItem
					to='/'
					{...navLinkProps}
					icon={faHome}
					text={lang('ui/sidebar/navigation', 'homeLabel')}
				/>

				<NavItem
					to='/items'
					{...navLinkProps}
					icon={faClipboard}
					text={lang('ui/sidebar/navigation', 'itemsLabel')}
				/>
				<NavItem
					to='/items/add'
					{...navLinkProps}
					icon={faPlus}
					text={lang('ui/sidebar/navigation', 'addLabel')}
				/>
				<NavItem
					to='/settings'
					{...navLinkProps}
					icon={faCog}
					text={lang('ui/sidebar/navigation', 'settingsLabel')}
				/>
			</div>
		</nav>
	);
};

export default Sidebar;
