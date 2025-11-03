import type { Meta, StoryObj } from '@storybook/web-components';
import { SyBadgeProps, Badge } from './sy-badge.main';
import { clearElements } from '../../clear-element';

const badgeMeta: Meta<SyBadgeProps> = {
  title: 'Badge/Overview',
  component: 'sy-badge',
  tags: [],
  render: (args) => {
    clearElements(badgeMeta.title);
    return Badge(args);
  },
 argTypes: {
    dot: {
      control: 'boolean',
      description: 'Show badge as a dot',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    hidden: {
      control: 'boolean',
      description: 'Hides the badge',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    overflowCount: {
      control: 'number',
      name: 'overflowCount (overflow-count)',
      description: 'The limit of overflow.',
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: Infinity as any},
      }
    },
    position: {
      control: 'select',
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      description: 'Position of the badge. It is ignored when in standalone mode.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'topRight' },
        type: { summary: "topLeft | topRight | bottomLeft | bottomRight" }

      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'Size of the badge.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium' }
      },
    },
    standalone: {
      control: 'boolean',
      description: 'Whether in standalone mode.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    value: {
      control: 'number',
      description: 'The value of the badge.',
      table: {
        category: 'Parameter',
        type: {summary :'number'},
        defaultValue: {summary: 0 as any},
      }
    },
    variant: {
      control: 'select',
      options: ['red', 'yellow', 'green', 'blue', 'gray'],
      description: 'The color of the badge.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'red' },
        type: { summary: 'red | yellow | green | blue | gray' }

      },
    },
  }
};

export default badgeMeta;

type Story = StoryObj<SyBadgeProps>;

export const Default: Story = {
  args: {
    hidden: false,
    standalone: false,
    overflowCount: 99,
    value: 5,
    position: 'topRight',
    size: 'medium',
    variant: 'red',
  },
};


