import type { Meta, StoryObj } from "@storybook/web-components";
import { Input, InputProps } from "./input";
import { clearElements } from "../../clear-element";

const inputMeta: Meta<InputProps> = {
  title: "Input/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(inputMeta.title);
    return Input(args);
  },
  argTypes: {
    autofocus: {
      control: "boolean",
      description:
        "Sets automatically focused on an input field when a page loads or when a component is rendered. ",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    borderless: {
      control: "boolean",
      description: "The input is displayed without a visible border.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    clearable: {
      control: "boolean",
      description: "Adds a clear button when the input is not empty.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    label: {
      control: "text",
      description: "Sets the label of the input.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    max: {
      control: "number",
      description: "The maximum length of input that will be considered valid.",
      table: {
        category: "Parameter",
        defaultValue: { summary: Number.MAX_SAFE_INTEGER as any },
        type: { summary: "number" },
      },
    },
    min: {
      control: "number",
      description: "The minimum length of input that will be considered valid.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: "number" },
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
      description: "Makes the input readonly.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    required: {
      control: "boolean",
      description: "Sets input required.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The input’s size.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large" },
      },
    },
    status: {
      control: "select",
      options: ["default", "warning", "error", "success"],
      description: "The input’s status.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 'default' },
        type: { summary: 'default | warning | error | success' },
      },
    },
    value: {
      control: "text",
      description: "Sets the default value of the input.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    variant: {
      control: "select",
      options: ["password", "search", "text"],
      description: "The variant of the input.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "text" },
        type: { summary: "password | search | text" },
      },
    },
    prefix: {
      control: 'text',
      description:
        'Sets prefix icon content. Only the DOM with slot="prefix" is applicable.',
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
      },
    },
    suffix: {
      control: 'text',
      description:
        'Sets suffix icon content. Only the DOM with slot="suffix" is applicable.',
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
      },
    },
    setFocus: {
      type: "function",
      description: "Trigger focus event.",
      table: {
        category: "Function",
        type: {
          summary: `setFocus()`,
        },
      },
    },
    setBlur: {
      type: "function",
      description: "Trigger blur event.",
      table: {
        category: "Function",
        type: {
          summary: `setBlur()`,
        },
      },
    },
    setValue: {
      type: "function",
      description: "Trigger to set value.",
      table: {
        category: "Function",
        type: {
          summary: `setValue()`,
        },
      },
    },
    changed: {
      type: "function",
      description: "Triggered when the value changes.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
        },
      },
    },
    blured: {
      type: "function",
      description: "Triggered to set value.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('blured', (e) => {})`,
        },
      },
    },
    focused: {
      type: "function",
      description: "Triggered to set value.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('focused', (e) => {})`,
        },
      },
    },
  },
};

export default inputMeta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    autofocus: false,
    borderless: false,
    clearable: false,
    disabled: false,
    label: "Input label",
    max: Number.MAX_SAFE_INTEGER,
    min: 0,
    placeholder: "Input text",
    readonly: false,
    required: false,
    size: "medium",
    status: 'default',
    value: "",
    variant: "text",
    prefix: '',
    suffix: '',
  },
};
