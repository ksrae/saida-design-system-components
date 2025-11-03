import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyButtonProps, ButtonAttribute } from '../../sy-button.main';
import buttonMeta from '../../sy-button.stories';

const meta: Meta<SyButtonProps> = {
  title: 'Button/Attributes/Loading',
  component: 'sy-button',
  tags: [],
  render: (args) => ButtonAttribute(args),
  argTypes: {
    loading: buttonMeta?.argTypes?.loading
  },
  args: {
    loading: false
  },
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};


