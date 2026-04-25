import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { NavSubSetTrigger } from '../../sy-nav-sub.main';

const meta: Meta = {
  title: 'Nav/Sub Methods/SetTrigger',
  component: 'sy-nav-sub',
  tags: [],
  render: () => NavSubSetTrigger(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};