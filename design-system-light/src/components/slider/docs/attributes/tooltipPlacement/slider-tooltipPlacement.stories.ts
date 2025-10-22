import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, TooltipPlacement } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/TooltipPlacement',
  tags: ['false'],
  argTypes: {
    tooltipPlacement: sliderMeta?.argTypes?.tooltipPlacement,
  },
  args: {
    tooltipPlacement: 'top'
  },
  render: (args) => TooltipPlacement(args),
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Default: Story = {}


