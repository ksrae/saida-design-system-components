import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SwitchChecked } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Checked',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchChecked(args as { checked: boolean }),
  argTypes: { checked: switchMeta?.argTypes?.checked },
  args: { checked: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};