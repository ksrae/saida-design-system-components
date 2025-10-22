import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressCircularHideText, ProgressCircularProps } from '../../progress-circular';
import progressCircularMeta from '../../progress-circular.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Attributes/Hide Text',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressCircularHideText(args);
  },
  argTypes: {
    hideText: progressCircularMeta?.argTypes?.hideText
  },
  args: {
    hideText: false
  }
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

export const Param: Story = {}