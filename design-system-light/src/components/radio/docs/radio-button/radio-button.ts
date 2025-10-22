import { html } from 'lit';
import '../../radio-button.element';
import '../../radio-group.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface RadioGroupProps {
  // label: string;
  // required: boolean;
  disabled: boolean;
  defaultValue: string;
  // readonly: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'outlined' | 'solid';
  slotContent: any;
  selected?: () => any;
  // validChanged?: () => any;
}

export interface RadioButtonProps {
  checked: boolean;
  disabled: boolean;
  value: string;
  slotContent: any;
  selected?: () => any;
}


export const RadioButtonGroup = ({disabled, defaultValue, size, variant, slotContent}: RadioGroupProps) => {
  return html`
    <sy-radio-group 
      defaultValue=${defaultValue}
      ?disabled=${disabled}
      size=${size}
      variant=${variant}>
      <sy-radio-button value="1">RadioButton1</sy-radio-button>
      <sy-radio-button value="2">RadioButton2</sy-radio-button>
      <sy-radio-button value="3">RadioButton3</sy-radio-button>
    </sy-radio-group>
  `;
};

/**
 * Primary UI component for user interaction
 */
export const RadioButton = ({checked, disabled, value, slotContent}: RadioButtonProps) => {
  return html`
    <sy-radio-button    
      ?checked=${checked}
      ?disabled=${disabled}
      value=${value}>
      ${unsafeHTML(slotContent)}
    </sy-radio-button>
  `;
};

export const RadioButtonChecked = (args: {checked: boolean}) => {
  return html`
<sy-radio-group>
  <sy-radio-button ?checked=${args.checked} value="1">Radio 1</sy-radio-button>
  <sy-radio-button value="2">Radio 2</sy-radio-button>
</sy-radio-group>
`;
}

export const RadioButtonDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-radio-group>
  <sy-radio-button ?disabled=${args.disabled} value="1">Radio 1</sy-radio-button>
</sy-radio-group>
`;
}

export const RadioButtonGroupSize = (args: {size: 'small' | 'medium' | 'large'}) => {
  return html`
<sy-radio-group size=${args.size}>
  <sy-radio-button value="1">Button 1</sy-radio-button>
  <sy-radio-button value="2">Button 2</sy-radio-button>
  <sy-radio-button value="3">Button 3</sy-radio-button>
</sy-radio-group>
`;
};

export const RadioButtonGroupDisabled = (args: {disabled: boolean}) => {
  return html`
  <sy-radio-group ?disabled=${args.disabled}>
    <sy-radio-button value="1">Radio 1</sy-radio-button>
    <sy-radio-button value="2">Radio 2</sy-radio-button>
    <sy-radio-button value="3">Radio 3</sy-radio-button>
  </sy-radio-group>
  `;
}

export const RadioButtonGroupDefaultValue = (args: {defaultValue: string}) => {
  return html`
<sy-radio-group defaultValue=${args.defaultValue}>
  <sy-radio-button value="1">Radio 1</sy-radio-button>
  <sy-radio-button value="2">Radio 2</sy-radio-button>
  <sy-radio-button value="3">Radio 3</sy-radio-button>
</sy-radio-group>
`;
};

// export const RadioButtonGroupReadonly =(args: {readonly: boolean}) => {
//   return html`
//   <sy-radio-group ?readonly=${args.readonly}>
//     <sy-radio-button value="1">Radio 1</sy-radio-button>
//     <sy-radio-button value="2">Radio 2</sy-radio-button>
//     <sy-radio-button value="3">Radio 3</sy-radio-button>
//   </sy-radio-group>
//   `;
// }

export const RadioButtonGroupVariant = (args: {variant: 'outlined' | 'solid'}) => {
  return html`
<sy-radio-group variant=${args.variant} defaultValue="1">
  <sy-radio-button value="1">Radio button 1</sy-radio-button>
  <sy-radio-button value="2">Radio button 2</sy-radio-button>
  <sy-radio-button value="3">Radio button 3</sy-radio-button> 
</sy-radio-group>
`;
}

export const RadioButtonSelected = () => {
  return html`
<h3>Selected</h3>
<sy-radio-group id="radioBtnSelected">
  <sy-radio-button value="1">Radio 1</sy-radio-button>
  <sy-radio-button value="2">Radio 2</sy-radio-button>
  <sy-radio-button value="3">Radio 3</sy-radio-button>
</sy-radio-group>

<p id="radioBtnSelectedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#radioBtnSelected');  
    const result = document.querySelector('#radioBtnSelectedResult');

    const handleSelected = (e) => {
      result.textContent = 'value ' + e.detail.value + ' is selected';
    };

    elem.addEventListener('selected', handleSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelected);
    });
  })();
</script>
`;
}
