import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, TooltipValue } from '../../slider';
import sliderMeta from '../../slider.stories';

const meta: Meta<SilderProps> = {
  title: 'Slider/Attributes/Value',
  tags: ['false'],
  argTypes: {
    value: sliderMeta?.argTypes?.value,
  },
  args: {
    value: 50,
  },
  render: (args) => TooltipValue(args),
};

export default meta;
type Story = StoryObj<SilderProps>;

export const Default: Story = {}


