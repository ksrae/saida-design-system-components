import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TagManualClose } from '../../sy-tag.main';
import tagMeta from '../../sy-tag.stories';

const meta: Meta = {
  title: 'Tag/Attributes/Manual Close',
  component: 'sy-tag',
  tags: [],
  render: (args) => TagManualClose(args as { manualClose: boolean }),
  argTypes: { manualClose: tagMeta?.argTypes?.manualClose },
  args: { manualClose: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
