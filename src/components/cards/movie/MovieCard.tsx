import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export interface IMovieCard {
	id: number;
	title: string;
	overview: string;
	original_title: string;
	poster_path: string;
}

const MovieCard: React.FC<IMovieCard> = ({
	title,
	poster_path,
	original_title,
}) => {
	return (
		<Grid item xs={6} md={2} sx={{ display: 'flex' }}>
			<Card
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
				}}
			>
				<CardMedia
					component="img"
					alt={original_title}
					height="350"
					image={`https://image.tmdb.org/t/p/w500${poster_path}`}
					title="Contemplative Reptile"
				/>
				<CardActions sx={{ paddingInline: '1rem' }}>
					<Typography variant="subtitle1">{title}</Typography>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default MovieCard;
