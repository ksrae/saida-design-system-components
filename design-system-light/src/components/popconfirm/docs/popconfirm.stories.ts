import type { Meta, StoryObj } from '@storybook/web-components';
import { Popconfirm, PopconfirmProps } from './popconfirm';
import { clearElements } from '../../clear-element';

const popconfirmMeta: Meta<PopconfirmProps> = {
  title: 'Popconfirm/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(popconfirmMeta.title);
    return Popconfirm(args);
  },
  argTypes: {
    arrow: {
      control: 'boolean',
      description: 'Add an arrow to the popconfirm with the arrow attribute. <br/> The position is automatically determined based on the position of the popconfirm.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    closable: {
      control: 'boolean',
      description: 'Clicking outside the popconfirm to close it works only when the closable property is set.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'],
      description: 'The position of the popconfirm',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'bottom',  },
        type: { summary: 'top | bottom | left | right | topLeft | topRight | bottomLeft | bottomRight | leftTop | leftBottom | rightTop | rightBottom' },
      },
    },
    trigger: {
      control: 'radio',
      options: ['click', 'none'],
      description: 'Set the events to open popconfirm. If set to <b>none</b>, it would not be triggered',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'click' },
        type: { summary: 'click | none' }
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
    setOpen: {
      type: 'function',
      action: 'setOpen',
      description: 'To open the popconfirm.',
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
      description: 'To close the popconfirm.',
      table: {
        category: 'Function',
        type: {
          summary: `setClose()`,
        },
      }
    },
    selected: {
      type: 'function',
      action: 'selected', 
      description: 'Triggered when any button in the popconfirm is clicked.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      }
    },
    visibleChanged: {
      type: 'function',
      action: 'visibleChanged', 
      description: 'Triggered when the popconfirm is opened / closed.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('visibleChanged', (e) => {})`,
        },
      }
    },
    slotContent: {
      control: false,
      description: 'The content of the popconfirm',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Popconfirm'},
      }
    },
  },
};

export default popconfirmMeta;
type Story = StoryObj<PopconfirmProps>;


export const Default: Story = {
  args: {
    arrow: false,
    closable: false,
    position: 'top',
    trigger: 'click',
    opendelay: 150,
    closedelay: 100,
    slotContent: '',
  },
  
  
}
