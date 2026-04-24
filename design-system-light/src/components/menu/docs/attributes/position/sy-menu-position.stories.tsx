import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuPosition } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';

const meta: Meta = {
  title: 'Menu/Attributes/Position',
  component: 'sy-menu',
  tags: [],
  render: (args) => MenuPosition(args as { position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }),
  argTypes: { position: menuMeta?.argTypes?.position },
  args: { position: 'bottomLeft' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
