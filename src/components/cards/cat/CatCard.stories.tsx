import type { Meta, StoryObj } from '@storybook/react';
import CatCard from './CatCard';
import { mockCatCardProps } from './CatCard.mocks';

const meta: Meta<typeof CatCard> = {
	title: 'cards/CatCard',
	component: CatCard,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CatCard>;

export const FirstStory: Story = {
	args: {
		...mockCatCardProps.base,
	},
};
