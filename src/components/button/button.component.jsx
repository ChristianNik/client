import React from 'react';
import './button.style.css';

const Button = ({ onClick, children, style, ...rest }) => {
	return (
		<button
			className='Button'
			type='button'
			style={{
				...(onClick && {
					cursor: 'pointer',
				}),
				...style,
			}}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
