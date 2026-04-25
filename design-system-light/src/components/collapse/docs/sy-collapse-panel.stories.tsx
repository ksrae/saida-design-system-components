import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyCollapsePanelProps, CollapsePanel } from './sy-collapse-panel.main';
import { clearElements } from '../../clear-element';

const collapsePanelMeta: Meta<SyCollapsePanelProps> = {
  title: 'Collapse-Panel/Overview',
  component: 'sy-collapse-panel',
  tags: [],
  render: (args) => {
    clearElements(collapsePanelMeta.title);
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
    slot: {
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
  },
  args: {
    slot: `
      <div slot="header">This is panel header 1</div>
      <div>This is panel content 1</div>
    `,
    active: false,
    arrow: false,
    disabled: false,
    ghost: false
  },
};

export default collapsePanelMeta;

type Story = StoryObj<SyCollapsePanelProps>;

export const Default: Story = {};
