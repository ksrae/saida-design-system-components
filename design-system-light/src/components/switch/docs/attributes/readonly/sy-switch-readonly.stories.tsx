import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SwitchReadonly } from '../../sy-switch.main';
import switchMeta from '../../sy-switch.stories';

const meta: Meta = {
  title: 'Switch/Attributes/Readonly',
  component: 'sy-switch',
  tags: [],
  render: (args) => SwitchReadonly(args as { readonly: boolean }),
  argTypes: { readonly: switchMeta?.argTypes?.readonly },
  args: { readonly: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};