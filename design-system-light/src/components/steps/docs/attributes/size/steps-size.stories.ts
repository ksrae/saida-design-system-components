import type { Meta, StoryObj } from '@storybook/web-components';
import { StepsSize, StepsProps } from '../../steps';
import stepsMeta from '../../steps.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepsProps> = {
  title: 'Steps/Attributes/Steps/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepsSize(args);
  },
  argTypes: {
    size: stepsMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<StepsProps>;

export const Param: Story = {}
