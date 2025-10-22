import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import '../card.element';
import '../../button/button.element';
import '../../tooltip/tooltip.element';
import '../../icon/icon.element';
import '../../menu/menu.element';
import '../../menu/menu-item.element';
import '../../flex/flex.element';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface CardProps {
  slotCover: any;
  slotHeader: any;
  slot: any;
  slotFooter: any;
  backdrop: boolean;
  collapsible: boolean;
}

export const Card = (args: { slotCover: any, slotHeader: any, slot: any, slotFooter: any, backdrop: boolean, collapsible: boolean }) => {
  return html`
  <style>
    sy-card {
      max-width: 300px;
    }
  </style>

   <sy-card 
    ?backdrop=${args.backdrop}
    ?collapsible=${args.collapsible}>
    ${unsafeHTML(args.slotHeader)}
    ${unsafeHTML(args.slotCover)}
    ${unsafeHTML(args.slot)}
    ${unsafeHTML(args.slotFooter)}
    </sy-card>
  `
}


export const ComplexHeader = () => {
  return html`
    <style>
     sy-card {
      max-width: 300px;
      .card-title{
        display: flex;
        line-height:normal;
      }
    }
    </style>
  <sy-card>
     <div slot="header">
        <sy-flex align="center" direction="horizontal" width="100%" columngap="small" >
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" columngap="small" class="card-title">
            <sy-icon class="new-icon" size="medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg>
            </sy-icon>
            <span sy-typography="" sytype="large-medium">Card Title</span>
          </sy-flex>            
          <sy-flex align="center" justify="end" direction="horizontal" width="100%" columngap="small" class="card-extra">
            <sy-button variant="borderless" class="right-zone">Action</sy-button>
          </sy-flex>
        </sy-flex>
      </div>
      <div class="card-body">
        <p>This is just a basic card. No cover, no header, and no footer. Just your content.</p>
      </div>
  </sy-card>
  
  `
}

export const CardBorder = () => {
  return html`
    <style>
     sy-card {
      max-width: 300px; 
    }
    .card-border{
      border:1px dashed var(--border-default);
      border-radius: var(--border-radius-large);
    }
    </style>
  <sy-card class="card-border">
      <div class="card-body">
        <p>This is just a basic card. No cover, no header, and no footer. Just your content.</p>
      </div>
  </sy-card>
  
  `
}
