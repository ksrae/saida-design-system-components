import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderRangeValue } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Range Value',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderRangeValue(args as { rangeValue: number[] }),
  argTypes: { rangeValue: sliderMeta?.argTypes?.rangeValue },
  args: { rangeValue: [20,60] },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};