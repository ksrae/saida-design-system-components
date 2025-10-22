import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerProps, ColorpickerShowText } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Attributes/ShowText',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerShowText(args);
  },
  argTypes: {
    showText: colorpickerMeta?.argTypes?.showText
  },
  args: {
    showText: true
  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}