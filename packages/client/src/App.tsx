import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { LogoSVG } from '@atoms/Logo/Logo';
import { useBooks } from '@hooks/useBooks';

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', width: 200 },
	{ field: 'author', headerName: 'Author', width: 200 },
	{ field: 'publishedYear', headerName: 'Published Year', width: 150 },
	{ field: 'rating', headerName: 'Rating', width: 70 },
	{ field: 'firstSentence', headerName: 'First sentence', flex: 1 },
];

function App() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
	const [prevRowCount, setPrevRowCount] = useState(0);

	const page = Number(searchParams.get('page')) || 1;
	const pageSize = Number(searchParams.get('limit')) || 5;

	// Debounce the search input so users don't make a request on every keystroke
	const [debouncedSearch] = useDebounce(searchInput, 500);

	const { data, isLoading } = useBooks();

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
	}, [debouncedSearch, pageSize, setSearchParams]);

	const handlePaginationChange = (paginationModel: {
		page: number;
		pageSize: number;
	}) => {
		setSearchParams((prevParams) => {
			const newParams = new URLSearchParams(prevParams);
			newParams.set('page', String(paginationModel.page + 1));
			newParams.set('limit', String(paginationModel.pageSize));
			newParams.set('q', debouncedSearch);
			return newParams;
		});
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	return (
		<>
			<LogoSVG />
			<TextField
				label='Search'
				id='outlined-start-adornment'
				value={searchInput}
				onChange={handleSearchChange}
				sx={{ m: 1, width: '25ch' }}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					},
				}}
			/>

			<Paper sx={{ height: 400, width: '100%' }}>
				<DataGrid
					paginationMode='server'
					rows={data?.data || []}
					columns={columns}
					paginationModel={{ page: page - 1, pageSize }}
					onPaginationModelChange={handlePaginationChange}
					pageSizeOptions={[5, 10, 20]}
					rowCount={data?.rowCount ?? prevRowCount}
					loading={isLoading}
					sx={{ border: 0 }}
					disableColumnSorting
					disableColumnMenu
				/>
			</Paper>
		</>
	);
}

export default App;
