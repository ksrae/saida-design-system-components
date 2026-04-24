import { Component, Prop, State, Event, EventEmitter, Watch, h, Element } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-avatar — visual representation of a person/object.
 *
 * Spec: design-system-specs/components/avatar.yaml
 * Anatomy:
 *   .avatar-item (container)  ← size + variant + state
 *     └─ content slot         ← image | icon | letter | initials-from-text
 *
 * Content priority (highest → lowest): image → icon → text → letter.
 * Not a form-associated element (no `formCallbacks`, no `setCustomError`).
 *
 * React / Vue / Angular reserved keywords (`key`, `ref`, `id`) are avoided in the prop
 * surface.
 */
@Component({
  tag: 'sy-avatar',
  styleUrl: 'sy-avatar.scss',
  shadow: false,
  scoped: true,
})
export class SyAvatar {
  @Element() host!: HTMLSyAvatarElement;

  // --- Public Properties (spec: avatar.yaml :: props) ---
  @Prop({ reflect: true }) clickable: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ mutable: true }) image: string = '';
  @Prop() icon: string = '';
  @Prop() text: string = '';
  @Prop({ mutable: true }) letter: string = '';
  @Prop({ reflect: true })
  variant:
    | 'lightgray' | 'red' | 'orange' | 'yellow' | 'lime' | 'green'
    | 'teal' | 'blue' | 'purple' | 'magenta' | 'darkgray' = 'lightgray';
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ mutable: true, attribute: 'tooltipContent' }) tooltipContent: string = '';

  // --- Private State ---
  @State() private imageLoaded: boolean = false;
  @State() private exposedText: string = '';
  @State() private isTooltipContentUserSet: boolean = false;

  // --- Events (spec: avatar.yaml :: api.events) ---
  @Event() selected!: EventEmitter<{
    letter: string;
    text: string;
    icon: string;
    image: string;
  }>;
  @Event() disableStatus!: EventEmitter<{ disabled: boolean }>;

  // --- Lifecycle ---
  componentWillLoad() {
    const aliasTooltip = fnAssignPropFromAlias(this.host, 'tooltip-content');
    if (aliasTooltip?.trim()?.length) {
      this.tooltipContent = this.sanitizeHtml(aliasTooltip);
      this.isTooltipContentUserSet = true;
    } else if (this.tooltipContent?.trim()?.length) {
      this.tooltipContent = this.sanitizeHtml(this.tooltipContent);
      this.isTooltipContentUserSet = true;
    }

    if (this.image?.trim()?.length) this.imgPreload();
    if (this.text?.trim()?.length) this.computeInitialsFromText();
    if (this.letter?.trim()?.length && this.letter.length > 2) {
      this.letter = this.letter.slice(0, 2).toUpperCase();
    }
  }

  // --- Watchers ---
  @Watch('tooltipContent')
  watchTooltipContent(newValue: string) {
    this.tooltipContent = this.sanitizeHtml(newValue);
    this.isTooltipContentUserSet = !!this.tooltipContent?.trim()?.length;
  }

  @Watch('image')
  watchImage(newValue: string) {
    this.imageLoaded = false;
    if (newValue?.trim()?.length) this.imgPreload();
  }

  @Watch('text')
  watchText() {
    this.computeInitialsFromText();
  }

  @Watch('letter')
  watchLetter(newValue: string) {
    if (newValue && newValue.length > 2) {
      this.letter = newValue.slice(0, 2).toUpperCase();
    }
  }

  @Watch('disabled')
  watchDisabled(newValue: boolean) {
    this.disableStatus.emit({ disabled: newValue });
  }

  // --- Helpers ---

  /** Derive a ≤2-char uppercase initial string from this.text. */
  private computeInitialsFromText() {
    if (!this.text) { this.exposedText = ''; return; }
    if (this.text.includes(' ')) {
      const parts = this.text.split(' ').filter(Boolean);
      this.exposedText = parts
        .map(part => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
    } else {
      this.exposedText = this.text.slice(0, 2).toUpperCase();
    }
  }

  /** Non-blocking image preload to avoid flashing unloaded <img>s. */
  private imgPreload() {
    const url = this.image;
    const img = new Image();
    img.onload = () => { if (this.image === url) this.imageLoaded = true; };
    img.onerror = () => { if (this.image === url) { this.imageLoaded = false; this.image = ''; } };
    img.src = url;
  }

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return (tempDiv.textContent ?? tempDiv.innerText ?? '').trim();
  }

  private getComputedTooltipContent(): string {
    if (this.isTooltipContentUserSet && this.tooltipContent?.trim()?.length) {
      return this.sanitizeHtml(this.tooltipContent);
    }
    if (this.image?.trim()?.length) return this.sanitizeHtml(this.image);
    if (this.icon?.trim()?.length) return this.sanitizeHtml(this.icon);
    if (this.text?.trim()?.length) return this.sanitizeHtml(this.text);
    if (this.letter?.trim()?.length) return this.sanitizeHtml(this.letter);
    return '';
  }

  // --- Interaction ---
  private emitSelected() {
    this.selected.emit({
      letter: this.letter ?? '',
      text: this.text ?? '',
      icon: this.icon ?? '',
      image: this.image ?? '',
    });
  }

  private handleClick = (e: MouseEvent) => {
    if (!this.clickable || this.disabled) return;
    e.preventDefault();
    this.emitSelected();
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (!this.clickable || this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      this.emitSelected();
    }
  };

  // --- Render ---
  private renderContent() {
    if (this.image?.trim()?.length > 0 && this.imageLoaded) {
      return <img src={this.image} alt={this.getComputedTooltipContent() || ''} />;
    }
    if (this.icon?.trim()?.length > 0) {
      const iconSize = this.size === 'large' ? 'xxlarge' : this.size === 'medium' ? 'large' : this.size;
      return <sy-icon size={iconSize} svgMarkup={this.icon}></sy-icon>;
    }
    const letterText = (this.letter?.trim()?.length ? this.letter : this.exposedText) ?? '';
    if (letterText.length > 0) {
      return <span class="letter">{letterText}</span>;
    }
    return null;
  }

  render() {
    const tooltip = this.getComputedTooltipContent();
    const interactive = this.clickable && !this.disabled;

    const classes = {
      'avatar-item': true,
      [`avatar--${this.variant}`]: true,
      [`avatar--${this.size}`]: true,
      'avatar--clickable': this.clickable,
      'avatar--disabled': this.disabled,
    };

    return (
      <div
        class={classes}
        role={this.clickable ? 'button' : 'img'}
        aria-label={tooltip || undefined}
        aria-disabled={this.disabled ? 'true' : null}
        tabindex={interactive ? 0 : -1}
        title={tooltip || undefined}
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
      >
        {this.renderContent()}
      </div>
    );
  }
}
