import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HighlightCard from '../../components/cards/genre/HighlightCard';
import MovieCard from '../../components/cards/movie/MovieCard';
import PrimaryLayout from '../../layouts/primary/PrimaryLayout';
import SidebarLayout from '../../layouts/sidebar/SidebarLayout';
import { MovieDetails } from '../../models/movieDetails';
import { PopularMovies } from '../../models/movies';
import { store } from '../../redux/ configureStore';
import {
	reduxGetMovieDetails,
	reduxGetMovieRecommendations,
} from '../../redux/thunks/movies';
import { Colors } from '../../theme';
import { NextPageWithLayout } from '../page';

export interface MovieDetailProps extends AppProps {
	moviesDetails: MovieDetails;
	recommendations: PopularMovies;
}

interface IRecommendationsProp {
	movies: PopularMovies | undefined;
	onClick: (movieId: string) => void;
}

interface IGridItemProps {
	children: React.ReactNode;
	md: number;
	sx?: SxProps<Theme>;
}

interface IActionIconProps {
	Icon: React.ComponentType<SvgIconProps<'svg', {}>>;
}

const MovieDetailView: NextPageWithLayout<MovieDetailProps> = ({
	moviesDetails,
	recommendations,
}) => {
	const router = useRouter();

	const updateSelectedMovie = (movieId: string) => {
		const currentQuery = router.query;
		const updatedQuery = { ...currentQuery, id: movieId };
		router.replace({
			pathname: router.pathname,
			query: updatedQuery,
		});
	};

	return (
		<Box
			sx={{
				width: '100%',
			}}
		>
			{moviesDetails && (
				<>
					<MoviePlayer {...moviesDetails} />
					<Grid
						container
						sx={{
							padding: '3rem',
						}}
					>
						<MovieOverview {...moviesDetails} />
						<Recommendations
							movies={recommendations}
							onClick={updateSelectedMovie}
						/>
					</Grid>
				</>
			)}
		</Box>
	);
};

const MoviePlayer = ({ backdrop_path }: MovieDetails) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: { xs: '300px', md: '700px' },
				position: 'relative',
			}}
		>
			{
				<Image
					fill
					alt="Sunset"
					style={{ objectFit: 'cover' }}
					src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
				/>
			}
		</Box>
	);
};

const MovieOverview = (moviesDetails: MovieDetails) => {
	return (
		<MovieDetailsGridItem
			md={8}
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				gap={2}
				sx={{
					width: '95%',
					marginTop: '2rem',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{moviesDetails && (
					<Image
						width={200}
						height={300}
						alt="Sunset"
						style={{ objectFit: 'cover' }}
						src={`https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`}
					/>
				)}

				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="h4">{moviesDetails?.title}</Typography>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							flexDirection: 'row',
							gap: 3,
							margin: '2rem 0rem',
						}}
					>
						{moviesDetails?.genres.map((genre) => {
							return (
								<HighlightCard
									key={genre.id}
									title={genre.name}
									sx={{ padding: '0.6rem 3rem' }}
								/>
							);
						})}
					</Box>
					<Box
						sx={{
							gap: 3,
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<HighlightCard
							title={'Watch'}
							Icon={PlayCircleOutlineIcon}
							sx={{
								border: `1px solid ${Colors.danger}`,
								color: Colors.danger,
								padding: '0.8rem 3rem',
								textTransform: 'uppercase',
							}}
							iconSx={{ height: '2.5rem', width: '2.5rem' }}
						/>

						<ActionIcon Icon={FavoriteBorderIcon} />
						<ActionIcon Icon={ShareIcon} />
						<ActionIcon Icon={MoreHorizIcon} />
					</Box>
				</Box>
			</Box>
			<Grid
				container
				gap={'5rem'}
				sx={{
					width: '95%',
					marginTop: '2rem',
				}}
			>
				<MovieDetailsGridItem
					md={2}
					sx={{
						gap: '1rem',
						px: '2rem',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h5">
						{moviesDetails &&
							new Date(moviesDetails?.release_date).getUTCFullYear()}
					</Typography>
					<Typography variant="h5">{moviesDetails?.runtime}</Typography>
					<Typography variant="h5">{moviesDetails?.vote_average}</Typography>
				</MovieDetailsGridItem>

				<MovieDetailsGridItem
					md={8}
					sx={{
						gap: '1rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<Typography variant="h6">Storyline</Typography>

					<Typography variant="subtitle1">{moviesDetails?.overview}</Typography>
				</MovieDetailsGridItem>
			</Grid>
		</MovieDetailsGridItem>
	);
};

const ActionIcon: React.FC<IActionIconProps> = ({ Icon }) => {
	return (
		<HighlightCard
			Icon={Icon}
			sx={{
				height: '4rem',
				width: '4rem',
				border: `1px solid`,
				textTransform: 'uppercase',
			}}
			iconSx={{ height: '1.5rem', width: '1.5rem' }}
		/>
	);
};

const Recommendations = ({ movies, onClick }: IRecommendationsProp) => {
	return (
		<MovieDetailsGridItem
			md={4}
			sx={{
				gap: 4,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Typography variant="h6">You may also like</Typography>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 2 }}>
				{movies?.results.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							{...movie}
							size={4}
							onCardClicked={() => {
								onClick(movie.id.toString());
							}}
						/>
					);
				})}
			</Grid>
		</MovieDetailsGridItem>
	);
};

const MovieDetailsGridItem = ({ md, sx, children }: IGridItemProps) => {
	return (
		<Grid item xs={6} md={md} sx={sx}>
			{children}
		</Grid>
	);
};

MovieDetailView.getLayout = (page) => {
	return (
		<PrimaryLayout>
			<SidebarLayout />
			{page}
		</PrimaryLayout>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { dispatch } = store;
	const { query } = context;
	const { id } = query;

	let movieDetails: MovieDetails | undefined;
	let movieRecommendations: PopularMovies | undefined;

	await Promise.all([
		dispatch(reduxGetMovieDetails({ movieId: Number(id) })).then((action) => {
			if (reduxGetMovieDetails.fulfilled.match(action)) {
				movieDetails = action.payload;
			} else if (reduxGetMovieDetails.rejected.match(action)) {
				const error = action.payload;
			}
		}),
		dispatch(reduxGetMovieRecommendations({ movieId: Number(id) })).then(
			(action) => {
				if (reduxGetMovieRecommendations.fulfilled.match(action)) {
					movieRecommendations = action.payload;
				} else if (reduxGetMovieRecommendations.rejected.match(action)) {
					const error = action.payload;
				}
			},
		),
	]);

	return {
		props: {
			moviesDetails: movieDetails,
			recommendations: movieRecommendations,
		},
	};
}

export default MovieDetailView;
