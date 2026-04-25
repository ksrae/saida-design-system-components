import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyNavProps, Nav } from './sy-nav.main';
import { clearElements } from '../../clear-element';

const navMeta: Meta<SyNavProps> = {
  title: 'Nav/Overview',
  component: 'sy-nav',
  tags: [],
  render: (args) => { clearElements(navMeta.title); return Nav(args); },
  argTypes: {
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
  },
};
export default navMeta;
type Story = StoryObj<SyNavProps>;
export const Default: Story = { args: { disabled: false } as any };
