import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderDiabled } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    return SliderDiabled(args);
  },
  argTypes: {
    disabled: sliderMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}