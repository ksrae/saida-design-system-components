import { html } from 'lit';
import '../dropdown.element';
import '../../menu/menu.element';
import '../../menu/menu-item.element';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface DropdownProps {
  borderless: boolean;
  disabled: boolean;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  // position: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
  size: 'small' | 'medium' | 'large';
  trigger: 'hover' | 'click';
  slotContent: any;
  slotTitle: any;
  selected?: () => any;
}
/**
 * Primary UI component for user interaction
 */
export const Dropdown = ({ position, trigger, size, borderless, disabled, slotContent, slotTitle }: DropdownProps) => {
  return html`
	<sy-dropdown
    style="z-index: 100;"
    position=${position}
    ?disabled=${disabled}
    size=${size}
    trigger=${trigger}
    ?borderless=${borderless}>
    ${unsafeHTML(slotTitle)}
    <sy-menu>    
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
</sy-dropdown>
  `;
};

export const DropdownBorderless = (args: {borderless: boolean}) => {
  return html`
  <sy-dropdown ?borderless=${args.borderless}>
    <span slot="title">Dropdown</span>
    <sy-menu>
      <sy-menu-item value="1">Item1</sy-menu-item>      
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </sy-dropdown>
  `;
}


export const DropdownDisabled = (args: {disabled: boolean}) => {
  return html`
  <sy-dropdown ?disabled=${args.disabled}>
    <span slot="title">Dropdown</span>
    <sy-menu>    
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </sy-dropdown>
  `;
}

export const DropdownPosition = (args: {position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'}) => {
  return html`
  <sy-dropdown position=${args.position}>
    <span slot="title">Dropdown</span>
    <sy-menu>    
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </sy-dropdown>
  `;
}


export const DropdownSize = (args: {size: 'small' | 'medium' | 'large'}) => {
  return html`
  <sy-dropdown size="${args.size}">
    <span slot="title">Dropdown</span>
    <sy-menu>    
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </sy-dropdown>
  `;
}

export const DropdownTrigger = (args: {trigger: 'hover' | 'click'}) => {
  return html`
  <sy-dropdown trigger=${args.trigger}>
    <span slot="title">Dropdown</span>
    <sy-menu>    
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </sy-dropdown>
  `;
}

export const DropdownSelected = () => {
  return html`
  <sy-dropdown id="DropdownSelected">
    <span slot="title">Dropdown</span>
    <sy-menu>    
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </sy-dropdown>
  <br/>
  <br/>
  <br/>
  <br/>
<p id="DropdownSelectedResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#DropdownSelected');  
    let result = document.querySelector('#DropdownSelectedResult');    

    let handleSelected = (e) => {
      if(e.detail.value) {
        result.textContent = 'dropdown value ' + e.detail.value + ' is selected';
      }
    };

    elem.addEventListener('selected', handleSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelected);
    });
  })();

</script>` 
};