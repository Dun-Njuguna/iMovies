export type PopularMovies = {
	page: number;
	total_pages: number;
	results: Movie[];
};

export type Movie = {
	id: number;
	adult: boolean;
	title: string;
	overview: string;
	original_title: string;
	poster_path: string;
};
