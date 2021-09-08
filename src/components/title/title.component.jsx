import React from 'react';
import './title.style.css';

const Title = ({ style, ...rest }) => (
	<h2
		style={{
			margin: '21px 0 8px 12px',
			fontSize: '12px',
			textTransform: 'uppercase',
			color: 'gray',
			...style,
		}}
		{...rest}
	/>
);

export default Title;
