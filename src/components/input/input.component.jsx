import React from 'react';
import './input.style.css';

const Input = ({ id, name, labelStyle, text, options, style, ...rest }) => {
	return (
		<>
			<label
				className='Input'
				htmlFor={id || name}
				style={{
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					color: 'var(--on-surface)',
					...labelStyle,
				}}
			>
				{text && (
					<span
						style={{
							position: 'absolute',
							color: 'inherit',
							zIndex: 10,
							top: 0,
							bottom: 0,
							left: '12px',
							display: 'flex',
							alignItems: 'center',
							fontWeight: 'bold',
						}}
					>
						{text}
					</span>
				)}
				<input
					list={options && `list-{$rest.name}`}
					id={rest.id || rest.name}
					name={name}
					{...rest}
					style={{
						outline: 'none',
						padding: '12px 16px',
						borderRadius: '8px',
						border: '2px solid transparent',
						background: 'var(--surface)',
						color: 'inherit',
						...style,
						...(text && {
							paddingLeft: '130px',
						}),
					}}
				/>
			</label>
			{options && (
				<datalist id={`list-{$rest.name}`}>
					{options.map((option) => (
						<option key={option} value={option} />
					))}
				</datalist>
			)}
		</>
	);
};

export default Input;
