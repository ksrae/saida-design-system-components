import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectIsTreeSelect } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Is Tree Select',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectIsTreeSelect(args as { isTreeSelect: boolean }),
  argTypes: { isTreeSelect: selectMeta?.argTypes?.isTreeSelect },
  args: { isTreeSelect: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};