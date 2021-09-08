import { useEffect } from 'react';

const useTheme = () => {
	const handleSwitchTheme = (theme) => {
		document.documentElement.setAttribute('color-scheme', theme);
		localStorage.setItem('app-theme', theme);
	};

	return {
		handleSwitchTheme,
	};
};

const useThemeAutoSwitcher = () => {
	const { handleSwitchTheme } = useTheme();
	useEffect(() => {
		handleSwitchTheme(localStorage.getItem('app-theme'));
	}, []);
};

export { useTheme, useThemeAutoSwitcher };
