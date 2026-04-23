import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavSubParentDisabled } from '../../sy-nav-sub.main';

const meta: Meta = {
  title: 'Nav/Sub Methods/ParentDisabled',
  component: 'sy-nav-sub',
  tags: [],
  render: () => NavSubParentDisabled(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};