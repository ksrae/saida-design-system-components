import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { FlexWrap } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Wrap',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexWrap(args as { wrap: 'nowrap' | 'wrap' | 'wrap-reverse' }),
  argTypes: { wrap: flexMeta?.argTypes?.wrap },
  args: { wrap: 'nowrap' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};