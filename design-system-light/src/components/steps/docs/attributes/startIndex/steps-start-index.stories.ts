import type { Meta, StoryObj } from '@storybook/web-components';
import { StepsStartIndex, StepsProps } from '../../steps';
import stepsMeta from '../../steps.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepsProps> = {
  title: 'Steps/Attributes/Steps/StartIndex',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepsStartIndex(args);
  },
  argTypes: {
    startIndex: stepsMeta?.argTypes?.startIndex,
    current: stepsMeta?.argTypes?.current
  },
  args: {
    startIndex: 2,
    current: 3
  }
};

export default meta;
type Story = StoryObj<StepsProps>;

export const Param: Story = {}
