import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderRangeSnapToMarks, SliderSnapToMarks } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/SnapToMarks',
  tags: ['false'],
  argTypes: {
    snapToMarks: sliderMeta?.argTypes?.snapToMarks,
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Default: Story = {
  render: (args) => SliderSnapToMarks(args),
  args: {
   snapToMarks: true
  }, 
}

export const Range: Story = {
  render: (args) => SliderRangeSnapToMarks(args),
  args: {
   snapToMarks: true
  }, 
}