import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { RadioReadonly } from '../../sy-radio.main';
import radioMeta from '../../sy-radio.stories';

const meta: Meta = {
  title: 'Radio/Attributes/Readonly',
  component: 'sy-radio',
  tags: [],
  render: (args) => RadioReadonly(args as { readonly: boolean }),
  argTypes: { readonly: radioMeta?.argTypes?.readonly },
  args: { readonly: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};