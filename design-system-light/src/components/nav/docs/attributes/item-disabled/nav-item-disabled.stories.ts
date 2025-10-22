import type { Meta, StoryObj } from '@storybook/web-components';
import { NavItemDisabled, NavItemProps } from '../../nav';
import { clearElements } from '../../../../clear-element';
import navItemMeta from '../../nav-item.stories';
import { html } from 'lit';

const meta: Meta<NavItemProps> = {
  title: 'NavigationMenu/Attributes/Nav-Item Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return NavItemDisabled(args);
  },
  argTypes: {
    disabled: navItemMeta?.argTypes?.disabled
  },
  args: {
    disabled: false
  }
};

export default meta;
type Story = StoryObj<NavItemProps>;

export const Param: Story = {}
