import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerProps, ColorpickerHideOpacity } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Attributes/HideOpacity',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerHideOpacity(args);
  },
  argTypes: {
    hideOpacity: colorpickerMeta?.argTypes?.hideOpacity,
  },
  args: {
    hideOpacity: true
  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}