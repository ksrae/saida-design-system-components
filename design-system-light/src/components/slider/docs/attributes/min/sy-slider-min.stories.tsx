import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderMin } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Min',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderMin(args as { min: number }),
  argTypes: { min: sliderMeta?.argTypes?.min },
  args: { min: 10 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};