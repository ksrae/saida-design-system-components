import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyInlineMessageProps, InlineMessage } from './sy-inline-message.main';
import { clearElements } from '../../clear-element';

const inlineMessageMeta: Meta<SyInlineMessageProps> = {
  title: 'InlineMessage/Overview',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => {
    clearElements(inlineMessageMeta.title);
    return InlineMessage(args);
  },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'], description: 'Message variant.', table: { category: 'Parameter', defaultValue: { summary: 'info' }, type: { summary: 'info | success | warning | error' } } },
    message: { control: 'text', description: 'Message text.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    showIcon: { control: 'boolean', name: 'showIcon (show-icon)', description: 'Show variant icon.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    open: { control: 'boolean', description: 'Open state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    trigger: { control: 'radio', options: ['click', 'focusout'], description: 'Close trigger.', table: { category: 'Parameter', defaultValue: { summary: 'click' }, type: { summary: 'click | focusout' } } },
    btnLabel: { control: 'text', name: 'btnLabel (btn-label)', description: 'Action button label.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'], description: 'Popup position.', table: { category: 'Parameter', defaultValue: { summary: 'bottom' }, type: { summary: 'top | bottom | left | right' } } },
    sticky: { control: 'boolean', description: 'Prevents auto-close.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    btnClick: { type: 'function', description: 'Emitted when the action button is clicked.', table: { category: 'Callback', type: { summary: `.addEventListener('btnClick', (e) => {})` } } },
  },
};

export default inlineMessageMeta;
type Story = StoryObj<SyInlineMessageProps>;

export const Default: Story = {
  args: { variant: 'info', message: 'Inline message', showIcon: true, open: false, trigger: 'click', btnLabel: 'Action', position: 'bottom', sticky: false },
};
