import React from 'react';
import Input from '../input';
import './rating.style.css';

const Rating = (props) => {
	return (
		<div className='Rating'>
			{props.text}
			<div
				style={{
					display: 'grid',
					gridAutoFlow: 'column',
				}}
			>
				<Input
					id={`${props.name}-1`}
					type='radio'
					name={`${props.name}`}
					value='1'
					onChange={props.onChange}
				/>
				<Input
					id={`${props.name}-2`}
					type='radio'
					name={`${props.name}`}
					value='2'
					onChange={props.onChange}
				/>
				<Input
					id={`${props.name}-3`}
					type='radio'
					name={`${props.name}`}
					value='3'
					onChange={props.onChange}
				/>
				<Input
					id={`${props.name}-4`}
					type='radio'
					name={`${props.name}`}
					value='4'
					onChange={props.onChange}
				/>
				<Input
					id={`${props.name}-5`}
					type='radio'
					name={`${props.name}`}
					value='5'
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
};

export default Rating;
