import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberNoNativeValidity } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/No Native Validity',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberNoNativeValidity(args as { noNativeValidity: boolean }),
  argTypes: { noNativeValidity: inputNumberMeta?.argTypes?.noNativeValidity },
  args: { noNativeValidity: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
