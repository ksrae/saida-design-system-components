
import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../../../clear-element';
import headerMeta from "../../global-header.stories";
import { GlobalHeaderProps, HeaderTab } from "../../global-header";

const meta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Attributes/Tab',
    tags: ['false'],
    render: () => {
      clearElements(meta.title);
      return HeaderTab();
    },
    argTypes: {
      
    },  
    args: {
      
    },
  };
  
  export default meta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Param: Story = {}