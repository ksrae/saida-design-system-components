import { Meta, StoryObj } from "@storybook/web-components-vite";
import { clearElements } from '../../clear-element';
import { SyDrawerProps, Drawer } from './sy-drawer.main';


const drawerMeta: Meta<SyDrawerProps> = {
  title: 'Drawer/Overview',
  component: 'sy-drawer',
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
      description: 'Triggered when any item is selected.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('closed', (e) => {})`,
        },
      }
    },
    slotHeader: {
      control: false,
      description: 'Header slot content for the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotBody: {
      control: false,
      description: 'Body slot content for the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotFooter: {
      control: false,
      description: 'Footer slot content for the drawer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default drawerMeta;
type Story = StoryObj<SyDrawerProps>;

export const Default: Story = {
  args: {
    position: 'right',
    size: 'medium',
    closable: true,
    maskless: false,
    preventClose: false,
    open: false,
    slotHeader: `<div slot="header">Drawer Header</div>`,
    slotBody: `<div slot="body">
        <p>This is the drawer content.</p>
        <p>You can put any content here.</p>
      </div>`,
    slotFooter: `<div slot="footer"><sy-button>Action</sy-button></div>`,
  },
};
