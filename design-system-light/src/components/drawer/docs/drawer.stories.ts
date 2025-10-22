import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../clear-element';
import { Drawer, DrawerProps } from './drawer';

const drawerMeta: Meta<DrawerProps> = {
  title: 'Drawer/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(drawerMeta.title);
    return Drawer(args);
  },
  argTypes: {
    closable: {
      control: 'boolean', 
      description: 'Shows a close button in the header.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    customSize: {
      control: 'number',
      name: 'customSize (custom-size)',
      description: 'When the size attribute is set to custom, the size can be customized.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: undefined as any},
        type: { summary: 'number' }
      }
    },
    maskless: {
      control: 'boolean', 
      description: 'Removes mask of the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    preventClose: {
      control: 'boolean', 
      name: 'preventClose (prevent-close)',
      description: 'Prevents the drawer from closing when clicking outside',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    open: {
      control: 'boolean', 
      description: 'Open the drawer manually',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    position: {
      control: 'select',
      options: ['top', 'left', 'right', 'bottom'],
      description: 'Visible position of the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'right'},
        type: { summary: "top | left | right | bottom" }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'custom'],
      description: 'Size of the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'medium'},
        type: { summary: "small | medium | large | custom" }
      }
    },
    opened: {
      type: 'function',
      name: 'opened',
      action: 'selected', 
      description: 'Triggered when any item is selected.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('opened', (e) => {})`,
        },
      }
    },
    closed: {
      type: 'function',
      name: 'closed',
      action: 'selected', 
      description: 'Triggered when any item is selected.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('closed', (e) => {})`,
        },
      }
    },
    slotHeaderContent: {
      control: false,
      description: 'Values for header of the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotBodyContent: {
      control: false,
      description: 'Values for body of the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotFooterContent: {
      control: false,
      description: 'Values for footer of the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default drawerMeta;
type Story = StoryObj<DrawerProps>;


export const Default: Story = {
  args: {
    closable: true,
    customSize: 0,
    maskless: false,
    preventClose: false,
    open: false,
    position: 'right',
    size: 'medium',
    slotHeaderContent: ``,
    slotBodyContent: ``,
    slotFooterContent: ``,
  },
}
