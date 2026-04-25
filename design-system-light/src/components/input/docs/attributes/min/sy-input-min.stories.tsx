import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputMin } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Min',
  component: 'sy-input',
  tags: [],
  render: (args) => InputMin(args as { min: number }),
  argTypes: { min: inputMeta?.argTypes?.min },
  args: { min: 3 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
