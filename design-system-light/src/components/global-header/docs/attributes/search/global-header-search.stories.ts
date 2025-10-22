import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../../../clear-element';
import headerMeta from "../../global-header.stories";
import { GlobalHeaderProps, HeaderSearch } from "../../global-header";

const meta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Attributes/Search',
    tags: ['false'],
    render: (args) => {
      clearElements(meta.title);
      return HeaderSearch(args);
    },
    argTypes: {
      search: headerMeta?.argTypes?.search,
    },  
    args: {
      search: true,
    },
  };
  
  export default meta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Param: Story = {}