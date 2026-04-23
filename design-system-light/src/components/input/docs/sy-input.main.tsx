import { html } from 'lit';
import { Components } from '../../../components';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';

export interface SyInputProps extends Components.SyInput {
  slotPrefix?: string;
  slotSuffix?: string;
  changed?: (event: CustomEvent<any>) => void;
  blured?: (event: CustomEvent<any>) => void;
  focused?: (event: CustomEvent<any>) => void;
}

export const Input = ({
  autofocus,
  borderless,
  clearable,
  disabled,
  label,
  max,
  min,
  placeholder,
  readonly,
  required,
  size,
  value,
  status,
  variant,
  slotPrefix,
  slotSuffix,
}: SyInputProps) => {
  return html`
    <sy-input
      ?autofocus=${autofocus}
      ?borderless=${borderless}
      ?clearable=${clearable}
      ?disabled=${disabled}
      label=${label}
      max=${ifDefined(max)}
      min=${ifDefined(min)}
      placeholder=${placeholder}
      ?readonly=${readonly}
      ?required=${required}
      size=${size}
      status=${status}
      value=${value}
      variant=${variant}>
      ${unsafeHTML(slotPrefix)}
      ${unsafeHTML(slotSuffix)}
    </sy-input>
  `;
};

export const InputAutofocus = (args: {autofocus: boolean}) => {
  return html`
    <div style="width:300px;" tabIndex="0">
      <sy-input ?autofocus=${args.autofocus} value="Default Value" message="This is a message" type="error"></sy-input>
    </div>
  `;
};

export const InputBorderless = (args: {borderless: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input ?borderless=${args.borderless} placeholder="input value here"></sy-input>
    </div>
  `;
};

export const InputClearable = (args: {clearable: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input ?clearable=${args.clearable}></sy-input>
    </div>
  `;
};

export const InputDisabled = (args: {disabled: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input ?disabled=${args.disabled}></sy-input>
    </div>
  `;
};

export const InputLabel = (args: {label: string}) => {
  return html`
    <div style="width:300px;">
      <sy-input label="${args.label}"></sy-input>
    </div>
  `;
};

export const InputMax = (args: {max: number}) => {
  return html`
    <div style="width:300px;">
      <sy-input max="${args.max}"></sy-input>
    </div>
  `;
};

export const InputMin = (args: {min: number}) => {
  return html`
    <div style="width:300px;">
      <sy-input min="${args.min}"></sy-input>
    </div>
  `;
};

export const InputPlaceholder = (args: {placeholder: string}) => {
  return html`
    <div style="width:300px;">
      <sy-input placeholder="${args.placeholder}"></sy-input>
    </div>
  `;
};

export const InputReadonly = (args: {readonly: boolean}) => {
  return html`
<div style="width:300px;">
  <sy-input ?readonly=${args.readonly}></sy-input>
</div>
  `;
};

export const InputRequired = (args: {required: boolean}) => {
  return html`
    <div style="width:300px;">
      <sy-input ?required=${args.required} label="input label"></sy-input>
    </div>
  `;
};

export const InputSize = (args: {size: "small" | "medium" | "large"}) => {
  return html`
    <div style="width:300px;">
      <sy-input size=${args.size}></sy-input>
    </div>
  `;
};

export const InputStatus = (args: {status: 'default' | 'warning' | 'error' | 'success'}) => {
  return html`
    <div style="width:300px;">
      <sy-input status=${args.status} value="This is a default value" max="10"></sy-input>
    </div>
  `;
};

export const InputValue = (args: {value: string}) => {
  return html`
    <div style="width:300px;">
      <sy-input value="${args.value}"></sy-input>
    </div>
  `;
};

export const InputVariant = (args: {variant: "password" | "search" | "text"}) => {
  return html`
    <div style="width:300px;">
      <sy-input variant="${args.variant}"></sy-input>
    </div>
  `;
};

export const InputPrefix = () => {
  return html`
    <div style="width:300px;">
      <sy-input>
        <sy-icon slot="prefix"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg></sy-icon>
      </sy-input>
    </div>
  `;
};

export const InputSuffix = () => {
  return html`
    <div style="width:300px;">
      <sy-input>
        <sy-icon slot="suffix"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 200C306.7 200 296 210.7 296 224L296 336C296 349.3 306.7 360 320 360C333.3 360 344 349.3 344 336L344 224C344 210.7 333.3 200 320 200zM346.7 416C347.3 406.1 342.4 396.7 333.9 391.5C325.4 386.4 314.7 386.4 306.2 391.5C297.7 396.7 292.8 406.1 293.4 416C292.8 425.9 297.7 435.3 306.2 440.5C314.7 445.6 325.4 445.6 333.9 440.5C342.4 435.3 347.3 425.9 346.7 416z"/></svg></sy-icon>
      </sy-input>
    </div>
  `;
};

export const InputChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('inputChangedResult');
    const detail = (e as CustomEvent).detail ?? {};
    if (out) out.textContent = `value: ${detail.value} valid: ${detail.status}`;
  };
  return html`
    <div style="width:300px;">
      <sy-input validation clearable @changed=${handle}></sy-input>
      <p id="inputChangedResult">(idle)</p>
    </div>
  `;
};

export const InputFocusBlur = () => {
  const elRef: Ref<HTMLSyInputElement> = createRef();
  const update = (text: string) => {
    const out = document.getElementById('inputFocusResult');
    if (out) out.textContent = text;
  };
  return html`
    <div style="width:300px;">
      <h3>Focus, Blur Function</h3>
      <sy-input
        ${ref(elRef)}
        @focused=${() => update('focus')}
        @blured=${() => update('blur')}
      ></sy-input>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <sy-button variant="primary" @click=${() => elRef.value?.setFocus()}>Call setFocus()</sy-button>
        <sy-button variant="secondary" @click=${() => elRef.value?.setBlur()}>Call setBlur()</sy-button>
      </div>
      <p>Status: <span id="inputFocusResult">(idle)</span></p>
    </div>
  `;
};

