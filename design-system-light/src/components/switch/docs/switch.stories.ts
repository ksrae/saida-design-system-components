import type { Meta, StoryObj } from '@storybook/web-components';
import { Switch, SwitchProps } from './switch';
import { clearElements } from '../../clear-element';

const switchMeta: Meta<SwitchProps> = {
  title: 'Switch/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(switchMeta.title);
    return Switch(args);
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Sets the switch state checked.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    label : {
      control :'text', 
      description : 'The label of the switch.', 
      table : {
          category : 'Parameter',
          defaultValue : { summary : undefined},
          type: { summary: 'string' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Determines whether the switch is in a loading state.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Determines whether the switch has readonly.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'The switch’s size.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'medium'},
        type: { summary: 'small | medium' }
      }
    },
    changed: {
      type: 'function',
      description: 'Triggered changed event when the value changes.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
          
        },
      }
    },
	}
};

export default switchMeta;
type Story = StoryObj<SwitchProps>;


export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label : '',
    loading: false,
    readonly: false,
    size: 'medium',
  },  
}
