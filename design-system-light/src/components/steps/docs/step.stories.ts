import type { Meta, StoryObj } from "@storybook/web-components";
import { Step, StepProps } from "./steps";
import { clearElements } from '../../clear-element';
const stepMeta: Meta<StepProps> = {
  title: "Step/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements('Steps/Overview');
    return Step(args);
  },
  argTypes: {
    description: {
      control: "text",
      description: "The description of the step",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the step.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    loading: {
      control: "boolean",
      description: "Sets loading animation to the step.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    status: {
      control: "select",
      options: ["finish", "current", "wait", "error", "none"],
      description: "The status of the step. Set none for ordinary cases",
      table: {
        category: "Parameter",
        defaultValue: { summary: "none" },
        type: { summary: "finish | current | wait | error | none" },
      },
    },
    slotContent: {
      control: 'text',
      description: 'The title of the step.(ex: `<span>step1</span>`)',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    }
  },

};

export default stepMeta;
type Story = StoryObj<StepProps>;

export const Default: Story = {
  args: {
    disabled: false,
    description: "description",
    loading: false,
    status: 'none',
    slotContent: ``,
  },
};
