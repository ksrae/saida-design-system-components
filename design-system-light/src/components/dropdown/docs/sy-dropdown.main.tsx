import { html, ifDefined, unsafeHTML } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyDropdownProps extends Components.SyDropdown {
  slotTitle?: string;
  slotContent?: string;
  selected?: (event: CustomEvent<any>) => void;
}

const slotOrEmpty = (s?: string) => (s ? unsafeHTML(s) : '');

export const Dropdown = ({ position, trigger, size, borderless, disabled, slotContent, slotTitle }: SyDropdownProps) => html`
  <sy-dropdown
    style="z-index: 100;"
    ?disabled=${!!disabled}
    ?borderless=${!!borderless}
    position=${ifDefined(position)}
    size=${ifDefined(size)}
    trigger=${ifDefined(trigger)}
  >
    ${slotOrEmpty(slotTitle)}
    ${slotOrEmpty(slotContent)}
  </sy-dropdown>
`;

const renderDemo = (extra: { borderless?: boolean; disabled?: boolean; position?: any; size?: any; trigger?: any }) => html`
  <sy-dropdown
    ?borderless=${!!extra.borderless}
    ?disabled=${!!extra.disabled}
    position=${ifDefined(extra.position)}
    size=${ifDefined(extra.size)}
    trigger=${ifDefined(extra.trigger)}
  >
    <span slot="title">Dropdown</span>
    <sy-menu>
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </sy-dropdown>
`;

export const DropdownBorderless = (args: { borderless: boolean })                                 => renderDemo(args);
export const DropdownDisabled   = (args: { disabled: boolean })                                   => renderDemo(args);
export const DropdownPosition   = (args: { position: 'topLeft'|'topRight'|'bottomLeft'|'bottomRight' }) => renderDemo(args);
export const DropdownSize       = (args: { size: 'small'|'medium'|'large' })                       => renderDemo(args);
export const DropdownTrigger    = (args: { trigger: 'hover'|'click' })                             => renderDemo(args);

export const DropdownSelected = () => {
  const handle = (e: Event) => {
    const detail = (e as CustomEvent).detail ?? {};
    if (!detail.value) return;
    const out = document.getElementById('DropdownSelectedResult');
    if (out) out.textContent = 'dropdown value ' + detail.value + ' is selected';
  };
  return html`
    <sy-dropdown @selected=${handle}>
      <span slot="title">Dropdown</span>
      <sy-menu>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </sy-dropdown>
    <br/><br/><br/><br/>
    <p id="DropdownSelectedResult">(idle)</p>
  `;
};
