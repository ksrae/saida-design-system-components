import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SySelectProps, Select } from './sy-select.main';
import { clearElements } from '../../clear-element';

const selectMeta: Meta<SySelectProps> = {
  title: 'Select/Overview',
  component: 'sy-select',
  tags: [],
  render: (args) => {
    clearElements(selectMeta.title);
    return Select(args);
  },
  argTypes: {
    clearable: { control: 'boolean', description: 'Show clear button.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', description: 'Disabled.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    readonly: { control: 'boolean', description: 'Readonly.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    empty: { control: 'boolean', description: 'Empty state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    error: { control: 'boolean', description: 'Error state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    hide: { control: 'boolean', description: 'Hide dropdown.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    loading: { control: 'boolean', description: 'Loading state.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    maxTagCount: { control: 'number', name: 'maxTagCount', description: 'Max tags to display.', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    defaultValue: { control: 'text', name: 'defaultValue', description: 'Default selection.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    placeholder: { control: 'text', description: 'Placeholder text.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    size: { control: 'radio', options: ['small','medium','large'], description: 'Size.', table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    mode: { control: 'select', options: ['default','searchable','multiple','tag'], description: 'Interaction mode.', table: { category: 'Parameter', defaultValue: { summary: 'default' }, type: { summary: 'default | searchable | multiple | tag' } } },
    required: { control: 'boolean', description: 'Required.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    name: { control: 'text', description: 'Form name.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    noNativeValidity: { control: 'boolean', name: 'noNativeValidity', description: 'Disable native validation.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    isTreeSelect: { control: 'boolean', name: 'isTreeSelect', description: 'Tree-select mode flag.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    selectedOptions: { control: 'object', name: 'selectedOptions', description: 'Currently selected options.', table: { category: 'Parameter', type: { summary: '{ value: string; label?: string }[]' } } },
    opened: { type: 'function', description: 'Dropdown opened.', table: { category: 'Callback', type: { summary: `.addEventListener('opened', (e) => {})` } } },
    removed: { type: 'function', description: 'Option removed (tag mode).', table: { category: 'Callback', type: { summary: `.addEventListener('removed', (e) => {})` } } },
    selected: { type: 'function', description: 'Option selected.', table: { category: 'Callback', type: { summary: `.addEventListener('selected', (e) => {})` } } },
    focused: { type: 'function', description: 'Input focused.', table: { category: 'Callback', type: { summary: `.addEventListener('focused', (e) => {})` } } },
    blured: { type: 'function', description: 'Input blurred.', table: { category: 'Callback', type: { summary: `.addEventListener('blured', (e) => {})` } } },
    inputChanged: { type: 'function', description: 'Search input changed.', table: { category: 'Callback', type: { summary: `.addEventListener('inputChanged', (e) => {})` } } },
    cleared: { type: 'function', description: 'Selection cleared.', table: { category: 'Callback', type: { summary: `.addEventListener('cleared', (e) => {})` } } },
  },
};

export default selectMeta;
type Story = StoryObj<SySelectProps>;

export const Default: Story = {
  args: {
    clearable: false, disabled: false, readonly: false, empty: false, error: false, hide: false, loading: false,
    maxTagCount: 0, defaultValue: '', placeholder: 'Select', size: 'medium', mode: 'default',
    required: false, name: '', noNativeValidity: false, isTreeSelect: false, selectedOptions: [],
  },
};
