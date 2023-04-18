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

	const getMovieDetails = async () => {
		const response = await api.get<MovieDetails>(
			`/movie/${event.queryStringParameters.movie_id}`,
		);
		send(response);
	};

	const response = await getMovieDetails();
	return {
		response,
	};
};



export { handler };
