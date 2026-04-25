import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectOpened } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Events/Opened',
  component: 'sy-select',
  tags: [],
  render: () => SelectOpened(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};