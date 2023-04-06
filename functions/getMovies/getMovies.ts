import api from '../../src/api/api';
import { PopularMovies } from '../../src/models/movies';

const handler = async (event: any, context: any, callback: any) => {
	const send = (body: any) => {
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(body),
		});
	};

	const getMovies = async () => {
		const response = await api.get<PopularMovies>(
			`/movie/popular?${event.rawQuery}`,
		);
		send(response.data);
	};

	const response = await getMovies();

	return {
		response,
	};
};

export { handler };
