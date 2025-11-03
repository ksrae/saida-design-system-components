import { SyButtonGroupProps, ButtonGroup } from './sy-button-group.main';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { clearElements } from '../../clear-element';

const buttonGroupMeta: Meta<SyButtonGroupProps> = {
  title: 'ButtonGroup/Overview',
  render: (args) => {
    clearElements(buttonGroupMeta.title);
    return ButtonGroup(args);
  },
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Set the buttons to align vertically.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    slot: {
      control: 'text',
      description: 'The value of the button-group.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'any' }
      }
    },
  },
};

export default buttonGroupMeta;

type Story = StoryObj<SyButtonGroupProps>;

export const Default: Story = {
  args: {
    slot: `
      <sy-button variant="default">Button 1</sy-button>
      <sy-button variant="primary">Button 2</sy-button>
      <sy-button variant="secondary">Button 3</sy-button>
    `,
    vertical: false,
  },
};

