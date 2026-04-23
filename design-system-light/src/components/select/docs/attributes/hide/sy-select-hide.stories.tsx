import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectHide } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Hide',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectHide(args as { hide: boolean }),
  argTypes: { hide: selectMeta?.argTypes?.hide },
  args: { hide: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};