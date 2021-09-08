import React from 'react';

const MobileLayout = ({ children, bottom, top, style, ...rest }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateRows: `${top ? 'min-content' : ''} 1fr min-content`,
				height: '100%',
				overflow: 'auto',
				...style,
			}}
			{...rest}
		>
			{top}
			<div
				style={{
					overflow: 'auto',
				}}
			>
				{children}
			</div>
			{bottom}
		</div>
	);
};

export default MobileLayout;
