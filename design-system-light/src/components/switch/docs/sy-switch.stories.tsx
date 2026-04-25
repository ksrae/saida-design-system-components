import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SySwitchProps, Switch } from './sy-switch.main';
import { clearElements } from '../../clear-element';

const switchMeta: Meta<SySwitchProps> = {
  title: 'Switch/Overview',
  component: 'sy-switch',
  tags: [],
  render: (args) => {
    clearElements(switchMeta.title);
    return Switch(args);
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Current checked state.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    label: {
      control: 'text',
      description: 'Label text.',
      table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading indicator in the switch.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the switch read-only.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Switch size.',
      table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium' } },
    },
    required: {
      control: 'boolean',
      description: 'Switch must be checked for the form to be valid.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    changed: {
      type: 'function',
      description: 'Emitted when the checked state changes.',
      table: { category: 'Callback', type: { summary: `.addEventListener('changed', (e) => {})` } },
    },
  },
};

export default switchMeta;
type Story = StoryObj<SySwitchProps>;

export const Default: Story = {
  args: { checked: false, disabled: false, label: 'Switch', loading: false, readonly: false, size: 'medium', required: false },
};
