import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { FlexRowGap } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Row Gap',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexRowGap(args as { rowGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' }),
  argTypes: { rowGap: flexMeta?.argTypes?.rowGap },
  args: { rowGap: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};