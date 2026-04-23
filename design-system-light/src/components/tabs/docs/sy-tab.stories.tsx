import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyTabProps, Tab } from './sy-tab-group.main';
import { clearElements } from '../../clear-element';

const tabMeta: Meta<SyTabProps> = {
  title: 'Tab/Item Overview',
  component: 'sy-tab',
  tags: [],
  render: (args) => { clearElements(tabMeta.title); return Tab(args); },
  argTypes: {
    closable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    tabkey: { control: 'text', table: { category: 'Parameter', type: { summary: 'string' } } },
    manualClose: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    active: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    parentDisabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    currentDisabledStatus: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    index: { control: 'number', table: { category: 'Parameter', type: { summary: 'number' } } },
    type: { control: 'radio', options: ['line','card'], table: { category: 'Parameter', defaultValue: { summary: 'line' }, type: { summary: 'card | line' } } },
    size: { control: 'radio', options: ['small','medium','large'], table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    position: { control: 'select', options: ['top','bottom','left','right'], table: { category: 'Parameter', defaultValue: { summary: 'top' }, type: { summary: 'top | bottom | left | right' } } },
    inHeader: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    selected: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
    closed: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('closed', (e) => {})` } } },
  },
};

export default tabMeta;
type Story = StoryObj<SyTabProps>;
export const Default: Story = {
  args: { closable: false, disabled: false, tabkey: 'x', manualClose: false, active: false, parentDisabled: false, currentDisabledStatus: false, index: 0, type: 'line', size: 'medium', position: 'top', inHeader: false } as any,
};
