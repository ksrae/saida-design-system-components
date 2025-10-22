import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuProps, MenuOpen } from '../../menu';
import menuMeta from '../../menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuProps> = {
  title: 'Menu/Attributes/Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return MenuOpen(args);
  },
  argTypes: {
    open: menuMeta?.argTypes?.open
  },
  args: {
    open: false
  }
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Param: Story = {}
