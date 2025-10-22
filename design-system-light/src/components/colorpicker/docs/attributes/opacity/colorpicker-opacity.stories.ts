import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerProps, ColorpickerOpacity } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Attributes/Opacity',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerOpacity(args);
  },
  argTypes: {
    opacity: colorpickerMeta?.argTypes?.opacity,
  },
  args: {
    opacity: 1,
  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}