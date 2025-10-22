import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerInline, ColorpickerProps } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Attributes/Inline',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerInline(args);
  },
  argTypes: {
    inline: colorpickerMeta?.argTypes?.inline,
  },
  args: {
    inline: true
  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}