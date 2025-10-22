import type { Meta, StoryObj } from "@storybook/web-components";
import { Label, LabelProps } from "./label";
import { clearElements } from "../../clear-element";

const labelMeta: Meta<LabelProps> = {
  title: "Label/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(labelMeta.title);
    return Label(args);
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Determines whether the label is disabled. It is effective with related elements.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    for: {
      control: "text",
      description: "Sets the id of the element that the label is bound to.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    required: {
      control: "boolean",
      description: "Determines whether the label is required. It is effective with related elements.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    requiredPosition: {
      name: 'requiredPosition (required-position)',
      control: "radio",
      options: ["left", "right"],
      description: "Sets the position of the required mark.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "right" },
        type: { summary: 'left | right' }
      },
    },
    value: {
      control: "text",
      description: "Sets the label text.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    valuePosition: {
      name: 'valuePosition (value-position)',
      control: "select",
      options: ["left", "right", "center"],
      description: "Sets the position of the label.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "left" },
        type: { summary: "left | right | center" },
      },
    },
    width: {
      control: "text",
      description: "Sets the width of the label. This can be a CSS value like '100px' or '50%'.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    slotContent: {
      control: 'text', 
      description: 'The content of the label slot. This can be used to add custom HTML or elements inside the label.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        disabled: true
      }
    },
  },
};

export default labelMeta;
type Story = StoryObj<LabelProps>;

export const Default: Story = {
  args: {
    disabled: false,
    for: "input-id",
    required: false,
    requiredPosition: 'right',
    value: "Label",
    valuePosition: "left",
    width: '',
    slotContent: `<sy-input id="input-id" placeholder="Input with label"></sy-input>`,
  },
};
