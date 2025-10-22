import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressCircularProps, ProgressCircularTooltipTitle } from '../../progress-circular';
import progressCircularMeta from '../../progress-circular.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Attributes/TooltipTitle',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressCircularTooltipTitle(args);
  },
  argTypes: {
    tooltipTitle: progressCircularMeta?.argTypes?.tooltipTitle,
  },
  args: {
    tooltipTitle: `This is tooltip`,
  }
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

export const Param: Story = {}