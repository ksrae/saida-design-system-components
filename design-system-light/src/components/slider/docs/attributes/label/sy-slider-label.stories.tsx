import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SliderLabel } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Label',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderLabel(args as { label: string }),
  argTypes: { label: sliderMeta?.argTypes?.label },
  args: { label: 'My Slider' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};