import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuCheckable } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';

const meta: Meta = {
  title: 'Menu/Attributes/Checkable',
  component: 'sy-menu',
  tags: [],
  render: (args) => MenuCheckable(args as { checkable: boolean }),
  argTypes: { checkable: menuMeta?.argTypes?.checkable },
  args: { checkable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
