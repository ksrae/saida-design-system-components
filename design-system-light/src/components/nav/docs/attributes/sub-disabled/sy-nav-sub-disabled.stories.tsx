import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavSubDisabled } from '../../sy-nav-sub.main';
import navSubMeta from '../../sy-nav-sub.stories';

const meta: Meta = {
  title: 'Nav/Sub Attributes/Disabled',
  component: 'sy-nav-sub',
  tags: [],
  render: (args) => NavSubDisabled(args as { disabled: boolean }),
  argTypes: { disabled: navSubMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};