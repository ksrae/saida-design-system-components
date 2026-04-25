import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { NavGroupTitle } from '../../sy-nav-group.main';
import navGroupMeta from '../../sy-nav-group.stories';

const meta: Meta = {
  title: 'Nav/Group Attributes/Title',
  component: 'sy-nav-group',
  tags: [],
  render: (args) => NavGroupTitle(args as { title: string }),
  argTypes: { title: navGroupMeta?.argTypes?.title },
  args: { title: 'Settings' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};