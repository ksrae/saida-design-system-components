import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuLoading } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Attributes/Loading',
  component: 'sy-menu',
  tags: [],
  render: (args) => {
    clearElements(meta.title);
    return MenuLoading(args as { loading: boolean });
  },
  argTypes: { loading: menuMeta?.argTypes?.loading },
  args: { loading: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
