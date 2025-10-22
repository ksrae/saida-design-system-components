import type { Meta, StoryObj } from '@storybook/web-components';
import { SplitPanelProps, SplitPanelRatio } from '../../split-panel';
import { clearElements } from '../../../../clear-element';
import splitPanelMeta from '../../split-panel.stories';

const meta: Meta<SplitPanelProps> = {
  title: 'SplitPanel/Attributes/Ratio',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SplitPanelRatio(args);
  },
  argTypes: {
    ratio: splitPanelMeta?.argTypes?.ratio
  },
  args: {
    ratio: 50
  }
};

export default meta;
type Story = StoryObj<SplitPanelProps>;

export const Param: Story = {}
