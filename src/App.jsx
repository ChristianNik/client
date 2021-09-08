import React, { Suspense } from 'react';
import './App.css';

import { Route, Switch, useLocation } from 'react-router-dom';
import { Sidebar } from './components';
import MobileLayout from './layouts/mobile.layout';
import useTotalHeight from './hooks/use-total-height';
import { GridLoader } from 'react-spinners';
import { useThemeAutoSwitcher } from './hooks/use-theme';

const DashboardPage = React.lazy(() => import('./pages/dashboard'));
const ItemsPage = React.lazy(() => import('./pages/items/items.page'));
const SettingsPage = React.lazy(() => import('./pages/settings'));
const ItemAddDialog = React.lazy(() => import('./pages/item-add'));
const ItemDialog = React.lazy(() =>
	import('./pages/items/components/items-dialog')
);

import { motion, AnimatePresence } from 'framer-motion';

function App() {
	useTotalHeight();
	useThemeAutoSwitcher();

	const location = useLocation();
	return (
		<MobileLayout
			style={{
				background: 'var(--background)',
			}}
			bottom={
				<motion.div
					initial={{
						x: 0,
						opacity: 1,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
				>
					<Route exact path={['/', '/items', '/settings']}>
						<Sidebar />
					</Route>
				</motion.div>
			}
		>
			<div
				style={{
					margin: '0 auto',
					padding: '16px',
					overflow: 'auto',
					height: '100%',
					background: 'var(--background)',
				}}
			>
				<div
					style={{
						maxWidth: 'var(--app-max-mobile-width, 600px)',
						margin: '0 auto',
						height: '100%',
					}}
				>
					<Suspense
						fallback={
							<div
								style={{
									display: 'flex',
									height: '100%',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<GridLoader color='var(--inactive)' />
							</div>
						}
					>
						<AnimatePresence>
							<Switch location={location} key={location.pathname}>
								<Route path='/items/add' component={ItemAddDialog} />
								<Route exact path='/items/:id/edit' component={ItemDialog} />
								<Route exact path='/items/:id' component={ItemDialog} />
							</Switch>

							<Switch>
								<Route exact path='/' component={DashboardPage} />
								<Route exact path='/items' component={ItemsPage} />
								<Route exact path='/settings' component={SettingsPage} />
							</Switch>
						</AnimatePresence>
					</Suspense>
				</div>
			</div>
		</MobileLayout>
	);
}

export default App;
