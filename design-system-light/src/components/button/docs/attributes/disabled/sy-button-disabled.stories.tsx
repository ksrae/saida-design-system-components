import type { Meta, StoryObj } from '@storybook/web-components';
import { SyButtonProps, ButtonAttribute } from '../../sy-button.main';
import buttonMeta from '../../sy-button.stories';

const meta: Meta<SyButtonProps> = {
  title: 'Button/Attributes/Disabled',
  component: 'sy-button',
  tags: [],
  render: (args) => ButtonAttribute(args),
  argTypes: {
    disabled: buttonMeta?.argTypes?.disabled
  },
  args: {
    disabled: false
  },
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};


