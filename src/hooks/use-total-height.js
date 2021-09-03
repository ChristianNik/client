import { useEffect } from 'react';

const useTotalHeight = () => {
	useEffect(() => {
		const handler = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		handler();
		window.addEventListener('resize', handler);
		return () => window.removeEventListener('resize', handler);
	}, []);
};

export default useTotalHeight;
