import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressCircularProps, ProgressCircularSize } from '../../progress-circular';
import progressCircularMeta from '../../progress-circular.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressCircularSize(args);
  },
  argTypes: {
    size: progressCircularMeta?.argTypes?.size
  },
  args: {
    size: 'medium',
  }
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

export const Param: Story = {}