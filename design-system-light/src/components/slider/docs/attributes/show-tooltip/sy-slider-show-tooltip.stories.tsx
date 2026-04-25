import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderShowTooltip } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Show Tooltip',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderShowTooltip(args as { showTooltip: 'default' | 'always' | 'never' }),
  argTypes: { showTooltip: sliderMeta?.argTypes?.showTooltip },
  args: { showTooltip: 'always' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};