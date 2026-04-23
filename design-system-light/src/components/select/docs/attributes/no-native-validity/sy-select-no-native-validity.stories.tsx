import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectNoNativeValidity } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/No Native Validity',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectNoNativeValidity(args as { noNativeValidity: boolean }),
  argTypes: { noNativeValidity: selectMeta?.argTypes?.noNativeValidity },
  args: { noNativeValidity: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};