import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyTreeSelectProps, TreeSelect } from './sy-tree-select.main';
import { clearElements } from '../../clear-element';

const treeSelectMeta: Meta<SyTreeSelectProps> = {
  title: 'TreeSelect/Overview',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelect(args);
  },
  argTypes: {
    nodes: { control: 'object', table: { category: 'Parameter', type: { summary: 'TreeNode[]' } } },
    checkable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    clearable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    defaultValue: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    status: { control: 'radio', options: ['default','error'], table: { category: 'Parameter', defaultValue: { summary: 'default' }, type: { summary: 'error | default' } } },
    expandable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    expandAll: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    line: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    loading: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    maxTagCount: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    nodeWidth: { control: 'number', table: { category: 'Parameter', type: { summary: 'number | null' } } },
    placeholder: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    appendParent: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    readonly: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    required: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    name: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    noNativeValidity: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    changed: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('changed', (e) => {})` } } },
  },
};

export default treeSelectMeta;
type Story = StoryObj<SyTreeSelectProps>;

export const Default: Story = {
  args: {
    checkable: false, clearable: false, defaultValue: '', disabled: false, status: 'default' as any,
    expandable: true, expandAll: false, line: true, loading: false, maxTagCount: 0,
    placeholder: 'Select', appendParent: false, readonly: false, required: false, name: '', noNativeValidity: false,
  },
};
