import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectLoading } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Loading',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectLoading(args as { loading: boolean }),
  argTypes: { loading: selectMeta?.argTypes?.loading },
  args: { loading: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};