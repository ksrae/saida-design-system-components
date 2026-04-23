import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyTabContentProps, TabContent } from './sy-tab-group.main';
import { clearElements } from '../../clear-element';

const tabContentMeta: Meta<SyTabContentProps> = {
  title: 'Tab/Content Overview',
  component: 'sy-tab-content',
  tags: [],
  render: (args) => { clearElements(tabContentMeta.title); return TabContent(args); },
  argTypes: {
    active: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    name: { control: 'text', table: { category: 'Parameter', type: { summary: 'string' } } },
  },
};

export default tabContentMeta;
type Story = StoryObj<SyTabContentProps>;
export const Default: Story = { args: { active: false, disabled: false, name: 'x' } as any };
