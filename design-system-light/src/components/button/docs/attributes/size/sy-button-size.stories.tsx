import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyButtonProps, ButtonAttribute } from '../../sy-button.main';
import buttonMeta from '../../sy-button.stories';

const meta: Meta<SyButtonProps> = {
  title: 'Button/Attributes/Size',
  component: 'sy-button',
  tags: [],  // autodocs deactivate
  render: (args) => ButtonAttribute(args),
  argTypes: {
    size: buttonMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};

