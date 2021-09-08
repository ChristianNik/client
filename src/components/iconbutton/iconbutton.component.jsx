import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './iconbutton.style.css';

const IconButton = ({
	onClick,
	icon,
	border,
	size,
	style,
	color,
	borderColor,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '32px',
				height: '32px',
				margin: '16px',
				...(border && {
					borderRadius: '50%',
					border: `2px solid ${borderColor || 'var(--inactive)'}`,
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
