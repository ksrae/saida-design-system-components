import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { FlexColumnGap } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Column Gap',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexColumnGap(args as { columnGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' }),
  argTypes: { columnGap: flexMeta?.argTypes?.columnGap },
  args: { columnGap: 'medium' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};