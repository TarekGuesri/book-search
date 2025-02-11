import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';
import { AppProviders } from '@atoms/AppProviders';

if (import.meta.env.PROD) {
	if (!import.meta.env.VITE_BACKEND_URL_PROD) {
		throw new Error('VITE_BACKEND_URL_PROD is not set');
	}

	axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL_PROD as string;
} else {
	if (!import.meta.env.VITE_BACKEND_URL_DEV) {
		throw new Error('VITE_BACKEND_URL_DEV is not set');
	}

	axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL_DEV as string;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>
);
