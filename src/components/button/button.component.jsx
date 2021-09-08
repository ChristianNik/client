import React from 'react';
import './button.style.css';

const Button = ({
	primary,
	onClick,
	active,
	children,
	style,
	className,
	secondary,
	...rest
}) => {
	return (
		<button
			className={`Button ${className} ${active ? 'active' : ''} ${
				primary ? 'primary' : secondary ? 'secondary' : ''
			}`}
			type='button'
			style={{
				...style,
				...(primary && {
					'--btn-bg': 'var(--primary)',
					'--btn-fg': 'var(--on-primary)',
					'--btn-border-color': 'var(--primary)',
					'--btn-hover': 'var(--primary-variant)',
					'--btn-fg-hover': 'var(--white)',
				}),
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
