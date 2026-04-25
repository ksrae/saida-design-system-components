import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SplitPanelType } from '../../sy-split-panel.main';
import splitPanelMeta from '../../sy-split-panel.stories';

const meta: Meta = {
  title: 'SplitPanel/Attributes/Type',
  component: 'sy-split-panel',
  tags: [],
  render: (args) => SplitPanelType(args as { type: 'horizontal' | 'vertical' }),
  argTypes: { type: splitPanelMeta?.argTypes?.type },
  args: { type: 'horizontal' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};