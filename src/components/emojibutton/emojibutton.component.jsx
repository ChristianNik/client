import React from 'react';
import './emojibutton.style.css';

const EmojiButton = (props) => {
	const SIZE = {
		sm: '15px',
		md: '24px',
		lg: '30px',
	};
	return (
		<div
			className='EmojiButton'
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',

				position: 'relative',

				padding: '14px',
				minWidth: '48px',
				minHeight: '48px',

				backgroundColor: 'hsl(220, 13%, 50%)',
				borderRadius: '50%',

				fontSize: SIZE[props.size || 'lg'] || SIZE['lg'],

				cursor: 'pointer',
				userSelect: 'none',
			}}
			{...props}
		/>
	);
};

export default EmojiButton;
