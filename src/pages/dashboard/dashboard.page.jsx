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

	const typeUsage = items.reduce((acc, item) => {
		acc[item.type] = (acc[item.type] || 0) + 1;
		return acc;
	}, {});

	return (
		<div
			style={{
				color: 'var(--on-background)',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div
					style={{ display: 'flex', flexDirection: 'column', margin: '24px 0' }}
				>
					<small>
						{lang('ui/dashboard/title', 'defaultLabel', ['Christian'])}
					</small>
					<h2>{lang('ui/dashboard/title', 'pageTitle')}</h2>
				</div>
			</div>
			<div style={{ display: 'grid', gap: '16px' }}>
				<div
					style={{
						backgroundColor: 'var(--background-variant)',
						padding: '16px',
						borderRadius: '8px',
					}}
				>
					<h2>{lang('ui/dashboard/tags', 'defaultLabel')}</h2>
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
									key={key}
									style={{
										margin: '2px',
										backgroundColor: 'var(--background)',
										color: 'var(--on-background)',
										padding: '4px',
										borderRadius: '4px',
									}}
									onClick={() => {
										history.push(`/items?key=${key}`);
									}}
								>
									{tagUsage[key]}x {key}
								</div>
							))}
					</div>
				</div>
				<div
					style={{
						backgroundColor: 'var(--background-variant)',
						padding: '16px',
						borderRadius: '8px',
					}}
				>
					<h2>{lang('ui/dashboard/types', 'defaultLabel')}</h2>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
						}}
					>
						{Object.keys(typeUsage)
							.sort((a, b) => tagUsage[b] - tagUsage[a])
							.map((key) => (
								<div
									key={key}
									style={{
										margin: '2px',
										backgroundColor: 'var(--background)',
										color: 'var(--on-background)',
										padding: '4px',
										borderRadius: '4px',
									}}
									onClick={() => {
										history.push(`/items?key=${key}`);
									}}
								>
									{typeUsage[key]}x {key}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
