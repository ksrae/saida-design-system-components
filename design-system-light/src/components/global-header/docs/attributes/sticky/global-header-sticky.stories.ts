import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../../../clear-element';
import headerMeta from "../../global-header.stories";
import { GlobalHeaderProps, HeaderSticky } from "../../global-header";

const meta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Attributes/Sticky',
    tags: ['false'],
    render: (args) => {
      clearElements(meta.title);
      return HeaderSticky(args);
    },
    argTypes: {
      sticky: headerMeta?.argTypes?.sticky,
    },  
    args: {
      sticky: true,
    },
  };
  
  export default meta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Param: Story = {}