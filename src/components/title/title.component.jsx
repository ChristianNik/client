import React from 'react';
import './title.style.css';

const Title = ({ h2, style, ...rest }) => (
	<h2
		style={{
			margin: '21px 0 8px 12px',
			fontSize: '12px',
			textTransform: 'uppercase',
			color: 'gray',
			...(h2 && {
				fontSize: '18px',
				color: 'black',
			}),
			...style,
		}}
		{...rest}
	/>
);

export default Title;
