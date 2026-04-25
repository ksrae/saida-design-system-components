import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberReadonly } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Readonly',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberReadonly(args as { readonly: boolean }),
  argTypes: { readonly: inputNumberMeta?.argTypes?.readonly },
  args: { readonly: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
