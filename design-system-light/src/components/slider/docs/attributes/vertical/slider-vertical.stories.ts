import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, VerticalSlider } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Vertical',
  tags: ['false'],
  argTypes: {
    vertical: sliderMeta?.argTypes?.vertical,
  },
  args: {
    vertical: true,
  },
  render: (args) => VerticalSlider(args),
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Default: Story = {}


