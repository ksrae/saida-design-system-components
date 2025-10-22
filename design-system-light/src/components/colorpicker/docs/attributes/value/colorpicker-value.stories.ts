import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerProps, ColorpickerValue } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Attributes/Value',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerValue(args);
  },
  argTypes: {
    value: colorpickerMeta?.argTypes?.value,
  },
  args: {
    value: '#ff0000',
  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}