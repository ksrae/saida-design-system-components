import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderHideMarks } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/HideMarks',
  tags: ['false'],
  render: (args) => {
    return SliderHideMarks(args);
  },
  argTypes: {
    hideMarks: sliderMeta?.argTypes?.hideMarks
  },
  args: {
    hideMarks: true
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}