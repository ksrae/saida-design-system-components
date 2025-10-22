import type { Meta, StoryObj } from '@storybook/web-components';
import {ProgressCircularIndeterminate, ProgressCircularProps } from '../../progress-circular';
import progressCircularMeta from '../../progress-circular.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Attributes/Indeterminate',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ProgressCircularIndeterminate(args);
  },
  argTypes: {
    indeterminate: progressCircularMeta?.argTypes?.indeterminate
  },
  args: {
    indeterminate: false
  }
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

export const Param: Story = {}