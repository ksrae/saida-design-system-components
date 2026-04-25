import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputClearable } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Clearable',
  component: 'sy-input',
  tags: [],
  render: (args) => InputClearable(args as { clearable: boolean }),
  argTypes: { clearable: inputMeta?.argTypes?.clearable },
  args: { clearable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
