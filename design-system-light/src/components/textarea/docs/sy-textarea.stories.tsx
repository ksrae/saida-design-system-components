import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyTextareaProps, Textarea } from './sy-textarea.main';
import { clearElements } from '../../clear-element';

const textareaMeta: Meta<SyTextareaProps> = {
  title: 'Textarea/Overview',
  component: 'sy-textarea',
  tags: [],
  render: (args) => {
    clearElements(textareaMeta.title);
    return Textarea(args);
  },
  argTypes: {
    autofocus: { control: 'boolean', description: 'Focus on mount.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    borderless: { control: 'boolean', description: 'Removes border.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    clearable: { control: 'boolean', description: 'Show clear button.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    counter: { control: 'boolean', description: 'Show character counter.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', description: 'Disabled state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    label: { control: 'text', description: 'Label text.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    max: { control: 'number', description: 'Maximum character count.', table: { category: 'Parameter', type: { summary: 'number' } } },
    min: { control: 'number', description: 'Minimum character count.', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    placeholder: { control: 'text', description: 'Placeholder text.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    readonly: { control: 'boolean', description: 'Read only.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    required: { control: 'boolean', description: 'Required field.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    resize: { control: 'select', options: ['none','horizontal','vertical','both'], description: 'Resize mode.', table: { category: 'Parameter', defaultValue: { summary: 'none' }, type: { summary: 'none | horizontal | vertical | both' } } },
    rows: { control: 'number', description: 'Visible rows.', table: { category: 'Parameter', defaultValue: { summary: 4 as any }, type: { summary: 'number' } } },
    size: { control: 'radio', options: ['small','medium','large'], description: 'Size variant.', table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    status: { control: 'select', options: ['default','warning','error','success'], description: 'Status variant.', table: { category: 'Parameter', defaultValue: { summary: 'default' }, type: { summary: 'default | warning | error | success' } } },
    value: { control: 'text', description: 'Text value.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    name: { control: 'text', description: 'Form field name.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    noNativeValidity: { control: 'boolean', name: 'noNativeValidity', description: 'Disable native validation.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    changed: { type: 'function', description: 'Emitted on input change.', table: { category: 'Callback', type: { summary: `.addEventListener('changed', (e) => {})` } } },
    blured: { type: 'function', description: 'Emitted on blur.', table: { category: 'Callback', type: { summary: `.addEventListener('blured', (e) => {})` } } },
    focused: { type: 'function', description: 'Emitted on focus.', table: { category: 'Callback', type: { summary: `.addEventListener('focused', (e) => {})` } } },
  },
};

export default textareaMeta;
type Story = StoryObj<SyTextareaProps>;

export const Default: Story = {
  args: {
    autofocus: false, borderless: false, clearable: false, counter: false, disabled: false,
    label: 'Textarea', max: 100, min: 0, placeholder: 'Enter text', readonly: false, required: false,
    resize: 'none', rows: 4, size: 'medium', status: 'default', value: '', name: '', noNativeValidity: false,
  },
};
