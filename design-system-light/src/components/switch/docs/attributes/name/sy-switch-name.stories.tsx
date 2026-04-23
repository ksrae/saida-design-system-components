import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SwitchName } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Name',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchName(args as { name: string }),
  argTypes: { name: switchMeta?.argTypes?.name },
  args: { name: 'mySwitch' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};