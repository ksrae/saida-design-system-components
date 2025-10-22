import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuSubOpen, MenuSubProps } from '../../menu';
import { clearElements } from '../../../../clear-element';
import menuSubMeta from '../../menu-sub.stories';

const meta: Meta<MenuSubProps> = {
  title: 'Menu/Attributes/Sub-Menu Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return MenuSubOpen(args);
  },
  argTypes: {
    open: menuSubMeta?.argTypes?.open,
  },
  args: {
    open: false
  }
};

export default meta;
type Story = StoryObj<MenuSubProps>;

export const Param: Story = {}
