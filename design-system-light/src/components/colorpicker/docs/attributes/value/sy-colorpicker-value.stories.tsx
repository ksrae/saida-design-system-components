import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorpickerValue } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/Value',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerValue(args as { value: string }),
  argTypes: { value: colorpickerMeta?.argTypes?.value },
  args: { value: '#3366ff' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
