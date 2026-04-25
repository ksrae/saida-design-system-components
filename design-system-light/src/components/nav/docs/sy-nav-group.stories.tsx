import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyNavGroupProps, NavGroup } from './sy-nav.main';
import { clearElements } from '../../clear-element';

const navGroupMeta: Meta<SyNavGroupProps> = {
  title: 'Nav/Group Overview',
  component: 'sy-nav-group',
  tags: [],
  render: (args) => { clearElements(navGroupMeta.title); return NavGroup(args); },
  // `depth` is computed internally from the parent element chain — exposing
  // it as a user-editable control would be misleading.
  argTypes: {
    title: { control: 'text', table: { category: 'Parameter', type: { summary: 'string' } } } as any,
  },
};
export default navGroupMeta;
type Story = StoryObj<SyNavGroupProps>;
export const Default: Story = { args: { title: 'Group' } as any };
