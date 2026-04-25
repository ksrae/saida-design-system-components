import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderRange } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Range',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderRange(args as { range: boolean }),
  argTypes: { range: sliderMeta?.argTypes?.range },
  args: { range: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};