import { html } from "lit";
import "../tooltip.element";
import "../../button/button.element";
import "../../tag/tag.element";

export interface TooltipProps {
  hideArrow: boolean;
  closedelay: number;
  content: string;
  maxWidth: number | null;
  opendelay: number;
  open: boolean;
  position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  trigger: 'hover' | 'click' | 'focus' | 'none';
 
}

export const Tooltip = ({ hideArrow, closedelay, content, maxWidth, open, opendelay, position, trigger}: TooltipProps) => {
  return html`
    <sy-button>
      ${trigger} me
      <sy-tooltip
        ?hideArrow=${hideArrow}
        closedelay=${closedelay}
        content=${content}
        maxWidth=${maxWidth}
        opendelay=${opendelay}
        ?open=${open}
        position=${position}
        trigger=${trigger}>
      </sy-tooltip>
    </sy-button>
  `;
};

export const TooltipHideArrow = (args: {hideArrow: boolean}) => {
  return html`
 <sy-button>
    Hover me
    <sy-tooltip ?hideArrow=${args.hideArrow} content="tooltip content"></sy-tooltip>
</sy-button>
  `;
};

export const TooltipContent = (args: {content: string}) => {
  return html`
 <sy-button>
    Hover me
    <sy-tooltip content=${args.content}></sy-tooltip>
</sy-button>
  `;
};

export const TooltipDelay = (args: {opendelay: number, closedelay: number}) => {
  return html`
 <sy-button>
    Hover me
    <sy-tooltip opendelay=${args.opendelay} closedelay=${args.closedelay} content="tooltip content"></sy-tooltip>
</sy-button>
  `;
};

export const TooltipMaxwidth = (args: {maxWidth: number | null, content: string}) => {
  return html`
  <sy-button>
    Hover me 
    <sy-tooltip .maxWidth=${args.maxWidth} position="top" trigger="hover" content=${args.content} content="tooltip content is so long"></sy-tooltip>
  </sy-button>
  `;
};

export const TooltipOpen = (args: {open: boolean}) => {
  return html`
  <sy-button>
    Set open true to show tooltip
    <sy-tooltip trigger="none" ?open=${args.open} content="tooltip content"></sy-tooltip>
  </sy-button>
  `;
};

export const TooltipPosition = (args: {position:  'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'}) => {
  return html`
  <div style="width:150px;height:150px;border:1px solid;margin:auto;text-align:center;line-height:150px;">
    Hover me 
    <sy-tooltip position=${args.position} content="${args.position}"></sy-tooltip>
  </div>
  `;
};

export const TooltipTrigger = (args: {trigger: 'hover' | 'click' | 'focus' | 'none'}) => {
  return html`
  <sy-button>
    ${args.trigger !== 'none' ? args.trigger + ' me' : args.trigger}
    <sy-tooltip trigger=${args.trigger} content="tooltip content"></sy-tooltip>
  </sy-button>
  `;
};
