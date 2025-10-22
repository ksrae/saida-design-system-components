import type { Meta, StoryObj } from '@storybook/web-components';
import { StepProps, StepStatus } from '../../steps';
import stepMeta from '../../step.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepProps> = {
  title: 'Steps/Attributes/Step Item/Status',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepStatus(args);
  },
  argTypes: {
    status: stepMeta?.argTypes?.status
  },
  args: {
    status: 'none'
  }
};

export default meta;
type Story = StoryObj<StepProps>;

export const Param: Story = {}
