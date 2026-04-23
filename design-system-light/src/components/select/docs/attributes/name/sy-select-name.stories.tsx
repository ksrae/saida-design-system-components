import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectName } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Name',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectName(args as { name: string }),
  argTypes: { name: selectMeta?.argTypes?.name },
  args: { name: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};