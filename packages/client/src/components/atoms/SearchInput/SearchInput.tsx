import type { TextFieldProps } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { FC } from 'react';

interface SearchInputProps extends Omit<TextFieldProps, 'ref'> {
	inputRef?: React.RefObject<HTMLInputElement>;
}

export const SearchInput: FC<SearchInputProps> = ({
	inputRef,
	sx,
	...props
}) => {
	return (
		<TextField
			inputRef={inputRef}
			label='Search'
			id='outlined-start-adornment'
			size='small'
			sx={{ ...sx }}
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),
				},
			}}
			{...props}
		/>
	);
};
