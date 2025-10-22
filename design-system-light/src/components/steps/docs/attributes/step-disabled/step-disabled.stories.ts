import type { Meta, StoryObj } from '@storybook/web-components';
import { StepDisabled, StepProps } from '../../steps';
import stepMeta from '../../step.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepProps> = {
  title: 'Steps/Attributes/Step Item/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepDisabled(args);
  },
  argTypes: {
    disabled: stepMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<StepProps>;

export const Param: Story = {}
