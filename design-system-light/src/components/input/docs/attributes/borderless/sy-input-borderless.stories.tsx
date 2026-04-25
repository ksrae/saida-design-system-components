import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputBorderless } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Borderless',
  component: 'sy-input',
  tags: [],
  render: (args) => InputBorderless(args as { borderless: boolean }),
  argTypes: { borderless: inputMeta?.argTypes?.borderless },
  args: { borderless: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
