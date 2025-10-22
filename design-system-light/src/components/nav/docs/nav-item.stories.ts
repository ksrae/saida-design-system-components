import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../clear-element';
import { NavItem, NavItemProps } from './nav';

const navItemMeta: Meta<NavItemProps> = {
  title: 'Nav Item/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Nav/Overview');
    return NavItem(args);
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
    value: {
      control: 'text',
      description: 'Values for menu-item',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    slotContent: {
      control: 'text',
      description: 'Values for menu-item',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default navItemMeta;
type Story = StoryObj<NavItemProps>;

export const Default: Story = {
  args: {
    disabled: false,
    value: '',
    slotContent: ``
  },

}
