import type { Meta, StoryObj } from "@storybook/web-components";
import { Tree, TreeNode } from "./tree";
import { clearElements } from "../../clear-element";

const treeNodeMeta: Meta<TreeNode> = {
  title: "Tree Node/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements('Tree/Overview');
    return TreeNode(args);
  },
  argTypes: {
    appendable: {
      control: "boolean",
      description: "Sets the appendable of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    appendPlaceholder: {
      control: "text",
      description: "Sets placeholder text for add input.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "New Item" },
      },
    },
    checked: {
      control: "boolean",
      description: "Sets the checked of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    children: {
      control: 'object', 
      description: 'Sets children tree nodes of the tree node.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      },
    },
    clickable: {
      control: "boolean",
      description: "Sets the clickable of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    disabled: {
      control: "boolean",
      description: "Sets the disabled of the tree node",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    editable: {
      control: "boolean",
      description: "Sets the editable of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    }, 
    expanded: {
      control: "boolean",
      description: "Sets the expanded of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    fixed: {
      control: "boolean",
      description: "Sets the fixed of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    icon: {
      control: "text",
      description: "Sets the icon type of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: '' as any },
      },
    },
    indeterminate: {
      control: "boolean",
      description: "Sets the indeterminate of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    label: {
      control: "text",
      description: "Sets the title of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
      },
    },
    removable: {
      control: "boolean",
      description: "Sets the removable of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
      },
    },
    tagMessage: {
      control: "text",
      description: "Sets the tag message of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: '' as any },
      },
    },
    tagVariant: {
      control: "select",
      options: ["gray", "purple", "blue", "green", "cyan", "yellow", "orange", "red"],
      description: "Sets the variant of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "neutral" },
        type: { summary: "gray | purple | blue | green | cyan | yellow | orange | red" },
      },
    },
    value: {
      control: "text",
      description: "Sets the key of the tree node.",
      table: {
        category: "Parameter",
        defaultValue: { summary: '' as any },
      },
    },
  },
};

export default treeNodeMeta;
type Story = StoryObj<TreeNode>;

export const Default: Story = {
  args: {
    appendable: false,
    appendPlaceholder: 'New Item',
    checked: false,
    children: [
      // {
      //   label: 'parent 1-0', // title -> label
      //   value: '1001', // key -> value
      //   children: [
      //     { label: 'leaf1', value: '10010' }, // title -> label, key -> value
      //     { label: 'leaf2', value: '10011' }, // title -> label, key -> value
      //     { label: 'leaf3', value: '10012' }  // title -> label, key -> value
      //   ]
      // },
      // {
      //   label: 'parent 1-1', // title -> label
      //   value: '1002', // key -> value
      //   children: [{ label: 'leaf4', value: '10020' }] // title -> label, key -> value
      // },
    ],
    clickable: false,
    disabled: false,
    editable: false,
    expanded: false,
    fixed: false,
    icon: '',
    indeterminate: false,
    label: 'parent 1', // title -> label
    removable: false,
    tagMessage: 'tag',
    tagVariant: 'gray',
    value: '100', // key -> value
  },
};