import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorpickerHideOpacity } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/Hide Opacity',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerHideOpacity(args as { hideOpacity: boolean }),
  argTypes: { hideOpacity: colorpickerMeta?.argTypes?.hideOpacity },
  args: { hideOpacity: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
