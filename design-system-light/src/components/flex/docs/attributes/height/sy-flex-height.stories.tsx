import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { FlexHeight } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Height',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexHeight(args as { height: string }),
  argTypes: { height: flexMeta?.argTypes?.height },
  args: { height: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};