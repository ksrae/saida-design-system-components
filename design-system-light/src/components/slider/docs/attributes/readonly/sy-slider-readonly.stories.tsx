import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SliderReadonly } from '../../sy-slider.main';
import sliderMeta from '../../sy-slider.stories';

const meta: Meta = {
  title: 'Slider/Attributes/Readonly',
  component: 'sy-slider',
  tags: [],
  render: (args) => SliderReadonly(args as { readonly: boolean }),
  argTypes: { readonly: sliderMeta?.argTypes?.readonly },
  args: { readonly: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};