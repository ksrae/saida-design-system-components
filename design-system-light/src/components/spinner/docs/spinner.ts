import { html } from 'lit';
import '../spinner.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SpinnerProps {
  delay : number;
  description : string;
  hidden: boolean;
  inline: boolean;
  size: 'small' | 'medium' | 'large';
  //stop: boolean;
  slotContent: any;
}
/**
 * Primary UI component for user interaction
 */
export const Spinner = ({delay, description, hidden, inline, size, slotContent}: SpinnerProps) => {
  return html`
  <div>
    <sy-spinner 
      delay=${delay}
      description=${description} 
      ?hidden=${hidden}
      size=${size}
      ?inline=${inline}>
    </sy-spinner>
  </div>
  `;
};

export const SpinnerDelay = (args: {delay: number}) => {
  return html`  
  <sy-spinner delay=${args.delay}></sy-spinner>
  `
};

export const SpinnerDesc = (args: {description: string}) => {
  return html`
  <sy-spinner description=${args.description}></sy-spinner>
  `
};

export const SpinnerHidden = (args: {hidden: boolean}) => {
  return html`
  <sy-spinner ?hidden=${args.hidden}></sy-spinner>
  `
};

/* export const SpinnerOverlay = (args: {overlay: boolean}) => {
  return html`
  <div class="overlay" style="width:100%;height:100px;">
    <div style="width:100%;height:100%;">
      <sy-spinner ?overlay=${args.overlay} id="overlaySpinner">
        <p>Sample Text & Table</p>
      </sy-spinner>
    </div>
  </div>
  `
};
 */

/* export const SpinnerStop = (args: {stop: boolean}) => {
  return html`
  <sy-spinner ?stop=${args.stop}></sy-spinner>
  `
};

 */
export const SpinnerInline = (args: {inline: boolean, size: string}) => {
  return html`
  <sy-spinner ?inline=${args.inline} size=${args.size}></sy-spinner>
  `
}

export const SpinnerSize = (args: {size: string}) => {
  return html`
  <sy-spinner size=${args.size}></sy-spinner>
  `
}
