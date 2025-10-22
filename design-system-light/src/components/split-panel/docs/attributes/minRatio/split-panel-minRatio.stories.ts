import type { Meta, StoryObj } from '@storybook/web-components';
import { SplitPanelMinRatio, SplitPanelProps } from '../../split-panel';
import { clearElements } from '../../../../clear-element';
import splitPanelMeta from '../../split-panel.stories';

const meta: Meta<SplitPanelProps> = {
  title: 'SplitPanel/Attributes/MinRatio',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SplitPanelMinRatio(args);
  },
  argTypes: {
    minRatio: splitPanelMeta?.argTypes?.minRatio,
  },
  args: {
    minRatio: 25,
  }
};

export default meta;
type Story = StoryObj<SplitPanelProps>;

export const Param: Story = {}
