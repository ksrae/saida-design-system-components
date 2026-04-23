import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyTabGroupProps, TabGroup } from './sy-tab-group.main';
import { clearElements } from '../../clear-element';

const tabGroupMeta: Meta<SyTabGroupProps> = {
  title: 'Tab/Overview',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => { clearElements(tabGroupMeta.title); return TabGroup(args); },
  argTypes: {
    active: { control: 'number', table: { category: 'Parameter', type: { summary: 'number' } } },
    align: { control: 'radio', options: ['left','center'], table: { category: 'Parameter', defaultValue: { summary: 'left' }, type: { summary: 'center | left' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    isdraggable: { control: 'boolean', name: 'draggable', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    position: { control: 'select', options: ['top','bottom','left','right'], table: { category: 'Parameter', defaultValue: { summary: 'top' }, type: { summary: 'top | bottom | left | right' } } },
    type: { control: 'radio', options: ['line','card'], table: { category: 'Parameter', defaultValue: { summary: 'line' }, type: { summary: 'card | line' } } },
    size: { control: 'radio', options: ['small','medium','large'], table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    padding: { control: 'select', options: ['none','small','medium','large'], table: { category: 'Parameter', defaultValue: { summary: 'none' }, type: { summary: 'small | medium | large | none' } } },
    selected: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
    closed: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('closed', (e) => {})` } } },
    ordered: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('ordered', (e) => {})` } } },
  },
};

export default tabGroupMeta;
type Story = StoryObj<SyTabGroupProps>;
export const Default: Story = { args: { active: 0, align: 'left', disabled: false, position: 'top', type: 'line', size: 'medium', padding: 'none' } as any };
