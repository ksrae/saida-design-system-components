import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyRadioButtonProps, RadioButton } from './sy-radio.main';
import { clearElements } from '../../clear-element';

const radioButtonMeta: Meta<SyRadioButtonProps> = {
  title: 'RadioButton/Overview',
  component: 'sy-radio-button',
  tags: [],
  render: (args) => {
    clearElements(radioButtonMeta.title);
    return RadioButton(args);
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Checked state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', description: 'Disabled.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    value: { control: 'text', description: 'Value.', table: { category: 'Parameter', type: { summary: 'string' } } },
    size: { control: 'radio', options: ['small', 'medium', 'large'], description: 'Size.', table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    variant: { control: 'radio', options: ['outlined', 'solid'], description: 'Visual variant.', table: { category: 'Parameter', defaultValue: { summary: 'outlined' }, type: { summary: 'outlined | solid' } } },
    selected: { type: 'function', description: 'Emitted when selected.', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
  },
};

export default radioButtonMeta;
type Story = StoryObj<SyRadioButtonProps>;

export const Default: Story = { args: { checked: false, disabled: false, value: 'a', size: 'medium', variant: 'outlined' } };
