import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuDisabled } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Attributes/Disabled',
  component: 'sy-menu',
  tags: [],
  render: (args) => {
    clearElements(meta.title);
    return MenuDisabled(args as { disabled: boolean });
  },
  argTypes: { disabled: menuMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
