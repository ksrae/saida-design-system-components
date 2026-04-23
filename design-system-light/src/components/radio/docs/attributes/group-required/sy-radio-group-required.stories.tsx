import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupRequired } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Required',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupRequired(args as { required: boolean }),
  argTypes: { required: radioGroupMeta?.argTypes?.required },
  args: { required: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};