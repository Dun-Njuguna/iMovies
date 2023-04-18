import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { apiGetPopularMovies } from '../../api/movies';
import { MovieDetails } from '../../models/movieDetails';
import { PopularMovies } from '../../models/movies';
import {
	FETCH_MOVIES_DETAILS,
	FETCH_POPULAR_MOVIES,
	INITIAL_POPULAR_MOVIES,
} from '../actions';

export const reduxGetPopularMovies = createAsyncThunk<
	PopularMovies,
	{ url: string; nextPage: number }
>(FETCH_POPULAR_MOVIES, async (params) => {
	const { url, nextPage } = params;
	const { data } = await apiGetPopularMovies(url, nextPage);
	return data;
});

export const reduxGetMovieDetails = createAsyncThunk<
	MovieDetails,
	{ movieId: number }
>(FETCH_MOVIES_DETAILS, async (params) => {
	const { movieId } = params;
	return new Promise<MovieDetails>((resolve, reject) => {
		api
			.get<MovieDetails>(`/movie/${movieId}`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => reject(error));
	});
});

export const reduxGetMovieRecommendations = createAsyncThunk<
	PopularMovies,
	{ movieId: number }
>(FETCH_MOVIES_DETAILS, async (params) => {
	const { movieId } = params;
	return new Promise<PopularMovies>((resolve, reject) => {
		api
			.get<PopularMovies>(`/movie/${movieId}/recommendations`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => reject(error));
	});
});

// Action Creators

export const populatePopularMovies = (popularMovies: PopularMovies) =>
	createAction(INITIAL_POPULAR_MOVIES, popularMovies);

export interface Action<T extends string, P> {
	readonly type: T;
	readonly payload?: P;
}

export function createAction<T extends string, P>(
	type: T,
	payload: P,
): Action<T, P> {
	return { type, payload };
}
