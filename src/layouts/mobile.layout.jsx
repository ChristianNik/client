import React from 'react';

const MobileLayout = ({ children, bottom, ...rest }) => {
	return (
		<div
			className='App'
			style={{
				display: 'grid',
				gridTemplateRows: '1fr min-content',
				height: '100%',
				overflow: 'auto',
			}}
			{...rest}
		>
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
