import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuOpen } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Attributes/Open',
  component: 'sy-menu',
  tags: [],
  render: (args) => {
    clearElements(meta.title);
    return MenuOpen(args as { open: boolean });
  },
  argTypes: { open: menuMeta?.argTypes?.open },
  args: { open: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
