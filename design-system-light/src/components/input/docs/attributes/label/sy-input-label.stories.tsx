import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputLabel } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Label',
  component: 'sy-input',
  tags: [],
  render: (args) => InputLabel(args as { label: string }),
  argTypes: { label: inputMeta?.argTypes?.label },
  args: { label: 'Input label' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
