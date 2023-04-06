import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import MovieCard from '../../components/cards/movie/MovieCard';
import PrimaryLayout from '../../layouts/primary/PrimaryLayout';
import SidebarLayout from '../../layouts/sidebar/SidebarLayout';
import { PopularMovies } from '../../models/movies';
import { store, useDispatch } from '../../redux/ configureStore';
import { getMoviesByPage } from '../../redux/slices/popularMovies';
import { reduxGetPopularMovies } from '../../redux/thunks/movies';
import { NextPageWithLayout } from '../page';

const Dashboard: NextPageWithLayout<{
	popularMovies: PopularMovies[];
}> = ({ popularMovies }) => {
	const [movies, setMovies] = useState<PopularMovies>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const dispatch = useDispatch();

	useEffect(() => {
		setMovies(popularMovies[0]);
	}, [popularMovies]);

	const handleChangePage = async (page: number) => {
		let movies = getMoviesByPage(store.getState(), page);
		if (!movies) {
			const response = await dispatch(
				reduxGetPopularMovies({ url: '/.netlify/functions/getMovies', page }),
			);
			movies = response.payload as PopularMovies;
		}
		if (movies) setCurrentPage(page);
		setMovies(movies);
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Stack
			spacing={2}
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 3 }}>
				{movies?.results.map((movie) => {
					return <MovieCard key={movie.id} {...movie} />;
				})}
			</Grid>
			<Pagination
				variant="outlined"
				color="secondary"
				size="large"
				sx={{ padding: '2rem' }}
				page={currentPage}
				count={10}
				onChange={(_event, value) => {
					handleChangePage(value);
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
	const state = store.getState();
	return {
		props: {
			popularMovies: state.movies.popularMovies,
		},
	};
};

export default Dashboard;
