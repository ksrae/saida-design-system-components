import { LitElement, html, css, CSSResultGroup, unsafeCSS} from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import '../icon/icon.element';
import '../empty/empty.element';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import globalCSS from "./styles/avatar.scss?inline";

@customElement('sy-avatar')
export class AvatarElement extends LitElement {
  static styles: CSSResultGroup = css`
  ${unsafeCSS(globalCSS)};
  `;
  @property({ type: Boolean, reflect: true}) clickable: boolean = false;
  @property({ type: Boolean, reflect: true}) disabled: boolean = false;
  @property({ type: String }) image: string = '';
  @property({ type: String }) text: string = '';
  @property({ type: String }) icon: string = '';
  @property({ type: String }) letter: string = '';
  @property({ type: String, reflect: true }) variant: "lightgray"| "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "blue" | "purple" | "magenta" | "darkgray" = "lightgray";
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) tooltipContent: string = '';
  
  @state() private imageLoaded: boolean = false;
  @state() private shape: 'circle' | 'square' = 'circle';
  @state() private exposedText = this.text;
  @state() private isTooltipContentUserSet: boolean = false;
  
  // private disabledColor = '#ccc';
  // private fallbackSrc = ''; // 기본 이미지 경로

   async firstUpdated() {
    await this.updateComplete;
    
    // tooltipContent가 이미 설정되어 있으면 HTML 태그 제거 후 사용자가 설정한 것으로 간주
    if (this.tooltipContent?.trim()?.length) {
      this.tooltipContent = this.sanitizeHtml(this.tooltipContent);
      this.isTooltipContentUserSet = true;
    }
    
    // image 처리
    if(this.image?.trim()?.length) {
      this.imgPreload();
    }
    
    // text 처리
    if(this.text?.trim()?.length) {
      this.setText();
    }
    
    // letter 처리
    if(this.letter?.trim()?.length) {
      if(this.letter.length > 2 ) {
        this.letter = this.letter.slice(0,2).toUpperCase();
      }
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    // tooltipContent가 외부에서 변경된 경우 HTML 태그 제거 후 플래그 설정
    if (changedProperties.has('tooltipContent')) {
      this.tooltipContent = this.sanitizeHtml(this.tooltipContent);
      this.isTooltipContentUserSet = !!this.tooltipContent?.trim()?.length;
    }
    
    // image 처리
    if(changedProperties.has('image')) {
      if(this.image && this.image.trim()?.length) {
        this.imgPreload();
      }
    }
    
    // text 처리 
    if (changedProperties.has('text')) {
      this.setText();
    } 
    
    // letter 처리
    if(changedProperties.has('letter')) {
      if(this.letter && this.letter?.length > 2 ) {
        this.letter = this.letter.slice(0,2).toUpperCase();
      }
    } 
    
    // 속성 변경 시 항상 업데이트 (사용자가 설정하지 않은 경우에만)
    if (!this.isTooltipContentUserSet && (
      changedProperties.has('image') || 
      changedProperties.has('icon') || 
      changedProperties.has('text') || 
      changedProperties.has('letter')
    )) {
      this.requestUpdate();
    }
    
    if(changedProperties.has('disabled')) {
      this.dispatchEvent(new CustomEvent('disableStatus', {
        detail: { disabled: this.disabled },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private setText() {
    if(this.text.includes(' ')) {
      const fullName = this.text.split(' ');
      this.exposedText = fullName.map((name) => name.charAt(0)).join('').toUpperCase(); 
    } 
    else {
      if(this.text.length > 2) {
        this.exposedText = this.text.slice(0,2).toUpperCase();
      }
    }
  }

  private imgPreload() {
    const img = new Image();
    img.src = this.image;

    img.onload = () => {
      this.imageLoaded = true;
      this.requestUpdate();
    };

    img.onerror = () => {
      this.imageLoaded = false;
      this.image = '';

      // this works if fallbackUrl is on.
      // if(!this.imageLoaded && this.image?.trim()?.length && this.image !== this.fallbackSrc) {
      //   this.image = this.fallbackSrc;
      //   this.imgPreload();
        
      // } else {
      //   this.image = '';
      // }
      this.requestUpdate();
    };
  }

  // 1.image 
  // 2. icon 
  // 3. label
  // background color가 정의되면 직접 스타일에 백그라운드 컬러 넣는 부분을 제거한다.
  render() {
    const computedTooltip = this.getComputedTooltipContent();

    return html`
      <div
        class=${classMap({
          'avatar-item' : true,
          "avatar--lightgray": this.variant === "lightgray",
          "avatar--red": this.variant === "red",
          "avatar--orange": this.variant === "orange",
          "avatar--yellow": this.variant === "yellow",
          "avatar--lime": this.variant === "lime",
          "avatar--green": this.variant === "green",
          "avatar--teal": this.variant === "teal",
          "avatar--blue": this.variant === "blue",
          "avatar--purple": this.variant === "purple",
          "avatar--magenta": this.variant === "magenta",
          "avatar--darkgray": this.variant === "darkgray",
       
          "avatar--small": this.size === "small",
          "avatar--medium": this.size === "medium",
          "avatar--large": this.size === "large",

          disabled: this.disabled,
        })}
        title="${computedTooltip}"
        @click=${this.handleClick}
      >
        ${
          this.image?.trim()?.length > 0 && this.imageLoaded
          ? html`<img src="${this.image}" alt="${computedTooltip}" />`  
          : this.icon?.trim()?.length > 0
          ? html`
              <sy-icon size="${this.size === 'large' ? 'xxlarge' : this.size === 'medium' ? 'large' : this.size}">
                ${unsafeHTML(this.icon)}
              </sy-icon>`
          : this.letter?.trim()?.length || this.exposedText?.trim()?.length 
          ? html`<span class="letter">${this.letter?.trim()?.length ? this.letter : this.exposedText}</span>`
          : ''}
      </div>
    `;
  }

  private handleClick(e: Event) {
    e.preventDefault();

    if(this.clickable && !this.disabled) {
      this.dispatchEvent(
        new CustomEvent('selected', {
          detail: {
            letter: this.letter ?? '',
            text: this.text ?? '',
            icon: this.icon ?? '',
            image: this.image ?? '',
          },
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    }
  }
  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  private getComputedTooltipContent(): string {
    // 사용자가 명시적으로 설정한 경우 그 값을 사용
    if (this.isTooltipContentUserSet && this.tooltipContent?.trim()?.length) {
      return this.sanitizeHtml(this.tooltipContent);
    }
        
    if (this.image?.trim()?.length) {
      return this.sanitizeHtml(this.image);
    } else if (this.icon?.trim()?.length) {
      return this.sanitizeHtml(this.icon);
    } else if (this.text?.trim()?.length) {
      return this.sanitizeHtml(this.text);
    } else if (this.letter?.trim()?.length) {
      return this.sanitizeHtml(this.letter);
    }
    
    console.log('returning empty tooltip');
    return '';
  }

  private setTooltipContent(content: any) {
    const sanitized = this.sanitizeHtml(content);
    this.tooltipContent = sanitized;
    this.requestUpdate();
  }

}
