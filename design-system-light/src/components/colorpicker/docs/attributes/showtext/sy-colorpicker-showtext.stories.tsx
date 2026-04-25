import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorpickerShowText } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/ShowText',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerShowText(args as { showText: boolean }),
  argTypes: { showText: colorpickerMeta?.argTypes?.showText },
  args: { showText: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
