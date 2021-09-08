import { motion } from 'framer-motion';
import React from 'react';

const pageVariants = {
	initial: {
		opacity: 0,
	},
	in: {
		opacity: 1,
	},
	out: {
		opacity: 0,
	},
};

const RouteAnimationWrapper = ({ style, ...rest }) => (
	<motion.div
		initial='initial'
		animate='in'
		exit='out'
		variants={pageVariants}
		style={{
			height: '100%',
			...style,
		}}
		{...rest}
	/>
);

export default RouteAnimationWrapper;
