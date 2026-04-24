import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyTabProps, Tab } from './sy-tab-group.main';
import { clearElements } from '../../clear-element';

// parentDisabled, currentDisabledStatus, index, inHeader, position, size are
// internal coordination props the parent sy-tab-group writes to; users should
// not set them directly. They stay as @Prop in the component (framework
// integration relies on property access) but are hidden from the Storybook
// controls panel via `table.disable: true` so the docs don't imply they are
// public API.
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
    type: { control: 'radio', options: ['line','card'], table: { category: 'Parameter', defaultValue: { summary: 'line' }, type: { summary: 'card | line' } } },
    selected: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
    closed: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('closed', (e) => {})` } } },

    // Internal coordination — hidden from the controls panel.
    parentDisabled: { table: { disable: true } },
    currentDisabledStatus: { table: { disable: true } },
    index: { table: { disable: true } },
    inHeader: { table: { disable: true } },
    position: { table: { disable: true } },
    size: { table: { disable: true } },
  },
};

export default tabMeta;
type Story = StoryObj<SyTabProps>;
export const Default: Story = {
  args: { closable: false, disabled: false, tabkey: 'x', manualClose: false, active: false, type: 'line' } as any,
};
