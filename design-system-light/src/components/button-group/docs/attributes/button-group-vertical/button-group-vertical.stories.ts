import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import buttonGroupMeta from '../../button-group.stories';
import { ButtonGroupProps, ButtonGroupVertical } from '../../button-group';

const meta: Meta<ButtonGroupProps> = {
  title: 'ButtonGroup/Attributes/Vertical',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ButtonGroupVertical(args);
  },
  argTypes: {
    vertical: buttonGroupMeta?.argTypes?.vertical
  },
  args: {
    vertical: true
  }
};

export default meta;
type Story = StoryObj<ButtonGroupProps>;

export const Param: Story = {}
