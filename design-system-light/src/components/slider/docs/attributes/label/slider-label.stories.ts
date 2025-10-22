import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderLabel } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Label',
  tags: ['false'],
  render: (args) => {
    return SliderLabel(args);
  },
  argTypes: {
    label: sliderMeta?.argTypes?.label
  },
  args: {
    label: 'label'
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}