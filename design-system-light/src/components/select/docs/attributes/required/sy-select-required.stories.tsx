import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectRequired } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Required',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectRequired(args as { required: boolean }),
  argTypes: { required: selectMeta?.argTypes?.required },
  args: { required: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};