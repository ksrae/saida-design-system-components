import type { Meta, StoryObj } from '@storybook/web-components';
import { StepsType, StepsProps } from '../../steps';
import stepsMeta from '../../steps.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepsProps> = {
  title: 'Steps/Attributes/Steps/Type',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepsType(args);
  },
  argTypes: {
    type: stepsMeta?.argTypes?.type
  },
  args: {
    type: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<StepsProps>;

export const Param: Story = {}
