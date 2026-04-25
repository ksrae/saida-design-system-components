import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyRadioProps, Radio } from './sy-radio.main';
import { clearElements } from '../../clear-element';

const radioMeta: Meta<SyRadioProps> = {
  title: 'Radio/Overview',
  component: 'sy-radio',
  tags: [],
  render: (args) => {
    clearElements(radioMeta.title);
    return Radio(args);
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Checked state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', description: 'Disabled.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    readonly: { control: 'boolean', description: 'Readonly.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    value: { control: 'text', description: 'Radio value.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    selected: { type: 'function', description: 'Emitted when selected.', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
  },
};

export default radioMeta;
type Story = StoryObj<SyRadioProps>;

export const Default: Story = { args: { checked: false, disabled: false, readonly: false, value: 'a' } };
