import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNoNativeValidity } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/No Native Validity',
  component: 'sy-input',
  tags: [],
  render: (args) => InputNoNativeValidity(args as { noNativeValidity: boolean }),
  argTypes: { noNativeValidity: inputMeta?.argTypes?.noNativeValidity },
  args: { noNativeValidity: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
