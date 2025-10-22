import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuProps, MenuItemSelected } from '../../menu';
import menuMeta from '../../menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuProps> = {
  title: 'Menu/Events/Item Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return MenuItemSelected();
  },
  argTypes: {
    itemSelected: menuMeta?.argTypes?.itemSelected
  },
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Param: Story = {}
