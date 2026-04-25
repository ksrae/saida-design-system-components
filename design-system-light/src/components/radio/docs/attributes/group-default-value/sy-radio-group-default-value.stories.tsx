import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { RadioGroupDefaultValue } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Default Value',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupDefaultValue(args as { defaultValue: string }),
  argTypes: { defaultValue: radioGroupMeta?.argTypes?.defaultValue },
  args: { defaultValue: 'a' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};