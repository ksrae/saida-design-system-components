import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyAutocompleteProps, Autocomplete } from './sy-autocomplete.main';
import { clearElements } from '../../clear-element';

const autocompleteMeta: Meta<SyAutocompleteProps> = {
  title: 'Autocomplete/Overview',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => {
    clearElements(autocompleteMeta.title);
    return Autocomplete(args);
  },
  argTypes: {
    slot: {
      control: false,
      description: 'Slot for autocomplete-option component',
      table: { disable: true },
    },
    caseSensitive: {
      control: 'boolean',
      name: 'caseSensitive (case-sensitive)',
      description: 'When true, filtering is case-sensitive — typing "app" will not match "Apple".',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    debounceTime: {
      control: 'number',
      name: 'debounceTime (debounce-time)',
      description: 'Debounce delay for fetching suggestions. (unit: millisecond)',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the autocomplete: no focus, input, or dropdown; greyed-out look.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    highlightMatches: {
      control: 'boolean',
      name: 'highlightMatches (highlight-matches)',
      description: 'Highlight the matched substring inside each suggestion.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Show the loading spinner inside the dropdown (e.g., while awaiting async data).',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    min: {
      control: 'number',
      description: 'Minimum characters required to trigger suggestions.',
      table: {
        category: 'Parameter',
        type: { summary: 'number' },
        defaultValue: { summary: 0 as any },
      }
    },
    noNativeValidity: {
      control: 'boolean',
      name: 'noNativeValidity (no-native-validity)',
      description: 'Disable the native browser validity bubble — combine with a custom [slot="error"] message.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Input is read-only; the dropdown is not opened.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required for form validation.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The autocomplete size.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' }
      },
    },
    source: {
      control: 'object',
      description: 'The data list of the autocomplete.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'array' }
      },
    },
    status: {
      control: 'select',
      options: ['default', 'warning', 'error', 'success'],
      description: 'Visual status indicator (e.g., for inline validation feedback).',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'default' },
        type: { summary: 'default | warning | error | success' }
      },
    },
    trigger: {
      control: 'radio',
      options: ['focus', 'input'],
      description: 'When the suggestions dropdown opens — on focus or only after the user types.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'focus' },
        type: { summary: 'focus | input' }
      },
    },
    value: {
      control: 'text',
      description: 'Current value of the input.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      },
    },
    setFocus: {
      type: 'function',
      description: 'Programmatically focus the input.',
      table: {
        category: 'Function',
        type: { summary: `setFocus(): Promise<void>` },
      }
    },
    setBlur: {
      type: 'function',
      description: 'Programmatically blur the input.',
      table: {
        category: 'Function',
        type: { summary: `setBlur(): Promise<void>` },
      }
    },
    checkValidity: {
      type: 'function',
      description: 'Check if the input is valid (form validation).',
      table: {
        category: 'Function',
        type: { summary: `checkValidity(): Promise<boolean>` },
      }
    },
    reportValidity: {
      type: 'function',
      description: 'Report validity and show validation message if invalid.',
      table: {
        category: 'Function',
        type: { summary: `reportValidity(): Promise<boolean>` },
      }
    },
    getValidStatus: {
      type: 'function',
      description: `Get current validation status ('valueMissing' | 'custom' | '').`,
      table: {
        category: 'Function',
        type: { summary: `getValidStatus(): Promise<string>` },
      }
    },
    setCustomError: {
      type: 'function',
      description: 'Put the component into an app-driven invalid state. Reveals whatever is in [slot="error"].',
      table: {
        category: 'Function',
        type: { summary: `setCustomError(): Promise<void>` },
      }
    },
    clearCustomError: {
      type: 'function',
      description: 'Clear a previously set custom error state.',
      table: {
        category: 'Function',
        type: { summary: `clearCustomError(): Promise<void>` },
      }
    },
    selected: {
      type: 'function',
      description: 'Emitted when an item is selected from the dropdown.',
      table: {
        category: 'Callback',
        type: { summary: `.addEventListener('selected', (e) => {})` },
      }
    },
    changed: {
      type: 'function',
      description: 'Emitted when the input value changes.',
      table: {
        category: 'Callback',
        type: { summary: `.addEventListener('changed', (e) => {})` },
      }
    }
  }
};

export default autocompleteMeta;

type Story = StoryObj<SyAutocompleteProps>;

export const Default: Story = {
  args: {
    caseSensitive: false,
    debounceTime: 0,
    disabled: false,
    highlightMatches: false,
    loading: false,
    min: 0,
    noNativeValidity: false,
    placeholder: 'Type to search...',
    readonly: false,
    required: false,
    size: 'medium',
    source: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'],
    status: 'default',
    trigger: 'focus',
    value: '',
  },
};
