import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputVariant } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Variant',
  component: 'sy-input',
  tags: [],
  render: (args) => InputVariant(args as { variant: 'password' | 'search' | 'text' }),
  argTypes: { variant: inputMeta?.argTypes?.variant },
  args: { variant: 'text' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
