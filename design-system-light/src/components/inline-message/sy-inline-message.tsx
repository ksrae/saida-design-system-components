import { Component, h, Prop, State, Element, Watch, Listen, Event, EventEmitter } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

// HTMLSyInlineMessageElement interface
export interface HTMLSyInlineMessageElement extends HTMLElement {
  // Props
  variant: 'info' | 'success' | 'warning' | 'error';
  message: string;
  showIcon: boolean;
  open: boolean;
  trigger: 'click' | 'focusout';
  btnLabel: string;
  position: 'top' | 'bottom' | 'left' | 'right';

  // Events
  btnClick: EventEmitter<MouseEvent>;
}

const DEBOUNCE_TIME = 50;

@Component({
  tag: 'sy-inline-message',
  styleUrl: 'sy-inline-message.scss',
  scoped: true,  // 요청하신 scoped 스타일 적용
  shadow: false, // 요청하신 Light DOM 사용
})
export class InlineMessage {
  @Element() host: HTMLElement;

  // --- Props (Lit의 @property와 동일) ---
  @Prop() variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Prop() message: string = '';
  @Prop({ attribute: 'showIcon'}) showIcon: boolean = false;
  @Prop({ reflect: true, mutable: true }) open: boolean = false;
  @Prop() trigger: 'click' | 'focusout' = 'click';
  @Prop({ attribute: 'btnLabel' }) btnLabel: string = '';
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  // --- State (Lit의 @state와 동일) ---
  @State() private iconType: string = '';

  // --- Internal properties (Lit과 동일) ---
  private parentDom: HTMLElement;
  private addedToBody = false;
  private timeId: any;

  // Stencil의 @Event 데코레이터로 이벤트 정의
  @Event() btnClick: EventEmitter<MouseEvent>;

  // --- Lifecycle Hooks ---

  componentWillLoad() {
    this.btnLabel = fnAssignPropFromAlias(this.host, 'btn-label') ?? this.btnLabel;
    // 첫 렌더링이 일어나기 전에 iconType을 설정합니다.
    this.handleVariantChange(this.variant);
  }

  connectedCallback() {
    // Lit의 connectedCallback과 동일
    document.addEventListener('click', this.handleOutsideClick, true);
  }

  disconnectedCallback() {
    // Lit의 disconnectedCallback과 동일
    document.removeEventListener('click', this.handleOutsideClick, true);
    window.removeEventListener('scroll', this.debounceUpdate, true);
    window.removeEventListener('resize', this.debounceUpdate, true);

    // 컴포넌트가 DOM에서 완전히 제거될 때 bodyからも 제거
    this.removeInlineMsg();
  }

  componentDidLoad() {
    this.parentDom = this.host.parentElement;

    // [수정 1] 초기 상태를 명확하게 설정합니다.
    // open이 true이면 body로 이동시키고, false이면 visibility를 확실히 hidden으로 설정합니다.
    if (this.open) {
      this.appendToRoot();
    } else {
      this.host.style.visibility = 'hidden';
    }

    this.addEvent();
  }

  // --- Watchers (Lit의 updated(changedProperties) 로직 대체) ---

  @Watch('variant')
  handleVariantChange(newValue: string) {
    // 원본 코드의 `updated` 내 `changedProperties.has('variant')` 로직
    switch (newValue) {
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
      default:
        this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>';
        break;
    }
  }

