import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyButtonProps, ButtonSetClick } from '../../sy-button.main';

const meta: Meta<SyButtonProps> = {
  title: 'Button/Method/setClick',
  component: 'sy-button',
  tags: [],
  render: () => ButtonSetClick()
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};


