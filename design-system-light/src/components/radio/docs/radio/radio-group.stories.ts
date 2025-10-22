import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioGroup, RadioGroupProps } from './radio';
import { clearElements } from '../../../clear-element';

const radioGroupMeta: Meta<RadioGroupProps> = {
  title: 'Radio/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(radioGroupMeta.title);
    return RadioGroup(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the radio.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    defaultValue: {
      control: 'text',
      name: 'defaultValue (default-value)',
      description: 'Sets the default value. Only one can be registered.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }      
    },
    position: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Sets the position of the radio group.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'horizontal'},
        type: { summary: 'horizontal | vertical' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Sets all radio items in a radio group to a read-only state.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Sets the radio group as required.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    slotContent: {
      control: false,
      description: 'The radio items of the radio group.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Radio'},
      }
    },
    selected: {
      type: 'function',
      action: 'click',
      description: 'Triggered when any radio item in a group is selected.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
          
        },
      }
    },
  },
};

export default radioGroupMeta;
type Story = StoryObj<RadioGroupProps>;


export const Default: Story = {
  args: {
    disabled: false,
    defaultValue: '1',
    position: 'horizontal',
    required: false,
    readonly: false,
    slotContent: ``,
  },
}
