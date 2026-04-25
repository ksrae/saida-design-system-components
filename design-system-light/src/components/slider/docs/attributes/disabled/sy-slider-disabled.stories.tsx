import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderDisabled } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Disabled',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderDisabled(args as { disabled: boolean }),
  argTypes: { disabled: sliderMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};