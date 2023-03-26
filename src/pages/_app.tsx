import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import appTheme from '../theme';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
	Component: NextPageWithLayout;
}

function App({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);

	return getLayout(
		<ThemeProvider theme={appTheme}>
			<Component {...pageProps} />
		</ThemeProvider>,
	);
}

export default App;
