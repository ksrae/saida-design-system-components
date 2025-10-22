import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressCircularProps, ProgressCircularStatus } from '../../progress-circular';
import progressCircularMeta from '../../progress-circular.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Attributes/Status',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressCircularStatus(args);
  },
  argTypes: {
    status: progressCircularMeta?.argTypes?.status
  },
  args: {
    status: 'default'
  }
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

export const Param: Story = {}