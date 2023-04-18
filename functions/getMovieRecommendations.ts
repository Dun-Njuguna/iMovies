import { AxiosResponse } from 'axios';
import api from '../src/api/api';
import { MovieDetails } from '../src/models/movieDetails';

const handler = async (event: any, context: any, callback: any) => {
	const send = (response: AxiosResponse<MovieDetails>) => {
		callback(null, {
			statusCode: response.status,
			body: JSON.stringify(response.data),
		});
	};

	const getMovieRecommendations = async () => {
		const response = await api.get<MovieDetails>(
			`/movie/${event.queryStringParameters.movie_id}/recommendations`,
		);
		send(response);
	};

	const response = await getMovieRecommendations();
	return {
		response,
	};
};


export { handler };