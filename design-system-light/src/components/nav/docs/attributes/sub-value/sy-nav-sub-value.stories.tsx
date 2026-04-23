import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavSubValue } from '../../sy-nav-sub.main';
import navSubMeta from '../../sy-nav-sub.stories';

const meta: Meta = {
  title: 'Nav/Sub Attributes/Value',
  component: 'sy-nav-sub',
  tags: [],
  render: (args) => NavSubValue(args as { value: string }),
  argTypes: { value: navSubMeta?.argTypes?.value },
  args: { value: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};