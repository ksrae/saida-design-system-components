import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SliderHideMarks } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Hide Marks',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderHideMarks(args as { hideMarks: boolean }),
  argTypes: { hideMarks: sliderMeta?.argTypes?.hideMarks },
  args: { hideMarks: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};