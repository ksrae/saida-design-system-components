import type { Meta, StoryObj } from '@storybook/web-components';
import { SyButtonProps, ButtonType } from '../../sy-button.main';
import buttonMeta from '../../sy-button.stories';

const meta: Meta<SyButtonProps> = {
  title: 'Button/Attributes/Type',
  component: 'sy-button',
  tags: [],
  render: (args) => ButtonType(args),
  argTypes: {
    type: buttonMeta?.argTypes?.type
  },
  args: {
    type: 'button'
  },
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};


