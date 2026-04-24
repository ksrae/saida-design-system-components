import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuTrigger } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';

const meta: Meta = {
  title: 'Menu/Attributes/Trigger',
  component: 'sy-menu',
  tags: [],
  render: (args) => MenuTrigger(args as { trigger: 'hover' | 'click' | 'contextmenu' }),
  argTypes: { trigger: menuMeta?.argTypes?.trigger },
  args: { trigger: 'click' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
