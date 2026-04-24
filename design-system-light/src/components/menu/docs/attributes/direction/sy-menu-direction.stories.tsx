import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuDirection } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';

const meta: Meta = {
  title: 'Menu/Attributes/Direction',
  component: 'sy-menu',
  tags: [],
  render: (args) => MenuDirection(args as { direction: 'left' | 'right' }),
  argTypes: { direction: menuMeta?.argTypes?.direction },
  args: { direction: 'right' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
