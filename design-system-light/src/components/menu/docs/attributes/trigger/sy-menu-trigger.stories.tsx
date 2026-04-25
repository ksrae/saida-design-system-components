import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuTrigger } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Attributes/Trigger',
  component: 'sy-menu',
  tags: [],
  render: (args) => {
    clearElements(meta.title);
    return MenuTrigger(args as { trigger: 'hover' | 'click' | 'contextmenu' });
  },
  argTypes: { trigger: menuMeta?.argTypes?.trigger },
  args: { trigger: 'click' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
