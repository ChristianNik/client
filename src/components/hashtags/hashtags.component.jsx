import React from 'react';
import './hashtags.style.css';

const Hashtags = (props) => {
	return (
		<div className='Hashtags'>
			<div>
				<input
					style={{
						outline: 'none',
						borderRadius: '8px',
						border: '2px solid hsl(220, 13%, 30%)',
						background: 'hsl(220, 13%, 16%)',
						color: '#fff',
						padding: '12px 16px',
					}}
					onKeyUp={(e) => {
						const isSpacePressed = e.code === 'Space';
						if (isSpacePressed) {
							props.onSubmit && props.onSubmit(e.target.value);
							e.target.value = '';
						}
					}}
				/>
			</div>
			<p>
				{props.tags &&
					props.tags.map((tag) => (
						<span
							key={tag}
							style={{ marginRight: '8px' }}
							onContextMenu={(e) => {
								e.preventDefault();
								props.onRemove && props.onRemove(tag);
							}}
						>
							#{tag}
						</span>
					))}
			</p>
		</div>
	);
};

export default Hashtags;
