import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Label, SyLabelProps } from './sy-label.main';
import { clearElements } from "../../clear-element";

const labelMeta: Meta<SyLabelProps> = {
  title: 'Label/Overview',
  component: 'sy-label',
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
    htmlFor: {
      name: 'htmlfor',
      control: "text",
      description: "Sets the id of the element that the label is bound to. `for` is a reserved word in JS/TS, so the attribute is `htmlfor` (HTML is case-insensitive, so `htmlFor` in markup also works).",
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
    slot: {
      control: false,
      description: 'The content of the label slot. This can be used to add custom HTML or elements inside the label.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        disabled: true
      }
    }
  },
};

export default labelMeta;

export const Default: StoryObj<SyLabelProps> = {
  args: {
    disabled: false,
    htmlFor: "input-id",
    required: false,
    requiredPosition: 'right',
    value: "Label",
    valuePosition: "left",
    width: '',
    slot: ``,
  },
};
