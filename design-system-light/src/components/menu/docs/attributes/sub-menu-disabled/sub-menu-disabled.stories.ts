import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuSubDisabled, MenuSubProps } from '../../menu';
import { clearElements } from '../../../../clear-element';
import menuSubMeta from '../../menu-sub.stories';

const meta: Meta<MenuSubProps> = {
  title: 'Menu/Attributes/Sub-Menu Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return MenuSubDisabled(args);
  },
  argTypes: {
    disabled: menuSubMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<MenuSubProps>;

export const Param: Story = {}
