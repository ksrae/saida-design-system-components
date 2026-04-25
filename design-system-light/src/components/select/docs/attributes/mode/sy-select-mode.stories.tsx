import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectMode } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Mode',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectMode(args as { mode: 'default' | 'searchable' | 'multiple' | 'tag' }),
  argTypes: { mode: selectMeta?.argTypes?.mode },
  args: { mode: 'default' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};