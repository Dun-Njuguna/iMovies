import type { Meta, StoryObj } from '@storybook/react';
import BaseTemplate from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

const meta: Meta<typeof BaseTemplate> = {
	title: 'templates/BaseTemplate',
	component: BaseTemplate,
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseTemplate>;

export const FirstStory: Story = {
	args: {
		...mockBaseTemplateProps.base,
	},
};
