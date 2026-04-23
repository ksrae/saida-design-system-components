import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { IconSelected } from '../../sy-icon.main';

const meta: Meta = {
  title: 'Icon/Events/Selected',
  component: 'sy-icon',
  tags: [],
  render: () => IconSelected(),
  argTypes: {},
  args: {},
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
