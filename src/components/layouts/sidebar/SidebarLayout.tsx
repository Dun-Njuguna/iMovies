import MenuIcon from '@mui/icons-material/Menu';
import { SvgIconProps } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SyncIcon from '@mui/icons-material/Sync';
import router from 'next/router';
import { Colors } from '../../../theme';
import listButton from '../../buttons/ListButton';

export interface NavItem {
	id: number;
	name: string;
	path: string;
	icon: React.ComponentType<SvgIconProps>;
}

export interface ISidebarLayout {}

const menues: NavItem[] = [
	{
		id: Math.random(),
		name: 'Explore',
		path: '/explore',
		icon: ExploreIcon,
	},
	{
		id: Math.random(),
		name: 'Watch list',
		path: '/wacth-list',
		icon: FavoriteIcon,
	},
	{
		id: Math.random(),
		name: 'Coming soon',
		path: '/comming-soon',
		icon: SyncIcon,
	},
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const SidebarLayout: React.FC<ISidebarLayout> = () => {
	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ backgroundColor: Colors.white, color: Colors.secondary }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h5" noWrap component="div">
						I-Movies
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer variant="permanent" open={open}>
				<DrawerHeader />
				<List sx={{ backgroundColor: 'transparent', color: Colors.secondary }}>
					<Typography
						variant="subtitle1"
						sx={{
							opacity: open ? 1 : 0,
							justifyContent: 'center',
							px: 4,
						}}
					>
						Menu
					</Typography>
					{menues.map((menuItem, _index) => (
						<ListItem
							key={menuItem.id}
							sx={{
								minHeight: 48,
								justifyContent: 'initial',
							}}
							onClick={() => router.push(menuItem.path)}
						>
							{listButton({
								...{
									open: open,
									name: open ? menuItem.name : null,
									icon: menuItem.icon,
								},
							})}
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};

export default SidebarLayout;
