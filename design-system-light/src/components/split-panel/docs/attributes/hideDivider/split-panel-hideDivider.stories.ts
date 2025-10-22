import type { Meta, StoryObj } from '@storybook/web-components';
import { SplitPanelHideDivider, SplitPanelProps } from '../../split-panel';
import { clearElements } from '../../../../clear-element';
import splitPanelMeta from '../../split-panel.stories';

const meta: Meta<SplitPanelProps> = {
  title: 'SplitPanel/Attributes/HideDivider',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SplitPanelHideDivider(args);
  },
  argTypes: {
    hideDivider: splitPanelMeta?.argTypes?.hideDivider,
  },
  args: {
    hideDivider: true,
  }
};

export default meta;
type Story = StoryObj<SplitPanelProps>;

export const Param: Story = {}
