import type { Meta, StoryObj } from '@storybook/web-components';
import { SplitPanelProps, SplitPanelType } from '../../split-panel';
import { clearElements } from '../../../../clear-element';
import splitPanelMeta from '../../split-panel.stories';

const meta: Meta<SplitPanelProps> = {
  title: 'SplitPanel/Attributes/Type',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SplitPanelType(args);
  },
  argTypes: {
    type: splitPanelMeta?.argTypes?.type
  },
  args: {
    type: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<SplitPanelProps>;

export const Param: Story = {}
