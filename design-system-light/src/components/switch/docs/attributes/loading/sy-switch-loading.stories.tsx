import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SwitchLoading } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Loading',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchLoading(args as { loading: boolean }),
  argTypes: { loading: switchMeta?.argTypes?.loading },
  args: { loading: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};