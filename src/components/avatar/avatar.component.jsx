import React from 'react';
import './avatar.style.css';

const Avatar = (props) => {
	const SIZE = {
		sm: { width: '24px', minWidth: '24px', height: '24px', minHeight: '24px' },
		md: { width: '40px', minWidth: '40px', height: '40px', minHeight: '40px' },
		lg: { width: '56px', minWidth: '56px', height: '56px', minHeight: '56px' },
		xl: {
			height: '150px',
			minHeight: '150px',
			minWidth: '150px',
			width: '150px',
		},
	};

	const elementStyle = {
		...SIZE[props.size || 'lg'],
		marginRight: '16px',
		background: 'hsl(220, 13%, 26%)',
		borderRadius: '50%',
		objectFit: 'cover',
		...props.style,
	};

	return props.src ? (
		<img className='Avatar' {...props} src={props.src} style={elementStyle} />
	) : (
		<div className='Avatar' {...props} style={elementStyle} />
	);
};

export default Avatar;
