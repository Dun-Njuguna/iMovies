import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/ configureStore';
import appTheme from '../theme';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
	Component: NextPageWithLayout;
}

function AppLayout({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<Fragment>
			<ThemeProvider theme={appTheme}>
				{getLayout(<Component {...pageProps} />)}
			</ThemeProvider>
			,
		</Fragment>
	);
}

const App = (props: AppPropsWithLayout) => {
	return (
		<Provider store={store}>
			<>
				<AppLayout {...props} />
			</>
		</Provider>
	);
};

export default App;
