import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderChangedEvent, SliderRangeChangedEvent } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Events/Changed',
  tags: ['false'],
  argTypes: {
    changed: sliderMeta?.argTypes?.changed
  },
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Default: Story = {
  render: () => {
    return SliderChangedEvent();
  }
}

export const Range: Story = {
  render: () => {
    return SliderRangeChangedEvent();
  }
}