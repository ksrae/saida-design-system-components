import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputSize } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Size',
  component: 'sy-input',
  tags: [],
  render: (args) => InputSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: inputMeta?.argTypes?.size },
  args: { size: 'medium' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
