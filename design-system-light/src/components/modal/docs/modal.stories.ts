import type { Meta, StoryObj } from '@storybook/web-components';
import { Modal, ModalProps } from './modal';
import { clearElements } from '../../clear-element';

const modalMeta: Meta<ModalProps> = {
  title: 'Modal/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(modalMeta.title);
    return Modal(args);
  },
  argTypes: {
    cancelText: {
      control: 'text',
      name: 'cancelText (cancel-text)',
      description: 'Custom value for cancel button. HTML is acceptable as well.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    closable: {
      control: 'boolean',
      description: 'Displays close button on right side of the header',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    enableModalMaximize: {
      name: 'enableModalMaximize (enable-modal-maximize)',
      control: 'boolean',
      description: 'Enables maximize button on the modal header',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    hideFooter: {
      control: 'boolean',
      name: 'hideFooter (hidden-footer)',
      description: 'Hide modal footer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    maskClosable: {
      control: 'boolean',
      name: 'maskClosable (mask-closable)',
      description: 'Closes the modal when clicking outside the modal',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    okText: {
      control: 'text',
      name: 'okText (ok-text)',
      description: 'Custom value for ok button. HTML is acceptable as well.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    open: {
      control: 'boolean',
      description: 'Opens modal if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    top: {
      control: 'number',
      description: 'Sets top position manually',
      table: {
        category: 'Parameter',
        defaultValue: {summary: undefined},
        type: { summary: "number" }
      }      
    },
    left: {
      control: 'number',
      description: 'Sets left position manually',
      table: {
        category: 'Parameter',
        defaultValue: {summary: undefined},
        type: { summary: "number" }
      }      
    },
    width: {
      control: 'number',
      description: 'Sets width manually',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 0 as any},
        type: { summary: 'number' }
      }      
    },
    variant: {
      control: 'radio',
      options: ['modal', 'dialog'],
      description: 'Sets the variant of the modal',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'modal' },
        type: { summary: 'modal | dialog' },
      },
    },
    slotHeader: {
      control: false,
      description: 'Custom value for header',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotBody: {
      control: false,
      description: 'Custom value for body',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotFooter: {
      control: false,
      description: 'Custom value for footer',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    setMaximum: {
      type: 'function',
      action: 'setMaximum', 
      description: 'Triggered to maximize the modal. It toggles the maximized state of the modal.',
      table: {
        category: 'Function',
        type: {
          summary: `.setMaximum()`,
        },
      }
    },
    setCancel: {
      type: 'function',
      action: 'setCancel', 
      description: 'Triggered to click cancel button the modal. value returns when event triggered',
      table: {
        category: 'Function',
        type: {
          summary: `.setCancel(value: any)`,
        },
      }
    },
    setClose: {
      type: 'function',
      action: 'setClose', 
      description: 'Triggered to close the modal. value returns when event triggered',
      table: {
        category: 'Function',
        type: {
          summary: `.setClose(value: any)`,
        },
      }
    },
    setOk: {
      type: 'function',
      action: 'setOk', 
      description: 'Triggered to click ok button the modal. value returns when event triggered',
      table: {
        category: 'Function',
        type: {
          summary: `.setOk(value: any)`,
        },
      }
    },
    setOpen: {
      type: 'function',
      action: 'setOpen',
      description: 'Triggered to open the modal.',
      table: {
        category: 'Function',
        type: {
          summary: `.setOpen()`,
        },
      }
    },
    closed: {
      type: 'function',
      action: 'closed',
      description: 'Emits when close the modal with event type and value if defined.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('closed', (e) => {})`,
          
        },
      }
    },  
  }
};

export default modalMeta;
type Story = StoryObj<ModalProps>;

export const Default: Story = {
  args: {
    cancelText: '',
    closable: true,
    enableModalMaximize: false,
    // draggable: false,
    // maskless: false,
    hideFooter: false,
    maskClosable: true,
    okText: '',
    open: false,
    width: 0,
    variant: 'dialog',
    slotHeader: "",
    slotBody: ``,
    slotFooter: undefined,
  }
}
