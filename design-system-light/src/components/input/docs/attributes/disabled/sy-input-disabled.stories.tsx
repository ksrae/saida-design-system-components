import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputDisabled } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Disabled',
  component: 'sy-input',
  tags: [],
  render: (args) => InputDisabled(args as { disabled: boolean }),
  argTypes: { disabled: inputMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
