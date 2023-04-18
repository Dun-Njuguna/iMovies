import type { Meta, StoryObj } from '@storybook/react';
import HighlightCard from './HighlightCard';
import { mockHighlightCardProps } from './HighlightCard.mocks';

const meta: Meta<typeof HighlightCard> = {
	title: 'templates/HighlightCard',
	component: HighlightCard,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HighlightCard>;

export const FirstStory: Story = {
	args: {
		...mockHighlightCardProps.base,
	},
};
