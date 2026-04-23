import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SliderMax } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Max',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderMax(args as { max: number }),
  argTypes: { max: sliderMeta?.argTypes?.max },
  args: { max: 80 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};