import type { Meta, StoryObj } from '@storybook/web-components';
import { Checkbox, CheckboxProps } from './checkbox';
import { clearElements } from '../../clear-element';

const checkboxMeta: Meta<CheckboxProps> = {
  title: 'Checkbox/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(checkboxMeta.title);
    return Checkbox(args);
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The state of the checkbox. Checked or unchecked.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    indeterminate: {
      control: 'boolean',
      description: 'The checkbox in an indeterminate state.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    readonly: {
      control: 'boolean',
      description: 'The checkbox in the readonly state.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    required: {
      control: 'boolean',
      description: 'Sets the checkbox required for form validation.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    }, 
    slotContent: {
      control: 'text',
      description: 'The label of the checkbox.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'checkbox'},
        type: { summary: 'string' }
      }
    },
    setFocus: {
      type: 'function',
      description: 'Triggers focus event manually.',
      table: {
        category: 'Function',
        type: {
          summary: `setFocus()`,
        },
      }
    },
    setBlur: {
      type: 'function',
      description: 'Triggers blur event manually.',
      table: {
        category: 'Function',
        type: {
          summary: `setBlur()`,
        },
      }
    },
    changed: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the checked state changes',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
          
        },
      }
    },
    focused: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the checkbox receives focus',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('focused', (e) => {})`,
          
        },
      }
    },
    blured: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the checkbox loses focus',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('blured', (e) => {})`,
        },
      }
    },
  },
};

export default checkboxMeta;
type Story = StoryObj<CheckboxProps>;


export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    readonly: false,
    required: false,
    slotContent: 'checkbox',
  },
}
