import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SliderTooltipPlacement } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Tooltip Placement',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderTooltipPlacement(args as { tooltipPlacement: 'top' | 'bottom' | 'right' | 'left' }),
  argTypes: { tooltipPlacement: sliderMeta?.argTypes?.tooltipPlacement },
  args: { tooltipPlacement: 'bottom' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};