import type { Meta, StoryObj } from '@storybook/web-components';
import { Radio, RadioProps } from './radio';
import { clearElements } from '../../../clear-element';

const radioMeta: Meta<RadioProps> = {
  title: 'Radio Item/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(radioMeta.title);
    return Radio(args);
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checks the radio.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Sets the radio to a read-only state.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    value: {
      control: 'text',
      description: 'Sets unique value of the radio.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }      
    },
    slotContent: {
      control: 'text',
      description: 'The value of the radio',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Radio'},
      }
    },
    selected: {
      type: 'function',
      action: 'click',
      description: 'Triggered when radio item is selected.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
          
        },
      }
    },
  },
};

export default radioMeta;
type Story = StoryObj<RadioProps>;


export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    readonly: false,
    value: '1',
    slotContent: ``,
  },
}
