import type { Meta, StoryObj } from '@storybook/web-components';
import { StepsComplete, StepsProps } from '../../steps';
import stepsMeta from '../../steps.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepsProps> = {
  title: 'Steps/Attributes/Steps/Complete',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepsComplete(args);
  },
  argTypes: {
    complete: stepsMeta?.argTypes?.complete
  },
  args: {
    complete: true
  }
};

export default meta;
type Story = StoryObj<StepsProps>;

export const Param: Story = {}
