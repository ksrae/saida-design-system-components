import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../clear-element';
import { ButtonGroup, ButtonGroupProps } from './button-group';

const buttonGroupMeta: Meta<ButtonGroupProps> = {
  title: 'ButtonGroup/Overview',
  tags: ['false'],
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
    slotContent: {
      control: false,
      description: 'The value of the button-group.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
  },
};

export default buttonGroupMeta;
type Story = StoryObj<ButtonGroupProps>;


export const Default: Story = {
  args: {
    vertical: false,
    slotContent: ``
  },  
}
