import type { Meta, StoryObj } from '@storybook/web-components';
import { NavProps, SubNav } from '../../nav';
import navMeta from '../../nav.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<NavProps> = {
  title: 'NavigationMenu/Attributes/Sub-Nav',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return SubNav();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<NavProps>;

export const Param: Story = {}
