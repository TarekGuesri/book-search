import type { SelectChangeEvent } from '@mui/material';
import { Box, Container, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import type { SortType } from '@book-search/shared';
import { LogoSVG } from '@atoms/Logo/Logo';
import { useBooks } from '@hooks/useBooks';
import { SearchInput } from '@atoms/SearchInput/SearchInput';
import { TableView } from '@templates/TableView/TableView';

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', width: 200 },
	{ field: 'author', headerName: 'Author', width: 200 },
	{ field: 'publishedYear', headerName: 'Published Year', width: 150 },
	{ field: 'rating', headerName: 'Rating', width: 70 },
	{ field: 'firstSentence', headerName: 'First sentence', flex: 1 },
];

function App() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sort, setSort] = useState<SortType>(
		(searchParams.get('sort') as SortType) || 'default'
	);
	const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
	const [prevRowCount, setPrevRowCount] = useState(0);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const page = Number(searchParams.get('page')) || 1;
	const pageSize = Number(searchParams.get('limit')) || 5;

	// Debounce the search input so users don't make a request on every keystroke
	const [debouncedSearch] = useDebounce(searchInput, 500);

	const { data, isLoading } = useBooks();

	const handleChange = (event: SelectChangeEvent) => {
		const newSort = event.target.value as SortType;
		setSort(newSort);

		setSearchParams((prevParams) => {
			const newParams = new URLSearchParams(prevParams);

			// Only add the sort parameter if it's 'new' or 'old'
			if (newSort === 'new' || newSort === 'old') {
				newParams.set('sort', newSort);
			} else {
				// Remove the sort parameter if it's 'default'
				newParams.delete('sort');
			}

			return newParams;
		});
	};

	const handlePaginationChange = (paginationModel: {
		page: number;
		pageSize: number;
	}) => {
		setSearchParams((prevParams) => {
			const newParams = new URLSearchParams(prevParams);
			newParams.set('page', String(paginationModel.page + 1));
			newParams.set('limit', String(paginationModel.pageSize));
			return newParams;
		});
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [searchInput]);

	useEffect(() => {
		if (data?.rowCount !== undefined) {
			setPrevRowCount(data.rowCount);
		}
	}, [data?.rowCount]);

	useEffect(() => {
		setSearchParams((prevParams) => {
			const newParams = new URLSearchParams(prevParams);
			newParams.set('q', debouncedSearch);
			if (!newParams.has('page')) newParams.set('page', '1');
			newParams.set('limit', String(pageSize));
			return newParams;
		});
	}, [debouncedSearch, pageSize]);

	return (
		<Container maxWidth='xl' sx={{ pt: 2 }}>
			{searchInput === '' ? (
				<>
					<Box display='flex' justifyContent='center' mt={8}>
						<LogoSVG width={180} height={57.6} style={{ marginBottom: 13 }} />
					</Box>
					<Box display='flex' justifyContent='center' mt={2}>
						<Typography variant='h6'>Book Search Assignment</Typography>
					</Box>
					<Box display='flex' justifyContent='center' mt={2}>
						<SearchInput
							value={searchInput}
							onChange={handleSearchChange}
							inputRef={searchInputRef}
							sx={{ width: { xs: '100%', sm: 489 } }}
						/>
					</Box>
				</>
			) : (
				<TableView
					searchInput={searchInput}
					handleSearchChange={handleSearchChange}
					sort={sort}
					handleChange={handleChange}
					data={data}
					columns={columns}
					page={page}
					pageSize={pageSize}
					handlePaginationChange={handlePaginationChange}
					isLoading={isLoading}
					prevRowCount={prevRowCount}
				/>
			)}
		</Container>
	);
}

export default App;
