import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ColorpickerOpacity } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/Opacity',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerOpacity(args as { opacity: number }),
  argTypes: { opacity: colorpickerMeta?.argTypes?.opacity },
  args: { opacity: 0.5 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
