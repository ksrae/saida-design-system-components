import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { FlexWidth } from '../../sy-flex.main';
import flexMeta from '../../sy-flex.stories';

const meta: Meta = {
  title: 'Flex/Attributes/Width',
  component: 'sy-flex',
  tags: [],
  render: (args) => FlexWidth(args as { width: string }),
  argTypes: { width: flexMeta?.argTypes?.width },
  args: { width: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};