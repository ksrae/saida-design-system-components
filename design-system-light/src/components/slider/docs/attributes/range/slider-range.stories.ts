import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderRange } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Range',
  tags: ['false'],
  render: (args) => {
    return SliderRange(args);
  },
  argTypes: {
    range: sliderMeta?.argTypes?.range
  },
  args: {
    range: true
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}