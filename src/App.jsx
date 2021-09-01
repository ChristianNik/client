import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { Sidebar } from './components';
import ItemViewPage from './pages/item-view';
import ItemsPage from './pages/items/items.page';
import ItemAdd from './pages/item-add/item-add.page';
import LanguageSelector from './context/language.context';

function App() {
	return (
		<div className='App'>
			<LanguageSelector />
			<Sidebar />
			<div
				style={{
					padding: '16px',
					marginBottom: '56px',
				}}
			>
				<Switch>
					<Route exact path='/items' component={ItemsPage} />
					<Route exact path='/items/add' component={ItemAdd} />
					<Route exact path='/items/:id' component={ItemViewPage} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
