import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { NavSubOpen } from '../../sy-nav-sub.main';
import navSubMeta from '../../sy-nav-sub.stories';

const meta: Meta = {
  title: 'Nav/Sub Attributes/Open',
  component: 'sy-nav-sub',
  tags: [],
  render: (args) => NavSubOpen(args as { open: boolean }),
  argTypes: { open: navSubMeta?.argTypes?.open },
  args: { open: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};