import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { NavSubSetOpen } from '../../sy-nav-sub.main';

const meta: Meta = {
  title: 'Nav/Sub Methods/SetOpen',
  component: 'sy-nav-sub',
  tags: [],
  render: () => NavSubSetOpen(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};