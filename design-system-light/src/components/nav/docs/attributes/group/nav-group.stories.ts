import type { Meta, StoryObj } from '@storybook/web-components';
import { NavProps, NavGroup } from '../../nav';
import navMeta from '../../nav.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<NavProps> = {
  title: 'NavigationMenu/Attributes/Group',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return NavGroup();
  },
  argTypes: {
    // hidden: menuMeta?.argTypes?.hidden
  },
};

export default meta;
type Story = StoryObj<NavProps>;

export const Param: Story = {}
