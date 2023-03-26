import { SvgIconProps, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import React from 'react';

export interface IOptions {
	open: boolean;
	name: string | null;
	icon: React.ComponentType<SvgIconProps<'svg', {}>> | null;
}

const listButton = (options: IOptions) => {
	return (
		<ListItemButton
			sx={{
				mr: options.open ? 3 : 0,
				justifyContent: options.open ? 'initial' : 'center',
				gap: options.open ? '1rem' : '0',
			}}
		>
			{options?.icon && <options.icon />}
			<Typography variant="subtitle2">{options.name ?? ''}</Typography>
		</ListItemButton>
	);
};

export default listButton;
