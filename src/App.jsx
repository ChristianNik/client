import React, { Suspense } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { Sidebar } from './components';
import MobileLayout from './layouts/mobile.layout';
import useTotalHeight from './hooks/use-total-height';
import { GridLoader } from 'react-spinners';

const DashboardPage = React.lazy(() => import('./pages/dashboard'));
const ItemAddPage = React.lazy(() => import('./pages/item-add'));
const ItemEditPage = React.lazy(() => import('./pages/item-edit'));
const ItemViewPage = React.lazy(() => import('./pages/item-view'));
const ItemsPage = React.lazy(() => import('./pages/items/items.page'));
const SettingsPage = React.lazy(() => import('./pages/settings'));

function App() {
	useTotalHeight();

	return (
		<MobileLayout bottom={<Sidebar />}>
			<div
				style={{
					margin: '0 auto',
					padding: '16px',
					maxWidth: '600px',
					overflow: 'auto',
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
							<GridLoader color='hsl(220, 13%, 50%)' />
						</div>
					}
				>
					<Switch>
						<Route exact path='/' component={DashboardPage} />
						<Route exact path='/items' component={ItemsPage} />
						<Route exact path='/items/:id/edit' component={ItemEditPage} />
						<Route path='/items/add' component={ItemAddPage} />
						<Route path='/items/:id' component={ItemViewPage} />
						<Route exact path='/settings' component={SettingsPage} />
					</Switch>
				</Suspense>
			</div>
		</MobileLayout>
	);
}

export default App;
