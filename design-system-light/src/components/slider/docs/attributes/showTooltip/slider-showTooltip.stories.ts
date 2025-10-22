import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderShowTooltip } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/ShowTooltip',
  tags: ['false'],
  render: (args) => {
    return SliderShowTooltip(args);
  },
  argTypes: {
    showTooltip: sliderMeta?.argTypes?.showTooltip
  },
  args: {
    showTooltip: 'default'
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}