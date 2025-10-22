import type { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from "../../clear-element";
import { TreeSelect, TreeSelectProps } from "./tree-select";

const treeSelectMeta: Meta<TreeSelectProps> = {
  title: "TreeSelect/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(treeSelectMeta.title);
    return TreeSelect(args);
  },
  argTypes: {
    nodes: {
      control: "object",
      description: "Sets data to the tree. data interface must be TreeNode",
      table: {
        category: "Parameter",
        defaultValue: { summary: undefined as any },
        type: { summary: 'object' }
      },
    },
    checkable: {
      control: "boolean",
      description: "Adds checkbox to all tree items. It allows multiple tree items selection.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    defaultValue: {
      control: "text",
      name: 'defaultValue (default-value)',
      description: "Sets a pre-selected item. It must be a value of the tree item.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'text' }
      },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state of the tree select.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    status: {
      control: 'select',
      options: ['error', 'default'],
      description: 'The status of the tree select.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'default' }, 
        type: { summary: "error | default" }
      },
    },
    expandable: {
      control: "boolean",
      description: "Adds expand icon and feature to all tree items.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    expandAll: {
      control: "boolean",
      name: 'expandAll (expand-all)',
      description: "Expands all tree items.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    nodeWidth: {
      control: "number",
      name: 'nodeWidth (node-width)',
      description: "Sets max width of all tree nodes.",
      table: {
        category: "Parameter",
        defaultValue: { summary: null as any },
        type: { summary: "number" }
      },
    },
    maxTagCount: {
      control: "number",
      name: 'maxTagCount (max-tag-count)',
      description: "Sets max tag count of selected items. checkable is required",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: "number" }
      },
    },
    line: {
      control: "boolean",
      description: "Adds line between tree items.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner to the tree-select.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    clearable: {
      control: "boolean",
      description: "Adds clear button to the tree-select.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    placeholder: {
      control: "text",
      description: "Sets the placeholder.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'text' }
      },
    },
    readonly: {
      control: "boolean",
      description: "Set to readonly the tree select. The tree select does not be interacted by user interface.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    itemSelected: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the item is selected',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('itemSelected', (e) => {})`,
        },
      }
    },
    itemChecked: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the item is checked or unchecked',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('itemSelected', (e) => {})`,
        },
      }
    },
    nodesChanged: {
      type: 'function',
      action: 'click',
      description: 'Triggered when any item checked or moved. Returns all items information',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('nodeChanged', (e) => {})`,
        },
      }
    },
  },
};

export default treeSelectMeta;
type Story = StoryObj<TreeSelectProps>;

export const Default: Story = {
  args: {
    checkable: false,
    clearable: false,
    expandable: false,
    expandAll: false,
    defaultValue: '10010',
    status: 'default',
    disabled:false,
    placeholder: 'Please select',
    readonly: false,
    line: false,
    loading: false,
    maxTagCount: 0,
    nodes: [
      {
        label: 'grandparent 1', 
        value: '100', 
        children: [
          {
            label: 'parent 1-0', 
            value: '1001', 
            children: [
              { label: 'leaf1', value: '10010' }, 
              { label: 'leaf2', value: '10011' }, 
              { label: 'leaf3', value: '10012' }  
            ]
          },
          {
            label: 'parent 1-1', 
            value: '1002', 
            children: [{ label: 'leaf4', value: '10020' }] 
          },
        ]
      },

    ],
    nodeWidth: null,
  },
};



