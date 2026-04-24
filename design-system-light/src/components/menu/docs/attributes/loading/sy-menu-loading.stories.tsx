import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuLoading } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';

const meta: Meta = {
  title: 'Menu/Attributes/Loading',
  component: 'sy-menu',
  tags: [],
  render: (args) => MenuLoading(args as { loading: boolean }),
  argTypes: { loading: menuMeta?.argTypes?.loading },
  args: { loading: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
