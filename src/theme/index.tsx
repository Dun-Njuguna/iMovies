import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}

export const Colors = {
	primary: '#ba0909',
	secondary: '#005180',
	success: '#4CAF50',
	info: '#95efa0',
	danger: '#ff000d',
	warning: '#FFC107',
	dark: '#0e1b20',
	light: '#aaa',
	muted: '#abafb3',
	border: '#95efa0',
	inverse: '#2F3D4A',
	shaft: '#333',
	///////////////
	// Grays
	///////////////
	dim_grey: '#696969',
	dove_gray: '#d5d5d5',
	body_bg: '#f3f6f9',
	light_gray: 'rgb(230,230,230)',
	///////////////
	// Solid Color
	///////////////
	white: '#fff',
	black: '#000',
};

const appTheme = createTheme({
	palette: {
		primary: {
			main: Colors.primary,
		},
		secondary: {
			main: Colors.secondary,
		},
		background: {
			default: '#fcfff9',
			paper: '#fcfcfc',
		},
	},
	typography: {
		fontFamily: 'Ubuntu Mono',
		h1: {
			fontFamily: 'Ubuntu Mono',
		},
		h2: {
			fontFamily: 'Ubuntu Mono',
		},
		h3: {
			fontFamily: 'Ubuntu Mono',
		},
		h4: {
			fontFamily: 'Ubuntu Mono',
			fontWeight: 700,
		},
		h5: {
			fontFamily: 'Ubuntu Mono',
		},
		h6: {
			fontFamily: 'Ubuntu Mono',
			fontWeight: 900,
		},
		subtitle1: {
			fontFamily: 'Ubuntu Mono',
		},
		subtitle2: {
			fontFamily: 'Ubuntu Mono',
		},
		button: {
			fontFamily: 'Ubuntu Mono',
			fontWeight: 900,
		},
	},
	status: {
		danger: Colors.danger,
	},
});

export default appTheme;