  @Watch('trigger')
  handleTriggerChange() {
    // 원본 코드의 `updated` 내 `changedProperties.has('trigger')` 로직
    this.addEvent();
  }

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    // 원본 코드의 `updated` 내 `changedProperties.has('open')` 로직
    if (newValue) {
      this.appendToRoot();
    } else {
      this.removeInlineMsg();
    }
  }

  // --- Global Event Listeners (Lit과 동일) ---
  @Listen('scroll', { target: 'window', capture: true })
  @Listen('resize', { target: 'window', capture: true })
  handleWindowActivity() {
      this.debounceUpdate();
  }

  // --- Private Methods (원본 Lit 코드에서 거의 그대로 가져옴) ---

  // Lit의 `this`를 Stencil의 `this.host`로 변경
  private appendToRoot = () => {
    if (this.parentDom !== document.body) {
      document.body.appendChild(this.host);
      this.addedToBody = true;
      this.debounceUpdate();
    }
  }

  private removeInlineMsg = () => {
    // 이것이 핵심입니다. body에서 제거하기 전에, 또는 open=false 상태일 때
    // visibility를 hidden으로 되돌려 놓아야 합니다.
    this.host.style.visibility = 'hidden';

    if (this.host.isConnected && this.addedToBody) {
      try {
        document.body.removeChild(this.host);
        this.addedToBody = false;
      } catch (err: any) {
        /* console.log(err); */
      }
    }
  }

  private addEvent = () => {
    const parent = this.parentDom;
    if (!parent) return;

    // 기존 이벤트 리스너를 한 번에 제거하여 중복 방지
    parent.removeEventListener('focusout', this.parentFocusOut);
    parent.removeEventListener('focus', this.parentFocus);
    parent.removeEventListener('click', this.parentClick);

    if (this.trigger === 'click') {
      parent.addEventListener('click', this.parentClick);
    } else if (this.trigger === 'focusout') {
      parent.addEventListener('focusout', this.parentFocusOut);
      parent.addEventListener('focus', this.parentFocus);
    }
  }

  private debounceUpdate = () => {
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(() => {
      this.updateInlineMsg();
    }, DEBOUNCE_TIME);
  }

  private updateInlineMsg = () => {
    if (this.addedToBody && this.parentDom !== document.body && this.parentDom) {
      const parentRect = this.parentDom.getBoundingClientRect();
      // Lit의 this.style을 this.host.style로 변경
      this.host.style.display = 'block';
      this.host.style.visibility = 'hidden';
      this.host.style.position = 'absolute';
      this.host.style.left = '-9999px';
      this.host.style.top = '-9999px';

      requestAnimationFrame(() => {
        const inlineMsgRect = this.host.getBoundingClientRect();
        const location = this.setLocation(parentRect, inlineMsgRect);

        const leftSpace = parentRect.left - inlineMsgRect.width;
        const rightSpace = window.innerWidth - (parentRect.right + inlineMsgRect.width);
        const topSpace = parentRect.top - inlineMsgRect.height;
        const bottomSpace = window.innerHeight - (parentRect.bottom + inlineMsgRect.height);

        let inlineMsgLocation = { top: 0, left: 0 };
        let replace = this.position;

        if (this.position === 'left') {
            replace = leftSpace < 0 && rightSpace > 0 ? 'right' : this.position;
        } else if (this.position === 'right') {
            replace = rightSpace < 0 && leftSpace > 0 ? 'left' : this.position;
        } else if (this.position === 'top') {
            replace = topSpace < 0 && bottomSpace > 0 ? 'bottom' : this.position;
        } else if (this.position === 'bottom') {
            replace = bottomSpace < 0 && topSpace > 0 ? 'top' : this.position;
        }

        inlineMsgLocation = location[replace];
        this.host.style.top = `${inlineMsgLocation.top}px`;
        this.host.style.left = `${inlineMsgLocation.left}px`;

        this.adjustForScreenBounds(inlineMsgRect);
        this.host.style.visibility = 'visible';
      });
    }
  }

  private adjustForScreenBounds = (inlineMsgRect: DOMRect): boolean => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;

    const currentLeft = parseFloat(this.host.style.left);
    const currentTop = parseFloat(this.host.style.top);

    if (currentLeft < window.scrollX) {
      this.host.style.left = `${window.scrollX}px`;
      adjusted = true;
    } else if (currentLeft + inlineMsgRect.width > window.scrollX + viewportWidth) {
      this.host.style.left = `${window.scrollX + viewportWidth - inlineMsgRect.width}px`;
      adjusted = true;
    }

    if (currentTop < window.scrollY) {
      this.host.style.top = `${window.scrollY}px`;
      adjusted = true;
    } else if (currentTop + inlineMsgRect.height > window.scrollY + viewportHeight) {
      this.host.style.top = `${window.scrollY + viewportHeight - inlineMsgRect.height}px`;
      adjusted = true;
    }

    return adjusted;
  }

  // --- Event Handlers ---
  // Lit의 .bind(this) 대신 화살표 함수를 사용하여 this 컨텍스트 유지
  private handleOutsideClick = (event: MouseEvent) => {
    // Lit의 `this.contains`를 `this.host.contains`로 변경
    const isInMsg = this.host.contains(event.target as Node);
    const isParent = this.parentDom?.contains(event.target as Node);

    if (this.trigger === 'click' && !isInMsg && !isParent) {
      this.open = false;
    }
  };

  private parentClick = (event: MouseEvent) => {
    event.preventDefault();
    this.open = !this.open;
  }

  private parentFocusOut = (event: FocusEvent) => {
    event.preventDefault();
    if (!this.open) {
      this.open = true;
    }
  }

  private parentFocus = (event: FocusEvent) => {
    event.preventDefault();
    if (this.open) {
      this.open = false;
    }
  }

  private setLocation = (parentRect: DOMRect, inlineMsgRect: DOMRect) => {
    const style = window.getComputedStyle(this.host);
    const paddingTop = parseFloat(style.paddingTop) || 0;

    return {
      'top': {
        top: window.scrollY + parentRect.top - inlineMsgRect.height - paddingTop,
        left: window.scrollX + parentRect.left + (parentRect.width - inlineMsgRect.width) / 2,
      },
      'bottom': {
        top: window.scrollY + parentRect.bottom,
        left: window.scrollX + parentRect.left + (parentRect.width - inlineMsgRect.width) / 2,
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

  private clickAction = (e: MouseEvent) => {
    e.preventDefault();
    // Stencil의 @Event를 사용하여 이벤트 발생
    this.btnClick.emit(e);
  }

  render() {
    return (
      <div class={{
          'inline-massage-container': true,
          [this.variant]: true,
          [this.position]: true
        }}>
        {this.showIcon && (
          <sy-icon size="xlarge" class="messege-icon" innerHTML={this.iconType}></sy-icon>
        )}
        <div class="inline-group">
          <span class="inline-message">{this.message}</span>
          {this.btnLabel && this.btnLabel.trim().length > 0 && (
            <div class="inline-message-button-area">
              <sy-button class="inline-message-action" onClick={this.clickAction} size="small">
                {this.btnLabel.trim()}
              </sy-button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
