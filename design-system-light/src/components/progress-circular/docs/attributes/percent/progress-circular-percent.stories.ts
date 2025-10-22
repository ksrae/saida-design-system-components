import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressCircularPercent, ProgressCircularProps } from '../../progress-circular';
import progressCircularMeta from '../../progress-circular.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Attributes/Percent',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressCircularPercent(args);
  },
  argTypes: {
    percent: progressCircularMeta?.argTypes?.percent
  },
  args: {
    percent: 100
  }
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

export const Param: Story = {}