import { Component, Prop, State, h, Element, Watch, Event, EventEmitter } from '@stencil/core';

/**
 * sy-menu-item — a single item inside sy-menu.
 *
 * Spec: design-system-specs/components/menu.yaml (menu-item anatomy).
 *
 * Props:
 *   - value     (payload emitted with itemSelected / itemChecked)
 *   - disabled
 *   - selectable (item becomes highlightable/checkable individually)
 *   - checkable  (force checkbox UI; implies selectable)
 *   - select    (controlled: visually mark as currently selected)
 *
 * Events: itemSelected {value,label}, itemChecked {value,label,checked}.
 * Both bubble to the containing sy-menu which re-emits them as menu events.
 */
@Component({
  tag: 'sy-menu-item',
  shadow: false,
  scoped: true,
  styleUrl: 'sy-menu-item.scss',
})
export class SyMenuItem {
  @Element() host!: HTMLSyMenuItemElement;

  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() value: string = '';
  @Prop({ reflect: true, mutable: true }) select: boolean = false;
  @Prop({ reflect: true, mutable: true }) selectable: boolean = false;
  @Prop({ reflect: true, mutable: true }) checkable: boolean = false;

  @State() checked: boolean = false;
  @State() private sanitizedSlotContent: string = '';

  @Event({ bubbles: true, composed: true }) itemSelected!: EventEmitter<{ value: string; label: string }>;
  @Event({ bubbles: true, composed: true }) itemChecked!: EventEmitter<{ value: string; label: string; checked: boolean }>;

  private observer?: MutationObserver;

  componentWillLoad() {
    this.selectable = !!this.checkable;
    this.updateSlotContent();
  }

  componentDidLoad() {
    this.observeSlotChanges();
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private observeSlotChanges() {
    this.observer = new MutationObserver(() => {
      this.updateSlotContent();
    });

    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  @Watch('checkable')
  watchCheckable() {
    this.selectable = !!this.checkable;
  }

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  private updateSlotContent() {
    const text = this.getTextContent();
    this.sanitizedSlotContent = this.sanitizeHtml(text || '');
  }

  private getTextContent(): string {
    if (this.checkable) {
      const checkbox = this.host.querySelector('sy-checkbox');
      return checkbox ? checkbox.textContent || '' : this.host.textContent || '';
    }
    return this.host.textContent || '';
  }

  private onClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) return;

    const clickedElement = e.target as HTMLElement;

    // 체크박스가 아닌 다른 내부 컴포넌트 클릭은 무시
    if (clickedElement !== (this.host as Element) &&
        clickedElement.tagName &&
        clickedElement.tagName.startsWith('SY-') &&
        clickedElement.tagName !== 'SY-CHECKBOX') {
      return;
    }

    if (this.checkable) {
      // checkable인 경우 체크 상태 토글
      this.checked = !this.checked;
      this.select = this.checked;
      this.emitCheckedEvent();
    } else {
      // checkable이 아닌 경우 선택
      this.select = true;
      this.emitSelectedEvent();
    }
  };

  private handleCheckboxChange = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    // 체크박스 변경은 onClick에서 처리
  };

  private emitSelectedEvent() {
    const label = this.getTextContent();
    this.itemSelected.emit({
      value: this.value || label.trim(),
      label: label.trim()
    });
  }

  private emitCheckedEvent() {
    const label = this.getTextContent();
    this.itemChecked.emit({
      value: this.value || label.trim(),
      label: label.trim(),
      checked: this.checked
    });
  }

  render() {
    const liClass = {
      'menu-item': true,
      'menu-item--selected': this.selectable && this.select,
      'menu-item--disabled': this.disabled,
      'menu-item--checkable': this.checkable
    };

    return (
      <li
        tabIndex={this.disabled ? -1 : 0}
        class={liClass}
        aria-disabled={this.disabled ? 'true' : 'false'}
        onClick={this.onClick}
        title={this.sanitizedSlotContent}
      >
        {this.checkable ? (
          <sy-checkbox
            checked={this.checked}
            disabled={this.disabled}
            onChanged={this.handleCheckboxChange}
          >
            <slot />
          </sy-checkbox>
        ) : (
          <slot />
        )}
      </li>
    );
  }
}
