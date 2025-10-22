import type { Meta, StoryObj } from '@storybook/web-components';
import { NavProps, NavItemSelected } from '../../nav';
import navMeta from '../../nav.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<NavProps> = {
  title: 'NavigationMenu/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return NavItemSelected();
  },
  argTypes: {
    selected: navMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<NavProps>;

export const Param: Story = {}
