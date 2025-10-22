import type { Meta, StoryObj } from "@storybook/web-components";
import { Select, SelectProps } from "./select";
import { clearElements } from "../../clear-element";

const selectMeta: Meta<SelectProps> = {
  title: "Select/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(selectMeta.title);
    return Select(args);
  },
  argTypes: {
    clearable: {
      control: "boolean",
      description: "Enables the clear-all button.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the select, including all options.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    empty: {
      control: "boolean",
      description: "Shows an empty icon while opening",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    error: {
      control: "boolean",
      description: "Sets the border to the error status",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    hide: {
      control: "boolean",
      description: "Removes selected items from the list.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    loading: {
      control: "boolean",
      description: "Shows a loading icon while opening",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    maxTagCount: {
      control: "number",
      name: 'maxTagCount (max-tag-count)',
      description: "Defines the maximum number of visible selected items.<br/>If selected items exceeds the maximum, they are collected in a list on the right side of select.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' }
      },
    },
    mode: {
      control: "select", 
      options: ["default", "searchable", "multiple", "tag"],
      description: "Sets the mode of select.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "default" },
        type: { summary: "default | searchable | multiple | tag" },
      },
    },
    defaultValue: {
      control: "text",
      name: 'defaultValue (default-value)',
      description: "Sets pre-selected items",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    placeholder: {
      control: "text",
      description: "Sets the placeholder",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    readonly: {
      control: "boolean",
      description: "Set to readonly the select. The select does not be interacted by user interface.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    size: {
      control: "select", 
      options: ["small", "medium", "large"],
      description: "Sets size of the select.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large" },
      },
    },
    slotContent: {
      control: false,
      description: "The elements of the select. Mostly options",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
      },
    },
    clearValue: {
      type: "function",
      action: "click",
      description: "To clear all values of select",
      table: {
        category: "Function",
        type: {
          summary: `clearValue()`,
        },
      },
    },
    opened: {
      type: "function",
      action: "click",
      description: "Triggered opened when select is opened.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('opened', (e) => {})`,
        },
      },
    },
    removed: {
      type: "function",
      action: "click",
      description: "Triggered removed when any items are removed.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('removed', (e) => {})`,
        },
      },
    },
    cleared: {
      type: "function",
      action: "click",
      description: "Triggered cleared when all items are cleared. It only works when clearable is true.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('cleared', (e) => {})`,
        },
      },
    },
    selected: {
      type: "function",
      action: "click",
      description: "Triggered selected when any items are selected.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      },
    },
    inputChanged: {
      type: "function",
      action: "click",
      description: "Triggered when typing any value. Mode must not be 'default'",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('inputChanged', (e) => {})`,
        },
      },
    },
  },
};

export default selectMeta;
type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    clearable: false,
    disabled: false,
    empty: false,
    error: false,
    hide: false,
    loading: false,
    maxTagCount: 0,
    mode: 'default',
    defaultValue: 'value1',
    placeholder: 'Select one',
    readonly: false,
    size: 'medium',
    slotContent: ``,
  },
};
