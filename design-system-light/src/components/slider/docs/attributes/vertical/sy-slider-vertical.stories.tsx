import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SliderVertical } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Vertical',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderVertical(args as { vertical: boolean }),
  argTypes: { vertical: sliderMeta?.argTypes?.vertical },
  args: { vertical: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};