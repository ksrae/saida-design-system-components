import type { Meta, StoryObj } from '@storybook/web-components';
import { StepSelected, StepsProps } from '../../steps';
import stepsMeta from '../../steps.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepsProps> = {
  title: 'Steps/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return StepSelected();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<StepsProps>;


export const Param: Story = {};