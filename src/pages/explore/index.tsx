import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import MovieCard from '../../components/cards/movie/MovieCard';
import PrimaryLayout from '../../layouts/primary/PrimaryLayout';
import SidebarLayout from '../../layouts/sidebar/SidebarLayout';
import { Movie, PopularMovies } from '../../models/movies';
import { NextPageWithLayout } from '../page';

const Dashboard: NextPageWithLayout<PopularMovies> = ({
	total_pages,
	results,
}) => {
	const [movies, setMovies] = useState<Movie[]>();
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		setMovies(results);
	}, [results]);

	const handleChangePage = async (nextPage: number) => {
		const url = `/.netlify/functions/getMovies`;
		const response = await axios.get<PopularMovies>(url, {
			params: {
				page: nextPage,
			},
		});
		if (response.status) setCurrentPage(nextPage);
		setMovies(response.data.results);
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
				page={currentPage}
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
	const response = await api.get<PopularMovies>('/movie/popular', {
		params: {
			page: 1,
		},
	});
	const data: PopularMovies = response.data;
	return {
		props: { ...data },
		revalidate: 1,
	};
};

export default Dashboard;
