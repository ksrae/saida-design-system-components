import type { Meta, StoryObj } from '@storybook/web-components';
import { SplitPanelChanged, SplitPanelProps, SplitPanelType } from '../../split-panel';
import { clearElements } from '../../../../clear-element';
import splitPanelMeta from '../../split-panel.stories';

const meta: Meta<SplitPanelProps> = {
  title: 'SplitPanel/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SplitPanelChanged();
  },
  argTypes: {
    horizontalChanged: splitPanelMeta?.argTypes?.horizontalChanged,
    verticalChanged: splitPanelMeta?.argTypes?.verticalChanged,
  },
};

export default meta;
type Story = StoryObj<SplitPanelProps>;

export const Param: Story = {}
