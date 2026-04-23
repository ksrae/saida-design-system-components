import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupReadonly } from '../../sy-radio-group.main';
import radioGroupMeta from '../../sy-radio-group.stories';

const meta: Meta = {
  title: 'Radio/Group Attributes/Readonly',
  component: 'sy-radio-group',
  tags: [],
  render: (args) => RadioGroupReadonly(args as { readonly: boolean }),
  argTypes: { readonly: radioGroupMeta?.argTypes?.readonly },
  args: { readonly: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};