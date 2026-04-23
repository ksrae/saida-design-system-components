import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DividerType } from '../../sy-divider.main';
import dividerMeta from '../../sy-divider.stories';

const meta: Meta = {
  title: 'Divider/Attributes/Type',
  component: 'sy-divider',
  tags: [],
  render: (args) => DividerType(args as { type: 'horizontal' | 'vertical' }),
  argTypes: { type: dividerMeta?.argTypes?.type },
  args: { type: 'horizontal' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
