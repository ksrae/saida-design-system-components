import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../../../clear-element';
import headerMeta from "../../global-header.stories";
import { GlobalHeaderProps, HeaderNotification } from "../../global-header";

const meta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Attributes/Notification',
    tags: ['false'],
    render: (args) => {
      clearElements(meta.title);
      return HeaderNotification(args);
    },
    argTypes: {
      notification: headerMeta?.argTypes?.notification,
    },  
    args: {
      notification: true,
    },
  };
  
  export default meta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Param: Story = {}