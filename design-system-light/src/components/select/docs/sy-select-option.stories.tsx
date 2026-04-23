import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SySelectOptionProps, SelectOption } from './sy-select.main';
import { clearElements } from '../../clear-element';

const selectOptionMeta: Meta<SySelectOptionProps> = {
  title: 'Select/Option Overview',
  component: 'sy-select-option',
  tags: [],
  render: (args) => {
    clearElements(selectOptionMeta.title);
    return SelectOption(args);
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disabled.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    label: { control: 'text', description: 'Option label.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    readonly: { control: 'boolean', description: 'Readonly.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    value: { control: 'text', description: 'Option value.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    showTooltip: { control: 'boolean', name: 'showTooltip', description: 'Show tooltip on truncated labels.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    selected: { control: 'boolean', description: 'Selected state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    hide: { control: 'boolean', description: 'Hidden state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    empty: { control: 'boolean', description: 'Empty state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    loading: { control: 'boolean', description: 'Loading state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    isCustomTag: { control: 'boolean', name: 'isCustomTag', description: 'Custom tag marker.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    active: { control: 'boolean', description: 'Active highlight.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    onActivated: { type: 'function', description: 'Activated event.', table: { category: 'Callback', type: { summary: `.addEventListener('activated', (e) => {})` } } },
  },
};

export default selectOptionMeta;
type Story = StoryObj<SySelectOptionProps>;

export const Default: Story = {
  args: {
    disabled: false, label: 'Option', readonly: false, value: 'a',
    showTooltip: false, selected: false, hide: false, empty: false, loading: false, isCustomTag: false, active: false,
  },
};
