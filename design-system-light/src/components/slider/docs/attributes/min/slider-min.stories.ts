import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderMin } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Min',
  tags: ['false'],
  render: (args) => {
    return SliderMin(args);
  },
  argTypes: {
    min: sliderMeta?.argTypes?.min
  },
  args: {
    min: 50
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}