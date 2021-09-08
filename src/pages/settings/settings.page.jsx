import React, { useEffect } from 'react';
import { RouteAnimationWrapper } from '../../components';
import LanguageSelector from '../../context/language.context';
import { useTheme } from '../../hooks/use-theme';

const SettingsPage = () => {
	const { handleSwitchTheme } = useTheme();
	return (
		<RouteAnimationWrapper>
			<div
				style={{
					color: 'var(--on-background)',
				}}
			>
				<div>
					<h3>Language</h3>

					<LanguageSelector />
				</div>
				<div>
					<h3>Theme</h3>
					<button onClick={() => handleSwitchTheme('light')}>{'light'}</button>
					<button onClick={() => handleSwitchTheme('dark')}>{'dark'}</button>
				</div>
			</div>
		</RouteAnimationWrapper>
	);
};

export default SettingsPage;
