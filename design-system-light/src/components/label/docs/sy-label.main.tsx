import { html, ifDefined } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyLabelProps extends Components.SyLabel {
  slot?: string;
}

export const Label = ({ disabled, htmlFor, required, requiredPosition = 'right', value, valuePosition = 'left', width }: SyLabelProps) => html`
  <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
    <sy-label
      ?disabled=${!!disabled}
      ?required=${!!required}
      for=${ifDefined(htmlFor)}
      requiredPosition=${ifDefined(requiredPosition)}
      value=${ifDefined(value)}
      valuePosition=${ifDefined(valuePosition)}
      width=${ifDefined(width)}
    ></sy-label>
    <sy-flex align="center" style="flex:1">
      <sy-input id=${ifDefined(htmlFor)} placeholder="Input"></sy-input>
    </sy-flex>
  </sy-flex>
`;

export const LabelFor = ({ htmlFor = 'label-for-input' }: Pick<SyLabelProps, 'htmlFor'> = {}) => {
  return html`
  <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
    <sy-flex align="center">
      <sy-label
        for=${ifDefined(htmlFor)}
        value="Label"
        valuePosition="left"
        width="50px">
      </sy-label>
    </sy-flex>
    <sy-flex align="center" style="flex:1">
      <sy-input id=${ifDefined(htmlFor)} placeholder="Input"></sy-input>
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

