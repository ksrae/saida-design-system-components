import type { Meta, StoryObj } from '@storybook/web-components';
import { SplitPanelDisabled, SplitPanelProps } from '../../split-panel';
import { clearElements } from '../../../../clear-element';
import splitPanelMeta from '../../split-panel.stories';

const meta: Meta<SplitPanelProps> = {
  title: 'SplitPanel/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return SplitPanelDisabled(args);
  },
  argTypes: {
    disabled: splitPanelMeta?.argTypes?.disabled,
  },
  args: {
    disabled: true,
  }
};

export default meta;
type Story = StoryObj<SplitPanelProps>;

export const Param: Story = {}
