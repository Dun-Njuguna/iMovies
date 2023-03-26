import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from './MovieCard';
import { mockMovieCardProps } from './MovieCard.mocks';

const meta: Meta<typeof MovieCard> = {
	title: 'cards/MovieCard',
	component: MovieCard,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const FirstStory: Story = {
	args: {
		...mockMovieCardProps.base,
	},
};
