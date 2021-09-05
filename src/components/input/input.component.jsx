import React from 'react';
import './input.style.css';

const Input = (props) => {
	return (
		<>
			<label
				className='Input'
				htmlFor={props.id || props.name}
				style={{
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					...props.labelStyle,
				}}
			>
				<span
					style={{
						position: 'absolute',
						// color: '#000',
						zIndex: 10,
						top: 0,
						bottom: 0,
						left: '12px',
						display: 'flex',
						alignItems: 'center',
						fontWeight: 'bold',
					}}
				>
					{props.text}
				</span>
				<input
					list={props.options && `list-{$props.name}`}
					id={props.id || props.name}
					name={props.name}
					type={props.type}
					value={props.value}
					onChange={props.onChange}
					min={props.min}
					max={props.max}
					step={props.step}
					style={{
						outline: 'none',
						padding: '12px 16px',
						borderRadius: '8px',
						border: '2px solid var(--border-color)',
						background: 'var(--surface)',
						color: '#fff',
						paddingLeft: '130px',
					}}
				/>
			</label>
			{props.options && (
				<datalist id={`list-{$props.name}`}>
					{props.options.map((option) => (
						<option key={option} value={option} />
					))}
				</datalist>
			)}
		</>
	);
};

export default Input;
