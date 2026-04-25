import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuDirection } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Attributes/Direction',
  component: 'sy-menu',
  tags: [],
  render: (args) => {
    clearElements(meta.title);
    return MenuDirection(args as { direction: 'left' | 'right' });
  },
  argTypes: { direction: menuMeta?.argTypes?.direction },
  args: { direction: 'right' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
