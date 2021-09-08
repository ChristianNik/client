import React from 'react';
import { useHistory } from 'react-router-dom';
import { RouteAnimationWrapper, Title } from '../../components';
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
		<RouteAnimationWrapper
			style={{
				padding: '16px',
				color: 'var(--on-background)',
			}}
		>
			<Title
				h2
				style={{
					textAlign: 'center',
				}}
			>
				{lang('ui/dashboard/title', 'pageTitle')}
			</Title>
			<div style={{ display: 'grid' }}>
				<Title>{lang('ui/dashboard/tags', 'defaultLabel')}</Title>
				<div
					style={{
						backgroundColor: 'var(--surface)',
						padding: '16px',
						borderRadius: '8px',
					}}
				>
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

				<Title>{lang('ui/dashboard/types', 'defaultLabel')}</Title>
				<div
					style={{
						backgroundColor: 'var(--surface)',
						padding: '16px',
						borderRadius: '8px',
					}}
				>
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
		</RouteAnimationWrapper>
	);
};

export default Dashboard;
