import type { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from "../../../../clear-element";
import { PaginationActivePage, PaginationProps } from "../../pagination";
import paginationMeta from "../../pagination.stories";

const meta: Meta<PaginationProps> = {
  title: "Pagination/Attributes/ActivePage",
  tags: ["false"],
  render: (args) => {
    clearElements(meta.title);
    return PaginationActivePage(args);
  },
  argTypes: {
    activePage: paginationMeta?.argTypes?.activePage,
  },
  args: {
    activePage: 5,
  }
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Param: Story = {};
