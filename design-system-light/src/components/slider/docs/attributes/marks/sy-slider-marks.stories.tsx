import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderMarks } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Marks',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderMarks(args as { marks: { [key: number]: string } }),
  argTypes: { marks: sliderMeta?.argTypes?.marks },
  args: { marks: { 0: '0', 50: '50', 100: '100' } },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
