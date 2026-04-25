import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorpickerDisabled } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/Disabled',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerDisabled(args as { disabled: boolean }),
  argTypes: { disabled: colorpickerMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
