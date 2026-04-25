import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputMax } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Max',
  component: 'sy-input',
  tags: [],
  render: (args) => InputMax(args as { max: number }),
  argTypes: { max: inputMeta?.argTypes?.max },
  args: { max: 10 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
