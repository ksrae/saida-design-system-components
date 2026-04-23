import { Component, Prop, State, h, Element } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-avatar-group (Stencil port, light DOM, scoped)
 * - Renders slotted <sy-avatar> children
 * - If children count > maxCount, shows +N and a dropdown list appended to body
 */
@Component({
  tag: 'sy-avatar-group',
  styleUrl: 'sy-avatar-group.scss',
  scoped: true,
  shadow: false,
})
export class SyAvatarGroup {
  @Element() host!: HTMLSyAvatarGroupElement;

  @Prop({ reflect: true }) clickable: boolean = false;
  @Prop({ reflect: true, attribute: 'maxCount', mutable: true }) maxCount: number = Infinity as any;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) variant: 'stack' | 'grid' = 'stack';

  @State() private isHovering: boolean = false;
  @State() private hoverItemIndex: number | null = null;

  // 원본 아바타 데이터를 캐시하여 중복 계산 방지
  private originalAvatarData: any[] = [];
  private overflowContainer: HTMLElement | null = null;

  // bind in constructor-like pattern
  private boundHandleOutsideClick = () => this.handleOutsideClick();
  private handleOverflowMouseEnter = () => { this.isHovering = true; };
  private handleOverflowMouseLeave = () => {
    this.isHovering = false;
    this.handleLeaveMoreAvatar();
  };

  connectedCallback() {
    document.addEventListener('click', this.boundHandleOutsideClick, true);
  }

  componentWillLoad() {
    this.maxCount = fnAssignPropFromAlias(this.host, 'max-count') ?? this.maxCount;
    // 초기 아바타 데이터 수집
    this.collectOriginalAvatarData();
  }

  private collectOriginalAvatarData() {
    // slot이 정의되기 전에 직접 자식 sy-avatar들을 찾음
    const avatarElements = Array.from(this.host.children).filter(child =>
      child.tagName.toLowerCase() === 'sy-avatar'
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
  disconnectedCallback() {
    document.removeEventListener('click', this.boundHandleOutsideClick, true);
    if (this.overflowContainer && this.overflowContainer.parentElement === document.body) {
      try { document.body.removeChild(this.overflowContainer); } catch (e) {}
    }
  }

  render() {
    return (
      <div class={{ 'sy-avatar-group': true, [`variant-${this.variant}`]: true }}>
        <div style={{ display: 'none' }}>
          <slot onSlotchange={() => this.requestUpdate()}></slot>
        </div>
        {this.renderGroupedAvatars()}
      </div>
    );
  }

  // helper to request an update from non-React context
  private requestUpdate() {
    // slot 변경 시 원본 데이터를 다시 수집
    this.collectOriginalAvatarData();
    // Stencil updates automatically when @State/@Prop change; force a render via a dummy state toggle
    this.hoverItemIndex = this.hoverItemIndex;
  }

  private renderGroupedAvatars() {
    // 캐시된 원본 데이터가 없으면 다시 수집
    if (this.originalAvatarData.length === 0) {
      this.collectOriginalAvatarData();
    }

    const avatarData = this.originalAvatarData;
    const count = avatarData.length;
    if (count === 0) return null;

    if (count > (this.maxCount as number)) {
      const displayed = avatarData.slice(0, this.maxCount as number);
      const remaining = avatarData.slice(this.maxCount as number);

      return (
        <div class="avatar-group-inner">
          {displayed.map((ad, idx) => (
            <span class="avatar-container" data-index={String(idx)}>
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
              onMouseEnter={() => this.handleEnterMoreAvatar()}
              onMouseLeave={() => this.handleLeaveMoreAvatar()}
            >{`+${remaining.length}`}</span>
            <div class="more-avatars-container" style={{ display: 'none' }}>
              {remaining.map((ad, idx) => (
                <div
                  class={`more-avatars-container-inner avatar--${idx}`}
                  style={{ display: 'flex', alignItems: 'center', padding: 'var(--spacing-3xsmall) var(--spacing-xsmall)', gap: 'var(--spacing-3xsmall)', cursor: this.clickable ? 'pointer' : 'default' }}
                  onMouseEnter={() => { this.hoverItemIndex = idx; }}
                  onMouseLeave={() => { this.hoverItemIndex = null; }}
                  onClick={() => this.handleOverflowItemClick(ad)}
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
                  <span data-sy-typography data-sytype="roboto-regular">{this.getAvatarDisplayText(ad)}</span>
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
          <span class="avatar-container" data-index={String(idx)}>
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

  // If avatar children dispatch 'disableStatus' events in future, this can be wired up.

  private handleOverflowItemClick(avatarData: any) {
    if (!this.clickable) return;

    // 가상의 아바타 요소를 생성하여 selected 이벤트 발생
    const eventDetail = {
      letter: avatarData.letter || '',
      text: avatarData.text || '',
      icon: avatarData.icon || '',
      image: avatarData.image || '',
    };

    // 드롭다운 메뉴 닫기
    this.handleLeaveMoreAvatar();

    // 커스텀 이벤트 발생 (avatar-group에서 발생)
    const selectedEvent = new CustomEvent('selected', {
      detail: eventDetail,
      bubbles: true,
      composed: true,
    });
    this.host.dispatchEvent(selectedEvent);
  }

  private handleOutsideClick() {
    // If there's a sy-menu inside (from more-avatars), call its delayedMenuClose
    const menuElement = document.querySelector('sy-menu') as unknown as HTMLSyMenuElement | null;
    if (menuElement) {
      menuElement.delayedMenuClose?.();
    }
  }

  private handleEnterMoreAvatar() {
    // Light DOM에서는 shadowRoot가 없으므로 host 요소에서 직접 검색
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
        } catch (e) {}
      }
    }, 100);
  }
}
