import type { Meta, StoryObj } from '@storybook/web-components';
import { SyCollapseProps, Collapse } from './sy-collapse.main';
import { clearElements } from '../../clear-element';

const collapseMeta: Meta<SyCollapseProps> = {
  title: 'Collapse/Overview',
  component: 'sy-collapse',
  tags: [],
  render: (args) => {
    clearElements(collapseMeta.title);
    return Collapse(args);
  },
  argTypes: {
    accordion: {
      control: 'boolean',
      description: 'If true, active only one panel.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    borderless: {
      control: 'boolean',
      description: 'If true, collapse has no border.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all collapse panels.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    fullheight: {
      control: 'boolean',
      description: 'If true, the panel content is stretched corresponding to its parent.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    ghost: {
      control: 'boolean',
      description: 'If true, all collapse panels have no background.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    slot: {
      control: 'text',
      description: 'The list of the all collapse panels',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Collapse panels'},
      }
    },
  },
  args: {
    slot: `
      <sy-collapse-panel arrow>
          <span slot="header">Panel 1</span>
          <div>Content of panel 1</div>
        </sy-collapse-panel>
        <sy-collapse-panel arrow>
          <span slot="header">Panel 2</span>
          <div>Content of panel 2</div>
        </sy-collapse-panel>
        <sy-collapse-panel arrow>
          <span slot="header">Panel 3</span>
          <div>Content of panel 3</div>
      </sy-collapse-panel>
    `,
    accordion: false,
    borderless: false,
    disabled: false,
    fullheight: false,
    ghost: false,
  },
};

export default collapseMeta;

type Story = StoryObj<SyCollapseProps>;

export const Default: Story = {};
