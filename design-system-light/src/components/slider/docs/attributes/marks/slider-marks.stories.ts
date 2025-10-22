import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderMarks } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Marks',
  tags: ['false'],
  render: (args) => {
    return SliderMarks();
  },
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}