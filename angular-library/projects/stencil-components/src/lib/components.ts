/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from '@dc/synergy';


@ProxyCmp({
  inputs: ['caseSensitive', 'debounceTime', 'disabled', 'highlightMatches', 'loading', 'min', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'size', 'source', 'status', 'trigger', 'value'],
  methods: ['setFocus', 'setBlur', 'checkValidity', 'reportValidity', 'getValidStatus', 'setCustomError', 'clearCustomError']
})
@Component({
  selector: 'sy-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caseSensitive', 'debounceTime', 'disabled', 'highlightMatches', 'loading', 'min', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'size', 'source', 'status', 'trigger', 'value'],
  outputs: ['changed', 'selected'],
  standalone: false
})
export class SyAutocomplete {
  protected el: HTMLSyAutocompleteElement;
  @Output() changed = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  @Output() selected = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyAutocomplete extends Components.SyAutocomplete {

  changed: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;

  selected: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;
}


@ProxyCmp({
  inputs: ['activeIndex', 'caseSensitive', 'highlightMatches', 'loading', 'searchTerm', 'source'],
  methods: ['setEvent', 'forceUpdate']
})
@Component({
  selector: 'sy-autocomplete-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeIndex', 'caseSensitive', 'highlightMatches', 'loading', 'searchTerm', 'source'],
  outputs: ['activeChanged', 'selected'],
  standalone: false
})
export class SyAutocompleteOption {
  protected el: HTMLSyAutocompleteOptionElement;
  @Output() activeChanged = new EventEmitter<CustomEvent<number>>();
  @Output() selected = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyAutocompleteOption extends Components.SyAutocompleteOption {

  activeChanged: EventEmitter<CustomEvent<number>>;

  selected: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['clickable', 'disabled', 'icon', 'image', 'letter', 'size', 'text', 'tooltipContent', 'variant']
})
@Component({
  selector: 'sy-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'disabled', 'icon', 'image', 'letter', 'size', 'text', 'tooltipContent', 'variant'],
  outputs: ['selected', 'disableStatus'],
  standalone: false
})
export class SyAvatar {
  protected el: HTMLSyAvatarElement;
  @Output() selected = new EventEmitter<CustomEvent<{ letter: string; text: string; icon: string; image: string; }>>();
  @Output() disableStatus = new EventEmitter<CustomEvent<{ disabled: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyAvatar extends Components.SyAvatar {

  selected: EventEmitter<CustomEvent<{ letter: string; text: string; icon: string; image: string; }>>;

  disableStatus: EventEmitter<CustomEvent<{ disabled: boolean }>>;
}


@ProxyCmp({
  inputs: ['clickable', 'maxCount', 'size', 'variant']
})
@Component({
  selector: 'sy-avatar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'maxCount', 'size', 'variant'],
  outputs: ['selected'],
  standalone: false
})
export class SyAvatarGroup {
  protected el: HTMLSyAvatarGroupElement;
  @Output() selected = new EventEmitter<CustomEvent<{ letter: string; text: string; icon: string; image: string; }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyAvatarGroup extends Components.SyAvatarGroup {

  selected: EventEmitter<CustomEvent<{ letter: string; text: string; icon: string; image: string; }>>;
}


@ProxyCmp({
  inputs: ['dot', 'hidden', 'overflowCount', 'position', 'size', 'standalone', 'value', 'variant']
})
@Component({
  selector: 'sy-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['dot', 'hidden', 'overflowCount', 'position', 'size', 'standalone', 'value', 'variant'],
  standalone: false
})
export class SyBadge {
  protected el: HTMLSyBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyBadge extends Components.SyBadge {}


@ProxyCmp({
  inputs: ['closable', 'header', 'message', 'neutralIcon', 'showIcon', 'variant']
})
@Component({
  selector: 'sy-banner-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closable', 'header', 'message', 'neutralIcon', 'showIcon', 'variant'],
  standalone: false
})
export class SyBannerMessage {
  protected el: HTMLSyBannerMessageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyBannerMessage extends Components.SyBannerMessage {}


@ProxyCmp({
  inputs: ['separator']
})
@Component({
  selector: 'sy-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['separator'],
  standalone: false
})
export class SyBreadcrumb {
  protected el: HTMLSyBreadcrumbElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyBreadcrumb extends Components.SyBreadcrumb {}


@ProxyCmp({
  inputs: ['active', 'disabled', 'isLast', 'parentSeparator', 'separator'],
  methods: ['forceUpdate']
})
@Component({
  selector: 'sy-breadcrumb-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', 'isLast', 'parentSeparator', 'separator'],
  outputs: ['selected'],
  standalone: false
})
export class SyBreadcrumbItem {
  protected el: HTMLSyBreadcrumbItemElement;
  @Output() selected = new EventEmitter<CustomEvent<HTMLSyBreadcrumbItemElement>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyBreadcrumbItem extends Components.SyBreadcrumbItem {

  selected: EventEmitter<CustomEvent<HTMLSyBreadcrumbItemElement>>;
}


@ProxyCmp({
  inputs: ['disabled', 'formnovalidate', 'fullWidth', 'iconOnly', 'loading', 'size', 'tooltip', 'type', 'variant'],
  methods: ['setButtonGroupState', 'setClick', 'setFocus', 'setBlur']
})
@Component({
  selector: 'sy-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'formnovalidate', 'fullWidth', 'iconOnly', 'loading', 'size', 'tooltip', 'type', 'variant'],
  standalone: false
})
export class SyButton {
  protected el: HTMLSyButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyButton extends Components.SyButton {}


@ProxyCmp({
  inputs: ['vertical']
})
@Component({
  selector: 'sy-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['vertical'],
  standalone: false
})
export class SyButtonGroup {
  protected el: HTMLSyButtonGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyButtonGroup extends Components.SyButtonGroup {}


@ProxyCmp({
  inputs: ['active', 'dateNames', 'day', 'format', 'hideWeekend', 'hour', 'minute', 'mode', 'mondayStart', 'month', 'rangeend', 'rangestart', 'second', 'variant', 'year']
})
@Component({
  selector: 'sy-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'active', required: true }, 'dateNames', { name: 'day', required: true }, 'format', 'hideWeekend', { name: 'hour', required: true }, { name: 'minute', required: true }, 'mode', 'mondayStart', { name: 'month', required: true }, 'rangeend', 'rangestart', { name: 'second', required: true }, 'variant', { name: 'year', required: true }],
  outputs: ['selected', 'closed'],
  standalone: false
})
export class SyCalendar {
  protected el: HTMLSyCalendarElement;
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  @Output() closed = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyCalendar extends Components.SyCalendar {

  selected: EventEmitter<CustomEvent<any>>;

  closed: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['backdrop', 'closeDelay', 'collapsible', 'openDelay']
})
@Component({
  selector: 'sy-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['backdrop', 'closeDelay', 'collapsible', 'openDelay'],
  standalone: false
})
export class SyCard {
  protected el: HTMLSyCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyCard extends Components.SyCard {}


@ProxyCmp({
  inputs: ['checkboxTitle', 'checked', 'disabled', 'indeterminate', 'name', 'noNativeValidity', 'readonly', 'required', 'value'],
  methods: ['setFocus', 'setBlur', 'checkValidity', 'reportValidity', 'getValidStatus', 'setCustomError', 'clearCustomError']
})
@Component({
  selector: 'sy-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkboxTitle', 'checked', 'disabled', 'indeterminate', 'name', 'noNativeValidity', 'readonly', 'required', 'value'],
  outputs: ['changed', 'focused', 'blured'],
  standalone: false
})
export class SyCheckbox {
  protected el: HTMLSyCheckboxElement;
  @Output() changed = new EventEmitter<CustomEvent<{ value: boolean; isValid: boolean; checked: boolean; indeterminate: boolean }>>();
  @Output() focused = new EventEmitter<CustomEvent<boolean>>();
  @Output() blured = new EventEmitter<CustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyCheckbox extends Components.SyCheckbox {

  changed: EventEmitter<CustomEvent<{ value: boolean; isValid: boolean; checked: boolean; indeterminate: boolean }>>;

  focused: EventEmitter<CustomEvent<boolean>>;

  blured: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['accordion', 'borderless', 'disabled', 'fullheight', 'ghost'],
  methods: ['openAll', 'closeAll', 'openPanel', 'closePanel']
})
@Component({
  selector: 'sy-collapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accordion', 'borderless', 'disabled', 'fullheight', 'ghost'],
  standalone: false
})
export class SyCollapse {
  protected el: HTMLSyCollapseElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyCollapse extends Components.SyCollapse {}


@ProxyCmp({
  inputs: ['active', 'arrow', 'disabled', 'fullheight', 'ghost'],
  methods: ['toggle', 'open', 'close']
})
@Component({
  selector: 'sy-collapse-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'arrow', 'disabled', 'fullheight', 'ghost'],
  outputs: ['changed'],
  standalone: false
})
export class SyCollapsePanel {
  protected el: HTMLSyCollapsePanelElement;
  @Output() changed = new EventEmitter<CustomEvent<ISyCollapsePanelCollapsePanelChangeDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CollapsePanelChangeDetail as ISyCollapsePanelCollapsePanelChangeDetail } from '@dc/synergy';

export declare interface SyCollapsePanel extends Components.SyCollapsePanel {

  changed: EventEmitter<CustomEvent<ISyCollapsePanelCollapsePanelChangeDetail>>;
}


@ProxyCmp({
  inputs: ['disabled', 'format', 'hideOpacity', 'inline', 'opacity', 'readonly', 'showText', 'value']
})
@Component({
  selector: 'sy-colorpicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'format', 'hideOpacity', 'inline', 'opacity', 'readonly', 'showText', 'value'],
  outputs: ['changed'],
  standalone: false
})
export class SyColorpicker {
  protected el: HTMLSyColorpickerElement;
  @Output() changed = new EventEmitter<CustomEvent<{ value: string; format: string; opacity: number }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyColorpicker extends Components.SyColorpicker {

  changed: EventEmitter<CustomEvent<{ value: string; format: string; opacity: number }>>;
}


@ProxyCmp({
  inputs: ['disabled', 'format', 'hideOpacity', 'opacity', 'readonly', 'value']
})
@Component({
  selector: 'sy-colorpicker-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'format', 'hideOpacity', 'opacity', 'readonly', 'value'],
  outputs: ['colorChange'],
  standalone: false
})
export class SyColorpickerContent {
  protected el: HTMLSyColorpickerContentElement;
  @Output() colorChange = new EventEmitter<CustomEvent<{ value: string; opacity: number; format: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyColorpickerContent extends Components.SyColorpickerContent {

  colorChange: EventEmitter<CustomEvent<{ value: string; opacity: number; format: string }>>;
}


@ProxyCmp({
  inputs: ['active', 'currentDate', 'dateNames', 'datetime', 'hideWeekend', 'hoverDate', 'mode', 'mondayStart', 'range', 'rangeend', 'rangestart']
})
@Component({
  selector: 'sy-date-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'active', required: true }, 'currentDate', 'dateNames', 'datetime', 'hideWeekend', { name: 'hoverDate', required: true }, 'mode', 'mondayStart', 'range', 'rangeend', 'rangestart'],
  outputs: ['changed', 'selected', 'entered', 'mode-changed'],
  standalone: false
})
export class SyDateCalendar {
  protected el: HTMLSyDateCalendarElement;
  @Output() changed = new EventEmitter<CustomEvent<any>>();
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  @Output() entered = new EventEmitter<CustomEvent<any>>();
  @Output() modeChanged = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyDateCalendar extends Components.SyDateCalendar {

  changed: EventEmitter<CustomEvent<any>>;

  selected: EventEmitter<CustomEvent<any>>;

  entered: EventEmitter<CustomEvent<any>>;

  'mode-changed': EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['dateNames', 'datetime', 'hideWeekend', 'mode', 'mondayStart']
})
@Component({
  selector: 'sy-date-time-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['dateNames', 'datetime', 'hideWeekend', 'mode', 'mondayStart'],
  outputs: ['selected'],
  standalone: false
})
export class SyDateTimeCalendar {
  protected el: HTMLSyDateTimeCalendarElement;
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyDateTimeCalendar extends Components.SyDateTimeCalendar {

  selected: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['dateNames', 'day', 'disabled', 'format', 'hideWeekend', 'hour', 'minute', 'mode', 'mondayStart', 'month', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'second', 'variant', 'year'],
  methods: ['getValidStatus', 'setCustomError', 'clearCustomError', 'checkValidity', 'reportValidity']
})
@Component({
  selector: 'sy-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['dateNames', { name: 'day', required: true }, 'disabled', 'format', 'hideWeekend', { name: 'hour', required: true }, { name: 'minute', required: true }, 'mode', 'mondayStart', { name: 'month', required: true }, 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', { name: 'second', required: true }, 'variant', { name: 'year', required: true }],
  outputs: ['changed', 'selected'],
  standalone: false
})
export class SyDatepicker {
  protected el: HTMLSyDatepickerElement;
  @Output() changed = new EventEmitter<CustomEvent<any>>();
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyDatepicker extends Components.SyDatepicker {

  changed: EventEmitter<CustomEvent<any>>;

  selected: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['color', 'inset', 'thickness', 'type']
})
@Component({
  selector: 'sy-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'inset', 'thickness', 'type'],
  standalone: false
})
export class SyDivider {
  protected el: HTMLSyDividerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyDivider extends Components.SyDivider {}


@ProxyCmp({
  inputs: ['closable', 'closeOnNavigation', 'customSize', 'maskClosable', 'maskless', 'open', 'parentId', 'position', 'preventClose', 'size']
})
@Component({
  selector: 'sy-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closable', 'closeOnNavigation', 'customSize', 'maskClosable', 'maskless', 'open', 'parentId', 'position', 'preventClose', 'size'],
  outputs: ['opened', 'closed'],
  standalone: false
})
export class SyDrawer {
  protected el: HTMLSyDrawerElement;
  @Output() opened = new EventEmitter<CustomEvent<void>>();
  @Output() closed = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyDrawer extends Components.SyDrawer {

  opened: EventEmitter<CustomEvent<void>>;

  closed: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['borderless', 'disabled', 'position', 'size', 'tooltip', 'trigger']
})
@Component({
  selector: 'sy-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['borderless', 'disabled', 'position', 'size', 'tooltip', 'trigger'],
  outputs: ['selected'],
  standalone: false
})
export class SyDropdown {
  protected el: HTMLSyDropdownElement;
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyDropdown extends Components.SyDropdown {

  selected: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['description', 'icon', 'text']
})
@Component({
  selector: 'sy-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['description', 'icon', 'text'],
  standalone: false
})
export class SyEmpty {
  protected el: HTMLSyEmptyElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyEmpty extends Components.SyEmpty {}


@ProxyCmp({
  inputs: ['align', 'columnGap', 'direction', 'height', 'justify', 'padding', 'rowGap', 'width', 'wrap']
})
@Component({
  selector: 'sy-flex',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'columnGap', 'direction', 'height', 'justify', 'padding', 'rowGap', 'width', 'wrap'],
  standalone: false
})
export class SyFlex {
  protected el: HTMLSyFlexElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyFlex extends Components.SyFlex {}


@ProxyCmp({
  inputs: ['appTitle', 'information', 'notification', 'search', 'sticky'],
  methods: ['updateOverflowTabs']
})
@Component({
  selector: 'sy-global-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appTitle', 'information', 'notification', 'search', 'sticky'],
  outputs: ['changed', 'actionClick', 'selected'],
  standalone: false
})
export class SyGlobalHeader {
  protected el: HTMLSyGlobalHeaderElement;
  @Output() changed = new EventEmitter<CustomEvent<any>>();
  @Output() actionClick = new EventEmitter<CustomEvent<any>>();
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyGlobalHeader extends Components.SyGlobalHeader {

  changed: EventEmitter<CustomEvent<any>>;

  actionClick: EventEmitter<CustomEvent<any>>;

  selected: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['naturalAspect', 'path', 'selectable', 'size', 'svgMarkup']
})
@Component({
  selector: 'sy-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['naturalAspect', 'path', 'selectable', 'size', 'svgMarkup'],
  outputs: ['selected'],
  standalone: false
})
export class SyIcon {
  protected el: HTMLSyIconElement;
  @Output() selected = new EventEmitter<CustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyIcon extends Components.SyIcon {

  selected: EventEmitter<CustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['action', 'btnLabel', 'icon', 'message', 'open', 'placement', 'position', 'showIcon', 'sticky', 'trigger', 'variant'],
  methods: ['show', 'hide']
})
@Component({
  selector: 'sy-inline-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'btnLabel', 'icon', 'message', 'open', 'placement', 'position', 'showIcon', 'sticky', 'trigger', 'variant'],
  outputs: ['actionClick', 'btnClick', 'dismiss'],
  standalone: false
})
export class SyInlineMessage {
  protected el: HTMLSyInlineMessageElement;
  @Output() actionClick = new EventEmitter<CustomEvent<MouseEvent>>();
  @Output() btnClick = new EventEmitter<CustomEvent<MouseEvent>>();
  @Output() dismiss = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyInlineMessage extends Components.SyInlineMessage {

  actionClick: EventEmitter<CustomEvent<MouseEvent>>;

  btnClick: EventEmitter<CustomEvent<MouseEvent>>;

  dismiss: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['autofocus', 'borderless', 'clearable', 'disabled', 'label', 'max', 'message', 'min', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'size', 'status', 'type', 'value', 'variant'],
  methods: ['setFocus', 'setBlur', 'checkValidity', 'reportValidity', 'setCustomError', 'clearCustomError', 'getStatus']
})
@Component({
  selector: 'sy-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autofocus', 'borderless', 'clearable', 'disabled', 'label', 'max', 'message', 'min', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'size', 'status', 'type', 'value', 'variant'],
  outputs: ['changed', 'blured', 'focused', 'clear'],
  standalone: false
})
export class SyInput {
  protected el: HTMLSyInputElement;
  @Output() changed = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  @Output() blured = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  @Output() focused = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  @Output() clear = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyInput extends Components.SyInput {

  changed: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;

  blured: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;

  focused: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;

  clear: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['autofocus', 'borderless', 'decimalPlaces', 'disabled', 'label', 'max', 'min', 'name', 'noNativeValidity', 'readonly', 'required', 'rounding', 'size', 'status', 'step', 'value'],
  methods: ['setFocus', 'setBlur', 'stepUp', 'stepDown', 'setClear', 'checkValidity', 'reportValidity', 'setCustomError', 'clearCustomError', 'getStatus']
})
@Component({
  selector: 'sy-input-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autofocus', 'borderless', 'decimalPlaces', 'disabled', 'label', 'max', 'min', 'name', 'noNativeValidity', 'readonly', 'required', 'rounding', 'size', 'status', 'step', 'value'],
  outputs: ['changed', 'blured', 'focused'],
  standalone: false
})
export class SyInputNumber {
  protected el: HTMLSyInputNumberElement;
  @Output() changed = new EventEmitter<CustomEvent<{ value: number | null; isValid: boolean; status: string }>>();
  @Output() blured = new EventEmitter<CustomEvent<{ value: number | null; isValid: boolean; status: string }>>();
  @Output() focused = new EventEmitter<CustomEvent<{ value: number | null; isValid: boolean; status: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyInputNumber extends Components.SyInputNumber {

  changed: EventEmitter<CustomEvent<{ value: number | null; isValid: boolean; status: string }>>;

  blured: EventEmitter<CustomEvent<{ value: number | null; isValid: boolean; status: string }>>;

  focused: EventEmitter<CustomEvent<{ value: number | null; isValid: boolean; status: string }>>;
}


@ProxyCmp({
  inputs: ['disabled', 'htmlFor', 'required', 'requiredPosition', 'value', 'valuePosition', 'width']
})
@Component({
  selector: 'sy-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'htmlFor', 'required', 'requiredPosition', 'value', 'valuePosition', 'width'],
  standalone: false
})
export class SyLabel {
  protected el: HTMLSyLabelElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyLabel extends Components.SyLabel {}


@ProxyCmp({
  inputs: ['checkable', 'direction', 'disabled', 'loading', 'open', 'position', 'trigger'],
  methods: ['setOpen', 'setClose', 'toggle', 'close', 'delayedMenuClose', 'setSelectableAllItems', 'clearSelectedItem']
})
@Component({
  selector: 'sy-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkable', 'direction', 'disabled', 'loading', 'open', 'position', 'trigger'],
  outputs: ['opened', 'itemSelected', 'itemChecked'],
  standalone: false
})
export class SyMenu {
  protected el: HTMLSyMenuElement;
  @Output() opened = new EventEmitter<CustomEvent<boolean>>();
  @Output() itemSelected = new EventEmitter<CustomEvent<any>>();
  @Output() itemChecked = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyMenu extends Components.SyMenu {

  opened: EventEmitter<CustomEvent<boolean>>;

  itemSelected: EventEmitter<CustomEvent<any>>;

  itemChecked: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['menuGroupTitle']
})
@Component({
  selector: 'sy-menu-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['menuGroupTitle'],
  standalone: false
})
export class SyMenuGroup {
  protected el: HTMLSyMenuGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyMenuGroup extends Components.SyMenuGroup {}


@ProxyCmp({
  inputs: ['checkable', 'disabled', 'select', 'selectable', 'value']
})
@Component({
  selector: 'sy-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkable', 'disabled', 'select', 'selectable', 'value'],
  outputs: ['itemSelected', 'itemChecked'],
  standalone: false
})
export class SyMenuItem {
  protected el: HTMLSyMenuItemElement;
  @Output() itemSelected = new EventEmitter<CustomEvent<{ value: string; label: string }>>();
  @Output() itemChecked = new EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyMenuItem extends Components.SyMenuItem {

  itemSelected: EventEmitter<CustomEvent<{ value: string; label: string }>>;

  itemChecked: EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>;
}


@ProxyCmp({
  inputs: ['disabled', 'menuSubTitle', 'open', 'trigger']
})
@Component({
  selector: 'sy-menu-sub',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'menuSubTitle', 'open', 'trigger'],
  standalone: false
})
export class SyMenuSub {
  protected el: HTMLSyMenuSubElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyMenuSub extends Components.SyMenuSub {}


@ProxyCmp({
  inputs: ['cancelText', 'closable', 'enableModalMaximize', 'height', 'hideFooter', 'left', 'maskClosable', 'okText', 'open', 'top', 'variant', 'width'],
  methods: ['setOpen', 'setClose', 'setCancel', 'setOk', 'setMaximum']
})
@Component({
  selector: 'sy-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cancelText', 'closable', 'enableModalMaximize', 'height', 'hideFooter', 'left', 'maskClosable', 'okText', 'open', 'top', 'variant', 'width'],
  outputs: ['closed'],
  standalone: false
})
export class SyModal {
  protected el: HTMLSyModalElement;
  @Output() closed = new EventEmitter<CustomEvent<{ event: 'ok' | 'cancel' | 'close'; value: any; maximized: boolean; position: { top: string; left: string }; }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyModal extends Components.SyModal {
  /**
   * Fires when the modal closes. `detail.event` distinguishes ok / cancel / close.
   */
  closed: EventEmitter<CustomEvent<{ event: 'ok' | 'cancel' | 'close'; value: any; maximized: boolean; position: { top: string; left: string }; }>>;
}


@ProxyCmp({
  inputs: ['closable', 'edge', 'height', 'isdraggable', 'left', 'maximizable', 'maximum', 'minHeight', 'minWidth', 'minimizable', 'minimum', 'open', 'resizable', 'top', 'width'],
  methods: ['setOpen', 'setClose', 'setMaximum', 'setRestore', 'setMinimum']
})
@Component({
  selector: 'sy-modeless',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closable', 'edge', 'height', 'isdraggable', 'left', 'maximizable', 'maximum', 'minHeight', 'minWidth', 'minimizable', 'minimum', 'open', 'resizable', 'top', 'width'],
  outputs: ['closed', 'statusChanged', 'positionChanged'],
  standalone: false
})
export class SyModeless {
  protected el: HTMLSyModelessElement;
  @Output() closed = new EventEmitter<CustomEvent<{ id: string }>>();
  @Output() statusChanged = new EventEmitter<CustomEvent<{ id: string; status: string }>>();
  @Output() positionChanged = new EventEmitter<CustomEvent<ISyModelessModelessPositionChangedDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { ModelessPositionChangedDetail as ISyModelessModelessPositionChangedDetail } from '@dc/synergy';

export declare interface SyModeless extends Components.SyModeless {

  closed: EventEmitter<CustomEvent<{ id: string }>>;

  statusChanged: EventEmitter<CustomEvent<{ id: string; status: string }>>;

  positionChanged: EventEmitter<CustomEvent<ISyModelessModelessPositionChangedDetail>>;
}


@ProxyCmp({
  methods: ['create', 'updateContent', 'updateTitle', 'updateOption', 'close', 'closeAll']
})
@Component({
  selector: 'sy-modeless-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: false
})
export class SyModelessGroup {
  protected el: HTMLSyModelessGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyModelessGroup extends Components.SyModelessGroup {}


@ProxyCmp({
  inputs: ['disabled']
})
@Component({
  selector: 'sy-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled'],
  standalone: false
})
export class SyNav {
  protected el: HTMLSyNavElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyNav extends Components.SyNav {}


@ProxyCmp({
  inputs: ['depth', 'navGroupTitle']
})
@Component({
  selector: 'sy-nav-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['depth', 'navGroupTitle'],
  standalone: false
})
export class SyNavGroup {
  protected el: HTMLSyNavGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyNavGroup extends Components.SyNavGroup {}


@ProxyCmp({
  inputs: ['depth', 'disabled', 'value'],
  methods: ['parentDisabled', 'groupItem', 'setActive']
})
@Component({
  selector: 'sy-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['depth', 'disabled', 'value'],
  standalone: false
})
export class SyNavItem {
  protected el: HTMLSyNavItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyNavItem extends Components.SyNavItem {}


@ProxyCmp({
  inputs: ['depth', 'disabled', 'navSubTitle', 'open', 'value'],
  methods: ['parentDisabled', 'groupItem', 'setTrigger', 'setOpen', 'setClose', 'setActive']
})
@Component({
  selector: 'sy-nav-sub',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['depth', 'disabled', 'navSubTitle', 'open', 'value'],
  standalone: false
})
export class SyNavSub {
  protected el: HTMLSyNavSubElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyNavSub extends Components.SyNavSub {}


@ProxyCmp({
  inputs: ['active', 'disabled', 'empty', 'hide', 'isCustomTag', 'label', 'loading', 'readonly', 'selected', 'showTooltip', 'value']
})
@Component({
  selector: 'sy-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', 'empty', 'hide', 'isCustomTag', 'label', 'loading', 'readonly', 'selected', 'showTooltip', 'value'],
  outputs: ['activated'],
  standalone: false
})
export class SyOption {
  protected el: HTMLSyOptionElement;
  @Output() activated = new EventEmitter<CustomEvent<{ value: string; label: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyOption extends Components.SyOption {

  activated: EventEmitter<CustomEvent<{ value: string; label: string }>>;
}


@ProxyCmp({
  inputs: ['activePage', 'disabled', 'hideonSingle', 'jumper', 'pageSize', 'pageSizeOptions', 'total', 'totalItems']
})
@Component({
  selector: 'sy-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activePage', 'disabled', 'hideonSingle', 'jumper', 'pageSize', 'pageSizeOptions', 'total', 'totalItems'],
  outputs: ['pageChanged', 'pageSizeChanged'],
  standalone: false
})
export class SyPagination {
  protected el: HTMLSyPaginationElement;
  @Output() pageChanged = new EventEmitter<CustomEvent<number>>();
  @Output() pageSizeChanged = new EventEmitter<CustomEvent<number>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyPagination extends Components.SyPagination {

  pageChanged: EventEmitter<CustomEvent<number>>;

  pageSizeChanged: EventEmitter<CustomEvent<number>>;
}


@ProxyCmp({
  inputs: ['arrow', 'cancelText', 'closable', 'closedelay', 'confirmText', 'opendelay', 'position', 'sticky', 'trigger'],
  methods: ['setOpen', 'setClose']
})
@Component({
  selector: 'sy-popconfirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['arrow', 'cancelText', 'closable', 'closedelay', 'confirmText', 'opendelay', 'position', 'sticky', 'trigger'],
  outputs: ['visibleChanged', 'selected'],
  standalone: false
})
export class SyPopconfirm {
  protected el: HTMLSyPopconfirmElement;
  @Output() visibleChanged = new EventEmitter<CustomEvent<boolean>>();
  @Output() selected = new EventEmitter<CustomEvent<'ok' | 'cancel'>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyPopconfirm extends Components.SyPopconfirm {

  visibleChanged: EventEmitter<CustomEvent<boolean>>;

  selected: EventEmitter<CustomEvent<'ok' | 'cancel'>>;
}


@ProxyCmp({
  inputs: ['arrow', 'closedelay', 'open', 'opendelay', 'position', 'sticky', 'trigger'],
  methods: ['setOpen', 'setClose']
})
@Component({
  selector: 'sy-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['arrow', 'closedelay', 'open', 'opendelay', 'position', 'sticky', 'trigger'],
  standalone: false
})
export class SyPopover {
  protected el: HTMLSyPopoverElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyPopover extends Components.SyPopover {}


@ProxyCmp({
  inputs: ['hidePercent', 'indeterminate', 'percent', 'segment', 'status', 'tooltipTitle', 'valuePosition']
})
@Component({
  selector: 'sy-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hidePercent', 'indeterminate', 'percent', 'segment', 'status', 'tooltipTitle', 'valuePosition'],
  standalone: false
})
export class SyProgressBar {
  protected el: HTMLSyProgressBarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyProgressBar extends Components.SyProgressBar {}


@ProxyCmp({
  inputs: ['hideText', 'indeterminate', 'percent', 'segment', 'size', 'status', 'tooltipTitle']
})
@Component({
  selector: 'sy-progress-circular',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hideText', 'indeterminate', 'percent', 'segment', 'size', 'status', 'tooltipTitle'],
  standalone: false
})
export class SyProgressCircular {
  protected el: HTMLSyProgressCircularElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyProgressCircular extends Components.SyProgressCircular {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'readonly', 'value']
})
@Component({
  selector: 'sy-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'readonly', 'value'],
  outputs: ['selected'],
  standalone: false
})
export class SyRadio {
  protected el: HTMLSyRadioElement;
  @Output() selected = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyRadio extends Components.SyRadio {

  selected: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'size', 'value', 'variant']
})
@Component({
  selector: 'sy-radio-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'size', { name: 'value', required: true }, 'variant'],
  outputs: ['selected'],
  standalone: false
})
export class SyRadioButton {
  protected el: HTMLSyRadioButtonElement;
  @Output() selected = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyRadioButton extends Components.SyRadioButton {

  selected: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['defaultValue', 'disabled', 'name', 'noNativeValidity', 'position', 'readonly', 'required', 'size', 'variant'],
  methods: ['checkValidity', 'reportValidity', 'setCustomError', 'clearCustomError', 'getStatus']
})
@Component({
  selector: 'sy-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultValue', 'disabled', 'name', 'noNativeValidity', 'position', 'readonly', 'required', 'size', 'variant'],
  outputs: ['changed'],
  standalone: false
})
export class SyRadioGroup {
  protected el: HTMLSyRadioGroupElement;
  @Output() changed = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyRadioGroup extends Components.SyRadioGroup {

  changed: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;
}


@ProxyCmp({
  inputs: ['active', 'dateNames', 'datetime', 'hideWeekend', 'mode', 'mondayStart', 'rangeend', 'rangestart']
})
@Component({
  selector: 'sy-range-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'active', required: true }, 'dateNames', 'datetime', 'hideWeekend', 'mode', 'mondayStart', 'rangeend', 'rangestart'],
  outputs: ['selected'],
  standalone: false
})
export class SyRangeCalendar {
  protected el: HTMLSyRangeCalendarElement;
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyRangeCalendar extends Components.SyRangeCalendar {

  selected: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['clearable', 'defaultValue', 'disabled', 'empty', 'error', 'hide', 'isTreeSelect', 'loading', 'maxTagCount', 'mode', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'selectedOptions', 'size'],
  methods: ['setValue', 'clearValue', 'closeDropdown', 'setCustomError', 'clearCustomError', 'checkValidity', 'reportValidity']
})
@Component({
  selector: 'sy-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'defaultValue', 'disabled', 'empty', 'error', 'hide', 'isTreeSelect', 'loading', 'maxTagCount', 'mode', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'selectedOptions', 'size'],
  outputs: ['opened', 'removed', 'selected', 'focused', 'blured', 'inputChanged', 'cleared'],
  standalone: false
})
export class SySelect {
  protected el: HTMLSySelectElement;
  @Output() opened = new EventEmitter<CustomEvent<void>>();
  @Output() removed = new EventEmitter<CustomEvent<any>>();
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  @Output() focused = new EventEmitter<CustomEvent<void>>();
  @Output() blured = new EventEmitter<CustomEvent<void>>();
  @Output() inputChanged = new EventEmitter<CustomEvent<string>>();
  @Output() cleared = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SySelect extends Components.SySelect {

  opened: EventEmitter<CustomEvent<void>>;

  removed: EventEmitter<CustomEvent<any>>;

  selected: EventEmitter<CustomEvent<any>>;

  focused: EventEmitter<CustomEvent<void>>;

  blured: EventEmitter<CustomEvent<void>>;

  inputChanged: EventEmitter<CustomEvent<string>>;

  cleared: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['disabled', 'rows', 'type', 'width'],
  methods: ['stopAnimation', 'resetAnimation']
})
@Component({
  selector: 'sy-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'rows', 'type', 'width'],
  standalone: false
})
export class SySkeleton {
  protected el: HTMLSySkeletonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SySkeleton extends Components.SySkeleton {}


@ProxyCmp({
  inputs: ['disabled', 'hideMarks', 'hideTrackFill', 'label', 'marks', 'max', 'min', 'range', 'rangeValue', 'readonly', 'reverse', 'showTooltip', 'snapToMarks', 'step', 'tooltipPlacement', 'value', 'vertical']
})
@Component({
  selector: 'sy-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'hideMarks', 'hideTrackFill', 'label', 'marks', 'max', 'min', 'range', 'rangeValue', 'readonly', 'reverse', 'showTooltip', 'snapToMarks', 'step', 'tooltipPlacement', 'value', 'vertical'],
  standalone: false
})
export class SySlider {
  protected el: HTMLSySliderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SySlider extends Components.SySlider {}


@ProxyCmp({
  inputs: ['delay', 'description', 'hidden', 'inline', 'size']
})
@Component({
  selector: 'sy-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['delay', 'description', 'hidden', 'inline', 'size'],
  standalone: false
})
export class SySpinner {
  protected el: HTMLSySpinnerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SySpinner extends Components.SySpinner {}


@ProxyCmp({
  inputs: ['disabled', 'hideDivider', 'minRatio', 'ratio', 'type']
})
@Component({
  selector: 'sy-split-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'hideDivider', 'minRatio', 'ratio', 'type'],
  outputs: ['horizontalChanged', 'verticalChanged'],
  standalone: false
})
export class SySplitPanel {
  protected el: HTMLSySplitPanelElement;
  @Output() horizontalChanged = new EventEmitter<CustomEvent<{ leftRatio: number; rightRatio: number; }>>();
  @Output() verticalChanged = new EventEmitter<CustomEvent<{ topRatio: number; bottomRatio: number; }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SySplitPanel extends Components.SySplitPanel {

  horizontalChanged: EventEmitter<CustomEvent<{ leftRatio: number; rightRatio: number; }>>;

  verticalChanged: EventEmitter<CustomEvent<{ topRatio: number; bottomRatio: number; }>>;
}


@ProxyCmp({
  inputs: ['clickable', 'current', 'currentStatus', 'description', 'disabled', 'index', 'lastStep', 'loading', 'parentStatus', 'size', 'small', 'status', 'type']
})
@Component({
  selector: 'sy-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'current', 'currentStatus', 'description', 'disabled', 'index', 'lastStep', 'loading', 'parentStatus', 'size', 'small', 'status', 'type'],
  standalone: false
})
export class SyStep {
  protected el: HTMLSyStepElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyStep extends Components.SyStep {}


@ProxyCmp({
  inputs: ['clickable', 'complete', 'current', 'size', 'startIndex', 'type']
})
@Component({
  selector: 'sy-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'complete', 'current', 'size', 'startIndex', 'type'],
  standalone: false
})
export class SySteps {
  protected el: HTMLSyStepsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SySteps extends Components.SySteps {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'label', 'loading', 'name', 'readonly', 'size', 'value']
})
@Component({
  selector: 'sy-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'label', 'loading', 'name', 'readonly', 'size', 'value'],
  outputs: ['changed'],
  standalone: false
})
export class SySwitch {
  protected el: HTMLSySwitchElement;
  @Output() changed = new EventEmitter<CustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SySwitch extends Components.SySwitch {

  changed: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['active', 'closable', 'currentDisabledStatus', 'disabled', 'inHeader', 'index', 'manualClose', 'parentDisabled', 'position', 'size', 'tabkey', 'type'],
  methods: ['setClose']
})
@Component({
  selector: 'sy-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'closable', 'currentDisabledStatus', 'disabled', 'inHeader', { name: 'index', required: true }, 'manualClose', 'parentDisabled', 'position', 'size', { name: 'tabkey', required: true }, 'type'],
  outputs: ['selected', 'closed'],
  standalone: false
})
export class SyTab {
  protected el: HTMLSyTabElement;
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  @Output() closed = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTab extends Components.SyTab {

  selected: EventEmitter<CustomEvent<any>>;

  closed: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['active', 'disabled', 'name']
})
@Component({
  selector: 'sy-tab-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', { name: 'name', required: true }],
  standalone: false
})
export class SyTabContent {
  protected el: HTMLSyTabContentElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTabContent extends Components.SyTabContent {}


@ProxyCmp({
  inputs: ['active', 'addNewTab', 'align', 'disabled', 'isdraggable', 'padding', 'position', 'size', 'type'],
  methods: ['closeTab', 'setActiveTab', 'getActiveTab']
})
@Component({
  selector: 'sy-tab-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'addNewTab', 'align', 'disabled', 'isdraggable', 'padding', 'position', 'size', 'type'],
  outputs: ['selected', 'closed', 'ordered', 'tabSelected', 'tabClosed', 'tabAdded'],
  standalone: false
})
export class SyTabGroup {
  protected el: HTMLSyTabGroupElement;
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  @Output() closed = new EventEmitter<CustomEvent<any>>();
  @Output() ordered = new EventEmitter<CustomEvent<HTMLSyTabElement[]>>();
  @Output() tabSelected = new EventEmitter<CustomEvent<{ index: number; value: string }>>();
  @Output() tabClosed = new EventEmitter<CustomEvent<{ index: number; value: string }>>();
  @Output() tabAdded = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTabGroup extends Components.SyTabGroup {

  selected: EventEmitter<CustomEvent<any>>;

  closed: EventEmitter<CustomEvent<any>>;

  ordered: EventEmitter<CustomEvent<HTMLSyTabElement[]>>;

  tabSelected: EventEmitter<CustomEvent<{ index: number; value: string }>>;

  tabClosed: EventEmitter<CustomEvent<{ index: number; value: string }>>;

  tabAdded: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['disabled', 'readonly', 'removable', 'rounded', 'selectable', 'size', 'variant']
})
@Component({
  selector: 'sy-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'readonly', 'removable', 'rounded', 'selectable', 'size', 'variant'],
  outputs: ['selected', 'removed'],
  standalone: false
})
export class SyTag {
  protected el: HTMLSyTagElement;
  @Output() selected = new EventEmitter<CustomEvent<{ tag: HTMLSyTagElement }>>();
  @Output() removed = new EventEmitter<CustomEvent<{ tag: HTMLSyTagElement }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTag extends Components.SyTag {

  selected: EventEmitter<CustomEvent<{ tag: HTMLSyTagElement }>>;

  removed: EventEmitter<CustomEvent<{ tag: HTMLSyTagElement }>>;
}


@ProxyCmp({
  inputs: ['autofocus', 'borderless', 'clearable', 'counter', 'disabled', 'label', 'max', 'min', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'size', 'status', 'value'],
  methods: ['setFocus', 'setBlur', 'checkValidity', 'reportValidity', 'setCustomError', 'clearCustomError', 'getStatus']
})
@Component({
  selector: 'sy-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autofocus', 'borderless', 'clearable', 'counter', 'disabled', 'label', 'max', 'min', 'name', 'noNativeValidity', 'placeholder', 'readonly', 'required', 'resize', 'rows', 'size', 'status', 'value'],
  outputs: ['changed', 'blured', 'focused'],
  standalone: false
})
export class SyTextarea {
  protected el: HTMLSyTextareaElement;
  @Output() changed = new EventEmitter<CustomEvent<{ value: string; length: number; isValid: boolean; status: string }>>();
  @Output() blured = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  @Output() focused = new EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTextarea extends Components.SyTextarea {

  changed: EventEmitter<CustomEvent<{ value: string; length: number; isValid: boolean; status: string }>>;

  blured: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;

  focused: EventEmitter<CustomEvent<{ value: string; isValid: boolean; status: string }>>;
}


@ProxyCmp({
  inputs: ['format', 'hideButton', 'hour', 'minute', 'second', 'timeSeparator']
})
@Component({
  selector: 'sy-timepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['format', 'hideButton', 'hour', 'minute', 'second', 'timeSeparator'],
  outputs: ['selected', 'changed'],
  standalone: false
})
export class SyTimepicker {
  protected el: HTMLSyTimepickerElement;
  @Output() selected = new EventEmitter<CustomEvent<any>>();
  @Output() changed = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTimepicker extends Components.SyTimepicker {

  selected: EventEmitter<CustomEvent<any>>;

  changed: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['duration', 'latestTop'],
  methods: ['createToast', 'createNeutralToast', 'createSuccessToast', 'createErrorToast', 'createInfoToast', 'createWarningToast', 'closeToast']
})
@Component({
  selector: 'sy-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['duration', 'latestTop'],
  standalone: false
})
export class SyToast {
  protected el: HTMLSyToastElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyToast extends Components.SyToast {}


@ProxyCmp({
  inputs: ['closable', 'duration', 'latestTop', 'open', 'position', 'variant'],
  methods: ['show', 'close']
})
@Component({
  selector: 'sy-toast-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closable', 'duration', 'latestTop', 'open', 'position', 'variant'],
  standalone: false
})
export class SyToastItem {
  protected el: HTMLSyToastItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyToastItem extends Components.SyToastItem {}


@ProxyCmp({
  inputs: ['closedelay', 'content', 'hideArrow', 'maxWidth', 'open', 'opendelay', 'position', 'trigger'],
  methods: ['close']
})
@Component({
  selector: 'sy-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closedelay', 'content', 'hideArrow', 'maxWidth', 'open', 'opendelay', 'position', 'trigger'],
  standalone: false
})
export class SyTooltip {
  protected el: HTMLSyTooltipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTooltip extends Components.SyTooltip {}


@ProxyCmp({
  inputs: ['checkable', 'clickable', 'editable', 'expandAll', 'expandable', 'isTreeSelect', 'line', 'manualAdd', 'manualRemove', 'nodeWidth', 'nodes', 'searchTerm', 'selectedValue', 'treeDraggable'],
  methods: ['setCheckState', 'clearAllSelectedItem', 'manualAddChildNode', 'manualRemoveNode', 'findNode']
})
@Component({
  selector: 'sy-tree',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkable', 'clickable', 'editable', 'expandAll', 'expandable', 'isTreeSelect', 'line', 'manualAdd', 'manualRemove', 'nodeWidth', 'nodes', 'searchTerm', 'selectedValue', 'treeDraggable'],
  outputs: ['nodesChanged', 'itemChecked', 'itemSelected'],
  standalone: false
})
export class SyTree {
  protected el: HTMLSyTreeElement;
  @Output() nodesChanged = new EventEmitter<CustomEvent<{ nodes: [object Object][] }>>();
  @Output() itemChecked = new EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>();
  @Output() itemSelected = new EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { TreeNode as ISyTreeTreeNode } from '@dc/synergy';

export declare interface SyTree extends Components.SyTree {

  nodesChanged: EventEmitter<CustomEvent<{ nodes: [object Object][] }>>;

  itemChecked: EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>;

  itemSelected: EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>;
}


@ProxyCmp({
  inputs: ['appendPlaceholder', 'appendable', 'checkable', 'checked', 'clickable', 'disabled', 'dragging', 'editable', 'expandable', 'expanded', 'fixed', 'hasChild', 'icon', 'indeterminate', 'isDescendant', 'isEditable', 'label', 'level', 'line', 'nodeWidth', 'removable', 'searchTerm', 'selectedValue', 'tagMessage', 'tagVariant', 'treeChildren', 'treeitemDraggable', 'value'],
  methods: ['setOverflow']
})
@Component({
  selector: 'sy-tree-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appendPlaceholder', 'appendable', 'checkable', 'checked', 'clickable', 'disabled', 'dragging', 'editable', 'expandable', 'expanded', 'fixed', 'hasChild', 'icon', 'indeterminate', 'isDescendant', 'isEditable', 'label', 'level', 'line', 'nodeWidth', 'removable', 'searchTerm', 'selectedValue', 'tagMessage', 'tagVariant', 'treeChildren', 'treeitemDraggable', 'value'],
  outputs: ['expandChanged', 'checkChanged', 'itemAdded', 'itemRemoved', 'itemEdited', 'itemUpdating', 'itemUpdatingReset', 'itemDrop', 'itemSelected', 'draggingEvent'],
  standalone: false
})
export class SyTreeItem {
  protected el: HTMLSyTreeItemElement;
  @Output() expandChanged = new EventEmitter<CustomEvent<{ value: string; label: string; expanded: boolean }>>();
  @Output() checkChanged = new EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>();
  @Output() itemAdded = new EventEmitter<CustomEvent<{ parentValue: string; childLabel: string; childValue: string; childLevel: number }>>();
  @Output() itemRemoved = new EventEmitter<CustomEvent<{ value: string; label: string }>>();
  @Output() itemEdited = new EventEmitter<CustomEvent<{ value: string; label: string }>>();
  @Output() itemUpdating = new EventEmitter<CustomEvent<any>>();
  @Output() itemUpdatingReset = new EventEmitter<CustomEvent<any>>();
  @Output() itemDrop = new EventEmitter<CustomEvent<{ targetKey: string; draggedKey: string; dropPosition: string; targetLevel: number }>>();
  @Output() itemSelected = new EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>();
  @Output() draggingEvent = new EventEmitter<CustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTreeItem extends Components.SyTreeItem {

  expandChanged: EventEmitter<CustomEvent<{ value: string; label: string; expanded: boolean }>>;

  checkChanged: EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>;

  itemAdded: EventEmitter<CustomEvent<{ parentValue: string; childLabel: string; childValue: string; childLevel: number }>>;

  itemRemoved: EventEmitter<CustomEvent<{ value: string; label: string }>>;

  itemEdited: EventEmitter<CustomEvent<{ value: string; label: string }>>;

  itemUpdating: EventEmitter<CustomEvent<any>>;

  itemUpdatingReset: EventEmitter<CustomEvent<any>>;

  itemDrop: EventEmitter<CustomEvent<{ targetKey: string; draggedKey: string; dropPosition: string; targetLevel: number }>>;

  itemSelected: EventEmitter<CustomEvent<{ value: string; label: string; checked: boolean }>>;

  draggingEvent: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['appendParent', 'checkable', 'clearable', 'defaultValue', 'disabled', 'expandAll', 'expandable', 'line', 'loading', 'maxTagCount', 'name', 'noNativeValidity', 'nodeWidth', 'nodes', 'placeholder', 'readonly', 'required', 'status'],
  methods: ['setCustomValidity', 'checkValidity', 'reportValidity', 'setCustomError', 'clearCustomError', 'getStatus']
})
@Component({
  selector: 'sy-tree-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appendParent', 'checkable', 'clearable', 'defaultValue', 'disabled', 'expandAll', 'expandable', 'line', 'loading', 'maxTagCount', 'name', 'noNativeValidity', 'nodeWidth', 'nodes', 'placeholder', 'readonly', 'required', 'status'],
  outputs: ['changed'],
  standalone: false
})
export class SyTreeSelect {
  protected el: HTMLSyTreeSelectElement;
  @Output() changed = new EventEmitter<CustomEvent<{ selectedItem: { value: string; label: string }[]; isValid: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SyTreeSelect extends Components.SyTreeSelect {

  changed: EventEmitter<CustomEvent<{ selectedItem: { value: string; label: string }[]; isValid: boolean }>>;
}


