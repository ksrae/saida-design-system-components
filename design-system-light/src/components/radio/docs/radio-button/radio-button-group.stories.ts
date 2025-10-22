import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonGroup, RadioGroupProps } from './radio-button';
import { clearElements } from '../../../clear-element';

const radioButtonGroupMeta: Meta<RadioGroupProps> = {
  title: 'RadioButton/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(radioButtonGroupMeta.title);
    return RadioButtonGroup(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables all radio buttons of the radio group.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    defaultValue: {
      control: 'text',
      description: 'The value of the specific radio button within a radio button group that corresponds to the default value will be checked.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }      
    },
    size: {
        control: 'select',
        options: ['small', 'medium', 'large'],
        description: 'The size of the radio buttons in the radio button group.', 
        table: {
          category: 'Parameter',
          defaultValue: {summary: 'medium'},
          type: { summary: 'small | medium | large' },
        }
    },
    variant: {
        control : 'radio',
        options : ['outlined', 'solid'],
        description : 'Defines the style when a radio button within the radio group is selected.',
        table : {
          category :'Parameter',
          defaultValue : {summary :'outlined'},
          type: { summary: 'outlined | solid' }
        }
      }, 
    slotContent: {
      control: false,
      description: 'The radio button items of the radio button group.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Radio'},
      }
    },
    selected: {
      type: 'function',
      action: 'click',
      description: 'Triggered when any radio is clicked.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
          
        },
      }
    },
  },
};

export default radioButtonGroupMeta;
type Story = StoryObj<RadioGroupProps>;


export const Default: Story = {
  args: {
    disabled: false,
    defaultValue: '1',
    size: 'medium',
    variant:'outlined',
    slotContent: ``,
  },
}
