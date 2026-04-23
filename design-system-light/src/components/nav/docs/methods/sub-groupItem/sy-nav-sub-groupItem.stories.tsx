import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavSubGroupItem } from '../../sy-nav-sub.main';

const meta: Meta = {
  title: 'Nav/Sub Methods/GroupItem',
  component: 'sy-nav-sub',
  tags: [],
  render: () => NavSubGroupItem(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};