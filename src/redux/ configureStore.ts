import { combineReducers, configureStore as configure } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import popularMovies from './slices/popularMovies';

const reducer = combineReducers({
	movies: popularMovies,
});

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['popularMovies'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configure({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV === 'development',
});

export type State = ReturnType<typeof reducer>;
export type Store = typeof store;

const useDispatch = () => store.dispatch;

const configureStore = function () {
	return { store, persistor: persistStore(store) };
};

type StoreDispatch = typeof store.dispatch;

export type { StoreDispatch };
export { useDispatch, store, configureStore };
