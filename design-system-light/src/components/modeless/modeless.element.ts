import { css, CSSResultGroup, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCss from "./styles/modeless.scss?inline";
import '../icon/icon.element';

interface ModelessPositionModel {
  top: number;
  left: number;
  width: number;
  height: number;
}

const DEFAULT_MIN_WIDTH = 1;
const DEFAULT_MIN_HEIGHT = 1;

@customElement('sy-modeless')
export class ModelessElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCss)};`;

  // --- Public Properties ---
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) draggable = false;
  @property({ type: Boolean }) resizable = false;
  @property({ type: Boolean }) closable = false;
  @property({ type: Boolean }) minimizable = false;
  @property({ type: Boolean }) maximizable = false;
  @property({ type: Boolean }) edge = false;
  @property({ type: Boolean, reflect: true }) maximum = false;
  @property({ type: Boolean, reflect: true }) minimum = false;
  @property({ type: Number }) top: number | undefined = undefined;
  @property({ type: Number }) left: number | undefined = undefined;
  @property({ type: Number }) width: number = 200;
  @property({ type: Number }) height: number = 150;
  @property({ type: Number }) minWidth: number = DEFAULT_MIN_WIDTH;
  @property({ type: Number }) minHeight: number = DEFAULT_MIN_HEIGHT;

  // --- Internal State ---
  @state() private status: 'maximum' | 'minimum' | 'restore' = 'restore';
  @state() private isActive = false;

  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private startTop = 0;
  private startLeft = 0;
  private addedToBody = false;

  private isDragging = false;
  private isResizing = false;
  
  private position: ModelessPositionModel = { top: 0, left: 0, width: 200, height: 150 };
  private prevPosition: ModelessPositionModel | null = null;
  private resizeHandle!: DOMTokenList;

  // --- Public Methods ---
  public setOpen(): void { this.open = true; }
  public setClose(): void { this.open = false; }
  public setMaximum(): void { this.maximum = true; }
  public setRestore(): void { this.maximum = false; this.minimum = false; }
  public setMinimum(): void { this.minimum = true; }

  // --- Lifecycle Methods ---
  constructor() {
    super();
    this.closeWindow = this.closeWindow.bind(this);
    // ✅ 컴포넌트 호스트(sy-modeless)에 mousedown 리스너를 추가하여 활성화를 처리합니다.
    // 이 방식은 자식 요소의 이벤트를 전혀 방해하지 않고 modeless 전체 영역에 적용됩니다.
    this.addEventListener('mousedown', this.handleActivation);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.onWindowResize);
    // ✅ 컴포넌트가 DOM에서 제거될 때 리스너도 함께 제거합니다.
    this.removeEventListener('mousedown', this.handleActivation);
  }

  async firstUpdated(): Promise<void> {
    await this.updateComplete;
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.appendToRoot();
      } else {
        this.closeWindow();
      }
    }
    
    if (changedProperties.has('maximum') || changedProperties.has('minimum')) {
      if (this.maximum) {
        this.handleMaximum();
      } else if (this.minimum) {
        this.handleMinimum();
      } else if (changedProperties.get('maximum') === true || changedProperties.get('minimum') === true) {
        // maximum 또는 minimum 상태에서 false로 돌아올 때 restore를 호출합니다.
        this.handleRestore();
      }
    }

    // 외부에서 width, height, top, left 프로퍼티를 직접 변경했을 때 반영합니다.
    if (this.status === 'restore') {
      let positionChanged = false;
      if (changedProperties.has('width') && this.width !== this.position.width) {
        this.position.width = this.width;
        positionChanged = true;
      }
      if (changedProperties.has('height') && this.height !== this.position.height) {
        this.position.height = this.height;
        positionChanged = true;
      }
      if (changedProperties.has('top') && this.top !== this.position.top) {
        this.position.top = this.top!;
        positionChanged = true;
      }
      if (changedProperties.has('left') && this.left !== this.position.left) {
        this.position.left = this.left!;
        positionChanged = true;
      }
      if (positionChanged) {
        this.updatePosition();
      }
    }
  }

  // --- Render Method ---
  render() {
    return html`
      <!-- ✅ DRAG: 드래그 핸들러는 오직 header에만 바인딩됩니다. -->
      <div class="header" @mousedown="${this.onDragStart}" ?hidden="${!this.draggable}">
        <div class="title"><slot name="title"></slot></div>
        <div class="header-icons">
          <slot name="header"></slot>
          ${this.minimizable && this.status !== 'maximum' ? this.status === 'minimum' ?
            html`<sy-icon size="large" selectable @selected="${this._onRestoreClick}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z"/></svg></sy-icon>` :
            html`<sy-icon size="large" selectable @selected="${this._onMinimizeClick}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M64 488C64 474.7 74.7 464 88 464L552 464C565.3 464 576 474.7 576 488C576 501.3 565.3 512 552 512L88 512C74.7 512 64 501.3 64 488z"/></svg></sy-icon>` : nothing}
          ${this.maximizable && this.status !== 'minimum' ? this.status === 'maximum' ?
            html`<sy-icon size="large" selectable @selected="${this._onRestoreClick}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M256 120C256 106.7 245.3 96 232 96C218.7 96 208 106.7 208 120L208 208L120 208C106.7 208 96 218.7 96 232C96 245.3 106.7 256 120 256L232 256C245.3 256 256 245.3 256 232L256 120zM120 384C106.7 384 96 394.7 96 408C96 421.3 106.7 432 120 432L208 432L208 520C208 533.3 218.7 544 232 544C245.3 544 256 533.3 256 520L256 408C256 394.7 245.3 384 232 384L120 384zM432 120C432 106.7 421.3 96 408 96C394.7 96 384 106.7 384 120L384 232C384 245.3 394.7 256 408 256L520 256C533.3 256 544 245.3 544 232C544 218.7 533.3 208 520 208L432 208L432 120zM408 384C394.7 384 384 394.7 384 408L384 520C384 533.3 394.7 544 408 544C421.3 544 432 533.3 432 520L432 432L520 432C533.3 432 544 421.3 544 408C544 394.7 533.3 384 520 384L408 384z"/></svg></sy-icon>` :
            html`<sy-icon size="large" selectable @selected="${this._onMaximizeClick}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z"/></svg></sy-icon>` : nothing}
          ${this.closable ? html`<sy-icon size="large" selectable @selected="${this.closeWindow}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg></sy-icon>` : nothing}
        </div>
      </div>
      
      <!-- ✅ CONTENT: content 슬롯을 감싸는 div에는 이벤트 리스너가 없습니다. -->
      <div class="${classMap({ body: true, minimum: this.status === 'minimum' })}">
        <slot name="content"></slot>
      </div>

      <!-- ✅ RESIZE: 리사이즈 핸들러는 오직 각 resize-handle 요소에만 바인딩됩니다. -->
      ${this.resizable ? html`
        <div class="resize-handle top" @mousedown="${this.onResizeStart}"></div>
        <div class="resize-handle bottom" @mousedown="${this.onResizeStart}"></div>
        <div class="resize-handle left" @mousedown="${this.onResizeStart}"></div>
        <div class="resize-handle right" @mousedown="${this.onResizeStart}"></div>
        <div class="resize-handle bottom-right" @mousedown="${this.onResizeStart}"></div>
        <div class="resize-handle bottom-left" @mousedown="${this.onResizeStart}"></div>
        <div class="resize-handle top-right" @mousedown="${this.onResizeStart}"></div>
        <div class="resize-handle top-left" @mousedown="${this.onResizeStart}"></div>
      ` : ''}
    `;
  }

  // --- Private Methods: Event Handlers ---

  /** Modeless가 클릭되었을 때 최상단으로 올리고 활성화 상태로 만듭니다. */
  private handleActivation = (): void => {
    if (this.isDragging || this.isResizing || this.isActive) {
      return;
    }
    
    this.parentElement?.appendChild(this);

    document.querySelectorAll('sy-modeless').forEach(el => {
        const modelessEl = el as ModelessElement;
        if (modelessEl !== this) {
            modelessEl.isActive = false;
            modelessEl.removeAttribute('is-active');
        }
    });

    this.isActive = true;
    this.setAttribute('is-active', 'true');
  }

  /** Header에서 mousedown 이벤트 발생 시 드래그를 '준비'합니다. */
  private onDragStart = (event: MouseEvent): void => {
    if (!this.draggable || this.status !== 'restore' || event.button !== 0) {
      return;
    }
    
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startTop = this.position.top;
    this.startLeft = this.position.left;

    window.addEventListener('mousemove', this.handleDragMove);
    window.addEventListener('mouseup', this.handleDragEnd);
  }

  /** 마우스가 실제로 움직이면 드래그를 '시작'하고 Modeless를 이동시킵니다. */
  private handleDragMove = (event: MouseEvent): void => {
    if (!this.isDragging) {
      const movedEnough = Math.abs(event.clientX - this.startX) > 5 || Math.abs(event.clientY - this.startY) > 5;
      if (movedEnough) {
          this.isDragging = true;
      } else {
          return;
      }
    }
    event.preventDefault();

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    let newTop = this.startTop + dy;
    let newLeft = this.startLeft + dx;

    if (this.edge) {
      const { innerWidth, innerHeight, scrollX, scrollY } = window;
      const { width: elementWidth, height: elementHeight } = this.position;
      newLeft = Math.max(scrollX, Math.min(newLeft, innerWidth + scrollX - elementWidth));
      newTop = Math.max(scrollY, Math.min(newTop, innerHeight + scrollY - elementHeight));
    }

    this.position.top = newTop;
    this.position.left = newLeft;
    this.updatePosition();
  };

  /** 마우스 버튼을 놓으면 드래그를 '종료'합니다. */
  private handleDragEnd = (): void => {
    window.removeEventListener('mousemove', this.handleDragMove);
    window.removeEventListener('mouseup', this.handleDragEnd);

    if (this.isDragging) {
      this.setNewPosition();
    }
    this.isDragging = false;
  };
  
  /** Resize Handle에서 mousedown 이벤트 발생 시 리사이즈를 '시작'합니다. */
  private onResizeStart = (event: MouseEvent): void => {
    if (!this.resizable || this.status !== 'restore' || event.button !== 0) return;
    
    const target = event.target as HTMLElement;
    if (!target.classList.contains('resize-handle')) return;

    event.preventDefault();
    event.stopPropagation();
    
    this.isResizing = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = this.position.width;
    this.startHeight = this.position.height;
    this.startTop = this.position.top;
    this.startLeft = this.position.left;
    this.resizeHandle = target.classList;

    window.addEventListener('mousemove', this.onResize);
    window.addEventListener('mouseup', this.onResizeEnd);
  }

  /** 마우스 움직임에 따라 Modeless의 크기를 조절합니다. */
  private onResize = (event: MouseEvent): void => {
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    let newTop = this.startTop;
    let newLeft = this.startLeft;
    let newWidth = this.startWidth;
    let newHeight = this.startHeight;

    if (this.resizeHandle.contains('bottom-right')) { newWidth += dx; newHeight += dy; } 
    else if (this.resizeHandle.contains('bottom-left')) { newWidth -= dx; newHeight += dy; newLeft += dx; } 
    else if (this.resizeHandle.contains('top-right')) { newWidth += dx; newHeight -= dy; newTop += dy; } 
    else if (this.resizeHandle.contains('top-left')) { newWidth -= dx; newHeight -= dy; newTop += dy; newLeft += dx; } 
    else if (this.resizeHandle.contains('top')) { newHeight -= dy; newTop += dy; } 
    else if (this.resizeHandle.contains('bottom')) { newHeight += dy; } 
    else if (this.resizeHandle.contains('left')) { newWidth -= dx; newLeft += dx; } 
    else if (this.resizeHandle.contains('right')) { newWidth += dx; }

    if (newWidth < this.minWidth) {
      if (this.resizeHandle.contains('left') || this.resizeHandle.contains('top-left')) {
        newLeft = this.startLeft + this.startWidth - this.minWidth;
      }
      newWidth = this.minWidth;
    }
    if (newHeight < this.minHeight) {
      if (this.resizeHandle.contains('top') || this.resizeHandle.contains('top-left') || this.resizeHandle.contains('top-right')) {
        newTop = this.startTop + this.startHeight - this.minHeight;
      }
      newHeight = this.minHeight;
    }

    if (this.edge) {
      const { scrollX, scrollY } = window;
      const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
      if (newLeft < scrollX) { newWidth += newLeft - scrollX; newLeft = scrollX; }
      if (newTop < scrollY) { newHeight += newTop - scrollY; newTop = scrollY; }
      if (newLeft + newWidth > scrollX + viewportWidth) { newWidth = scrollX + viewportWidth - newLeft; }
      if (newTop + newHeight > scrollY + viewportHeight) { newHeight = scrollY + viewportHeight - newTop; }
    }

    this.position = { top: newTop, left: newLeft, width: newWidth, height: newHeight };
    this.updatePosition();
  };

  /** 마우스 버튼을 놓으면 리사이즈를 '종료'합니다. */
  private onResizeEnd = (): void => {
    window.removeEventListener('mousemove', this.onResize);
    window.removeEventListener('mouseup', this.onResizeEnd);
    if (this.isResizing) {
      this.setNewPosition();
    }
    this.isResizing = false;
  };

  /** 창 크기가 변경될 때 최대화 상태 등을 업데이트합니다. */
  private onWindowResize = (): void => {
    if (this.status === 'maximum') {
      this.position.width = window.innerWidth;
      this.position.height = window.innerHeight;
      this.updatePosition();
    }
    this.updateMinimizedPositions();
  }

  // --- Private Methods: State & Position Management ---
  private appendToRoot(): void {
    if (!this.addedToBody) {
      this.addedToBody = true;
      document.body.appendChild(this);
      this.style.position = 'absolute';
      this.setInitialPosition();
      setTimeout(() => {
        this._updateMinDimensions();
        this.handleActivation();
      }, 0);
    }
  };

  private setInitialPosition(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const width = this.width !== undefined ? Math.max(this.minWidth, this.width) : this.minWidth;
    const height = this.height !== undefined ? Math.max(this.minHeight, this.height) : this.minHeight;
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    let top: number;
    let left: number;

    if (this.top === undefined && this.left === undefined) {
      const activeModeless = Array.from(document.querySelectorAll('sy-modeless[is-active="true"]') as NodeListOf<ModelessElement>)[0];
      if (activeModeless && activeModeless !== this) {
        const activeTop = parseFloat(activeModeless.style.top) || 0;
        const activeLeft = parseFloat(activeModeless.style.left) || 0;
        top = activeTop + 30 - scrollTop;
        left = activeLeft + 30 - scrollLeft;
        if (top + scrollTop + height > windowHeight + scrollTop || left + scrollLeft + width > windowWidth + scrollLeft) {
          top = 0;
          left = 0;
        }
      } else {
        top = (windowHeight - height) / 2;
        left = (windowWidth - width) / 2;
      }
    } else {
      top = this.top ?? 0;
      left = this.left ?? 0;
    }

    const finalTop = top + scrollTop;
    const finalLeft = left + scrollLeft;
    const constrainedTop = Math.max(scrollTop, Math.min(finalTop, windowHeight + scrollTop - height));
    const constrainedLeft = Math.max(scrollLeft, Math.min(finalLeft, windowWidth + scrollLeft - width));

    this.position = {
      top: constrainedTop,
      left: constrainedLeft,
      width: Math.min(width, windowWidth - (constrainedLeft - scrollLeft)),
      height: Math.min(height, windowHeight - (constrainedTop - scrollTop)),
    };

    this.updatePosition();
  }

  private _updateMinDimensions(): void {
    const header = this.shadowRoot?.querySelector<HTMLElement>('.header');
    const title = this.shadowRoot?.querySelector<HTMLElement>('.title');
    const headerIcons = this.shadowRoot?.querySelector<HTMLElement>('.header-icons');
    if (!header || !title || !headerIcons) return;
    
    const headerStyle = window.getComputedStyle(header);
    const paddingX = parseFloat(headerStyle.paddingLeft) + parseFloat(headerStyle.paddingRight);
    const calculatedMinWidth = title.scrollWidth + headerIcons.offsetWidth + paddingX + 20;
    this.minWidth = Math.max(DEFAULT_MIN_WIDTH, this.minWidth, calculatedMinWidth);
    this.minHeight = Math.max(DEFAULT_MIN_HEIGHT, this.minHeight, header.offsetHeight);

    let needsUpdate = false;
    if (this.position.width < this.minWidth) { this.position.width = this.minWidth; needsUpdate = true; }
    if (this.position.height < this.minHeight) { this.position.height = this.minHeight; needsUpdate = true; }
    if (needsUpdate) this.updatePosition();
  }

  private handleMaximum(): void {
    if (!this.maximizable || this.status === 'maximum') return;
    this.prevPosition = { ...this.position };
    this.status = 'maximum';
    this.position = { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    this.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    this.updatePosition();
    this.emitStatus();
  }

  private handleMinimum(): void {
    if (!this.minimizable || this.status === 'minimum') return;
    this.prevPosition = { ...this.position };
    this.status = 'minimum';
    const header = this.shadowRoot?.querySelector('.header') as HTMLElement;
    const headerHeight = header?.offsetHeight || 40;
    this.position = { top: window.innerHeight - headerHeight - 8, left: 0, width: 200, height: headerHeight };
    this.style.position = 'fixed';
    this.updatePosition();
    setTimeout(() => this.updateMinimizedPositions(), 10);
    this.emitStatus();
  }

  private handleRestore(): void {
    if (this.status === 'restore') return;
    this.status = 'restore';
    if (this.prevPosition) this.position = { ...this.prevPosition };
    else { this.setInitialPosition(); return; }
    this.style.position = 'absolute';
    this.restoreBodyScroll();
    this.updatePosition();
    this.updateMinimizedPositions();
    this.emitStatus();
  }
  
  private updateMinimizedPositions(): void {
    const minimizedModeless = Array.from(document.querySelectorAll('sy-modeless[minimum]'));
    let currentLeft = 0;
    const gap = 8;
    minimizedModeless.forEach(el => {
      const element = el as ModelessElement;
      if (element.status !== 'minimum') return;
      const headerHeight = (element.shadowRoot?.querySelector('.header') as HTMLElement)?.offsetHeight || 40;
      element.style.left = `${currentLeft}px`;
      element.style.top = `${window.innerHeight - headerHeight - 8}px`;
      currentLeft += element.offsetWidth + gap;
    });
  }

  private setNewPosition(): void {
    const rect = this.getBoundingClientRect();
    this.position = {
      width: rect.width,
      height: rect.height,
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
    this.emitPosition();
  }

  private updatePosition(): void {
    this.style.top = `${this.position.top}px`;
    this.style.left = `${this.position.left}px`;
    this.style.width = `${this.position.width}px`;
    this.style.height = `${this.position.height}px`;
    this.emitPosition();
  }
  
  private closeWindow(): void {
    this.dispatchEvent(new CustomEvent('closed', { detail: { id: this.id ?? '' }, bubbles: true, composed: true }));
    if (this.status === 'maximum') this.restoreBodyScroll();
    this.addedToBody = false;
    this.open = false;
    setTimeout(() => this.updateMinimizedPositions(), 0);
  }

  private isAnyModelessMaximized(): boolean {
    return !!document.querySelector('sy-modeless[maximum]');
  }

  private restoreBodyScroll(): void {
    if (!this.isAnyModelessMaximized()) {
      document.body.style.overflow = '';
    }
  }
  
  private emitStatus(): void {
    this.dispatchEvent(new CustomEvent('status', { detail: { id: this.id ?? '', status: this.status }, bubbles: true, composed: true }));
  }
  
  private emitPosition(): void {
    this.dispatchEvent(new CustomEvent('position', { detail: { id: this.id ?? '', position: this.position }, bubbles: true, composed: true }));
  }

  private _onMaximizeClick = (): void => { this.maximum = true; }
  private _onMinimizeClick = (): void => { this.minimum = true; }
  private _onRestoreClick = (): void => { this.maximum = false; this.minimum = false; }
}