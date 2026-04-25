import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorpickerReadonly } from '../../sy-colorpicker.main';
import colorpickerMeta from '../../sy-colorpicker.stories';

const meta: Meta = {
  title: 'Colorpicker/Attributes/Readonly',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => ColorpickerReadonly(args as { readonly: boolean }),
  argTypes: { readonly: colorpickerMeta?.argTypes?.readonly },
  args: { readonly: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
