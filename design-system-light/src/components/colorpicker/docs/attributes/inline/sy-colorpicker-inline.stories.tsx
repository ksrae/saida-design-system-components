import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorpickerInline } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/Inline',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerInline(args as { inline: boolean }),
  argTypes: { inline: colorpickerMeta?.argTypes?.inline },
  args: { inline: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
