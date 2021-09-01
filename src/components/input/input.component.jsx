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
					...props.labelStyle,
				}}
			>
				{props.text}
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
					style={{ padding: '7px 14px' }}
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
