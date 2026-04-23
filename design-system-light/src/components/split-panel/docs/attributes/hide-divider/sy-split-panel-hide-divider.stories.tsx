import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SplitPanelHideDivider } from '../../sy-split-panel.main';
import splitPanelMeta from '../../sy-split-panel.stories';

const meta: Meta = {
  title: 'SplitPanel/Attributes/Hide Divider',
  component: 'sy-split-panel',
  tags: [],
  render: (args) => SplitPanelHideDivider(args as { hideDivider: boolean }),
  argTypes: { hideDivider: splitPanelMeta?.argTypes?.hideDivider },
  args: { hideDivider: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};