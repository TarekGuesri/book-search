import type React from 'react';
import type { SelectChangeEvent } from '@mui/material';
import {
	Grid2,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Paper,
	tablePaginationClasses,
} from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type { Book } from '@book-search/shared';
import type { RefObject } from 'react';
import { LogoSVG } from '@atoms/Logo/Logo';
import { SearchInput } from '@atoms/SearchInput/SearchInput';

interface TableViewProps {
	searchInput: string;
	inputRef?: RefObject<HTMLInputElement>;
	handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	sort: string;
	handleChange: (event: SelectChangeEvent) => void;
	data: { data: Book[]; rowCount?: number } | undefined;
	columns: GridColDef[];
	page: number;
	pageSize: number;
	handlePaginationChange: (paginationModel: {
		page: number;
		pageSize: number;
	}) => void;
	isLoading: boolean;
	prevRowCount: number;
}

export function TableView({
	searchInput,
	inputRef,
	handleSearchChange,
	sort,
	handleChange,
	data,
	columns,
	page,
	pageSize,
	handlePaginationChange,
	isLoading,
	prevRowCount,
}: TableViewProps) {
	return (
		<>
			<Grid2
				container
				direction='row'
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 1,
				}}
			>
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<LogoSVG style={{ marginBottom: 13 }} />
				</Grid2>
				<Grid2
					container
					direction='row'
					size={{ xs: 12, sm: 6 }}
					sx={{
						justifyContent: 'flex-end',
						mb: 2,
					}}
				>
					<SearchInput
						inputRef={inputRef}
						value={searchInput}
						onChange={handleSearchChange}
						sx={{ width: { xs: '100%', sm: 323 } }}
					/>
				</Grid2>
			</Grid2>

			<Grid2 container justifyContent='flex-end' sx={{ mb: 2 }}>
				<FormControl sx={{ width: { xs: '100%', sm: 220 } }} size='small'>
					<InputLabel>Sort</InputLabel>
					<Select value={sort} label='Sort' onChange={handleChange}>
						<MenuItem value='default'>Default</MenuItem>
						<MenuItem value='new'>Newest</MenuItem>
						<MenuItem value='old'>Oldest</MenuItem>
					</Select>
				</FormControl>
			</Grid2>
			<Paper sx={{ height: 400, width: '100%' }}>
				<DataGrid
					paginationMode='server'
					localeText={{
						noRowsLabel: 'No books found!',
					}}
					rows={data?.data || []}
					columns={columns}
					paginationModel={{ page: page - 1, pageSize }}
					onPaginationModelChange={handlePaginationChange}
					pageSizeOptions={[5, 10, 20]}
					rowCount={data?.rowCount ?? prevRowCount}
					loading={isLoading}
					sx={{
						border: 0,
						[`& .${tablePaginationClasses.selectLabel}`]: {
							display: 'block',
						},
						[`& .${tablePaginationClasses.input}`]: {
							display: 'inline-flex',
						},
					}}
					disableColumnSorting
					disableColumnMenu
					disableRowSelectionOnClick
				/>
			</Paper>
		</>
	);
}
