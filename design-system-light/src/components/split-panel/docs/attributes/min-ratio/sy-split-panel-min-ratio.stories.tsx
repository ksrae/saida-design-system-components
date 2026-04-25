import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SplitPanelMinRatio } from '../../sy-split-panel.main';
import splitPanelMeta from '../../sy-split-panel.stories';

const meta: Meta = {
  title: 'SplitPanel/Attributes/Min Ratio',
  component: 'sy-split-panel',
  tags: [],
  render: (args) => SplitPanelMinRatio(args as { minRatio: number }),
  argTypes: { minRatio: splitPanelMeta?.argTypes?.minRatio },
  args: { minRatio: 20 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};