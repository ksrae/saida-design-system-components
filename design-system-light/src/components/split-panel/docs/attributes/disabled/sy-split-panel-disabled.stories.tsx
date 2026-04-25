import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SplitPanelDisabled } from '../../sy-split-panel.main';
import splitPanelMeta from '../../sy-split-panel.stories';

const meta: Meta = {
  title: 'SplitPanel/Attributes/Disabled',
  component: 'sy-split-panel',
  tags: [],
  render: (args) => SplitPanelDisabled(args as { disabled: boolean }),
  argTypes: { disabled: splitPanelMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};