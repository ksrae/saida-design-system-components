import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerChanged, ColorpickerProps } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Events/Chagned',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerChanged();
  },
  argTypes: {

  },
  args: {

  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}