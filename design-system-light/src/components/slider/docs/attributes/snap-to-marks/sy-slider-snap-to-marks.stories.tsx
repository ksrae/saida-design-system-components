import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderSnapToMarks } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Snap To Marks',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderSnapToMarks(args as { snapToMarks: boolean }),
  argTypes: { snapToMarks: sliderMeta?.argTypes?.snapToMarks },
  args: { snapToMarks: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};