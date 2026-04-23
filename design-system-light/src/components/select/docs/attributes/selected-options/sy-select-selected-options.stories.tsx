import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectSelectedOptions } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Selected Options',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectSelectedOptions(args as { selectedOptions: { value: string; label?: string }[] }),
  argTypes: { selectedOptions: selectMeta?.argTypes?.selectedOptions },
  args: { selectedOptions: [] },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};