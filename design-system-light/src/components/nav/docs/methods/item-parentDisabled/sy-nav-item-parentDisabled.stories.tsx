import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavItemParentDisabled } from '../../sy-nav-item.main';

const meta: Meta = {
  title: 'Nav/Item Methods/ParentDisabled',
  component: 'sy-nav-item',
  tags: [],
  render: () => NavItemParentDisabled(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};