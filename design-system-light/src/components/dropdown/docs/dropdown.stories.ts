import type { Meta, StoryObj } from '@storybook/web-components';
import { Dropdown, DropdownProps } from './dropdown';
import { clearElements } from '../../clear-element';

const dropdownMeta: Meta<DropdownProps> = {
  title: 'Dropdown/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(dropdownMeta.title);
    return Dropdown(args);
  },
  argTypes: {
    borderless: {
      control: 'boolean', 
      description: 'Sets borderless for the dropdown.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the dropdown.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    position: {
      control: 'select',
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      description: 'Visible position of the dropdown menu', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'bottomLeft' }, 
        type: { summary: 'topLeft | topRight | bottomLeft | bottomRight' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the dropdown', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'medium' }, 
        type: { summary: 'small | medium | large' },
      },
    },
    trigger: {
      control: 'radio',
      options: ['hover', 'click'],
      description: 'Event to open the dropdown',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'click' }, 
        type: { summary: 'hover | click' }
      },
    },
    selected: {
      type: 'function',
      action: 'selected', 
      description: 'Triggers when any item is selected.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      }
    },
    slotContent: {
      control: 'text',
      description: 'Values for the dropdown',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotTitle: {
      control: 'text',
      description: 'Title for the dropdown. Use <b>slot="title"</b> to set the title.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    }
  },
};

export default dropdownMeta;
type Story = StoryObj<DropdownProps>;


export const Default: Story = {
  args: {
    borderless: false,
    disabled: false,
    position: 'bottomLeft',
    size: 'medium',
    trigger: 'click',
    slotContent: ``,
    slotTitle: `<span slot="title">Dropdown</span>`
  },
  
  
}
