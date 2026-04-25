import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputRequired } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Required',
  component: 'sy-input',
  tags: [],
  render: (args) => InputRequired(args as { required: boolean }),
  argTypes: { required: inputMeta?.argTypes?.required },
  args: { required: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
