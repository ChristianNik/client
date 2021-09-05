import React from 'react';
import Input from '../input';
import './hashtags.style.css';

const Hashtags = (props) => {
	const handleAddTag = (e, force) => {
		const lastChar = e.target.value[e.target.value.length - 1];
		const isSpacePressed = lastChar === ' ';

		if (force || isSpacePressed) {
			props.onSubmit && props.onSubmit(e.target.value);
			e.target.value = '';
		}
	};
	return (
		<div className='Hashtags'>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					...props.labelStyle,
				}}
			>
				<Input
					text={props.text}
					onBlur={(e) => handleAddTag(e, true)}
					onChange={handleAddTag}
				/>

				<div
					style={{
						top: 0,
						bottom: 0,
						left: '12px',
						alignItems: 'center',
						width: '100%',
						outline: 'none',
						borderRadius: '8px',
						background: 'var(--background-variant)',
						color: 'var(--on-background-variant)',
						padding: '12px 16px',
						minHeight: '43px',
						maxHeight: '62px',
						overflowY: 'auto',
						overflowX: 'hidden',
					}}
				>
					{props.tags &&
						props.tags.map((tag) => (
							<span
								key={tag}
								style={{
									fontWeight: 'bold',
									marginRight: '8px',
								}}
								onContextMenu={(e) => {
									e.preventDefault();
									props.onRemove && props.onRemove(tag);
								}}
							>
								#{tag}
							</span>
						))}
				</div>
			</div>
		</div>
	);
};

export default Hashtags;
