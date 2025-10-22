import type { Meta, StoryObj } from '@storybook/web-components';
import { StepsCurrent, StepsProps } from '../../steps';
import stepsMeta from '../../steps.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepsProps> = {
  title: 'Steps/Attributes/Steps/Current',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepsCurrent(args);
  },
  argTypes: {
    current: stepsMeta?.argTypes?.current
  },
  args: {
    current: 1
  }
};

export default meta;
type Story = StoryObj<StepsProps>;

export const Param: Story = {}
