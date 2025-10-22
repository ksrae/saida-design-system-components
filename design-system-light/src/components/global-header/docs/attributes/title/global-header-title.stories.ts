
import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../../../clear-element';
import headerMeta from "../../global-header.stories";
import { GlobalHeaderProps, HeaderTitle } from "../../global-header";

const meta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Attributes/Title',
    tags: ['false'],
    render: (args) => {
      clearElements(meta.title);
      return HeaderTitle(args);
    },
    argTypes: {
      title: headerMeta?.argTypes?.title,
    },  
    args: {
      title: 'Enter title'
    },
  };
  
  export default meta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Param: Story = {}