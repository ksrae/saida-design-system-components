import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../clear-element';
import { CollapsePanel, CollapsePanelProps } from './collapse-panel';

const collapsePanelMeta: Meta<CollapsePanelProps> = {
  title: 'Collapse-Panel/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Collapse/Overview');
    return CollapsePanel(args);
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: 'If true, active the panel.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
      }
    },
    arrow: {
      control: 'boolean',
      description: 'If true, arrow is visible.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the collapse panel.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
      }
    },
    ghost: {
      control: 'boolean',
      description: 'If true, collapse has no background.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
      }
    },
    // type: {
    //   control: 'select',
    //   options : ['arrow', 'hidden'],
    //   description: 'Select arrow / hidden to the Collapse panel.',
    //   table: {
    //     category: 'Parameter',
    //     defaultValue: {summary: 'arrow'},
    //     type: {summary: "arrow | hidden"}
    //   }
    // },
    slotContent: {
      control: 'text', 
      description: 'The contents of the collapse panel', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Collapse panel contents'},
      }
    },
    changed: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the collapse state changes',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
          
        },
      }
    },
  }
};

export default collapsePanelMeta;
type Story = StoryObj<CollapsePanelProps>;


export const Default: Story = {
  args: {
    active: false,
    arrow: false,
    disabled: false,
    ghost: false,
    slotContent: ``
  },
  
  
}
