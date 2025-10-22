import type { Meta, StoryObj } from '@storybook/web-components';
import { Popover, PopoverProps } from './popover';
import { clearElements } from '../../clear-element';

const popoverMeta: Meta<PopoverProps> = {
  title: 'Popover/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(popoverMeta.title);
    return Popover(args);
  },
  argTypes: {
    arrow: {
      control: 'boolean',
      description: 'Add an arrow to your popup with the arrow attribute. <br/> The position is automatically determined based on position of the popover.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    open: {
      control: 'boolean',
      description: 'The popover is displayed by default without an event.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'],
      description: 'The position of the popover',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'bottom' },
        type: { summary: 'top | bottom | left | right | topLeft | topRight | bottomLeft | bottomRight | leftTop | leftBottom | rightTop | rightBottom' },
      },
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'null'],
      description: 'Set trigger mode. If set to <b>null</b>, it would not be triggered',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'hover' },
        type: { summary: 'hover | click | focus | null' },
      },
    },
    opendelay: {
      control: 'number',
      description: 'The delay time to open. Default delay is 150ms.', 
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: 150 as any},
      }      
    },
    closedelay: {
      control: 'number',
      description: 'The delay time to close. Default delay is 100ms.', 
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: 100 as any},
      }      
    },
    slotContent: {
      control: 'text',
      description: 'The content of the popover',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Bottom'},
      }
    },
    setOpen: {
      type: 'function',
      action: 'setOpen',
      description: 'This function is to open the popover.',
      table: {
        category: 'Function',
        type: {
          summary: `setOpen()`,
        },
      }
    },
    setClose: {
      type: 'function',
      action: 'setClose',
      description: 'This function is to close the popover.',
      table: {
        category: 'Function',
        type: {
          summary: `setClose()`,
        },
      }
    },
  },
};

export default popoverMeta;
type Story = StoryObj<PopoverProps>;

export const Default: Story = {
  args: {
    arrow: true,
    open: false,
    position: 'bottom',
    trigger: 'hover',
    opendelay: 150,
    closedelay: 100,
    slotContent: '',
  }, 
}
