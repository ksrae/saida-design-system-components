import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavSubSetClose } from '../../sy-nav-sub.main';

const meta: Meta = {
  title: 'Nav/Sub Methods/SetClose',
  component: 'sy-nav-sub',
  tags: [],
  render: () => NavSubSetClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};