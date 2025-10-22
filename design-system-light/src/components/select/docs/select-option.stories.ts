import type { Meta, StoryObj } from '@storybook/web-components';
import '../select.element';
import '../select-option.element';
import { SelectOption, SelectOptionProps } from './select-option';
import { clearElements } from '../../clear-element';

const selectOptionMeta: Meta<SelectOptionProps> = {
  title: 'Select/Option-Params',
  tags: ['false'],
  render: (args) => {
    clearElements('Select/Overview');
    return SelectOption(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the option.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    label: {
      control: 'text', 
      description: 'Sets the text label of the option.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'text' }
      }
    },
    showTooltip: {
      name: 'showTooltip (show-tooltip)',
      control: 'boolean', 
      description: 'Sets the placeholder of the option.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Enabled, but not clickable. Manual selection by model is possible.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    value: {
      control: 'text', 
      description: 'Sets the value of the option. Model checks the same value for the pre-selection.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    slotContent: {
      control: 'text', 
      description: 'Custom the content of sy-option via slotContent.<br/> It should be an HTML tag such as span, sy-icon, etc. If not set, the label property will be displayed.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
  },
};

export default selectOptionMeta;
type Story = StoryObj<SelectOptionProps>;


export const Default: Story = {
  args: {
    disabled: false,
    label: 'Option 1',
    showTooltip: false,
    readonly: false,
    value: 'Option 1',
    slotContent: ``,
  },
  
  
}
