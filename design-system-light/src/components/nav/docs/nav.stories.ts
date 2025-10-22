import type { Meta, StoryObj } from '@storybook/web-components';
import { Nav, NavProps } from './nav';
import { clearElements } from '../../clear-element';

const navMeta: Meta<NavProps> = {
  title: 'NavigationMenu/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(navMeta.title);
    return Nav(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean', 
      description: 'Disables the navigation menu.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    selected: {
      type: 'function',
      action: 'selected', 
      description: 'Triggered when any item in nav is selected.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      }
    },
    slotContent: {
      control: false,
      description: 'Values for Navigation menu. <br/> Provides several tags: `nav-sub`, `nav-item` and `nav-group`',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default navMeta;
type Story = StoryObj<NavProps>;

export const Default: Story = {
  args: {
  /*   trigger: 'click', */
    disabled: false,
    slotContent: ``
  },

}
