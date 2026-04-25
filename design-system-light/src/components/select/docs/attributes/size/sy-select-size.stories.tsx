import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectSize } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Size',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: selectMeta?.argTypes?.size },
  args: { size: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};