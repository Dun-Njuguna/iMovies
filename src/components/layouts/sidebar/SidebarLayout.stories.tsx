import type { Meta, StoryObj } from '@storybook/react';
import SidebarLayout from './SidebarLayout';
import { mockSidebarLayoutProps } from './SidebarLayout.mocks';

const meta: Meta<typeof SidebarLayout> = {
	title: 'templates/SidebarLayout',
	component: SidebarLayout,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SidebarLayout>;

export const FirstStory: Story = {
	args: {
		...mockSidebarLayoutProps.base,
	},
};
