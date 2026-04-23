import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectEmpty } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Empty',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectEmpty(args as { empty: boolean }),
  argTypes: { empty: selectMeta?.argTypes?.empty },
  args: { empty: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};