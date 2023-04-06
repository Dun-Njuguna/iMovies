import api from './api';
import { PopularMovies } from '../models/movies';


export const apiGetPopularMovies = (url:string, page: number) =>
	api.get<PopularMovies>(url, {
		params: {
			page: page,
		},
	});
