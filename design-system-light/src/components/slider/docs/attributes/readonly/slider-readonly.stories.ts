import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderReadonly } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    return SliderReadonly(args);
  },
  argTypes: {
    readonly: sliderMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Param: Story = {}