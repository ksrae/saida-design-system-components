import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuOpen } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';

const meta: Meta = {
  title: 'Menu/Attributes/Open',
  component: 'sy-menu',
  tags: [],
  render: (args) => MenuOpen(args as { open: boolean }),
  argTypes: { open: menuMeta?.argTypes?.open },
  args: { open: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
