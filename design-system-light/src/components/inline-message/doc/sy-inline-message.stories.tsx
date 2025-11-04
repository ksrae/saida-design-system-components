import { Meta, StoryObj } from "@storybook/web-components-vite";
import { clearElements } from '../../clear-element';
import { InlineMessage, SyInlineMessageProps } from './sy-inline-message.main';

const inlineMessageMeta: Meta<SyInlineMessageProps> = {
  title: 'InlineMessage/Overview',
  component: 'sy-inline-message',
  render: (args) => {
    clearElements(inlineMessageMeta.title);
    return InlineMessage(args);
  },
  argTypes: {
   btnLabel: {
      control: 'text',
      name: 'btnLabel (btn-label)',
      description: 'The action button label in inline message. If not set, action button will not be displayed.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    open: {
      control: 'boolean',
      description: 'Open state of the inline message',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    showIcon: {
      control: 'boolean',
      description: 'Allow to visible icons to the inline message',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    message: {
      control: 'text',
      description: 'Text displayed as an inline message. Keep the message under two lines.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The position of the inline message.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'bottom' },
        type: { summary: 'top | bottom | left | right' },
      },
    },
    trigger: {
      control: 'radio',
      options: ['click', 'focusout'],
      description: 'The types of events that cause a inline message to show.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'click' },
        type: { summary: 'click | focusout' }
      },
    },
    variant: {
      control: 'select',
      options: ['info', 'error', 'success', 'warning'],
      description: 'The variant of the inline message.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'info' },
        type: { summary: 'info | error | success | warning' },
      },
    },
    btnClick: {
      type: 'function',
      description: 'Emitted when the action button in inline message is clicked',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('btnClick', (e) => {})`,
        },
      },
    }
  },
};

export default inlineMessageMeta;
type Story = StoryObj<SyInlineMessageProps>;

export const Default: Story = {
  args: {
    btnLabel: 'btnLabel',
    open: false,
    showIcon: false,
    message: 'The message is displayed here.',
    position: 'bottom',
    trigger: 'click',
    variant: 'info'
  },
};
