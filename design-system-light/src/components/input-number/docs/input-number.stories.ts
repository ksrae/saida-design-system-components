import type { Meta, StoryObj } from "@storybook/web-components";
import { InputNumber, InputNumberProps } from "./input-number";
import { clearElements } from "../../clear-element";

const inputnumberMeta: Meta<InputNumberProps> = {
  title: "InputNumber/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(inputnumberMeta.title);
    return InputNumber(args);
  },
  argTypes: {
    autofocus: {
      control: "boolean",
      description: "Sets focus automatically.",
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
    decimalPlaces: {
      control: "number",
      name: 'decimalPlaces (decimal-places)',
      description:
        "Sets decimal places. The additional digits more than decimal places, will be automatically truncated. This may resolve floating-point errors",
      table: {
        category: "Parameter",
        defaultValue: { summary: undefined as any },
        type: { summary: "number" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the input number.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: "boolean" },
      },
    },
    label: {
      control: "text",
      description: "Sets the label of the input number.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    max: {
      control: "number",
      description: "Sets maximum value.",
      table: {
        category: "Parameter",
        defaultValue: { summary: Number.MAX_SAFE_INTEGER as any },
        type: { summary: "number" },
      },
    },
    min: {
      control: "number",
      description: "Sets minimum value.",
      table: {
        category: "Parameter",
        defaultValue: { summary: Number.MIN_SAFE_INTEGER as any },
        type: { summary: "number" },
      },
    },
    prefix: {
      control: "text",
      description: "Sets prefix text.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    readonly: {
      control: "boolean",
      description: "Determines whether the input number has readonly.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: "boolean" },
      },
    },
    required: {
      control: "boolean",
      description: "Sets input number field required.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    rounding: {
      control: "select",
      options: ["round", "ceil", "floor", ""],
      description: "The type of the rounding.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: "round | ceil | floor" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of input number.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large" },
      },
    },
    status: {
      control: "select",
      options: ["default", "warning", "error", "success"],
      description: "Thes status of input number",
      table: {
        category: "Parameter",
        defaultValue: { summary: 'default' },
        type: { summary: 'default | warning | error | success' },
      },
    },
    step: {
      control: "number",
      description:
        "The number to which the current value is increased or decreased.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 1 as any },
        type: { summary: 'number' }
      },
    },
    suffix: {
      control: "text",
      description: "Sets suffix text.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    value: {
      control: "text",
      description: "Sets the value to the input number. Only related to number representation are available.",
      table: {
        category: "Parameter",
        defaultValue: { summary: '0' },
        type: { summary: 'string' }
      },
    },
    setFocus: {
      type: "function",
      description: "Trigger focus event manually.",
      table: {
        category: "Function",
        type: {
          summary: `setFocus()`,
        },
      },
    },
    setBlur: {
      type: "function",
      description: "Trigger blur event manually.",
      table: {
        category: "Function",
        type: {
          summary: `setBlur()`,
        },
      },
    },
    setClear: {
      type: "function",
      description: "Trigger clear event manually.",
      table: {
        category: "Function",
        type: {
          summary: `setClear()`,
        },
      },
    },
    changed: {
      type: "function",
      description: "Emitted when the value changes.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
        },
      },
    },
    blured: {
      type: "function",
      description: "Emitted when the input number loses focus.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('blured', (e) => {})`,
        },
      },
    },
    focused: {
      type: "function",
      description: "Emitted when the input number is focused.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('focused', (e) => {})`,
        },
      },
    },
  },
};

export default inputnumberMeta;
type Story = StoryObj<InputNumberProps>;

export const Default: Story = {
  args: {
    autofocus: false,
    borderless: false,
    decimalPlaces: undefined,
    disabled: false,
    label: "Input number label",
    max: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER,
    prefix: "",
    readonly: false,
    required: false,
    rounding: "",
    status: "default",
    size: "medium",
    step: 1,
    suffix: "",
    value: '0'
  },
};
