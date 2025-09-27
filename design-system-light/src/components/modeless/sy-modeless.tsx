import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface ModelessPositionModel {
  top: number;
  left: number;
  width: number;
  height: number;
}

const DEFAULT_MIN_WIDTH = 1;
const DEFAULT_MIN_HEIGHT = 1;


export interface HTMLSyModelessElement extends HTMLElement {
  open: boolean;
  draggable: boolean;
  resizable: boolean;
  closable: boolean;
  minimizable: boolean;
  maximizable: boolean;
  edge: boolean;
  maximum: boolean;
  minimum: boolean;
  top: number | undefined;
  left: number | undefined;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  setOpen: () => Promise<void>;
  setClose: () => Promise<void>;
  setMaximum: () => Promise<void>;
  setRestore: () => Promise<void>;
  setMinimum: () => Promise<void>;
  closed: EventEmitter<{ id: string }>;
  statusChanged: EventEmitter<{ id: string; status: string }>;
  positionChanged: EventEmitter<{ id: string; position: ModelessPositionModel }>;
}

@Component({
  tag: 'sy-modeless',
  styleUrl: 'sy-modeless.scss',
  shadow: false, // Using light DOM
  scoped: true
})
export class SyModeless {
  @Element() host: HTMLSyModelessElement;

  // --- Public Properties ---
  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop() draggable = false;
  @Prop() resizable = false;
  @Prop() closable = false;
  @Prop() minimizable = false;
  @Prop() maximizable = false;
  @Prop() edge = false;
  @Prop({ reflect: true }) maximum = false;
  @Prop({ reflect: true }) minimum = false;
  @Prop() top: number | undefined = undefined;
  @Prop() left: number | undefined = undefined;
  @Prop() width = 200;
  @Prop() height = 150;
  @Prop({ attribute: 'minWidth', mutable: true }) minWidth = DEFAULT_MIN_WIDTH;
  @Prop({ attribute: 'minHeight', mutable: true }) minHeight = DEFAULT_MIN_HEIGHT;

  // --- Events ---
  @Event() closed: EventEmitter<{ id: string }>;
  @Event() statusChanged: EventEmitter<{ id: string; status: string }>;
  @Event() positionChanged: EventEmitter<{ id: string; position: ModelessPositionModel }>;

  // --- Internal State ---
  @State() private status: 'maximum' | 'minimum' | 'restore' = 'restore';
  @State() private isActive = false;
  @State() private position: ModelessPositionModel = { top: 0, left: 0, width: 200, height: 150 };

  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private startTop = 0;
  private startLeft = 0;
  private addedToBody = false;
  private isDragging = false;
  private isResizing = false;
  private prevPosition: ModelessPositionModel | null = null;
  private resizeHandle: DOMTokenList | null = null;
  private resizeObserver: ResizeObserver;

  // --- Public Methods ---
  @Method()
  async setOpen() {
    this.open = true;
  }

  @Method()
  async setClose() {
    this.open = false;
  }

  @Method()
  async setMaximum() {
    this.maximum = true;
  }

  @Method()
  async setRestore() {
    this.maximum = false;
    this.minimum = false;
  }

  @Method()
  async setMinimum() {
    this.minimum = true;
  }

