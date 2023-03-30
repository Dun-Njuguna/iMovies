import type { Meta, StoryObj } from '@storybook/react';
import PrimaryLayout from './PrimaryLayout';
import { mockPrimaryLayoutProps } from './PrimaryLayout.mocks';

const meta: Meta<typeof PrimaryLayout> = {
	title: 'templates/PrimaryLayout',
	component: PrimaryLayout,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PrimaryLayout>;

export const FirstStory: Story = {
	args: {
		...mockPrimaryLayoutProps.base,
	},
};
