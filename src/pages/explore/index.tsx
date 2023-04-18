import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { apiGetPopularMovies } from '../../api/movies';
import MovieCard from '../../components/cards/movie/MovieCard';
import PrimaryLayout from '../../layouts/primary/PrimaryLayout';
import SidebarLayout from '../../layouts/sidebar/SidebarLayout';
import { PopularMovies } from '../../models/movies';
import { store, useDispatch } from '../../redux/ configureStore';
import { getMoviesByPage } from '../../redux/slices/popularMovies';
import {
	populatePopularMovies,
	reduxGetPopularMovies,
} from '../../redux/thunks/movies';
import { NextPageWithLayout } from '../page';

interface DashboardProps extends AppProps {
	popularMovies: PopularMovies[];
}

const Dashboard: NextPageWithLayout<DashboardProps> = ({ popularMovies }) => {
	const [movies, setMovies] = useState<PopularMovies>(popularMovies[0]);
	const dispatch = useDispatch();
	const router = useRouter();

	const { page } = router.query;

	const updatePage = useCallback(
		(pageNo: number) => {
			console.log('rendered updatePage');
			router.push(
				{
					query: { page: pageNo },
				},
				undefined,
				{ shallow: true },
			);
		},
		[router],
	);

	const handleChangePage = useCallback(
		async (nextPage: number) => {
			let movies = getMoviesByPage(store.getState(), nextPage);
			if (!movies) {
				const response = await dispatch(
					reduxGetPopularMovies({
						url: '/.netlify/functions/getMovies',
						nextPage,
					}),
				);
				movies = response.payload as PopularMovies;
			}
			if (movies) {
				setMovies(movies);
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth',
				});
			}
		},
		[dispatch],
	);

	useEffect(() => {
		if (!page) {
			dispatch(populatePopularMovies(popularMovies[0]));
			updatePage(1); // initial page
		} else {
			handleChangePage(Number(page));
		}
	}, [dispatch, handleChangePage, page, popularMovies, updatePage]);

	return (
		<Stack
			spacing={2}
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 3 }}>
				{movies?.results.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							{...movie}
							size={2}
							onCardClicked={() => {
								router.push(`/explore/${movie.id}`);
							}}
						/>
					);
				})}
			</Grid>
			<Pagination
				variant="outlined"
				color="secondary"
				size="large"
				sx={{ padding: '2rem' }}
				page={page ? Number(page) : 1}
				count={movies?.total_pages}
				onChange={(_event, value) => {
					updatePage(value);
				}}
			/>
		</Stack>
	);
};

Dashboard.getLayout = (page) => {
	return (
		<PrimaryLayout>
			<SidebarLayout />
			{page}
		</PrimaryLayout>
	);
};

export const getStaticProps = async () => {
	const { dispatch } = store;
	const res = await apiGetPopularMovies(`/movie/popular`, 1);
	dispatch(populatePopularMovies(res.data));
	return {
		props: {
			popularMovies: store.getState().movies.popularMovies,
		},
	};
};

export default Dashboard;
