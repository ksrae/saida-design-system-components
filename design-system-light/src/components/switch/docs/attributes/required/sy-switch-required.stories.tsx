import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SwitchRequired } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Required',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchRequired(args as { required: boolean }),
  argTypes: { required: switchMeta?.argTypes?.required },
  args: { required: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
