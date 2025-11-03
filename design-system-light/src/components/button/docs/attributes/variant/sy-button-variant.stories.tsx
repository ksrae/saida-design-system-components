import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyButtonProps, ButtonAttribute } from '../../sy-button.main';
import buttonMeta from '../../sy-button.stories';

const meta: Meta<SyButtonProps> = {
  title: 'Button/Attributes/Variant',
  component: 'sy-button',
  tags: [],  // autodocs deactivate
  render: (args) => ButtonAttribute(args),
  argTypes: {
    variant: buttonMeta?.argTypes?.variant
  },
  args: {
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};

