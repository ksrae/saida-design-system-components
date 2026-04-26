import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyTreeProps, Tree } from './sy-tree.main';
import { clearElements } from '../../clear-element';

const treeMeta: Meta<SyTreeProps> = {
  title: 'Tree/Overview',
  component: 'sy-tree',
  tags: [],
  render: (args) => {
    clearElements(treeMeta.title);
    return Tree(args);
  },
  argTypes: {
    nodes: { control: 'object', description: 'Tree node data.', table: { category: 'Parameter', type: { summary: 'TreeNode[]' } } },
    checkable: { control: 'boolean', description: 'Show checkboxes.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    clickable: { control: 'boolean', description: 'Highlight on click.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    treeDraggable: { control: 'boolean', name: 'draggable', description: 'Enable drag & drop.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    editable: { control: 'boolean', description: 'Allow editing labels.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    expandable: { control: 'boolean', description: 'Allow expand toggle.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    expandAll: { control: 'boolean', description: 'Expand all nodes.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    manualAdd: { control: 'boolean', description: 'Manual add workflow.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    manualRemove: { control: 'boolean', description: 'Manual remove workflow.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    line: { control: 'boolean', description: 'Show connector lines.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    nodeWidth: { control: 'number', description: 'Node width in px.', table: { category: 'Parameter', type: { summary: 'number | null' } } },
    selectedValue: { control: 'text', description: 'Currently selected value.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    searchTerm: { control: 'text', description: 'Search highlight term.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    nodesChanged: { type: 'function', description: 'Nodes changed event.', table: { category: 'Callback', type: { summary: `.addEventListener('nodesChanged', (e) => {})` } } },
    itemChecked: { type: 'function', description: 'Item checkbox toggled.', table: { category: 'Callback', type: { summary: `.addEventListener('itemChecked', (e) => {})` } } },
    itemSelected: { type: 'function', description: 'Item selected.', table: { category: 'Callback', type: { summary: `.addEventListener('itemSelected', (e) => {})` } } },
  },
};

export default treeMeta;
type Story = StoryObj<SyTreeProps>;

export const Default: Story = {
  args: {
    checkable: false, clickable: true, editable: false, expandable: true, expandAll: false,
    manualAdd: false, manualRemove: false, line: true, selectedValue: '', searchTerm: '',
  },
};
