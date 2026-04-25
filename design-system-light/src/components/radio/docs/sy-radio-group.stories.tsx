import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyRadioGroupProps, RadioGroup } from './sy-radio.main';
import { clearElements } from '../../clear-element';

const radioGroupMeta: Meta<SyRadioGroupProps> = {
  title: 'Radio/Group Overview',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => {
    clearElements(radioGroupMeta.title);
    return RadioGroup(args);
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disabled.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    defaultValue: { control: 'text', name: 'defaultValue', description: 'Default selected value.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    readonly: { control: 'boolean', description: 'Readonly.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    required: { control: 'boolean', description: 'Required.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    size: { control: 'radio', options: ['small', 'medium', 'large'], description: 'Size.', table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    position: { control: 'radio', options: ['horizontal', 'vertical'], description: 'Layout direction.', table: { category: 'Parameter', defaultValue: { summary: 'horizontal' }, type: { summary: 'horizontal | vertical' } } },
    variant: { control: 'radio', options: ['outlined', 'solid'], description: 'Visual variant.', table: { category: 'Parameter', defaultValue: { summary: 'outlined' }, type: { summary: 'outlined | solid' } } },
    name: { control: 'text', description: 'Form name.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    noNativeValidity: { control: 'boolean', name: 'noNativeValidity', description: 'Disable native validation.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    changed: { type: 'function', description: 'Emitted when selection changes.', table: { category: 'Callback', type: { summary: `.addEventListener('changed', (e) => {})` } } },
  },
};

export default radioGroupMeta;
type Story = StoryObj<SyRadioGroupProps>;

export const Default: Story = { args: { disabled: false, defaultValue: 'a', readonly: false, required: false, size: 'medium', position: 'horizontal', variant: 'outlined', name: '', noNativeValidity: false } };
