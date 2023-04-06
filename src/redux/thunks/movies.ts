import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetPopularMovies } from '../../api/movies';
import { PopularMovies } from '../../models/movies';
import { FETCH_POPULAR_MOVIES, INITIAL_POPULAR_MOVIES } from '../actions';

export const reduxGetPopularMovies = createAsyncThunk<
	PopularMovies,
	{ url: string; page: number }
>(FETCH_POPULAR_MOVIES, async (params) => {
	const { url, page } = params;
	const { data } = await apiGetPopularMovies(url, page);
	return data;
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
