import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyNavSubProps, NavSub } from './sy-nav.main';
import { clearElements } from '../../clear-element';

const navSubMeta: Meta<SyNavSubProps> = {
  title: 'Nav/Sub Overview',
  component: 'sy-nav-sub',
  tags: [],
  render: (args) => { clearElements(navSubMeta.title); return NavSub(args); },
  // `depth` is computed internally from the parent element chain — not
  // exposed as a user control.
  argTypes: {
    title: { control: 'text', table: { category: 'Parameter', type: { summary: 'string' } } } as any,
    value: { control: 'text', table: { category: 'Parameter', type: { summary: 'string' } } },
    open: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
  },
};
export default navSubMeta;
type Story = StoryObj<SyNavSubProps>;
export const Default: Story = { args: { title: 'Submenu', value: 's', open: false, disabled: false } as any };
