import type { Meta, StoryObj } from "@storybook/web-components";
import { Textarea, TextareaProps } from "./textarea";
import { clearElements } from "../../clear-element";

const textareaMeta: Meta<TextareaProps> = {
  title: "Textarea/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(textareaMeta.title);
    return Textarea(args);
  },
  argTypes: {
    autofocus: {
      control: "boolean",
      description: "Sets automatically focused on an input field when a page loads or when a component is rendered. .",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    borderless: {
      control: 'boolean',
      description: 'Borderless the textarea',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },     
    clearable: {
      control: 'boolean',
      description: 'Adds a clear button when the input is not empty.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    }, 
    counter: {
      control: "boolean",
      description: "Exposes character counter. The max attribute is required",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    label: {
      control: 'text',
      description: 'Sets the label of the textarea field.',  
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }      
    },    
    max: {
      control: "number",
      description: "The maximum length of input that will be considered valid.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' }
      },
    },
    min: {
      control: "number",
      description: "The minimum length of input that will be considered valid.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' }
      },
    },
    placeholder: {
      control: "text",
      description:
        "Placeholder text to show as a hint when the input is empty.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    readonly: {
      control: "boolean",
      description: "Sets textarea readonly.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    required: {
      control: "boolean",
      description: "Sets text area field required.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    resize: {
      control: "select",
      options: ["none", "horizontal", "vertical", "both"],
      description: "Controls how the textarea can be resized.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "default" },
        type: { summary: "none | horizontal | vertical | both" },
      },
    },
    rows: {
      control: "number",
      description: "Default rows of the textarea.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 4 as any },
        type: { summary: 'number' }
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The textarea’s size.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large" },
      },
    },
    value: {
      control: "text",
      description: "Default value of the textarea.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'text' }
      },
    },
    slotContent: {
      control: false,
      description:
        'The message added to the Textarea. Only the DOM with slot="message" is applicable.',
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
      },
    },
    setFocus: {
      type: "function",
      description: "Triggers focus event manually.", // 이 이벤트의 설명
      table: {
        category: "Function",
        type: {
          summary: `setFocus()`,
        },
      },
    },
    setBlur: {
      type: "function",
      description: "Triggers blur event manually.",
      table: {
        category: "Function",
        type: {
          summary: `setBlur()`,
        },
      },
    },
    changed: {
      type: "function",
      action: "click",
      description: "Triggered changed event when the value of textarea changes",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
        },
      },
    },
    blured: {
      type: "function",
      description: "Triggered when the textarea loses focus.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('blured', (e) => {})`,
        },
      },
    },
    focused: {
      type: "function",
      description: "Triggered when the textarea gains focus.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('focused', (e) => {})`,
        },
      },
    },
  },
};

export default textareaMeta;
type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    autofocus: false,
    borderless: false,
    clearable: false,
    counter: false,
    disabled: false,
    label : 'Textarea label',
    max: 0,
    min: 0,
    placeholder: "Please Input text",
    readonly: false,
    required: false,
    resize: "none",
    rows: 4,
    size: "medium",
    value: "This is a default value",
    slotContent: '',
  },
};
