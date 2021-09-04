import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ItemsImage = ({ children, ...rest }) => {
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
		...SIZE[rest.size || 'lg'],
		background: 'hsl(220, 13%, 26%)',
		borderRadius: '16px',
		objectFit: 'cover',
		...rest.style,
	};

	return rest.src ? (
		<LazyLoadImage {...rest} src={rest.src} style={elementStyle} />
	) : (
		<div className='Avatar' {...rest} style={elementStyle}>
			{children}
		</div>
	);
};

export default ItemsImage;
