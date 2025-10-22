import { html } from "lit";
import "../label.element";
import "../../input/input.element";
import "../../textarea/textarea.element";
import "../../flex/flex.element";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface LabelProps {
  disabled: boolean;
  for: string;
  required: boolean;
  requiredPosition: 'left' | 'right';
  value: string;
  valuePosition: "left" | "right";
  width: string;
  slotContent: any;
}

/**
 * Primary UI component for user interaction
 */
export const Label = ({ disabled, for: htmlFor, required, requiredPosition = 'right', value, valuePosition = 'left', width, slotContent }: LabelProps) => {
  return html`
    <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
      <sy-label
        ?disabled=${disabled}
        for=${htmlFor}
        ?required=${required}
        requiredPosition=${requiredPosition}
        value=${value}
        valuePosition=${valuePosition}
        width=${width}>
      </sy-label>
      <sy-flex align="center" style="flex:1">
        <sy-input id="${htmlFor}" placeholder="Input"></sy-input>    
      </sy-flex>
    </sy-flex>
    `;
};

export const LabelFor = () => {
  return html`
  <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
    <sy-flex align="center">
      <sy-label
        for="label-for-input"
        value="Label"
        valuePosition="left"
        width="50px">
      </sy-label>    
    </sy-flex>
    <sy-flex align="center" style="flex:1">
      <sy-input id="label-for-input" placeholder="Input"></sy-input>    
    </sy-flex>
  </sy-flex>
  `;
};

export const LabelDisabled = (args: { disabled: boolean }) => {
  return html`
<sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
    <sy-flex align="center">
        <sy-label
          for="explicit-input"
          ?disabled=${args.disabled}
          value="Label"
          valuePosition="left"
          width="50px">
        </sy-label>
      </sy-flex>
      <sy-flex align="center" style="flex:1">
        <sy-input id="explicit-input" placeholder="Input"></sy-input>      
      </sy-flex>
    </sy-flex>
  `;
};

export const LabelRequired = (args: { required: boolean, requiredPosition: 'left' | 'right' }) => {
  return html`
<sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
    <sy-flex align="center">
        <sy-label
          for="explicit-input"
          ?required=${args.required}
          requiredPosition=${args.requiredPosition}
          value="Label"
          valuePosition="left"
          width="50px">
        </sy-label>
      </sy-flex>
      <sy-flex align="center" style="flex:1">
        <sy-input id="explicit-input" placeholder="Input"></sy-input>      
      </sy-flex>
    </sy-flex>
  `;
};

export const LabelValue = (args: { value: string, valuePosition: 'left' | 'right' }) => {
  return html`
    <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
      <sy-flex align="center">
        <sy-label
          for="label-input"
          value=${args.value}
          valuePosition=${args.valuePosition}
          width="50px">
        </sy-label>
      </sy-flex>
      <sy-flex align="center" style="flex:1">
        <sy-input id="label-for-input" placeholder="Input"></sy-input>    
      </sy-flex>
    </sy-flex> 
  `;
};

export const LabelWidth = (args: { width: string }) => {
  return html`
  
    <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
      <sy-flex align="center">
        <sy-label
          for="label-width-input"
          value="Label"
          width=${args.width}
          valuePosition="left">
        </sy-label>
      </sy-flex>
      <sy-flex align="center" style="flex:1">
        <sy-input id="label-for-input" placeholder="Input"></sy-input>    
      </sy-flex>
    </sy-flex> 
  `;
};

export const LabelSlot = (args: { slotContent: any }) => {
  return html`    
    <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
      <sy-flex align="center">
          <sy-label value="Label" required>
            <sy-input placeholder="Input"></sy-input>    
          </sy-label>
      </sy-flex>
    </sy-flex> 
  `;
};
