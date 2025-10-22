import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { ColorpickerProps, ColorpickerReadonly } from '../../colorpicker';
import colorpickerMeta from '../../colorpicker.stories';

const meta: Meta<ColorpickerProps> = {
  title: 'Colorpicker/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ColorpickerReadonly(args);
  },
  argTypes: {
    readonly: colorpickerMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<ColorpickerProps>;

export const Param: Story = {}