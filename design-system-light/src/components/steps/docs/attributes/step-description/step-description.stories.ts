import type { Meta, StoryObj } from '@storybook/web-components';
import { StepDescription, StepProps } from '../../steps';
import stepMeta from '../../step.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepProps> = {
  title: 'Steps/Attributes/Step Item/Description',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepDescription(args);
  },
  argTypes: {
    description: stepMeta?.argTypes?.description
  },
  args: {
    description: 'Step Description'
  }
};

export default meta;
type Story = StoryObj<StepProps>;

export const Param: Story = {}
