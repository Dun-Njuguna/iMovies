import { MovieDetails } from '../models/movieDetails';
import { PopularMovies } from '../models/movies';
import api from './api';

export const apiGetPopularMovies = (url: string, nextPage: number) =>
	api.get<PopularMovies>(url, {
		params: {
			page: nextPage,
		},
	});

export const apiGetMovieDetails = (movieId: number) =>
	api.get<MovieDetails>('/.netlify/functions/getMovieDetails', {
		params: {
			movie_id: movieId,
		},
	});

export const apiGetMovieRecommendations = (movieId: number) =>
	api.get<PopularMovies>('/.netlify/functions/getMovieRecommendations', {
		params: {
			movie_id: movieId,
		},
	});
