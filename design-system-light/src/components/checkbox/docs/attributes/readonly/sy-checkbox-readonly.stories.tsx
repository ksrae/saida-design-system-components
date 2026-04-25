import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CheckboxReadonly } from '../../sy-checkbox.main';
import checkboxMeta from '../../sy-checkbox.stories';

const meta: Meta = {
  title: 'Checkbox/Attributes/Readonly',
  component: 'sy-checkbox',
  tags: [],
  render: (args) => CheckboxReadonly(args as { readonly: boolean }),
  argTypes: { readonly: checkboxMeta?.argTypes?.readonly },
  args: { readonly: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
