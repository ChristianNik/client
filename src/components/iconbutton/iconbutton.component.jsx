import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './iconbutton.style.css';

const IconButton = ({ onClick, icon, noBorder, size, style, color }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '32px',
				height: '32px',
				margin: '16px',
				...(!noBorder && {
					borderRadius: '50%',
					border: '2px solid var(--inactive)',
				}),
				...(onClick && {
					cursor: 'pointer',
				}),
				...style,
			}}
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={icon}
				color={color || 'var(--inactive)'}
				size={size || 'sm'}
			/>
		</div>
	);
};

export default IconButton;
