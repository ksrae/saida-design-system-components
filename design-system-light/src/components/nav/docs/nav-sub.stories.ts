import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../clear-element';
import { NavSub, NavSubProps } from './nav';

const navSubMeta: Meta<NavSubProps> = {
  title: 'Nav Sub/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Nav/Overview');
    return NavSub(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables nav-item if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    open: {
      control: 'boolean',
      description: 'Opens nav-sub if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    title: {
      control: 'text',
      description: 'Title for nav-sub',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Unique value for nav-sub',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    slotContent: {
      control: false,
      description: 'Setting nav-item',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default navSubMeta;
type Story = StoryObj<NavSubProps>;

export const Default: Story = {
  args: {
    disabled: false,
    open: false,
    title: 'Nav Sub',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M344 120C344 106.7 333.3 96 320 96C306.7 96 296 106.7 296 120L296 296L120 296C106.7 296 96 306.7 96 320C96 333.3 106.7 344 120 344L296 344L296 520C296 533.3 306.7 544 320 544C333.3 544 344 533.3 344 520L344 344L520 344C533.3 344 544 333.3 544 320C544 306.7 533.3 296 520 296L344 296L344 120z"></path></svg>',
    slotContent: ``
  },

}
