import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { IconSize } from '../../sy-icon.main';
import iconMeta from '../../sy-icon.stories';

const meta: Meta = {
  title: 'Icon/Attributes/Size',
  component: 'sy-icon',
  tags: [],
  render: (args) => IconSize(args as { size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' }),
  argTypes: { size: iconMeta?.argTypes?.size },
  args: { size: 'medium' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
