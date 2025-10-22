import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderRangeValue } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/RangeValue',
  tags: ['false'],
  render: (args) => {
    return SliderRangeValue();
  },
  argTypes: {

  },
  args: {

  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}