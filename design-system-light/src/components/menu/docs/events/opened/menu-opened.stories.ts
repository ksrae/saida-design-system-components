import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuProps, MenuOpened } from '../../menu';
import menuMeta from '../../menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuProps> = {
  title: 'Menu/Events/Opened',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return MenuOpened();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Param: Story = {}
