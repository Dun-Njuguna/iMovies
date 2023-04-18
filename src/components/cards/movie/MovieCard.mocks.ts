import { IMovieCard } from './MovieCard';

const base: IMovieCard = {
	id: 1,
	size: 4,
	title: 'Dummay movie',
	overview: 'Description',
	original_title: 'dummay_movie',
	poster_path: '/a2tys4sD7xzVaogPntGsT1ypVoT.jpg',
	onCardClicked: function (): void {
		console.log("clicked")
	}
};

export const mockMovieCardProps = {
	base,
};
