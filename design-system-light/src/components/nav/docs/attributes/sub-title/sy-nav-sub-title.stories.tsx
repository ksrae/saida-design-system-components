import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { NavSubTitle } from '../../sy-nav-sub.main';
import navSubMeta from '../../sy-nav-sub.stories';

const meta: Meta = {
  title: 'Nav/Sub Attributes/Title',
  component: 'sy-nav-sub',
  tags: [],
  render: (args) => NavSubTitle(args as { title: string }),
  argTypes: { title: navSubMeta?.argTypes?.title },
  args: { title: 'Submenu' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};