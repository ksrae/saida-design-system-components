import type { Meta, StoryObj } from '@storybook/web-components';
import { NavSubDisabled, NavSubProps } from '../../nav';
import { clearElements } from '../../../../clear-element';
import navSubMeta from '../../nav-sub.stories';

const meta: Meta<NavSubProps> = {
  title: 'NavigationMenu/Attributes/Sub-Nav Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return NavSubDisabled(args);
  },
  argTypes: {
    disabled: navSubMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<NavSubProps>;

export const Param: Story = {}
