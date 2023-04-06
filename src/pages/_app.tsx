import { ThemeProvider } from '@mui/material/styles';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { apiGetPopularMovies } from '../api/movies';
import { store } from '../redux/ configureStore';
import { populatePopularMovies } from '../redux/thunks/movies';
import appTheme from '../theme';
import { NextPageWithLayout } from './page';

interface MyAppProps extends AppProps {
	Component: NextPageWithLayout;
}

function AppLayout({ Component, pageProps }: MyAppProps) {
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

const MyApp = (props: MyAppProps) => {
	const { dispatch } = store;
	useEffect(() => {
		dispatch(populatePopularMovies(props.pageProps.popularMovies[0]));
	});
	return (
		<Provider store={store}>
			<>
				<AppLayout {...props} />
			</>
		</Provider>
	);
};

MyApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);
	const { dispatch } = store;
	const res = await apiGetPopularMovies(`/movie/popular`, 1);
	dispatch(populatePopularMovies(res.data));
	appProps.pageProps = {
		...appProps.pageProps,
		popularMovies: store.getState().movies.popularMovies,
	};
	return appProps;
};

export default MyApp;
