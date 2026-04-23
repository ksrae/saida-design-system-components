import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SwitchDisabled } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Disabled',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchDisabled(args as { disabled: boolean }),
  argTypes: { disabled: switchMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};