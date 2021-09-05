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

Dialog.Header = ({ style, ...rest }) => {
	return (
		<div
			style={{
				width: '100%',
				margin: '0 auto',
				maxWidth: '600px',
				overflow: 'auto',
				height: '100%',
				background: 'var(--background)',
				color: 'var(--on-background)',
				...style,
			}}
			{...rest}
		/>
	);
};

Dialog.Content = ({ style, ...rest }) => {
	return (
		<div
			style={{
				margin: '0 auto',
				maxWidth: '600px',
				overflow: 'auto',
				height: '100%',
				background: 'var(--background)',
				color: 'var(--on-background)',
				...style,
			}}
			{...rest}
		/>
	);
};

export default Dialog;
