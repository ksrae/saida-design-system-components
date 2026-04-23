import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupName } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Name',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupName(args as { name: string }),
  argTypes: { name: radioGroupMeta?.argTypes?.name },
  args: { name: 'myRadio' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};