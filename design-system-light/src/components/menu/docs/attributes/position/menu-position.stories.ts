import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuProps, MenuPosition } from '../../menu';
import menuMeta from '../../menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuProps> = {
  title: 'Menu/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return MenuPosition(args);
  },
  argTypes: {
    position: menuMeta?.argTypes?.position
  },
  args: {
    position: 'bottomLeft'
  }
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Param: Story = {}
