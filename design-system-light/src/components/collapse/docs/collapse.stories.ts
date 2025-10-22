import type { Meta, StoryObj } from '@storybook/web-components';
import { Collapse, CollapseProps } from './collapse';
import { clearElements } from '../../clear-element';

const collapseMeta: Meta<CollapseProps> = {
  title: 'Collapse/Overview',
  tags: ['false'],
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
    slotContent: {
      control: 'text', 
      description: 'The list of the all collapse panels', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Collapse panels'},
      }
    },
  }
};

export default collapseMeta;
type Story = StoryObj<CollapseProps>;


export const Default: Story = {
  args: {
    accordion: false,
    borderless: false,
    disabled: false,
    fullheight: false,
    ghost: false,
    slotContent: ``
  },
  
  
}
