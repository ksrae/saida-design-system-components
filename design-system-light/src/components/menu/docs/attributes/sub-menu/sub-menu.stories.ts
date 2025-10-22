import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuSubProps, SubMenu } from '../../menu';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuSubProps> = {
  title: 'Menu/Attributes/Sub-Menu',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SubMenu();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<MenuSubProps>;

export const Param: Story = {}
