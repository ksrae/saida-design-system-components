import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputValue } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Value',
  component: 'sy-input',
  tags: [],
  render: (args) => InputValue(args as { value: string }),
  argTypes: { value: inputMeta?.argTypes?.value },
  args: { value: 'Hello' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
