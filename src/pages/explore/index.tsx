import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import MovieCard from '../../components/cards/movie/MovieCard';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../../components/layouts/sidebar/SidebarLayout';
import { Movie, PopularMovies } from '../../models/movies';
import { NextPageWithLayout } from '../page';

const Dashboard: NextPageWithLayout<PopularMovies> = ({page, total_pages, results}) => {
	const [movies, setMovies] = useState<Movie[]>();

	useEffect(() => {
		setMovies(results);
	}, [results]);

	const handleChangePage = async (nextPage: number) => {
		const response = await api.get<PopularMovies>(
			`/movie/popular?page=${nextPage}`,
		);
		const data: PopularMovies = response.data;
		setMovies(data.results);
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
				{movies?.map((movie) => {
					return <MovieCard key={movie.id} {...movie} />;
				})}
			</Grid>
			<Pagination
				variant="outlined"
				color="secondary"
				size="large"
				sx={{ padding: '2rem' }}
				page={page}
				count={total_pages}
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
	const response = await api.get<PopularMovies>('/movie/popular?page=1');
	const data: PopularMovies = response.data;
	return {
		props: data,
		revalidate: 1,
	};
};

export default Dashboard;
