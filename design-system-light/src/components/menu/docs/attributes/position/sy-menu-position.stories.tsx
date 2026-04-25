import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuPosition } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Attributes/Position',
  component: 'sy-menu',
  tags: [],
  render: (args) => {
    clearElements(meta.title);
    return MenuPosition(args as { position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' });
  },
  argTypes: { position: menuMeta?.argTypes?.position },
  args: { position: 'bottomLeft' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
