import type { Meta, StoryObj } from '@storybook/web-components';
import { StepLoading, StepProps } from '../../steps';
import stepMeta from '../../step.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepProps> = {
  title: 'Steps/Attributes/Step Item/Loading',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepLoading(args);
  },
  argTypes: {
    loading: stepMeta?.argTypes?.loading
  },
  args: {
    loading: true
  }
};

export default meta;
type Story = StoryObj<StepProps>;

export const Param: Story = {}
