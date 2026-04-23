import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupNoNativeValidity } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/No Native Validity',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupNoNativeValidity(args as { noNativeValidity: boolean }),
  argTypes: { noNativeValidity: radioGroupMeta?.argTypes?.noNativeValidity },
  args: { noNativeValidity: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};