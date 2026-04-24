import { Component, Prop, State, Event, EventEmitter, h, Element } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-avatar-group — layout container for multiple <sy-avatar> children.
 *
 * Spec: design-system-specs/components/avatar-group.yaml
 * Anatomy:
 *   .sy-avatar-group
 *     └─ .avatar-group-inner
 *          ├─ .avatar-container  (× maxCount)
 *          └─ .remain-avatars-list            ← only when children > maxCount
 *               ├─ .more-avatars ("+n" badge)
 *               └─ .more-avatars-container   (appended to body on hover)
 *
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-avatar-group',
  styleUrl: 'sy-avatar-group.scss',
  scoped: true,
  shadow: false,
})
export class SyAvatarGroup {
  @Element() host!: HTMLSyAvatarGroupElement;

  // --- Public Properties (spec: props) ---
  @Prop({ reflect: true }) clickable: boolean = false;
  @Prop({ reflect: true, attribute: 'maxCount', mutable: true }) maxCount: number = Infinity as any;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) variant: 'stack' | 'grid' = 'stack';

  // --- Private State ---
  @State() private isHovering: boolean = false;
  @State() private hoverItemIndex: number | null = null;

  // Cache the original children's avatar data so we can re-render them without
  // disturbing the user's slot markup.
  private originalAvatarData: any[] = [];
  private overflowContainer: HTMLElement | null = null;

  // --- Events (spec: api.events.selected) ---
  @Event() selected!: EventEmitter<{
    letter: string;
    text: string;
    icon: string;
    image: string;
  }>;

  // Bound listeners (stable references for add/removeEventListener).
  private boundHandleOutsideClick = () => this.handleOutsideClick();
  private handleOverflowMouseEnter = () => { this.isHovering = true; };
  private handleOverflowMouseLeave = () => {
    this.isHovering = false;
    this.handleLeaveMoreAvatar();
  };

  // --- Lifecycle ---
  connectedCallback() {
    document.addEventListener('click', this.boundHandleOutsideClick, true);
  }

  componentWillLoad() {
    this.maxCount = fnAssignPropFromAlias<number>(this.host, 'max-count') ?? this.maxCount;
    this.collectOriginalAvatarData();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.boundHandleOutsideClick, true);
    if (this.overflowContainer && this.overflowContainer.parentElement === document.body) {
      try { document.body.removeChild(this.overflowContainer); } catch (_e) { /* noop */ }
    }
  }

  // --- Helpers ---
  private collectOriginalAvatarData() {
    const avatarElements = Array.from(this.host.children).filter(
      child => child.tagName.toLowerCase() === 'sy-avatar'
    ) as HTMLSyAvatarElement[];

    this.originalAvatarData = avatarElements.map(a => ({
      disabled: a.disabled,
      image: a.image,
      icon: a.icon,
      letter: a.letter,
      text: a.text,
      variant: a.variant,
      tooltipContent: a.tooltipContent,
    }));
  }

  private requestUpdate() {
    this.collectOriginalAvatarData();
    // Trigger a re-render by touching a state field.
    this.hoverItemIndex = this.hoverItemIndex;
  }

  private getAvatarDisplayText(avatar: any) {
    if (avatar.letter) return avatar.letter;
    if (avatar.text) return avatar.text;
    if (avatar.tooltipContent) return avatar.tooltipContent;
    if (avatar.image) {
      const filename = String(avatar.image).split('/').pop() || '';
      return filename.replace(/\.[^/.]+$/, '') || 'Image';
    }
    if (avatar.icon) return 'Icon';
    return 'Avatar';
  }

  // --- Interaction ---
  private handleOverflowItemClick(avatarData: any) {
    if (!this.clickable) return;
    const eventDetail = {
      letter: avatarData.letter || '',
      text: avatarData.text || '',
      icon: avatarData.icon || '',
      image: avatarData.image || '',
    };
    this.handleLeaveMoreAvatar();
    this.selected.emit(eventDetail);
  }

  private handleOverflowItemKeydown = (e: KeyboardEvent, avatarData: any) => {
    if (!this.clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleOverflowItemClick(avatarData);
    }
  };

  private handleOutsideClick() {
    const menuElement = document.querySelector('sy-menu') as unknown as HTMLSyMenuElement | null;
    if (menuElement) {
      menuElement.delayedMenuClose?.();
    }
  }

  private handleEnterMoreAvatar() {
    const more = this.host.querySelector('.more-avatars') as HTMLElement | null;
    if (!more) return;
    const rect = more.getBoundingClientRect();

    const container = this.host.querySelector('.more-avatars-container') as HTMLElement | null;
    if (!container) return;
    this.overflowContainer = container;

    container.style.display = 'flex';
    container.style.alignContent = 'center';
    container.style.position = 'absolute';
    container.style.flexDirection = 'column';
    container.style.background = 'var(--menu-dropdownmenu-background-enabled)';
    container.style.marginTop = 'var(--spacing-3xsmall)';
    container.style.paddingTop = 'var(--spacing-3xsmall)';
    container.style.paddingBottom = 'var(--spacing-3xsmall)';
    container.style.boxShadow = 'var(--box-shadow)';
    container.style.borderRadius = 'var(--border-radius-small)';
    container.style.top = `${rect.bottom + window.scrollY}px`;
    container.style.left = `${rect.left}px`;

    setTimeout(() => { document.body.appendChild(container); }, 0);

    container.removeEventListener('mouseenter', this.handleOverflowMouseEnter);
    container.removeEventListener('mouseleave', this.handleOverflowMouseLeave);
    container.addEventListener('mouseenter', this.handleOverflowMouseEnter);
    container.addEventListener('mouseleave', this.handleOverflowMouseLeave);
  }

  private handleLeaveMoreAvatar() {
    setTimeout(() => {
      if (!this.isHovering && this.overflowContainer) {
        this.overflowContainer.style.display = 'none';
        try {
          if (this.overflowContainer.parentElement === document.body) {
            document.body.removeChild(this.overflowContainer);
          }
          this.host.appendChild(this.overflowContainer);
        } catch (_e) { /* noop */ }
      }
    }, 100);
  }

  // --- Render ---
  render() {
    return (
      <div
        class={{ 'sy-avatar-group': true, [`variant-${this.variant}`]: true }}
        role="list"
        aria-label="Avatar group"
      >
        <div style={{ display: 'none' }}>
          <slot onSlotchange={() => this.requestUpdate()}></slot>
        </div>
        {this.renderGroupedAvatars()}
      </div>
    );
  }

  private renderGroupedAvatars() {
    if (this.originalAvatarData.length === 0) this.collectOriginalAvatarData();

    const avatarData = this.originalAvatarData;
    const count = avatarData.length;
    if (count === 0) return null;

    const limit = this.maxCount as number;

    if (count > limit) {
      const displayed = avatarData.slice(0, limit);
      const remaining = avatarData.slice(limit);

      return (
        <div class="avatar-group-inner">
          {displayed.map((ad, idx) => (
            <span class="avatar-container" role="listitem" data-index={String(idx)}>
              <sy-avatar
                disabled={ad.disabled}
                image={ad.image}
                icon={ad.icon}
                letter={ad.letter}
                text={ad.text}
                variant={ad.variant}
                size={this.size}
                clickable={this.clickable}
                tooltipContent={ad.tooltipContent}
              ></sy-avatar>
            </span>
          ))}

          <div class="remain-avatars-list">
            <span
              class="more-avatars"
              role="button"
              tabindex={this.clickable ? 0 : -1}
              aria-label={`Show ${remaining.length} more avatar${remaining.length === 1 ? '' : 's'}`}
              onMouseEnter={() => this.handleEnterMoreAvatar()}
              onMouseLeave={() => this.handleLeaveMoreAvatar()}
              onFocus={() => this.handleEnterMoreAvatar()}
              onBlur={() => this.handleLeaveMoreAvatar()}
            >{`+${remaining.length}`}</span>
            <div class="more-avatars-container" style={{ display: 'none' }}>
              {remaining.map((ad, idx) => (
                <div
                  class={`more-avatars-container-inner avatar--${idx}`}
                  role={this.clickable ? 'button' : 'listitem'}
                  tabindex={this.clickable ? 0 : -1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--spacing-3xsmall) var(--spacing-xsmall)',
                    gap: 'var(--spacing-3xsmall)',
                    cursor: this.clickable ? 'pointer' : 'default',
                  }}
                  onMouseEnter={() => { this.hoverItemIndex = idx; }}
                  onMouseLeave={() => { this.hoverItemIndex = null; }}
                  onClick={() => this.handleOverflowItemClick(ad)}
                  onKeyDown={(e: KeyboardEvent) => this.handleOverflowItemKeydown(e, ad)}
                >
                  <sy-avatar
                    disabled={ad.disabled}
                    image={ad.image}
                    icon={ad.icon}
                    letter={ad.letter}
                    text={ad.text}
                    variant={ad.variant}
                    size="small"
                    clickable={this.clickable}
                    tooltipContent={ad.tooltipContent}
                  ></sy-avatar>
                  <span data-sy-typography data-sytype="roboto-regular">
                    {this.getAvatarDisplayText(ad)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div class="avatar-group-inner">
        {avatarData.map((ad, idx) => (
          <span class="avatar-container" role="listitem" data-index={String(idx)}>
            <sy-avatar
              disabled={ad.disabled}
              image={ad.image}
              icon={ad.icon}
              letter={ad.letter}
              text={ad.text}
              variant={ad.variant}
              size={this.size}
              clickable={this.clickable}
              tooltipContent={ad.tooltipContent}
            ></sy-avatar>
          </span>
        ))}
      </div>
    );
  }
}
