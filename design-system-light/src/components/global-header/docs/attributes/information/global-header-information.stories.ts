import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../../../clear-element';
import headerMeta from "../../global-header.stories";
import { GlobalHeaderProps, HeaderInformation } from "../../global-header";

const meta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Attributes/Information',
    tags: ['false'],
    render: (args) => {
      clearElements(meta.title);
      return HeaderInformation(args);
    },
    argTypes: {
      information: headerMeta?.argTypes?.information,
    },  
    args: {
      information: true,
    },
  };
  
  export default meta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Param: Story = {}