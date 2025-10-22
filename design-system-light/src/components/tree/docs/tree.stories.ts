import type { Meta, StoryObj } from "@storybook/web-components";
import { Tree, TreeProps } from "./tree";
import { clearElements } from "../../clear-element";

const treeMeta: Meta<TreeProps> = {
  title: "Tree/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(treeMeta.title);
    return Tree(args);
  },
  argTypes: {
    checkable: {
      control: "boolean",
      description: "Adds checkbox to all tree items.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    clickable: {
      control: "boolean",
      description: "Allows to click events to all tree items.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    draggable: {
      control: "boolean",
      description: "Allows to move tree items by dragging.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    editable: {
      control: "boolean",
      description: "Allows add / delete tree items and edit to each tree item.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
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
      description: "Expand or fold all tree items. 'expandable' must be true",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    line: {
      control: "boolean",
      description: "Draws lines between tree items.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    manualAdd: {
      name: 'manualAdd (manual-add)',
      control: "boolean",
      description: "Whether to allow add child of the tree items by clicking the add icon or adding manually.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    manualRemove: {
      name: 'manualRemove (manual-remove)',
      control: "boolean",
      description: "Whether to allow removing the node by clicking the remove icon or adding manually.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    nodes: {
      control: "object",
      description: "Sets data to the tree. data interface must be TreeNode",
      table: {
        category: "Parameter",
        defaultValue: { summary: undefined as any },
        type: { summary: 'object' }
      },
    },
    nodeWidth: {
      control: "number",
      name: 'nodeWidth (node-width)',
      description: "Sets max width of all tree nodes.",
      table: {
        category: "Parameter",
        defaultValue: { summary: null as any },
        type : { summary: 'number | null' }
      },
    },
    selectedValue: {
      control: "text",
      description: "Sets a pre-selected tree item. clickable is required.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'text' }
      },
    },
    expandChanged: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the item is expand or not',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('expandChanged', (e) => {})`,
        },
      }
    },
    itemAdded: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the item is added',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('itemAdded', (e) => {})`,
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
    itemEdited: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the item is edited',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('itemEdited', (e) => {})`,
        },
      }
    },
    itemRemoved: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the item is removed',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('itemRemoved', (e) => {})`,
        },
      }
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

export default treeMeta;
type Story = StoryObj<TreeProps>;

export const Default: Story = {
  args: {
    checkable: false,
    clickable: false,
    draggable: false,
    editable: false,
    expandable: false,
    expandAll: false,
    line: false,
    selectedValue: '',
    manualAdd: false,
    manualRemove: false,
    nodeWidth: null,
    nodes: [
      {
        label: 'parent 1', // title -> label
        value: '100', // key -> value
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"></path></svg>',
        tagMessage: 'tag',
        tagVariant: 'gray',
        children: [
          {
            label: 'parent 1-0', // title -> label
            value: '1001', // key -> value
            children: [
              { label: 'leaf1', value: '10010' }, // title -> label, key -> value
              { label: 'leaf2', value: '10011' }, // title -> label, key -> value
              { label: 'leaf3', value: '10012' }  // title -> label, key -> value
            ]
          },
          {
            label: 'parent 1-1', // title -> label
            value: '1002', // key -> value
            children: [{ label: 'leaf4', value: '10020' }] // title -> label, key -> value
          },
          {
            label: 'parent 1-2', // title -> label
            value: '1003', // key -> value
          },          
        ]
      }
    ]
    
  },
};