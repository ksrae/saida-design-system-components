import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopconfirmSetOpenClose } from '../../sy-popconfirm.main';

const meta: Meta = {
  title: 'Popconfirm/Methods/Set Close',
  component: 'sy-popconfirm',
  tags: [],
  render: () => PopconfirmSetOpenClose(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};