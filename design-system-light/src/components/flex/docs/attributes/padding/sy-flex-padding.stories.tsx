import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { FlexPadding } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Padding',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexPadding(args as { padding: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' }),
  argTypes: { padding: flexMeta?.argTypes?.padding },
  args: { padding: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};