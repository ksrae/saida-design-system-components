import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectDefaultValue } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Default Value',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectDefaultValue(args as { defaultValue: string }),
  argTypes: { defaultValue: selectMeta?.argTypes?.defaultValue },
  args: { defaultValue: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};