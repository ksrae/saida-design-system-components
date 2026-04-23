import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectPlaceholder } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Placeholder',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectPlaceholder(args as { placeholder: string }),
  argTypes: { placeholder: selectMeta?.argTypes?.placeholder },
  args: { placeholder: 'Select' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};