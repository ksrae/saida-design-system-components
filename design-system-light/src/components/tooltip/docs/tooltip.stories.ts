import type { Meta, StoryObj } from '@storybook/web-components';
import { Tooltip, TooltipProps } from './tooltip';
import { clearElements } from '../../clear-element';

const tooltipMeta : Meta<TooltipProps> = {
  title: 'Tooltip/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(tooltipMeta.title);
    return Tooltip(args);
  },
  argTypes: {
    hideArrow: {
      control: 'boolean',
      description: 'Hide arrow of the tooltip. <br/> If not set, arrow is automatically placed based on position of the tooltip.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
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
    content: {
      control: 'text',
      description: 'The content of the tooltip',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'text' }
      }
    },
    maxWidth: {
      control: 'number',
      name: 'maxWidth (max-width)',
      description: 'The maximum width of the tooltip',
      table: {
          category: 'Parameter',
          defaultValue: {summary: ''},
          type: { summary: "number" }
      }
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
    open: {
      control: 'boolean',
      description: 'The open state of the tooltip.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'],
      description: 'The position of the tooltip.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'top' },
        type: { summary: 'top | bottom | left | right | topLeft | topRight | bottomLeft | bottomRight | leftTop | leftBottom | rightTop | rightBottom' },
      },
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'none'],
      description: 'Set trigger mode.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'hover' },
        type: { summary: 'hover | click | focus | none' },
      },
    },
  },
};

export default tooltipMeta;
type Story = StoryObj<TooltipProps>;

export const Default: Story = {
  args: {
    hideArrow: false,
    closedelay: 100,
    content: 'this is a tooltip content.\n Tooltip can only contain text. HTML tags are not supported.\n To use line breaks, use \\n.',
    opendelay: 150,
    open: false,
    maxWidth: null,
    position: 'top',
    trigger: 'hover'
  }, 
}
