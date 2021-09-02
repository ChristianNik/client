import React from 'react';
import { useHistory } from 'react-router-dom';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';

const Dashboard = () => {
	const { lang } = useLanguage();
	const { items } = useItems();
	const history = useHistory();

	const tagUsage = items.reduce((acc, item) => {
		item.tags &&
			item.tags.forEach((tag) => {
				acc[tag] = (acc[tag] || 0) + 1;
			});

		return acc;
	}, {});
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h1>{lang('dashboard', 'pageTitle')}</h1>
			</div>
			<div
				style={{
					backgroundColor: 'hsl(220, 13%, 26%)',
					padding: '16px',
					borderRadius: '8px',
				}}
			>
				<h2>{lang('dashboard', 'tagUsageCaption')}</h2>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
					}}
				>
					{Object.keys(tagUsage)
						.sort((a, b) => tagUsage[b] - tagUsage[a])
						.map((key) => (
							<div
								style={{
									marginRight: '6px',
								}}
								onClick={() => {
									history.push(`/items?key=${key}`);
								}}
							>
								({tagUsage[key]}x) {key},
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
