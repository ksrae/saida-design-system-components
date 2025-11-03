import { Components } from '../../../components';
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SyInputNumberProps extends Components.SyInputNumber {
  slotPrefix?: any;
  slotSuffix?: any;
  changed?: (event: CustomEvent<any>) => void;
  blured?: (event: CustomEvent<any>) => void;
  focused?: (event: CustomEvent<any>) => void;
}

export const InputNumber = ({
  autofocus,
  borderless,
  decimalPlaces,
  disabled,
  max,
  min,
  label,
  slotPrefix,
  readonly,
  required,
  rounding,
  status,
  size,
  step,
  slotSuffix,
  value,
}: SyInputNumberProps) => {
  return html`
    <sy-input-number
      ?autofocus=${autofocus}
      ?borderless=${borderless}
      decimalPlaces=${ifDefined(decimalPlaces)}
      ?disabled=${disabled}
      label=${label}
      max=${max}
      min=${min}
      ?readonly=${readonly}
      ?required=${required}
      rounding=${rounding}
      status=${status}
      size=${size}
      step=${step}
      value=${value}
    >
      ${unsafeHTML(slotPrefix)}
      ${unsafeHTML(slotSuffix)}
      </sy-input-number>
  `;
};

export const InputNumberAutofocus = (args: {autofocus: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number ?autofocus=${args.autofocus} value="0"></sy-input-number>
    </div>
  `;
};

export const InputNumberBorderless = (args: {borderless: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number ?borderless=${args.borderless} value="0"></sy-input-number>
    </div>
  `;
};

export const InputNumberDecimalPlaces = (args: {decimalPlaces: number | undefined, value: string | number, rounding: "round" | "ceil" | "floor" | ""}) => {
  return html`
<p>If decimal place is 2, the value 0.556 will be 10.56 after blur.</p>
<div style="width:300px;">
  <sy-input-number
    .decimalPlaces="${args.decimalPlaces}"
    value="${args.value}"
    rounding=${args.rounding}>
  </sy-input-number>
</div>
`;
};

export const InputNumberDisabled = (args: {disabled: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number ?disabled=${args.disabled}></sy-input-number>
    </div>
  `;
};

export const InputNumberLabel = (args: {label: string}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number label="${args.label}"></sy-input-number>
    </div>
  `;
};

export const InputNumberMax = (args: {max: number, value: string | number}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number max="${args.max}" value="${args.value}"></sy-input-number>
    </div>
  `;
};

export const InputNumberMin = (args: {min: number, value: string | number}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number min="${args.min}" value="${args.value}"></sy-input-number>
    </div>
  `;
};

export const InputNumberPrefix = (args: {prefix: string}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number prefix="${args.prefix}"></sy-input-number>
    </div>
  `;
};

export const InputNumberReadonly = (args: {readonly: boolean}) => {
  return html`
    <div style="width:300px;">
    <sy-input-number ?readonly=${args.readonly}></sy-input-number>
    </div>
  `;
};

export const InputNumberRequired = (args: {required: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number ?required=${args.required} label="Required"></sy-input-number>
    </div>
  `;
};

export const InputNumberRounding = (args: {rounding: "round" | "ceil" | "floor" | ""}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number
        decimalPlaces="0"
        rounding=${args.rounding}
        value="10.5">
      </sy-input-number>
    </div>
  `;
};

export const InputNumberStatus = (args: {status: "default" | "warning" | "error" | "success"}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number status=${args.status}></sy-input-number>
    </div>
  `;
};

export const InputNumberSize = (args: {size: "small" | "medium" | "large"}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number size=${args.size}></sy-input-number>
    </div>
  `;
};

export const InputNumberStep = (args: {step: number}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number step=${args.step}></sy-input-number>
    </div>
  `;
};

export const InputNumberSuffix = (args: {suffix: string}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number suffix=${args.suffix}></sy-input-number>
    </div>
  `;
};

export const InputNumberValue = (args: {value: string | number}) => {
  return html`
    <div style="width:300px;">
      <sy-input-number value=${args.value}></sy-input-number>
    </div>
  `;
};

export const InputNumberFocusBlur = () => {
  return html` <!-- focus -->
    <div style="width:300px;">
      <h3>Focus, Blur Function</h3>
      <sy-input-number id="inputnumberFocusElem"></sy-input-number>
      <p id="inputnumberFocusResult"></p>
    </div>
    <script>
      (() => {
        const elem = document.querySelector("#inputnumberFocusElem");
        const result = document.querySelector("#inputnumberFocusResult");

        // focus button by force with function in 1 sec.
        setTimeout(() => {
          elem.setFocus();
        }, 1000);

        // blur button by force with function in 4 sec.
        setTimeout(() => {
          elem.setBlur();
        }, 4000);

        const handleFocus = (e) => {
          result.textContent = "focus";
        };

        const handleBlur = (e) => {
          result.textContent = "blur";
        };

        elem.addEventListener("focused", handleFocus);
        elem.addEventListener("blured", handleBlur);

        // this is for release click event. It is recommanded for optimization.
        window.addEventListener("beforeunload", () => {
          elem.removeEventListener("focused", handleFocus);
          elem.removeEventListener("blured", handleBlur);
        });
      })();
    </script>`;
};

export const InputNumberChanged = () => {
  return html`
    <div style="width:300px;">
      <h3>Changed</h3>
      <sy-input-number id="inputnumberChanged" validation></sy-input-number>
      <p id="inputnumberChangedResult"></p>
    </div>
    <script>
      (() => {
        const elem = document.querySelector("#inputnumberChanged");
        const result = document.querySelector("#inputnumberChangedResult");

        const handleChanged = (e) => {
          console.log(e.detail);
          result.textContent = e.detail.value + " " + e.detail.status;
        };

        elem.addEventListener("changed", handleChanged);

        // this is for release click event. It is recommanded for optimization.
        window.addEventListener("beforeunload", () => {
          elem.removeEventListener("changed", handleChanged);
        });
      })();
    </script>
  `;
};

