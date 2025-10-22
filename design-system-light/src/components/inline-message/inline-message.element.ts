import {LitElement,CSSResultGroup,css,unsafeCSS,html, PropertyValues, nothing} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import globalCSS from './styles/inline-message.scss?inline';
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import "../button/button.element";
import "../icon/icon.element";

const DEBOUNCE_TIME = 50;

@customElement("sy-inline-message")
export class InlineMessageElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `; 

  @property({ type: String }) variant: 'info' | 'success' | 'warning' | 'error' = 'info';  
  @property({ type: String }) message: string = ''; 

  @property({ type: Boolean }) showIcon : boolean = false;
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  @property({ type: String }) trigger: 'click' | 'focusout' = 'click'; 

  @property({ type: String }) btnLabel: string = '';
  @property({ type: String }) position: 'top' | 'bottom' | 'left' | 'right'  = 'bottom';

  @state() private iconType: string = ''; 

  private parentDom: any;
  private addedToBody = false;
  private timeId: any;

  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.debounceUpdate = this.debounceUpdate.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick, true);
    window.addEventListener("scroll", this.debounceUpdate, true);
    window.addEventListener("resize", this.debounceUpdate, true);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.parentDom = this.parentElement;

    if(this.open) {
      this.appendToRoot();
    }
    this.addEvent();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('variant')) {
      switch (this.variant) {
        case 'success': 
          this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z"/></svg>'; 
          break;
        case 'warning': 
          this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z"/></svg>'; 
          break;
        case 'error': 
          this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>'; 
          break;
        case 'info': 
          this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>'; 
          break;
      }
    } else if (changedProperties.has('trigger')) {
      this.addEvent(); 
    } else if (changedProperties.has('open')) {
      if(this.open) {
        this.appendToRoot();
      } else {
        this.removeInlineMsg();
      }
      
    } 
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick, true);
    window.removeEventListener("scroll", this.debounceUpdate, true);
    window.removeEventListener("resize", this.debounceUpdate, true);
  }

  render() {
    return html`
      <div class="${classMap({
          'inline-massage-container' : true,
          [this.variant]: true,
          [this.position]: true
        })}">
        ${this.showIcon ?  html`
          <sy-icon size="xlarge" class="messege-icon">
            ${unsafeHTML(this.iconType)}
          </sy-icon>` 
      : nothing }
        <div class="inline-group">
        <span class="inline-message">${this.message}</span>
        ${this.btnLabel.length && this.btnLabel.trim().length > 0 ?
        html`
          <div class="inline-message-button-area">
            <sy-button class="inline-message-action" @click=${this.clickAction} size="small">
              ${this.btnLabel.trim()}
            </sy-button>
          </div>
          ` : nothing
        }
        </div>
      </div>
    `;
  }


  private appendToRoot() {
    if (this.parentDom !== document.body) {   
      document.body.appendChild(this);
      this.addedToBody = true;
      this.debounceUpdate();
    }
  }

  private addEvent() {
    const parent = this.parentDom;
    if (!parent) return;
  
    if (this.trigger === 'click') {
      parent.removeEventListener('focusout', this.parentFocusOut);
      parent.removeEventListener('focus', this.parentFocus);
      parent.removeEventListener('click', this.parentClick); // 기존 이벤트 리스너 제거
      parent.addEventListener('click', this.parentClick);
    } else if (this.trigger === 'focusout') {
      parent.removeEventListener('click', this.parentClick);
      parent.addEventListener('focusout', this.parentFocusOut);
      parent.addEventListener('focus', this.parentFocus);
    }
  }

  private debounceUpdate() {
    if(this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(() => {
      this.updateInlineMsg();
    }, DEBOUNCE_TIME);
  } 

  private updateInlineMsg() {
    if (this.addedToBody && this.parentDom !== document.body && this.parentDom){
      const parentRect = this.parentDom.getBoundingClientRect();
      this.style.display = 'block';
      this.style.visibility = 'hidden'; 
      this.style.position = 'absolute';
      this.style.left = '-9999px';
      this.style.top = '-9999px';

      requestAnimationFrame(() => {
        const inlineMsgRect = this.getBoundingClientRect(); 
        const location = this.setLocation(parentRect, inlineMsgRect);

        const leftSpace = parentRect.left - inlineMsgRect.width;
        const rightSpace = window.innerWidth - (parentRect.right + inlineMsgRect.width);
        const topSpace = parentRect.top - inlineMsgRect.height;
        const bottomSpace = window.innerHeight- (parentRect.bottom + inlineMsgRect.height);

        let inlineMsgLocation = {top: 0, left: 0};

        let isLackSpace = false;
        let replace = this.position;

         if(this.position === 'left') {
          isLackSpace = leftSpace < 0;
          replace = isLackSpace && rightSpace > 0? 'right' : this.position;    
        } else if (this.position === 'right') {
          isLackSpace = rightSpace < 0;
          replace = isLackSpace && leftSpace > 0 ? 'left': this.position;
        } else if (this.position === 'top') {
          isLackSpace =  topSpace < 0;
          replace = isLackSpace && bottomSpace > 0 ? 'bottom' : this.position;
        } else if (this.position === 'bottom') {
          isLackSpace = bottomSpace < 0;
          replace = isLackSpace && topSpace > 0 ? 'top': this.position;
        }
         
        inlineMsgLocation = location[replace];
        this.style.top = `${inlineMsgLocation.top}px`;
        this.style.left = `${inlineMsgLocation.left}px`;
        
        // 화면 경계를 벗어나는지 확인하고 조정
        this.adjustForScreenBounds(inlineMsgRect);
        
        this.style.visibility = 'visible';
      })
    }
  }

  // 화면 경계를 벗어나는 경우 위치를 조정하는 메소드 추가
  private adjustForScreenBounds(inlineMsgRect: DOMRect): boolean {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;
    
    const currentLeft = parseFloat(this.style.left);
    const currentTop = parseFloat(this.style.top);
    
    if (currentLeft < window.scrollX) {
      this.style.left = `${window.scrollX}px`;
      adjusted = true;
    }
    else if (currentLeft + inlineMsgRect.width > window.scrollX + viewportWidth) {
      this.style.left = `${window.scrollX + viewportWidth - inlineMsgRect.width}px`;
      adjusted = true;
    }
    
    if (currentTop < window.scrollY) {
      this.style.top = `${window.scrollY}px`;
      adjusted = true;
    }
    else if (currentTop + inlineMsgRect.height > window.scrollY + viewportHeight) {
      this.style.top = `${window.scrollY + viewportHeight - inlineMsgRect.height}px`;
      adjusted = true;
    }
    
    return adjusted;
  }

  private handleOutsideClick = (event: any) => {
    const isInMsg = this.contains(event.target as Node);
    const isParent = this.parentDom?.contains(event.target as Node);

    if (this.trigger === 'click' && !isInMsg && !isParent) {
      this.open = false;
    }
  };

  private parentClick = (event: any) => {
    event.preventDefault();
    this.open = !this.open;
  }

  private parentFocusOut = (event:any) => {
    event.preventDefault();
   
    if(!this.open) {
      this.open = true;
    }
  }

  private parentFocus = (event:any) => {
    event.preventDefault();
    if(this.open) {
      this.open = false;
    }
  }

  private removeInlineMsg = () => {
    if(this.isConnected) {
      try {
        document.body.removeChild(this);
        this.addedToBody = false;
      } catch (err:any) {
        /* console.log(err); */
      }
    }
  }

  private setLocation(parentRect: any, inlineMsgRect: any) {
    // Get this element's own paddingTop
    let paddingTop = 0;
    const style = window.getComputedStyle(this);
    paddingTop = parseFloat(style.paddingTop) || 0;
    
    return {
      'top': {
        top: window.scrollY + parentRect.top - inlineMsgRect.height - paddingTop,
        left: window.scrollX + parentRect.left + (parentRect.width - inlineMsgRect.width) / 2,
      }, 
      'bottom': {
        top: window.scrollY + parentRect.bottom,
        left: window.scrollX + parentRect.left + (parentRect.width - inlineMsgRect.width) / 2
      },
      'left': {
        top: window.scrollY + parentRect.top + (parentRect.height - inlineMsgRect.height) / 2,
        left: window.scrollX + parentRect.left - inlineMsgRect.width,
      },
      'right': {
        top: window.scrollY + parentRect.top + (parentRect.height - inlineMsgRect.height) / 2,
        left: window.scrollX + parentRect.right,
      },    
    }
  }

  private clickAction(e:any) {
    // e.stopPropagation();
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('btnClick', {
        detail: e,
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

}
