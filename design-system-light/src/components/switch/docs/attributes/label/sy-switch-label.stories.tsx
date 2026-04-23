import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SwitchLabel } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Label',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchLabel(args as { label: string }),
  argTypes: { label: switchMeta?.argTypes?.label },
  args: { label: 'Switch' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};