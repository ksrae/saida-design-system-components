import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioSelected } from '../../sy-radio.main';

const meta: Meta = {
  title: 'Radio/Events/Selected',
  component: 'sy-radio',
  tags: [],
  render: () => RadioSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};