import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SliderValue } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Value',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderValue(args as { value: number }),
  argTypes: { value: sliderMeta?.argTypes?.value },
  args: { value: 30 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};