import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderMax } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Max',
  tags: ['false'],
  render: (args) => {
    return SliderMax(args);
  },
  argTypes: {
    max: sliderMeta?.argTypes?.max
  },
  args: {
    max: 10
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}