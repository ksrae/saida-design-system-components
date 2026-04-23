import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyTreeItemProps, TreeItem } from './sy-tree.main';
import { clearElements } from '../../clear-element';

const treeItemMeta: Meta<SyTreeItemProps> = {
  title: 'Tree/Item Overview',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => {
    clearElements(treeItemMeta.title);
    return TreeItem(args);
  },
  argTypes: {
    appendable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    checkable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    checked: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    clickable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    treeitemDraggable: { control: 'boolean', name: 'draggable', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    dragging: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    editable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    expandable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    expanded: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    fixed: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    hasChild: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    appendPlaceholder: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: 'New item' }, type: { summary: 'string' } } },
    icon: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    indeterminate: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    isDescendant: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    isEditable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    label: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    level: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    removable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    treeChildren: { control: 'object', table: { category: 'Parameter', type: { summary: 'any[]' } } },
    tagMessage: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    tagVariant: { control: 'select', options: ['gray','purple','blue','green','cyan','yellow','orange','red'], table: { category: 'Parameter', type: { summary: 'TagVariant' } } },
    value: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    searchTerm: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    selectedValue: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    nodeWidth: { control: 'number', table: { category: 'Parameter', type: { summary: 'number | null' } } },
    line: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    expandChanged: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('expandChanged', (e) => {})` } } },
    checkChanged: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('checkChanged', (e) => {})` } } },
    itemAdded: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('itemAdded', (e) => {})` } } },
    itemRemoved: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('itemRemoved', (e) => {})` } } },
    itemEdited: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('itemEdited', (e) => {})` } } },
    itemUpdating: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('itemUpdating', (e) => {})` } } },
    itemUpdatingReset: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('itemUpdatingReset', (e) => {})` } } },
    itemDrop: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('itemDrop', (e) => {})` } } },
    itemSelected: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('itemSelected', (e) => {})` } } },
    draggingEvent: { type: 'function', table: { category: 'Callback', type: { summary: `.addEventListener('draggingEvent', (e) => {})` } } },
  },
};

export default treeItemMeta;
type Story = StoryObj<SyTreeItemProps>;

export const Default: Story = {
  args: {
    appendable: false, checkable: false, checked: false, clickable: false, disabled: false,
    dragging: false, editable: false, expandable: false, expanded: false, fixed: false,
    hasChild: false, appendPlaceholder: 'New item', icon: '', indeterminate: false,
    isDescendant: false, isEditable: false, label: 'Item', level: 0, removable: false,
    tagMessage: '', value: 'x', searchTerm: '', selectedValue: '', line: true,
  },
};
