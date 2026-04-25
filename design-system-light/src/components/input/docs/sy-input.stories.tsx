import { Input, SyInputProps } from './sy-input.main';
import { Meta, StoryObj } from '@stencil/storybook-plugin';
import { clearElements } from '../../clear-element';

const inputMeta: Meta<SyInputProps> = {
  title: 'Input/Overview',
  component: 'sy-input',
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
      description: "The variant of the input. Legacy alias for `type`.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "text" },
        type: { summary: "password | search | text" },
      },
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
      description: "The native input type (spec-aligned). Supersedes `variant`.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "text" },
        type: { summary: "text | password | email | number | tel | url | search" },
      },
    },
    message: {
      control: "text",
      description: "Help or validation message displayed below the input.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    name: {
      control: "text",
      description: "Name attribute for form submission.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    noNativeValidity: {
      control: "boolean",
      name: "noNativeValidity (no-native-validity)",
      description: "Disable the browser's native validity popup.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: "boolean" },
      },
    },
    slotPrefix: {
      control: false,
      description:
        'Sets prefix icon content. Only the DOM with slot="prefix" is applicable.',
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
      },
    },
    slotSuffix: {
      control: false,
      description:
        'Sets suffix icon content. Only the DOM with slot="suffix" is applicable.',
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
      },
    },
    setFocus: {
      type: "function",
      description: "Focus the input programmatically.",
      table: { category: "Function", type: { summary: `setFocus(): Promise<void>` } },
    },
    setBlur: {
      type: "function",
      description: "Blur the input programmatically.",
      table: { category: "Function", type: { summary: `setBlur(): Promise<void>` } },
    },
    checkValidity: {
      type: "function",
      description: "Return the current validity state without reporting.",
      table: { category: "Function", type: { summary: `checkValidity(): Promise<boolean>` } },
    },
    reportValidity: {
      type: "function",
      description: "Validate and show a native validation popup if invalid.",
      table: { category: "Function", type: { summary: `reportValidity(): Promise<boolean>` } },
    },
    setCustomError: {
      type: "function",
      description: "Mark the input invalid with a custom error.",
      table: { category: "Function", type: { summary: `setCustomError(): Promise<void>` } },
    },
    clearCustomError: {
      type: "function",
      description: "Clear a previously-set custom error.",
      table: { category: "Function", type: { summary: `clearCustomError(): Promise<void>` } },
    },
    getStatus: {
      type: "function",
      description: "Return the current validation status key (empty when valid).",
      table: { category: "Function", type: { summary: `getStatus(): Promise<string>` } },
    },
 /*    setValue: {
      type: "function",
      description: "Trigger to set value.",
      table: {
        category: "Function",
        type: {
          summary: `setValue()`,
        },
      },
    }, */
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
      description: "Triggered when the input gains focus.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('focused', (e) => {})`,
        },
      },
    },
    clear: {
      type: "function",
      description: "Triggered when the clear button is pressed (clearable inputs only).",
      table: {
        category: "Callback",
        type: { summary: `.addEventListener('clear', (e) => {})` },
      },
    },
  },
};

export default inputMeta;
type Story = StoryObj<SyInputProps>;

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
    slotPrefix: `<sy-icon slot="prefix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"></path></svg></sy-icon>`,
    slotSuffix: `<sy-icon slot="suffix" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 200C306.7 200 296 210.7 296 224L296 336C296 349.3 306.7 360 320 360C333.3 360 344 349.3 344 336L344 224C344 210.7 333.3 200 320 200zM346.7 416C347.3 406.1 342.4 396.7 333.9 391.5C325.4 386.4 314.7 386.4 306.2 391.5C297.7 396.7 292.8 406.1 293.4 416C292.8 425.9 297.7 435.3 306.2 440.5C314.7 445.6 325.4 445.6 333.9 440.5C342.4 435.3 347.3 425.9 346.7 416z"></path></svg></sy-icon>`,
  },
};


