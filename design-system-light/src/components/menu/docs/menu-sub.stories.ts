import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuSub, MenuSubProps } from './menu';
import { clearElements } from '../../clear-element';

const menuSubMeta: Meta<MenuSubProps> = {
  title: 'Menu Sub/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Menu/Overview');
    return MenuSub(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables menu-item if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    open: {
      control: 'boolean',
      description: 'Opens menu-sub if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    title: {
      control: 'text',
      description: 'Title for menu-sub',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    slotContent: {
      control: false,
      description: 'Value for menu-sub',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default menuSubMeta;
type Story = StoryObj<MenuSubProps>;

export const Default: Story = {
  args: {
    disabled: false,
    open: false,
    title: 'Menu Sub<sy-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M344 120C344 106.7 333.3 96 320 96C306.7 96 296 106.7 296 120L296 296L120 296C106.7 296 96 306.7 96 320C96 333.3 106.7 344 120 344L296 344L296 520C296 533.3 306.7 544 320 544C333.3 544 344 533.3 344 520L344 344L520 344C533.3 344 544 333.3 544 320C544 306.7 533.3 296 520 296L344 296L344 120z"></path></svg></sy-icon>',
    slotContent: ``
  },

}
