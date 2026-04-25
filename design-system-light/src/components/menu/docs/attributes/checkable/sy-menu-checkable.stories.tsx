import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuCheckable } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Attributes/Checkable',
  component: 'sy-menu',
  tags: [],
  render: (args) => {
    clearElements(meta.title);
    return MenuCheckable(args as { checkable: boolean });
  },
  argTypes: { checkable: menuMeta?.argTypes?.checkable },
  args: { checkable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
