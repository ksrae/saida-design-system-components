import type { Meta, StoryObj } from '@storybook/web-components';
import { StepsClickable, StepsProps } from '../../steps';
import stepsMeta from '../../steps.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<StepsProps> = {
  title: 'Steps/Attributes/Steps/Clickable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return StepsClickable(args);
  },
  argTypes: {
    clickable: stepsMeta?.argTypes?.clickable
  },
  args: {
    clickable: true
  }
};

export default meta;
type Story = StoryObj<StepsProps>;

export const Param: Story = {}
