import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderStep } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Step',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderStep(args as { step: number }),
  argTypes: { step: sliderMeta?.argTypes?.step },
  args: { step: 5 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};