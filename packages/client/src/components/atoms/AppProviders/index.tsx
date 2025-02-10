import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</BrowserRouter>
	);
};
