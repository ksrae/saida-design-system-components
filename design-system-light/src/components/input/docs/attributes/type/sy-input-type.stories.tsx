import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputType } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Type',
  component: 'sy-input',
  tags: [],
  render: (args) => InputType(args as { type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' }),
  argTypes: { type: inputMeta?.argTypes?.type },
  args: { type: 'email' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
