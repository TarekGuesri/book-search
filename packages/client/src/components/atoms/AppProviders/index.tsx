import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			// Log the error to the console
			if (isAxiosError(error)) {
				console.error('Axios error:', error.message);
				console.error('Response data:', error.response?.data);
				console.error('Response status:', error.response?.status);
				toast.error(error.response?.data.message || 'Something went wrong');
			} else {
				console.error('Unexpected error:', error);
				toast.error('Something went wrong');
			}
		},
	}),
});

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<ToastContainer position='top-center' theme='colored' />
		</BrowserRouter>
	);
};
