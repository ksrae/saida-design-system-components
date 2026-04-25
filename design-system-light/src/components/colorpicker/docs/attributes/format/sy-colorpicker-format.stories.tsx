import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorpickerFormat } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/Format',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerFormat(args as { format: 'hex'|'hsb'|'rgb' }),
  argTypes: { format: colorpickerMeta?.argTypes?.format },
  args: { format: 'hex' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
