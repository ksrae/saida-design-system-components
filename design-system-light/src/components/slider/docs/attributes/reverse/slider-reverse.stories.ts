import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderReverse } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Reverse',
  tags: ['false'],
  render: (args) => {
    return SliderReverse(args);
  },
  argTypes: {
    reverse: sliderMeta?.argTypes?.reverse
  },
  args: {
    reverse: true
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}