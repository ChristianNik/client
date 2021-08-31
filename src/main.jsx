import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider } from './context/language.context';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
