import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyNavItemProps, NavItem } from './sy-nav.main';
import { clearElements } from '../../clear-element';

const navItemMeta: Meta<SyNavItemProps> = {
  title: 'Nav/Item Overview',
  component: 'sy-nav-item',
  tags: [],
  render: (args) => { clearElements(navItemMeta.title); return NavItem(args); },
  // `depth` is computed internally from the parent element chain — not
  // exposed as a user control.
  argTypes: {
    value: { control: 'text', table: { category: 'Parameter', type: { summary: 'string' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
  },
};
export default navItemMeta;
type Story = StoryObj<SyNavItemProps>;
export const Default: Story = { args: { value: 'x', disabled: false } as any };
