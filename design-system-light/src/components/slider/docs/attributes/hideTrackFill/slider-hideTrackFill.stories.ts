import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderHideTrackFill } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/HideTrackFill',
  tags: ['false'],
  render: (args) => {
    return SliderHideTrackFill(args);
  },
  argTypes: {
    hideTrackFill: sliderMeta?.argTypes?.hideTrackFill
  },
  args: {
    hideTrackFill: true
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}