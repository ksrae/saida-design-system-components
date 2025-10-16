import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyButtonProps, ButtonFocusBlur } from '../../sy-button.main';

const meta: Meta<SyButtonProps> = {
  title: 'Button/Method/setBlur&setFocus',
  component: 'sy-button',
  tags: [],
  render: () => ButtonFocusBlur()
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};


