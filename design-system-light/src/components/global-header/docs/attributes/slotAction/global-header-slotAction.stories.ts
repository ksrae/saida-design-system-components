import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../../../clear-element';
import headerMeta from "../../global-header.stories";
import { GlobalHeaderProps, HeaderSlotAction } from "../../global-header";

const meta: Meta<GlobalHeaderProps> = {
    title: 'GlobalHeader/Attributes/SlotActions',
    tags: ['false'],
    render: (args:any) => {
      clearElements(meta.title);
      return HeaderSlotAction(args);
    },
    argTypes: {
      slotActions: headerMeta?.argTypes?.slotActions,
    },  
    args: {
      slotActions: `
      <div slot="actions">      
        <sy-input placeholder="Help Search" size="medium" slot="actions" style="width:120px;"></sy-input>         
        <sy-button size="medium" variant="borderless">
          <sy-icon size="medium" selectable><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg></sy-icon>
        </sy-button>
        <sy-button size="medium" variant="borderless">
           <sy-icon size="medium" selectable><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"/></svg></sy-icon> 
        </sy-button>            
        <sy-divider type="vertical" style="height:18px;"></sy-divider>
        <sy-dropdown position="bottomLeft" size="medium" trigger="click" borderless>
          <span slot="title">Dropdown</span>
          <sy-menu>    
            <sy-menu-item value="1">Item1</sy-menu-item>
            <sy-menu-item value="2">Item2</sy-menu-item>
          </sy-menu>
        </sy-dropdown>         
        <sy-avatar size="small" image="avatar_default.png"></sy-avatar>
      </div>
      `
    },
  };
  
  export default meta;
  type Story = StoryObj<GlobalHeaderProps>;
  
  export const Param: Story = {}