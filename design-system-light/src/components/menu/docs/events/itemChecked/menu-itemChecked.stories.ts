import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuProps, MenuItemChecked } from '../../menu';
import menuMeta from '../../menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuProps> = {
  title: 'Menu/Events/Item Checked',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return MenuItemChecked();
  },
  argTypes: {
    itemChecked: menuMeta?.argTypes?.itemChecked
  },
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Param: Story = {}
