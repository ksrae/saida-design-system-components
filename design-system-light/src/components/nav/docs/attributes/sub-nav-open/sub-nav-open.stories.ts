import type { Meta, StoryObj } from '@storybook/web-components';
import { NavSubOpen, NavSubProps } from '../../nav';
import { clearElements } from '../../../../clear-element';
import navSubMeta from '../../nav-sub.stories';

const meta: Meta<NavSubProps> = {
  title: 'NavigationMenu/Attributes/Sub-Nav Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return NavSubOpen(args);
  },
  argTypes: {
    open: navSubMeta?.argTypes?.open
  },
  args: {
    open: true
  }
};

export default meta;
type Story = StoryObj<NavSubProps>;

export const Param: Story = {}
