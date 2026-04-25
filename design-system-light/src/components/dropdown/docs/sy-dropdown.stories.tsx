import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { Dropdown, SyDropdownProps } from './sy-dropdown.main';
import { clearElements } from '../../clear-element';

const dropdownMeta: Meta<SyDropdownProps> = {
  title: 'Dropdown/Overview',
  component: 'sy-dropdown',
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
      description: 'Menu content for the dropdown.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotTitle: {
      control: 'text',
      description: 'Title for the dropdown',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    }
  },
};

export default dropdownMeta;
type Story = StoryObj<SyDropdownProps>;


export const Default: Story = {
  args: {
    borderless: false,
    disabled: false,
    position: 'bottomLeft',
    size: 'medium',
    trigger: 'click',
    slotTitle: `<span slot="title">Dropdown</span>`,
    slotContent: `
      <sy-menu>
        <sy-menu-item>Menu Item 1</sy-menu-item>
        <sy-menu-item>Menu Item 2</sy-menu-item>
        <sy-menu-item>Menu Item 3</sy-menu-item>
      </sy-menu>
    `,
  },
};
