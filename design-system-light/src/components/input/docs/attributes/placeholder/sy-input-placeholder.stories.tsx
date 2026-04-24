import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputPlaceholder } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Placeholder',
  component: 'sy-input',
  tags: [],
  render: (args) => InputPlaceholder(args as { placeholder: string }),
  argTypes: { placeholder: inputMeta?.argTypes?.placeholder },
  args: { placeholder: 'Enter text' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
