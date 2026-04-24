import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuDisabled } from '../../sy-menu.main';
import menuMeta from '../../sy-menu.stories';

const meta: Meta = {
  title: 'Menu/Attributes/Disabled',
  component: 'sy-menu',
  tags: [],
  render: (args) => MenuDisabled(args as { disabled: boolean }),
  argTypes: { disabled: menuMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
