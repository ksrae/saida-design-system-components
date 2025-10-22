import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../clear-element';
import { Modeless, ModelessProps } from './modeless';

const modelessMeta: Meta<ModelessProps> = {
  title: 'Modeless/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(modelessMeta.title);
    return Modeless(args);
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Opens modeless if true, sets false to close.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    draggable: {
      control: 'boolean',
      description: 'Enables dragging of the modeless window when true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    edge: {
      control: 'boolean',
      description: 'Enables edge detection when dragging',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    resizable: {
      control: 'boolean',
      description: 'Enables resizing of the modeless window when true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    maximum: {
      control: 'boolean',
      description: 'Maximizes the modeless window to fill the screen when true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    minimum: {
      control: 'boolean',
      description: 'Minimizes the modeless window when true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    closable: {
      control: 'boolean',
      description: 'Enables closing the modeless window when true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    minimizable: {
      control: 'boolean',
      description: 'Enables minimizing the modeless window when true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    maximizable: {
      control: 'boolean',
      description: 'Enables maximizing the modeless window when true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    top: {
      control: 'number',
      description: 'Sets the top position of the modeless window',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 0 as any},
        type: { summary: 'number' }
      }
    },
    left: {
      control: 'number',
      description: 'Sets the left position of the modeless window',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 0 as any},
        type: { summary: 'number' }
      }
    },
    width: {
      control: 'number',
      description: 'Sets the width of the modeless window',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 200 as any},
        type: { summary: 'number' }
      }
    },
    height: {
      control: 'number',
      description: 'Sets the height of the modeless window',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 150 as any},
        type: { summary: 'number' }
      }
    },
    setClose: {
      type: 'function',
      action: 'setClose', 
      description: 'Triggered to close the modeless. value returns when event triggered',
      table: {
        category: 'Function',
        type: {
          summary: `.setClose(value: any)`,
        },
      }
    },
    setOpen: {
      type: 'function',
      action: 'setOpen',
      description: 'Triggered to open the modeless.',
      table: {
        category: 'Function',
        type: {
          summary: `.setOpen()`,
        },
      }
    },
    setMaximum: {
      type: 'function',
      action: 'setMaximum',
      description: 'Triggered to maximize the modeless.',
      table: {
        category: 'Function',
        type: {
          summary: `.setMaximum()`,
        },
      }
    },
    setMinimum: {
      type: 'function',
      action: 'setMinimum',
      description: 'Triggered to minimize the modeless.',
      table: {
        category: 'Function',
        type: {
          summary: `.setMinimum()`,
        },
      }
    },
    setRestore: {
      type: 'function',
      action: 'setRestore',
      description: 'Triggered to restore the modeless.',
      table: {
        category: 'Function',
        type: {
          summary: `.setRestore()`,
        },
      }
    },
    closed: {
      type: 'function',
      action: 'setMinimum',
      description: 'Emits when the modeless is closed.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('closed', (e) => {})`,
        },
      }
    },
    status: {
      type: 'function',
      action: 'setMinimum',
      description: 'Emits when the modeless status is changed.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('status', (e) => {})`,
        },
      }
    },
    position: {
      type: 'function',
      action: 'setMinimum',
      description: 'Emits when the modeless position is changed.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('position', (e) => {})`,
        },
      }
    },
    slotTitle: {
      control: false, 
      description: 'The title of the modeless', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    slotContent: {
      control: false, 
      description: 'The contents of the modeless', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    slotHeader: {
      control: false,
      description: 'Sets events to the header of the modeless',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    }
  }
};

export default modelessMeta;
type Story = StoryObj<ModelessProps>;

export const Default: Story = {
  args: {
    open: false,
    draggable: false,
    resizable: false,
    maximum: false,
    minimum: false,
    edge: false,
    closable: true,
    minimizable: true,
    maximizable: true,
    top: 0,
    left: 0,
    width: 300,
    height: 300,
    slotTitle: '',
    slotContent: ``,
    slotHeader: ``
  }
}


