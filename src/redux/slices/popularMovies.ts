import { Action, createSlice } from '@reduxjs/toolkit';
import { State } from '../ configureStore';
import { PopularMovies } from '../../models/movies';
import { INITIAL_POPULAR_MOVIES } from '../actions';
import { reduxGetPopularMovies } from '../thunks/movies';

const initialState: {
	popularMovies: PopularMovies[];
} = {
	popularMovies: [],
};

const slice = createSlice({
	name: 'popularMovies',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(reduxGetPopularMovies.fulfilled, (state, action) => {
			state.popularMovies.push(action.payload);
		});
		builder.addCase(
			INITIAL_POPULAR_MOVIES,
			(state, action: ActionWithPayload<PopularMovies>) => {
				state.popularMovies.push(action.payload);
			},
		);
	},
});

export const getAllMovies = (state: State) => state.movies.popularMovies;

export const getMoviesByPage = (state: State, page: number) =>
	state.movies.popularMovies.find((movies) => movies.page === page);

export default slice.reducer;

export interface ActionWithPayload<T> extends Action {
	payload: T;
}