  // --- Lifecycle Methods ---
  disconnectedCallback() {
    window.removeEventListener('resize', this.onWindowResize);
    this.host.removeEventListener('mousedown', this.handleActivation);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  componentWillLoad() {
    this.minWidth = fnAssignPropFromAlias(this.host, 'min-width') ?? this.minWidth;
    this.minHeight = fnAssignPropFromAlias(this.host, 'min-height') ?? this.minHeight;

    if (this.open) {
      this.appendToRoot();
    }
  }

  componentDidLoad() {
    this.host.addEventListener('mousedown', this.handleActivation);
    this.resizeObserver = new ResizeObserver(() => {
      this._updateMinDimensions();
    });
    this.resizeObserver.observe(this.host);
  }

  @Watch('open')
  handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      this.appendToRoot();
    } else {
      this.closeWindow();
    }
  }

  @Watch('maximum')
  @Watch('minimum')
  handleStatusChange() {
    if (this.maximum) {
      this.handleMaximum();
    } else if (this.minimum) {
      this.handleMinimum();
    } else if (this.status === 'maximum' || this.status === 'minimum') {
      this.handleRestore();
    }
  }

  @Watch('width')
  @Watch('height')
  @Watch('top')
  @Watch('left')
  handlePositionChange() {
    if (this.status === 'restore') {
      let positionChanged = false;
      const newPosition = { ...this.position };

      if (this.width !== undefined && this.width !== this.position.width) {
        newPosition.width = this.width;
        positionChanged = true;
      }
      if (this.height !== undefined && this.height !== this.position.height) {
        newPosition.height = this.height;
        positionChanged = true;
      }
      if (this.top !== undefined && this.top !== this.position.top) {
        newPosition.top = this.top;
        positionChanged = true;
      }
      if (this.left !== undefined && this.left !== this.position.left) {
        newPosition.left = this.left;
        positionChanged = true;
      }

      if (positionChanged) {
        this.position = newPosition;
        this.updatePosition();
      }
    }
  }

  // --- Event Handlers ---
  private handleActivation = (): void => {
    if (this.isDragging || this.isResizing || this.isActive) {
      return;
    }
    
    this.host.parentElement?.appendChild(this.host);

    document.querySelectorAll('sy-modeless').forEach((el: HTMLElement) => {
      if (el !== this.host) {
        el.setAttribute('is-active', 'false');
        el.removeAttribute('is-active');
      }
    });

    this.isActive = true;
    this.host.setAttribute('is-active', 'true');
  }

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

  private handleDragMove = (event: MouseEvent): void => {
    if (!this.isDragging) {
      const movedEnough = Math.abs(event.clientX - this.startX) > 5 || 
                         Math.abs(event.clientY - this.startY) > 5;
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

    this.position = { ...this.position, top: newTop, left: newLeft };
    this.updatePosition();
  };

  private handleDragEnd = (): void => {
    window.removeEventListener('mousemove', this.handleDragMove);
    window.removeEventListener('mouseup', this.handleDragEnd);

    if (this.isDragging) {
      this.setNewPosition();
    }
    this.isDragging = false;
  };

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

  private onResize = (event: MouseEvent): void => {
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    let newTop = this.startTop;
    let newLeft = this.startLeft;
    let newWidth = this.startWidth;
    let newHeight = this.startHeight;

    if (this.resizeHandle.contains('bottom-right')) { 
      newWidth += dx; 
      newHeight += dy; 
    } else if (this.resizeHandle.contains('bottom-left')) { 
      newWidth -= dx; 
      newHeight += dy; 
      newLeft += dx; 
    } else if (this.resizeHandle.contains('top-right')) { 
      newWidth += dx; 
      newHeight -= dy; 
      newTop += dy; 
    } else if (this.resizeHandle.contains('top-left')) { 
      newWidth -= dx; 
      newHeight -= dy; 
      newTop += dy; 
      newLeft += dx; 
    } else if (this.resizeHandle.contains('top')) { 
      newHeight -= dy; 
      newTop += dy; 
    } else if (this.resizeHandle.contains('bottom')) { 
      newHeight += dy; 
    } else if (this.resizeHandle.contains('left')) { 
      newWidth -= dx; 
      newLeft += dx; 
    } else if (this.resizeHandle.contains('right')) { 
      newWidth += dx; 
    }

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

  private onResizeEnd = (): void => {
    window.removeEventListener('mousemove', this.onResize);
    window.removeEventListener('mouseup', this.onResizeEnd);
    if (this.isResizing) {
      this.setNewPosition();
    }
    this.isResizing = false;
  };

  @Listen('resize', { target: 'window' })
  private onWindowResize(): void {
    if (this.status === 'maximum') {
      this.position = { 
        ...this.position, 
        width: window.innerWidth, 
        height: window.innerHeight 
      };
      this.updatePosition();
    }
    this.updateMinimizedPositions();
  }

  // --- Private Methods ---
  private appendToRoot(): void {
    if (!this.addedToBody) {
      this.addedToBody = true;
      document.body.appendChild(this.host);
      this.host.style.position = 'absolute';
      this.setInitialPosition();
      setTimeout(() => {
        this._updateMinDimensions();
        this.handleActivation();
      }, 0);
    }
  }

  private setInitialPosition(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const width = Math.max(this.minWidth, this.width);
    const height = Math.max(this.minHeight, this.height);
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    let top: number;
    let left: number;

    if (this.top === undefined && this.left === undefined) {
      const activeModeless = document.querySelector('sy-modeless[is-active="true"]');
      if (activeModeless && activeModeless !== this.host) {
        const activeTop = parseFloat(activeModeless.getAttribute('data-top') || '0');
        const activeLeft = parseFloat(activeModeless.getAttribute('data-left') || '0');
        top = activeTop + 30 - scrollTop;
        left = activeLeft + 30 - scrollLeft;
        if (top + scrollTop + height > windowHeight + scrollTop || 
            left + scrollLeft + width > windowWidth + scrollLeft) {
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
    const header = this.host.querySelector<HTMLElement>('.header');
    const title = this.host.querySelector<HTMLElement>('.title');
    const headerIcons = this.host.querySelector<HTMLElement>('.header-icons');
    
    if (!header || !title || !headerIcons) return;
    
    const headerStyle = window.getComputedStyle(header);
    const paddingX = parseFloat(headerStyle.paddingLeft) + parseFloat(headerStyle.paddingRight);
    const calculatedMinWidth = title.scrollWidth + headerIcons.offsetWidth + paddingX + 20;
    
    this.minWidth = Math.max(DEFAULT_MIN_WIDTH, this.minWidth, calculatedMinWidth);
    this.minHeight = Math.max(DEFAULT_MIN_HEIGHT, this.minHeight, header.offsetHeight);

    let needsUpdate = false;
    if (this.position.width < this.minWidth) { 
      this.position.width = this.minWidth; 
      needsUpdate = true; 
    }
    if (this.position.height < this.minHeight) { 
      this.position.height = this.minHeight; 
      needsUpdate = true; 
    }
    if (needsUpdate) this.updatePosition();
  }

  private handleMaximum(): void {
    if (!this.maximizable || this.status === 'maximum') return;
    this.prevPosition = { ...this.position };
    this.status = 'maximum';
    this.position = { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    this.host.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    this.updatePosition();
    this.emitStatus();
  }

  private handleMinimum(): void {
    if (!this.minimizable || this.status === 'minimum') return;
    this.prevPosition = { ...this.position };
    this.status = 'minimum';
    const header = this.host.querySelector<HTMLElement>('.header');
    const headerHeight = header?.offsetHeight || 40;
    this.position = { 
      top: window.innerHeight - headerHeight - 8, 
      left: 0, 
      width: 200, 
      height: headerHeight 
    };
    this.host.style.position = 'fixed';
    this.updatePosition();
    setTimeout(() => this.updateMinimizedPositions(), 10);
    this.emitStatus();
  }

  private handleRestore(): void {
    if (this.status === 'restore') return;
    this.status = 'restore';
    if (this.prevPosition) {
      this.position = { ...this.prevPosition };
    } else { 
      this.setInitialPosition(); 
      return; 
    }
    this.host.style.position = 'absolute';
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
      const element = el as HTMLElement;
      if (element.getAttribute('data-status') !== 'minimum') return;
      
      const header = element.querySelector<HTMLElement>('.header');
      const headerHeight = header?.offsetHeight || 40;
      
      element.style.left = `${currentLeft}px`;
      element.style.top = `${window.innerHeight - headerHeight - 8}px`;
      currentLeft += element.offsetWidth + gap;
    });
  }

  private setNewPosition(): void {
    const rect = this.host.getBoundingClientRect();
    this.position = {
      width: rect.width,
      height: rect.height,
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
    this.emitPosition();
  }

  private updatePosition(): void {
    this.host.style.top = `${this.position.top}px`;
    this.host.style.left = `${this.position.left}px`;
    this.host.style.width = `${this.position.width}px`;
    this.host.style.height = `${this.position.height}px`;
    
    // Store position in data attributes for other components to access
    this.host.setAttribute('data-top', this.position.top.toString());
    this.host.setAttribute('data-left', this.position.left.toString());
    this.host.setAttribute('data-status', this.status);
    
    this.emitPosition();
  }
  
  private closeWindow(): void {
    this.closed.emit({ id: this.host.id || '' });
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
    this.statusChanged.emit({ 
      id: this.host.id || '', 
      status: this.status 
    });
  }
  
  private emitPosition(): void {
    this.positionChanged.emit({ 
      id: this.host.id || '', 
      position: this.position 
    });
  }

  private _onMaximizeClick = (): void => { this.maximum = true; }
  private _onMinimizeClick = (): void => { this.minimum = true; }
  private _onRestoreClick = (): void => { 
    this.maximum = false; 
    this.minimum = false; 
  }

  // --- Render Method ---
  render() {
    return (
      <Host>
        <div 
          class="header" 
          onMouseDown={this.onDragStart} 
          hidden={!this.draggable}
        >
          <div class="title">
            <slot name="title" />
          </div>
          <div class="header-icons">
            <slot name="header" />
            {this.minimizable && this.status !== 'maximum' && (
              this.status === 'minimum' ? (
                <sy-icon 
                  size="large" 
                  selectable 
                  onSelected={this._onRestoreClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="currentColor" d="M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z"/>
                  </svg>
                </sy-icon>
              ) : (
                <sy-icon 
                  size="large" 
                  selectable 
                  onSelected={this._onMinimizeClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M64 488C64 474.7 74.7 464 88 464L552 464C565.3 464 576 474.7 576 488C576 501.3 565.3 512 552 512L88 512C74.7 512 64 501.3 64 488z"/>
                  </svg>
                </sy-icon>
              )
            )}
            {this.maximizable && this.status !== 'minimum' && (
              this.status === 'maximum' ? (
                <sy-icon 
                  size="large" 
                  selectable 
                  onSelected={this._onRestoreClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="currentColor" d="M256 120C256 106.7 245.3 96 232 96C218.7 96 208 106.7 208 120L208 208L120 208C106.7 208 96 218.7 96 232C96 245.3 106.7 256 120 256L232 256C245.3 256 256 245.3 256 232L256 120zM120 384C106.7 384 96 394.7 96 408C96 421.3 106.7 432 120 432L208 432L208 520C208 533.3 218.7 544 232 544C245.3 544 256 533.3 256 520L256 408C256 394.7 245.3 384 232 384L120 384zM432 120C432 106.7 421.3 96 408 96C394.7 96 384 106.7 384 120L384 232C384 245.3 394.7 256 408 256L520 256C533.3 256 544 245.3 544 232C544 218.7 533.3 208 520 208L432 208L432 120zM408 384C394.7 384 384 394.7 384 408L384 520C384 533.3 394.7 544 408 544C421.3 544 432 533.3 432 520L432 432L520 432C533.3 432 544 421.3 544 408C544 394.7 533.3 384 520 384L408 384z"/>
                  </svg>
                </sy-icon>
              ) : (
                <sy-icon 
                  size="large" 
                  selectable 
                  onSelected={this._onMaximizeClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="currentColor" d="M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z"/>
                  </svg>
                </sy-icon>
              )
            )}
            {this.closable && (
              <sy-icon 
                size="large" 
                selectable 
                onSelected={this.closeWindow.bind(this)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/>
                </svg>
              </sy-icon>
            )}
          </div>
        </div>
        
        <div class={`body${this.status === 'minimum' ? ' minimum' : ''}`}>
          <slot name="content" />
        </div>

        {this.resizable && (
          <>
            <div class="resize-handle top" onMouseDown={this.onResizeStart}></div>
            <div class="resize-handle bottom" onMouseDown={this.onResizeStart}></div>
            <div class="resize-handle left" onMouseDown={this.onResizeStart}></div>
            <div class="resize-handle right" onMouseDown={this.onResizeStart}></div>
            <div class="resize-handle bottom-right" onMouseDown={this.onResizeStart}></div>
            <div class="resize-handle bottom-left" onMouseDown={this.onResizeStart}></div>
            <div class="resize-handle top-right" onMouseDown={this.onResizeStart}></div>
            <div class="resize-handle top-left" onMouseDown={this.onResizeStart}></div>
          </>
        )}
      </Host>
    );
  }
}