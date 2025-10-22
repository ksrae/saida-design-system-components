import { html } from 'lit';
import '../select.element';
import '../select-option.element';
import '../../icon/icon.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SelectOptionProps {
  disabled: boolean;
  label: string;
  showTooltip: boolean;
  readonly: boolean;
  value: string;
  slotContent: any;
}

export interface SelectOptionListProps {
  item: SelectOptionProps[];
}

export const SelectOption = ({disabled, label, showTooltip, readonly, value, slotContent}: SelectOptionProps) => {
  return html`
  <sy-select id="option-overview">
    <sy-option 
      ?disabled=${disabled} 
      label="${label}"
      ?showTooltip="${showTooltip}"
      ?readonly=${readonly}
      value="${value}">
    </sy-option>
  </sy-select>
  <br/><br/>
  <script>
    // this codes for only overview on storybook.
    document.querySelector('#option-overview').addEventListener('clicked', (e) => {
      const optionsContainer = document.querySelector('.options-container');
      if(optionsContainer) {
        optionsContainer.style.zIndex = 148;
      }
    });
  </script>
  `;
};

export const SelectOptionDisalbed = (args: {disabled: boolean}) => {
  return html`
<sy-select>
  <sy-option value="1" label="option1" ?disabled=${args.disabled}></sy-option>
</sy-select>
  `;
};


export const SelectOptionCustom = (args: {slotContent: string}) => {
  return html`
<sy-select>
  <sy-option label="option1" value="value1">
    ${unsafeHTML(args.slotContent)}
  </sy-option>
</sy-select>
  `;
};

export const SelectOptionShowTooltip = (args: {showTooltip: boolean}) => {
  return html`
<sy-select>
  <sy-option label="option1" value="value1" ?showTooltip="${args.showTooltip}"></sy-option>
</sy-select>
  `;
};

export const SelectOptionReadonly = () => {
  return html`
<!-- readonly items -->
<h3>Readonly Items</h3>
<sy-select>
  <sy-option value="value1" label="option1" readonly></sy-option>
  <sy-option value="value2" label="option2" readonly></sy-option>
  <sy-option value="value3" label="option3" readonly></sy-option>
</sy-select>
<br/>
<br/>
<br/>
<br/>
<br/>
<!-- enabled items -->
<h3>Default</h3>
<sy-select>
  <sy-option value="value1" label="option1"></sy-option>
  <sy-option value="value2" label="option2"></sy-option>
  <sy-option value="value3" label="option3"></sy-option>
</sy-select>
  `;
};