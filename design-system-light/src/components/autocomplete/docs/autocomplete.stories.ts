import type { Meta, StoryObj } from '@storybook/web-components';
import { AutoComplete, AutoCompleteProps } from './autocomplete';
import { clearElements } from '../../clear-element';

const autoCompleteMeta: Meta<AutoCompleteProps> = {
  title: 'Autocomplete/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(autoCompleteMeta.title);
    return AutoComplete(args);
  },
  
  argTypes: {
    caseSensitive: {
      control: 'boolean', 
      name: 'caseSensitive (case-sensitive)',
      description : 'Ensures that the matching of user input to suggestions is case-insensitive.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    debounceTime: {
      control : 'number', 
      name: 'debounceTime (debounce-time)',
      description : 'Debounce delay for fetching suggestions.(unit:millisecond)',
      table : {
        category : 'Parameter',
        defaultValue : { summary : 0 as any },
        type: { summary: 'number' }
      }
    },
    loading: {
      control: 'boolean', 
      description: 'Put spinner and remove all items.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    min: {
      control: 'number',
      description: 'The minimum length of search to begin.', 
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: 0 as any},
      }      
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The autocomplete size.',   
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'medium' }, 
        type: { summary: "small | medium | large" }
        
      },
    },
    source: {
      control: 'object', 
      description: 'The data list of the autocomplete.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'array' }
      },
    }, 
    trigger: {
      control: 'radio',
      options: ['focus', 'input'],
      description: 'Opens Autocomplete when focus or any inputs.',   
      table: {
        category: 'Parameter',
        defaultValue : { summary : 'focus'},
        type: { summary: 'focus | input' }
      },
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
    selected: {
      type: 'function',
      action: 'selected', 
      description: 'Emitted when an item is selected from the autocomplete suggestions.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      }
    },
    changed: {
      type: 'function',
      action: 'changed', 
      description: 'Emitted when the input value changes.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
        },
      }
    },    
  },
};

export default autoCompleteMeta;
type Story = StoryObj<AutoCompleteProps>;


export const Default: Story = {
  args: {
    caseSensitive: false,
    debounceTime: 0,
    loading: false,
    min: 0,
    placeholder: '',
    size: 'medium',
    source: ["abc", 'aaa', 'aab', 'aac', "def", "GHI"],
    trigger: 'focus'
  },
}
