import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import type { Book, SortType } from '@book-search/shared';
import { QueryKeys } from '@constants/QueryKeys';

interface BooksResponse {
	data: Book[];
	rowCount: number;
}

interface FetchBooksParams {
	page: number;
	limit: number;
	q: string;
	sort?: SortType;
}

async function fetchBooks(params: FetchBooksParams): Promise<BooksResponse> {
	const response = await axios.get(`/books`, { params });
	return response.data;
}

export function useBooks() {
	const [searchParams] = useSearchParams();

	const params: FetchBooksParams = {
		page: Number(searchParams.get('page')) || 1,
		limit: Number(searchParams.get('limit')) || 5,
		q: searchParams.get('q') || '',
	};

	if (searchParams.get('sort')) {
		params.sort = searchParams.get('sort') as SortType;
	}

	return useQuery<BooksResponse>({
		queryKey: [QueryKeys.Books, params],
		queryFn: () => fetchBooks(params),
		staleTime: 300 * 1000,
		retry: 1,
		enabled: !!params.q,
	});
}
