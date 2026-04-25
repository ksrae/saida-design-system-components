import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectReadonly } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Readonly',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectReadonly(args as { readonly: boolean }),
  argTypes: { readonly: selectMeta?.argTypes?.readonly },
  args: { readonly: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};