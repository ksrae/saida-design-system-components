import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavSubSetActive } from '../../sy-nav-sub.main';

const meta: Meta = {
  title: 'Nav/Sub Methods/SetActive',
  component: 'sy-nav-sub',
  tags: [],
  render: () => NavSubSetActive(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};