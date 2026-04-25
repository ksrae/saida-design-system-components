import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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