import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuOpened } from '../../sy-menu.main';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Events/Opened',
  component: 'sy-menu',
  tags: [],
  render: () => {
    clearElements(meta.title);
    return MenuOpened();
  },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
