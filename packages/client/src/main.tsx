import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';
import { AppProviders } from '@atoms/AppProviders';

axios.defaults.baseURL = 'http://localhost:5000/api'; // TODO: Move to env

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>
);
