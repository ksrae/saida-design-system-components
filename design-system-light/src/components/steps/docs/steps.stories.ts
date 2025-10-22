import type { Meta, StoryObj } from "@storybook/web-components";
import { Steps, StepsProps } from "./steps";
import { clearElements } from '../../clear-element';

const stepsMeta: Meta<StepsProps> = {
  title: "Steps/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(stepsMeta.title);
    return Steps(args);
  },
  argTypes: {
    current: {
      control: "number",
      description:
        "To set the current step, counting from startIndex. Set 0, if startIndex is not set.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' }
      },
    },
    complete: {
      control: "boolean",
      description: "If true, all steps complete at once.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    startIndex: {
      control: "number",
      description:
        "Defines the starting index for the steps, allowing the process to begin from a specific step rather than the first one.",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' }
      },
    },
    type: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Changes the orientation of the steps.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "horizontal" },
        type: { summary: 'horizontal | vertical' }
      },
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
      description: "The size of steps.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: 'small | medium' }
      },
    },
    clickable: {
      control: "boolean",
      description: "Sets the steps clickable.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    slotContent: {
      control: false,
      description: "The step options of the steps",
      table: {
        category: "Parameter",
        defaultValue: { summary: "Radio" },
      },
    },
    selected: {
      type: "function",
      action: "click",
      description: "Triggered when the selected step changes.",
      table: {
        category: "Callback",
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      },
    },
  },
};

export default stepsMeta;
type Story = StoryObj<StepsProps>;

export const Default: Story = {
  args: {
    current: 0,
    complete: false,
    clickable: false,
    size: "medium",
    startIndex: 0,
    type: "horizontal",    
    slotContent: ``,
  },
};
