import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, SliderStep } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Step',
  tags: ['false'],
  argTypes: {
    step: sliderMeta?.argTypes?.step,
  }
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Default: Story = {
  render: (args) => SliderStep(args),
  args: {
    step:1,
    min:0,
    max:100,
    value:50
  }, 
}

export const SmallStep: Story = {
  render: (args) => SliderStep(args),
  args: {
   step: 0.0000001,
   min:0,
   max: 0.000001,
   value: 0.0000005
  }, 
}

export const FloatStep: Story = {
  render: (args) => SliderStep(args),
  args: {
    step:1.50,
    min:0,
    max:15,
    value:7.5
  }, 
}