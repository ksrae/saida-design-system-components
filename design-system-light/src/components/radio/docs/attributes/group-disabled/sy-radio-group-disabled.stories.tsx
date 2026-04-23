import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupDisabled } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Disabled',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupDisabled(args as { disabled: boolean }),
  argTypes: { disabled: radioGroupMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};