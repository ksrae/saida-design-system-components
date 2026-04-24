import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputReadonly } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Readonly',
  component: 'sy-input',
  tags: [],
  render: (args) => InputReadonly(args as { readonly: boolean }),
  argTypes: { readonly: inputMeta?.argTypes?.readonly },
  args: { readonly: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
