import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuProps, MenuTrigger } from '../../menu';
import menuMeta from '../../menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<MenuProps> = {
  title: 'Menu/Attributes/Trigger',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return MenuTrigger(args);
  },
  argTypes: {
    trigger: menuMeta?.argTypes?.trigger
  },
  args: {
    trigger: 'click'
  }
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Param: Story = {}
