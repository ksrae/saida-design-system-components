import type { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from "../../clear-element";
import { Skeleton, SkeletonProps } from "./skeleton";

const skeletonMeta: Meta<SkeletonProps> = {
  title: "Skeleton/Overview",
  tags: ["false"],
  render: (args) => {
    clearElements(skeletonMeta.title);
    return Skeleton(args);
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables the skeleton.",
      table: {
        category: "Parameter",
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      },
    },
    rows: {
      control: "number",
      description: "Number of rows",
      table: {
        category: "Parameter",
        defaultValue: { summary: 0 as any },
        type: { summary: 'number' }
      },
    },
    type: {
      control: "select", 
      options: ["text", "avatar", "image", "gallary", "button", "table", "tree"],
      description: "Type of skeleton",
      table: {
        category: "Parameter",
        defaultValue: { summary: "text" },
        type: { summary: "text | avatar | image | gallary | button | table | tree" },
      },
    },
    width: {
      control: "text",
      description: "Width of the skeleton",
      table: {
        category: "Parameter",
        defaultValue: { summary: "" },
        type: { summary: 'string' }
      },
    },
  },
};

export default skeletonMeta;
type Story = StoryObj<SkeletonProps>;

export const Default: Story = {
  args: {
    disabled: false,
		rows: 3,
		type: "text",
		width: "100%",
  },
};
