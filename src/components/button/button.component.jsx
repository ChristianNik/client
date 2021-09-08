import React from 'react';
import './button.style.css';

const Button = ({ onClick, active, children, style, className, ...rest }) => {
	return (
		<button
			className={`Button ${className} ${active ? 'active' : ''}`}
			type='button'
			style={{
				...style,
				...(active && {
					'--btn-bg': 'var(--primary)',
					'--btn-fg': 'var(--on-primary)',
					'--btn-border-color': 'var(--primary)',
				}),
			}}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
