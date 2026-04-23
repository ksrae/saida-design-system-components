import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionReadonly } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Readonly',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionReadonly(args as { readonly: boolean }),
  argTypes: { readonly: selectOptionMeta?.argTypes?.readonly },
  args: { readonly: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};