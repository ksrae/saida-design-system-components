import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyButtonProps, ButtonClick } from '../sy-button.main';
/* import buttonMeta from '../sy-button.main.stories'; */

const meta: Meta<SyButtonProps> = {
  title: 'Button/Events/Click',
  component: 'sy-button',
  tags: [],
  render: () => { return ButtonClick(); },
};

export default meta;

type Story = StoryObj<SyButtonProps>;
export const Default: Story = {};


