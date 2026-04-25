import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { Modal, SyModalProps } from './sy-modal.main';
import { clearElements } from "../../clear-element";

const modalMeta: Meta<SyModalProps> = {
  title: 'Modal/Overview',
  component: 'sy-modal',
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
        defaultValue: {summary: '-1'},
        type: { summary: "number" }
      }
    },
    left: {
      control: 'number',
      description: 'Sets left position manually',
      table: {
        category: 'Parameter',
        defaultValue: {summary: '-1'},
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
      description: 'Emits when close the modal with event type and value if defined.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('closed', (e) => {})`,

        },
      }
    }
  },
};

export default modalMeta;

export const Default: StoryObj<SyModalProps> = {
  args: {
    cancelText: 'cancel',
    closable: true,
    enableModalMaximize: false,
    // draggable: false,
    // maskless: false,
    hideFooter: false,
    maskClosable: true,
    okText: '',
    open: false,
    top: '-1',
    left: '-1',
    width: 0,
    variant: 'dialog',
    slotHeader: `<div slot="header">Header</div>`,
    slotBody:`
      <div slot="body">Body Content
      <sy-flex align="start" direction="vertical" columngap="medium" rowgap="medium">
        <div>Click Ok to confirm, click cancel to reject. Open the select to verify its popup stays above the dialog layer.</div>
        <sy-select placeholder="Choose an option">
          <sy-option value="value1" label="Option 1"></sy-option>
          <sy-option value="value2" label="Option 2"></sy-option>
          <sy-option value="value3" label="Option 3"></sy-option>
        </sy-select>
      </sy-flex>
      </div>`,
    slotFooter: `<div slot="footer">Custom Footer</div>`
  },
};
