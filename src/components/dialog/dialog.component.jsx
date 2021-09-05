import React from 'react';
import { createPortal } from 'react-dom';
import './dialog.style.css';

const Dialog = ({ style, ...rest }) => {
	return createPortal(
		<div
			className='Dialog'
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				overflow: 'auto',
				zIndex: 200,
				...style,
			}}
			{...rest}
		/>,
		document.getElementById('modal-root')
	);
};

export default Dialog;
