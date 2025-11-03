import { Components } from '../../../components';
import { html } from "lit";

export interface SyLabelProps extends Components.SyLabel {
  slot?: any;
}
export const Label = ({ disabled, htmlFor, required, requiredPosition = 'right', value, valuePosition = 'left', width, slot }: SyLabelProps) => {
  return html`
    <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
      <sy-label
        ?disabled=${disabled}
        htmlFor=${htmlFor}
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
        htmlFor="label-for-input"
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
          htmlFor="explicit-input"
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
          htmlFor="explicit-input"
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
          htmlFor="label-input"
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
          htmlFor="label-width-input"
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

