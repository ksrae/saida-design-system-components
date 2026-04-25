import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TagSelected } from '../../sy-tag.main';

const meta: Meta = {
  title: 'Tag/Events/Selected',
  component: 'sy-tag',
  tags: [],
  render: () => TagSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};