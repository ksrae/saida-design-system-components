import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuProps, MenuCheckable } from '../../menu';
import menuMeta from '../../menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuProps> = {
  title: 'Menu/Attributes/Checkable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return MenuCheckable(args);
  },
  argTypes: {
    checkable: menuMeta?.argTypes?.checkable
  },
  args: {
    checkable: true
  }
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Param: Story = {}
