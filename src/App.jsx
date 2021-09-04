import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { Sidebar } from './components';
import ItemViewPage from './pages/item-view';
import ItemsPage from './pages/items/items.page';
import ItemAdd from './pages/item-add/item-add.page';
import ItemEditPage from './pages/item-edit';
import SettingsPage from './pages/settings';
import Dashboard from './pages/dashboard';
import MobileLayout from './layouts/mobile.layout';
import useTotalHeight from './hooks/use-total-height';

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
				}}
			>
				<Switch>
					<Route exact path='/' component={Dashboard} />
					<Route exact path='/items' component={ItemsPage} />
					<Route path='/items/add' component={ItemAdd} />
					<Route exact path='/items/:type/edit' component={ItemEditPage} />
					<Route exact path='/items/:id' component={ItemViewPage} />
					<Route exact path='/settings' component={SettingsPage} />
				</Switch>
			</div>
		</MobileLayout>
	);
}

export default App;
