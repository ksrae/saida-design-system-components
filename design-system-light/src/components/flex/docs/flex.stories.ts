
import { Flex, FlexProps } from "./flex";
import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../clear-element';
import { html } from "lit";
import '../../button/button.element';
import '../../button-group/button-group.element';
import '../../switch/switch.element';
import '../../tag/tag.element';
import '../../spinner/spinner.element';
import '../../input/input.element';
import '../../textarea/textarea.element';
import '../../radio/radio.element';
import '../../checkbox/checkbox.element';

const flexMeta: Meta<FlexProps> = {
    title: 'Flex/Overview',
    tags: ['false'],
    render: (args) => {
      clearElements(flexMeta.title);
      return Flex(args);
    },
    argTypes: {
      align: {
        control: 'select',
        options: ['start', 'end', 'center', 'stretch', 'baseline'],
        description: 'The align of the flex', 
        table: {
          category: 'Parameter',
          defaultValue: { summary: 'start' },
          type: { summary: 'start | end | center | stretch | baseline' },
        },     
      },
      rowGap: {
        control: 'select',
        options: ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
        description: 'The row gap of the flex',
        table: {
          category: 'Parameter',
          defaultValue: { summary: 'medium' },
          type: { summary: 'none | xsmall | small | medium | large | xlarge' },
        },
      },
      columnGap: {
        control: 'select',
        options: ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
        description: 'The column gap of the flex',
        table: {
          category: 'Parameter',
          defaultValue: { summary: 'medium' },
          type: { summary: 'none | xsmall | small | medium | large | xlarge' },
        },
      },
      height: {
        control: 'text',
        description: 'The height of the flex', 
        table: {
          category: 'Parameter',
          defaultValue: {summary: ''},
          type: { summary: 'string' }
        }      
      },
      justify: {
        control: 'select',
        options: ['start', 'center', 'end', 'space-between'],
        description: 'The justify of the flex',
        table: {
          category: 'Parameter',
          defaultValue: { summary: 'start' },
          type: { summary: 'start | center | end | space-between' },
        },
      },
      padding: {
        control: 'select',
        options: ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
        description: 'The padding of the flex',
        table: {
          category: 'Parameter',
          defaultValue: { summary: 'medium' },
          type: { summary: 'none | xsmall | small | medium | large | xlarge' },
        },
      },
      direction: {
        control: 'select',
        options: ['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse'],
        description: 'The direction of the flex.', 
        table: {
          category: 'Parameter',
          defaultValue: { summary: 'horizontal' },
          type: { summary: 'horizontal | vertical | horizontal-reverse | vertical-reverse' },
        }, 
      },
      width: {
        control: 'text',
        description: 'The width of the flex<br/> (% Available)', 
        table: {
          category: 'Parameter',
          defaultValue: {summary: ''},
          type: { summary: 'string' }
        }      
      },
      wrap: {
        control: 'select',
        options: ['wrap', 'nowrap', 'wrap-reverse'],
        description: 'The type of the flex.<br/> (Please check the wrap in the attribute)', 
        table: {
          category: 'Parameter',
          defaultValue: { summary: 'nowrap' },
          type: { summary: 'wrap | nowrap | wrap-reverse' },
        },    
      },
      slotContent: {
        control: 'text', 
        description: 'The list of the flex-item', 
        table: {
          category: 'Parameter',
          defaultValue: {summary: ''},
        }
      },
    },
  };
  
  export default flexMeta;
  type Story = StoryObj<FlexProps>;
  
  export const Default: Story = {
    args: {
      align: 'start',
      columnGap: 'medium',
      rowGap: 'medium',
      justify: 'start',
      padding: 'none',
      width:'100%',
      height:'200',
      direction:'horizontal',
      wrap: 'nowrap',
      slotContent: `
        <div class="flex-item">item1</div>
        <div class="flex-item">item2</div>
        <div class="flex-item">item3</div>
        <div class="flex-item">item4</div>
      `,
    }
  }
  
  export const HeaderList: Story = {
    render: () => {
      clearElements(flexMeta.title);
      return html`
      <style>
        h4{
          margin-bottom: var(--spacing-xsmall);
        }
        sy-flex {
          background-color: var(--background-default);
        } 
        </style>
        
        <h4 sy-typography="">Header grid sample</h4>
        <sy-flex align="center" direction="horizontal" justify="space-between" padding="medium" columngap="medium" width="100%" >
          <span sy-typography sytype="base-bold" class="left-area">Header Title</span>
          <span class="list-value" class="right-area">
            <sy-button size="medium" variant="default">
              Default
            </sy-button>
            <sy-button size="medium" variant="secondary">
              Secondary
            </sy-button>
           <sy-button size="medium" variant="primary">
              Primary
            </sy-button>            
          </span>
        </sy-flex>

      `
    }
  }
  export const InfoList: Story = {
    render: () => {
      clearElements(flexMeta.title);
      return html`
      <style>
        sy-flex {
          background-color: var(--background-default);
        }
        .list-item{
          min-height:32px;
          .list-label{
            width:150px;
          }      
          .list-value{
            flex:1
          }
        }
        </style>

        <h4 sy-typography="">List grid sample</h4>
        <sy-flex direction="vertical" width="100%" padding="medium" rowgap="small"  class="info-list">
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">
            <span sy-typography sytype="base-bold" class="list-label">UI Package</span>
            <span sy-typography class="list-value">@slm/ui@4.1.0</span>
          </sy-flex>
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <span sy-typography sytype="base-bold" class="list-label">UI Revision</span>
            <span sy-typography class="list-value">design-system#e71370e</span>
          </sy-flex>    
          <sy-flex align="center" direction="horizontal"  width="100%" columngap="small" class="list-item">                       
            <span sy-typography sytype="base-bold" class="list-label">UI Mode</span>
            <span sy-typography class="list-value">Development</span>
          </sy-flex> 
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <span sy-typography sytype="base-bold" class="list-label">UI Locale</span>
            <span sy-typography class="list-value">en</span>
          </sy-flex>      
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <span sy-typography sytype="base-bold" class="list-label">Silicon.da Revision</span>
            <span sy-typography class="list-value">feature/DC_interfacing_with_Fab.da #6026 (d91a68413c8)</span>
          </sy-flex>  
        </sy-flex>

      `
    }
  }

  export const InfoToggleList: Story = {
    render: () => { 
      clearElements(flexMeta.title);
      return html `
      <h4 sy-typography="">Components grid sample</h4>
        <sy-flex direction="vertical" width="100%" padding="medium" rowgap="small" class="info-list" >
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <div class="list-label">
              <span sy-typography sytype="base-bold" class="list-label">Buttons</span>
            </div>
            <sy-flex class="list-value" align="center" columngap="small">
              <sy-button size="medium" type="button" variant="default">
                  Button
              </sy-button>
              <sy-button size="medium" type="button" variant="default">
                  <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M466.6 114.2C461.2 115.9 455.3 116 450.4 113.3C444.6 110.1 438.6 107.1 432.6 104.4C422.2 99.7 418.9 86.1 428.5 79.8C443.5 69.9 461.5 64.1 480.8 64.1C533.4 64.1 576 106.7 576 159.3C576 172.5 573.3 185.1 568.4 196.6C563.9 207.1 550 206.4 543.5 197C539.7 191.5 535.7 186.2 531.5 181C528 176.6 527 170.8 527.7 165.2C527.9 163.3 528.1 161.3 528.1 159.3C528.1 133.2 506.9 112.1 480.9 112.1C476 112.1 471.2 112.9 466.7 114.3zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C201.3 107.1 195.4 110 189.6 113.2C184.7 115.9 178.7 115.8 173.4 114.1C168.9 112.7 164.2 111.9 159.2 111.9C133.1 111.9 112 133.1 112 159.1C112 161.1 112.1 163.1 112.4 165C113.1 170.6 112.1 176.4 108.6 180.8C104.4 186 100.4 191.3 96.6 196.8zM496 352C496 254.8 417.2 176 320 176C222.8 176 144 254.8 144 352C144 449.2 222.8 528 320 528C417.2 528 496 449.2 496 352zM460.5 526.5C422.1 557.4 373.2 576 320 576C266.8 576 217.9 557.4 179.5 526.5L137 569C127.6 578.4 112.4 578.4 103.1 569C93.8 559.6 93.7 544.4 103.1 535.1L145.6 492.6C114.6 454.1 96 405.2 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 405.2 525.4 454.1 494.5 492.5L537 535C546.4 544.4 546.4 559.6 537 568.9C527.6 578.2 512.4 578.3 503.1 568.9L460.6 526.4zM344 248L344 342.1L385 383.1C394.4 392.5 394.4 407.7 385 417C375.6 426.3 360.4 426.4 351.1 417L303.1 369C298.6 364.5 296.1 358.4 296.1 352L296.1 248C296.1 234.7 306.8 224 320.1 224C333.4 224 344.1 234.7 344.1 248z"/></svg></sy-icon>
              </sy-button>    
              </sy-button>     
              </sy-flex>                                 
          </sy-flex>         
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">
            <span sy-typography sytype="base-bold" class="list-label">Button Group</span>
            <sy-flex class="list-value" align="center" columngap="medium">
              <sy-button-group> 
                  <sy-button variant="default">Light</sy-button>
                  <sy-button variant="default">Dark</sy-button>
                  <sy-button variant="default">System</sy-button>
              </sy-button-group>
              <span>
                disabled for now 
              </span>
            </sy-flex>
          </sy-flex>
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <span sy-typography sytype="base-bold" class="list-label">Toggle</span>
            <div class="list-value"><sy-switch label="new hierarchical attributes" size="medium"></sy-switch></div>
          </sy-flex>   
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <div class="list-label">
              <span sy-typography sytype="base-bold" class="list-label">Tags</span>
            </div>
            <sy-flex class="list-value" align="center" columngap="small">
              <sy-tag key="" size="large" variant="purple">Tag1</sy-tag>
              <sy-tag key="" size="large" variant="blue">Tag2</sy-tag>
              <sy-tag key="" size="large" variant="cyan">Tag3</sy-tag>
            </sy-flex>
          </sy-flex>  
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <div class="list-label">
              <span sy-typography sytype="base-bold" class="list-label">Radio</span>
            </div>
            <div class="list-value">
              <sy-radio-group defaultvalue="1">
                  <sy-radio value="1">Radio 1</sy-radio>
                  <sy-radio value="2">Radio 2</sy-radio>
                  <sy-radio value="3">Radio 3</sy-radio>
              </sy-radio-group>
            </div>
          </sy-flex>                      
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <div class="list-label">
              <span sy-typography sytype="base-bold" class="list-label">Spinner</span>
            </div>
            <div class="list-value">
              <sy-spinner delay="0" description="Loading..." size="medium" inline="">
              </sy-spinner>
            </div>
          </sy-flex> 
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" class="list-item">                       
            <div class="list-label">
              <span sy-typography sytype="base-bold" class="list-label">Input</span>
            </div>
            <div class="list-value">
              <sy-input autofocus labelposition="horizontal" max="9007199254740991" min="0" placeholder="Input text" size="medium" status="default" value="" variant="text">
                  <sy-icon slot="prefix"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg></sy-icon>
                  <sy-icon slot="suffix"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 200C306.7 200 296 210.7 296 224L296 336C296 349.3 306.7 360 320 360C333.3 360 344 349.3 344 336L344 224C344 210.7 333.3 200 320 200zM346.7 416C347.3 406.1 342.4 396.7 333.9 391.5C325.4 386.4 314.7 386.4 306.2 391.5C297.7 396.7 292.8 406.1 293.4 416C292.8 425.9 297.7 435.3 306.2 440.5C314.7 445.6 325.4 445.6 333.9 440.5C342.4 435.3 347.3 425.9 346.7 416z"/></svg></sy-icon>
              </sy-input>
            </div>
          </sy-flex>    
          <sy-flex align="baseline" direction="horizontal" width="100%" columngap="small" class="list-item">  
            <div class="list-label">
              <span sy-typography sytype="base-bold" class="list-label">Input</span>            
            </div>                     
            <div class="list-value">
              <sy-textarea autofocus labelposition="horizontal" max="0" min="0" placeholder="Please Input text" resize="none" rows="4" size="medium" value="This is a default value">
                    <div slot="message">help text</div>
              </sy-textarea>
            </div>
          </sy-flex>                                                            
        </sy-flex>        

      `
    }
  }