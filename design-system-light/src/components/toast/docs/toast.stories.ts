import type { Meta, StoryObj } from "@storybook/web-components";
import { Toast, ToastProps } from "./toast";
import { clearElements } from "../../clear-element";

const toastMeta: Meta<ToastProps> = {
  title: "ToastMessage/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(toastMeta.title);
    return Toast(args);
  },
  argTypes: {
    latestTop: {
      control: "boolean",
      name: 'latestTop (latest-top)',
      description: "Sets the toast message to be displayed at the top of the stack.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    closable: {
      control: "boolean",
      description: "Adds a close button to the toast message.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    duration: {
      control: "number",
      description: "Sets the duration of the toast message in milliseconds.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 4500 as any },
        type: { summary: 'number' }
      },
    },
    position: {
      control: "select",
      options: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
      description: "Sets the position of the toast message.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "bottomRight" },
        type: { summary: "topLeft | topRight | bottomLeft | bottomRight" }
      },
    },
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "error", "info"],
      description: "Sets the variant of the toast message.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "info" },
        type: { summary: "neutral | success | warning | error | info" }
      },
    },
    iconSlot: {
      control: "text", 
      description: 'Icon to be displayed in the toast message.<br/> Use <b>slot="icon"</b> to define the icon slot. This work when variant is set to "neutral" only.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    slotContent: {
      control: 'text', 
      description: 'Contents of the toast message.<br/> Use <b>slot="header"</b>, <b>slot="body"</b>, and <b>slot="footer"</b> to define each part of the content in the toast message.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    closeToast: {
      type: 'function',
      action: 'click',
      description: 'To close a Toast message',
      table: {
        category: 'Function',
        type: {
          summary: `closeToast(toastItemElement)`,

        },
      }
    },
    createNeutralToast: {
      type: 'function',
      action: 'click',
      description: 'To clear neutral type toast message',
      table: {
        category: 'Function',
        type: {
          summary: `createNeutralToast(position?, closable?, duration?, header?, body?, footer?)`,
        },
      }
    },
    createErrorToast: {
      type: 'function',
      action: 'click',
      description: 'To create error type toast message',
      table: {
        category: 'Function',
        type: {
          summary: `createErrorToast(position?, closable?, duration?, header?, body?, footer?)`,
        },
      }
    },
    createInfoToast: {
      type: 'function',
      action: 'click',
      description: 'To create information type toast message',
      table: {
        category: 'Function',
        type: {
          summary: `createInfoToast(position?, closable?, duration?, header?, body?, footer?)`,
        },
      }
    },
    createSuccessToast: {
      type: 'function',
      action: 'click',
      description: 'To create success type toast message',
      table: {
        category: 'Function',
        type: {
          summary: `createSuccessToast(position?, closable?, duration?, header?, body?, footer?)`,
        },
      }
    },
    createToast: {
      type: 'function',
      action: 'click',
      description: 'To create a general toast message, variant is required',
      table: {
        category: 'Function',
        type: {
          summary: `createToast(variant, option?)`,
        },
      }
    },
    createWarningToast: {
      type: 'function',
      action: 'click',
      description: 'To create warning type toast message',
      table: {
        category: 'Function',
        type: {
          summary: `createWarningToast(position?, closable?, duration?, header?, body?, footer?)`,
        },
      }
    },
  }
};

export default toastMeta;
type Story = StoryObj<ToastProps>;

export const Default: Story = {
  args: {
    closable: false,
    duration: 4500,
    position: "bottomRight",
    variant: "info",
    latestTop: false,
    iconSlot: `<sy-icon slot="icon" size="xxlarge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg></sy-icon>`,
    slotContent: ``
  },
};