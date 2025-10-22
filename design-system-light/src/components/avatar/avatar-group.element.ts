import { LitElement, html, css, CSSResultGroup, unsafeCSS, nothing} from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import { AvatarElement } from './avatar.element';
import { ifDefined } from 'lit/directives/if-defined.js';
import globalCSS from "./styles/avatar-group.scss?inline";
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import '../../style/global.scss';
import { MenuElement } from "../menu";

@customElement('sy-avatar-group')
export class AvatarGroupElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`;

  @property({ type: Boolean }) clickable: boolean = false;
  @property({ type: Number, reflect: true }) maxCount: number = Infinity;
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium'; // 아바타의 크기
  @property({ type: String, reflect: true }) variant: 'stack' | 'grid' = 'stack';
  @state() private isHovering: boolean = false;
  @state() private hoverItemIndex: number | null = null;

  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  
  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick, true);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.requestUpdate();
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick, true);
    // Clean up event listeners from avatars
    const avatars = Array.from(this.querySelectorAll('sy-avatar'));
    avatars.forEach(avatar => {
      (avatar as any).removeEventListener('disableStatus', this.handleDisabledChange.bind(this))
    });
  }
  
  render() {
    return html`
      <slot style="display: none;" @slotchange=${this.handleSlotChange}></slot>
      ${this.renderGroupedAvatars()}
    `;
  }

  private handleSlotChange() {
    this.requestUpdate();
  }

  private renderGroupedAvatars() {
    // Get avatar data from slot content
    const avatarElements = Array.from(this.querySelectorAll('sy-avatar'));
    const count = avatarElements.length;
    
    if (count === 0) {
      return html``;
    }

    // Extract avatar data
    const avatarData = avatarElements.map(avatar => ({
      disabled: avatar.disabled,
      image: avatar.image,
      icon: avatar.icon,
      letter: avatar.letter,
      text: avatar.text,
      variant: avatar.variant,
      tooltipContent: avatar.tooltipContent
    }));

    if (count > this.maxCount) {
      const displayedAvatars = avatarData.slice(0, this.maxCount);
      const remainingCount = count - this.maxCount;
      const remainAvatars = avatarData.slice(this.maxCount);
      
      return html`
        ${displayedAvatars.map((avatarData, index) => html`
          <span class="avatar-container" data-index="${index}">
            <sy-avatar
              ?disabled=${avatarData.disabled}
              image=${ifDefined(avatarData.image)}
              icon=${ifDefined(avatarData.icon)}
              letter=${ifDefined(avatarData.letter)}
              text=${ifDefined(avatarData.text)}
              variant=${ifDefined(avatarData.variant)}
              size=${this.size}
              ?clickable=${this.clickable}
              tooltipContent=${ifDefined(avatarData.tooltipContent)}
            ></sy-avatar>
          </span>
        `)}
        <div class="remain-avatars-list"> 
          <span 
            class="more-avatars" 
            @mouseenter=${this.handleEnterMoreAvatar} 
            @mouseleave=${this.handleLeaveMoreAvatar}>
            ${'+' + remainingCount}
          </span>
          <div class="more-avatars-container">
            ${remainAvatars.map((avatar, index) => {
              return html`
                <div 
                  class="${classMap({
                    'more-avatars-container-inner': true,
                    [`avatar--${index}`]: true,
                  })}"
                  style="${styleMap({
                    'display': 'flex',
                    'align-items': 'center',
                    'padding': 'var(--spacing-3xsmall) var(--spacing-xsmall)',
                    'gap': 'var(--spacing-3xsmall)',
                    'background-color': this.hoverItemIndex === index 
                    ? 'var(--menu-menuitem-default-background-hover)' 
                    : 'var(--menu-dropdownmenu-background-enabled)',
                  })}"
                  @mouseenter=${() => { this.hoverItemIndex = index; }}
                  @mouseleave=${() => { this.hoverItemIndex = null; }}
                >
                  <sy-avatar
                    ?disabled=${avatar.disabled}
                    image=${ifDefined(avatar.image)}
                    icon=${ifDefined(avatar.icon)}
                    letter=${ifDefined(avatar.letter)}
                    text=${ifDefined(avatar.text)}
                    variant=${ifDefined(avatar.variant)}
                    size="small"
                    tooltipContent=${ifDefined(avatar.tooltipContent)}
                  >
                  </sy-avatar>
                  <span sy-typography="" sytype="roboto-regular">
                    ${this.getAvatarDisplayText(avatar)}
                  </span>
                </div>
              `
            })}
          </div>
        </div>
      `;
    } else {
      return avatarData.map((avatarData, index) => html`
        <span class="avatar-container" data-index="${index}">
          <sy-avatar
            ?disabled=${avatarData.disabled}
            image=${ifDefined(avatarData.image)}
            icon=${ifDefined(avatarData.icon)}
            letter=${ifDefined(avatarData.letter)}
            text=${ifDefined(avatarData.text)}
            variant=${ifDefined(avatarData.variant)}
            size=${this.size}
            ?clickable=${this.clickable}
            tooltipContent=${ifDefined(avatarData.tooltipContent)}
          ></sy-avatar>
        </span>
      `);
    }
  }

  private getAvatarDisplayText(avatar: any): string {
    // Priority order for displaying text in dropdown
    if (avatar.letter) return avatar.letter;
    if (avatar.text) return avatar.text;
    if (avatar.tooltipContent) return avatar.tooltipContent;
    if (avatar.image) {
      // Extract filename without extension
      const filename = avatar.image.split('/').pop() || '';
      return filename.replace(/\.[^/.]+$/, '') || 'Image';
    }
    if (avatar.icon) return 'Icon';
    return 'Avatar';
  }

  private handleDisabledChange(event: CustomEvent) {
    this.requestUpdate(); // 상태가 변경되었으므로 업데이트 요청
  }
  
  private handleOutsideClick(e: any) {
    const menuElement = this.shadowRoot?.querySelector("sy-menu") as MenuElement;
    if(menuElement) {
      menuElement.delayedMenuClose();
    }
  }



  private handleEnterMoreAvatar() {
    const moreAvatarsElement = this.shadowRoot?.querySelector('.more-avatars') as HTMLElement;
    const rect = moreAvatarsElement.getBoundingClientRect();
    
    const moreAvatarsContainer = this.shadowRoot?.querySelector('.more-avatars-container') as HTMLElement;
    // const moreAvatarsContainerInner = this.shadowRoot?.querySelector('.more-avatars-container-inner') as HTMLElement;

    if (moreAvatarsContainer) {
      moreAvatarsContainer.style.display = 'flex';
      moreAvatarsContainer.style.alignContent = 'center';
      moreAvatarsContainer.style.position = 'absolute';
      moreAvatarsContainer.style.flexDirection = 'column';
      moreAvatarsContainer.style.background = 'var(--menu-dropdownmenu-background-enabled)';
      moreAvatarsContainer.style.marginTop = 'var(--spacing-3xsmall)';
      moreAvatarsContainer.style.paddingTop = 'var(--spacing-3xsmall)';
      moreAvatarsContainer.style.paddingBottom = 'var(--spacing-3xsmall)';
      moreAvatarsContainer.style.boxShadow = 'var(--box-shadow)';
      moreAvatarsContainer.style.borderRadius = 'var(--border-radius-small)';
      moreAvatarsContainer.style.top = `${rect.bottom + window.scrollY}px`;
      moreAvatarsContainer.style.left = `${rect.left}px`;

      setTimeout(() => { document.body.appendChild(moreAvatarsContainer);}, 0);
      // more-avatars-container에 대한 마우스 이벤트 리스너 추가
      moreAvatarsContainer.addEventListener('mouseenter', () => {
        this.isHovering = true;
      });
      moreAvatarsContainer.addEventListener('mouseleave', () => {
        this.isHovering = false;
        this.handleLeaveMoreAvatar();
      });
    }
  }

  
  
  private handleLeaveMoreAvatar() {
    // isHovering이 false일 때만 컨테이너를 제거
    setTimeout(() => {
      if (!this.isHovering) {
        const moreAvatarsContainer = document.body.querySelector('.more-avatars-container') as HTMLElement;
        if (moreAvatarsContainer) {
          moreAvatarsContainer.style.display = 'none';
          document.body.removeChild(moreAvatarsContainer);
          this.shadowRoot?.appendChild(moreAvatarsContainer);
        }
      }
    }, 100); // 약간의 지연을 주어 마우스 이동 중에 발생할 수 있는 깜빡임 방지
  }
}