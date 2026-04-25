import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderHideTrackFill } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Hide Track Fill',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderHideTrackFill(args as { hideTrackFill: boolean }),
  argTypes: { hideTrackFill: sliderMeta?.argTypes?.hideTrackFill },
  args: { hideTrackFill: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};