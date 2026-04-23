import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionActivated } from '../../sy-select-option.main';

const meta: Meta = {
  title: 'Select/Option Events/Activated',
  component: 'sy-select-option',
  tags: [],
  render: () => SelectOptionActivated(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};