import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../clear-element';
import { RadioButton, RadioButtonProps } from './radio-button';

const radioButtonMeta: Meta<RadioButtonProps> = {
  title: 'RadioButton Item/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(radioButtonMeta.title);
    return RadioButton(args);
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
      description: 'Disables the radio button.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    value: {
      control: 'text',
      description: 'Sets unique value of the radio button.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }      
    },
    slotContent: {
      control: 'text',
      description: 'The label of the radio item.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'RadioButton1'},
        type: { summary: 'string' }
      }
    },
    selected: {
      type: 'function',
      action: 'click',
      description: 'Triggered when radio button is clicked.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
          
        },
      }
    },    
  },
};

export default radioButtonMeta;
type Story = StoryObj<RadioButtonProps>;


export const Default: Story = {
  args: {
    checked: false,
    disabled: false,    
    value: 'radioButton',
    slotContent: 'RadioButton1'
  },
}
