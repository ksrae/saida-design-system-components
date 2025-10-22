import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerProps, ColorpickerFormat } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Attributes/Format',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerFormat(args);
  },
  argTypes: {
    format: colorpickerMeta?.argTypes?.format,
  },
  args: {
    format: 'hex',
  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}