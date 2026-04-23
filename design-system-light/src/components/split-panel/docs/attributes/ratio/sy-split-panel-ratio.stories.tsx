import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SplitPanelRatio } from '../../sy-split-panel.main';
import splitPanelMeta from '../../sy-split-panel.stories';

const meta: Meta = {
  title: 'SplitPanel/Attributes/Ratio',
  component: 'sy-split-panel',
  tags: [],
  render: (args) => SplitPanelRatio(args as { ratio: number }),
  argTypes: { ratio: splitPanelMeta?.argTypes?.ratio },
  args: { ratio: 60 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};