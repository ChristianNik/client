import React from 'react';
import LanguageSelector from '../../context/language.context';

const SettingsPage = () => {
	return (
		<div
			style={{
				color: 'var(--on-background)',
			}}
		>
		<div>
			<LanguageSelector />
		</div>
	);
};

export default SettingsPage;
