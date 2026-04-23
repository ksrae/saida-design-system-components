import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SliderReverse } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Reverse',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderReverse(args as { reverse: boolean }),
  argTypes: { reverse: sliderMeta?.argTypes?.reverse },
  args: { reverse: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};