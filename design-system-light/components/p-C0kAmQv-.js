import { p as proxyCustomElement, H, c as createEvent, h, a as Host } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syModelessCss = ".sc-sy-modeless-h{display:none;position:absolute;border:var(--border-small) var(--modeless-container-border-enabled);background:var(--modeless-content-background-enabled);min-width:180px;min-height:44px;box-shadow:var(--box-shadow);resize:none;overflow:hidden;z-index:var(--z-index-modeless)}[open].sc-sy-modeless-h{display:flex;flex-direction:column}.header.sc-sy-modeless{display:flex;height:var(--header-medium);min-height:var(--header-medium);justify-content:space-between;align-items:center;box-sizing:border-box;background-color:var(--modeless-header-background-enabled);padding:var(--spacing-xsmall) var(--spacing-small);color:var(--modeless-header-text-enabled)}.header.sc-sy-modeless .title.sc-sy-modeless{min-width:70px;overflow:hidden;text-overflow:ellipsis}.header.sc-sy-modeless sy-icon.sc-sy-modeless{justify-content:center;align-items:center}[draggable].sc-sy-modeless-h .header.sc-sy-modeless{cursor:move}.title.sc-sy-modeless{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-items:center;font-family:\"Roboto\";font-size:16px;font-weight:500;line-height:24px;letter-spacing:0.15px}.title.sc-sy-modeless slot.sc-sy-modeless{overflow:hidden;text-overflow:ellipsis}.header-icons.sc-sy-modeless{display:flex;gap:var(--spacing-xsmall)}.header-icons.sc-sy-modeless sy-icon.sc-sy-modeless{color:var(--modeless-header-icon-enabled);fill:var(--modeless-header-icon-enabled)}.header-icons.sc-sy-modeless sy-icon.sc-sy-modeless:hover{color:var(--modeless-header-icon-hover);fill:var(--modeless-header-icon-hover)}.header-icons.sc-sy-modeless sy-icon.sc-sy-modeless:active{color:var(--modeless-header-icon-active);fill:var(--modeless-header-icon-active)}.body.sc-sy-modeless{background:var(--modeless-content-background-enabled);color:var(--modeless-content-text-enabled);padding:var(--spacing-small);border-top:var(--border-small) var(--modeless-content-border-enabled);height:-webkit-fill-available;overflow:auto;display:block}.body.minimum.sc-sy-modeless{display:none}.resize-handle.sc-sy-modeless{position:absolute;background:transparent}.resize-handle.bottom-right.sc-sy-modeless{width:10px;height:10px;right:0;bottom:0;cursor:se-resize}.resize-handle.bottom-left.sc-sy-modeless{width:var(--spacing-xsmall);height:var(--spacing-xsmall);left:0;bottom:0;cursor:sw-resize}.resize-handle.top-right.sc-sy-modeless{width:var(--spacing-xsmall);height:var(--spacing-xsmall);right:0;top:0;cursor:ne-resize}.resize-handle.top-left.sc-sy-modeless{width:var(--spacing-xsmall);height:var(--spacing-xsmall);left:0;top:0;cursor:nw-resize}.resize-handle.top.sc-sy-modeless{height:var(--spacing-xsmall);left:0;right:0;top:0;cursor:n-resize}.resize-handle.bottom.sc-sy-modeless{height:var(--spacing-xsmall);left:0;right:0;bottom:0;cursor:s-resize}.resize-handle.left.sc-sy-modeless{width:var(--spacing-xsmall);top:0;bottom:0;left:0;cursor:w-resize}.resize-handle.right.sc-sy-modeless{width:var(--spacing-xsmall);top:0;bottom:0;right:0;cursor:e-resize}sy-modeless[maximum][maximizable].sc-sy-modeless-h{top:0px !important;left:0px !important;width:100% !important;height:100% !important;box-sizing:border-box}[minimum].sc-sy-modeless-h{position:fixed !important}sy-modeless[minimum].sc-sy-modeless{position:fixed !important}sy-modeless.sc-sy-modeless-h{opacity:1}@keyframes animation{0%{opacity:0}100%{opacity:1}}";

const DEFAULT_MIN_WIDTH = 1;
const DEFAULT_MIN_HEIGHT = 1;
const SyModeless = /*@__PURE__*/ proxyCustomElement(class SyModeless extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.closed = createEvent(this, "closed");
        this.statusChanged = createEvent(this, "statusChanged");
        this.positionChanged = createEvent(this, "positionChanged");
    }
    get host() { return this; }
    // --- Public Properties ---
    open = false;
    isdraggable = false;
    resizable = false;
    closable = false;
    minimizable = false;
    maximizable = false;
    edge = false;
    maximum = false;
    minimum = false;
    top = undefined;
    left = undefined;
    width = 200;
    height = 150;
    minWidth = DEFAULT_MIN_WIDTH;
    minHeight = DEFAULT_MIN_HEIGHT;
    // --- Events ---
    closed;
    statusChanged;
    positionChanged;
    // --- Internal State ---
    status = 'restore';
    isActive = false;
    position = { top: 0, left: 0, width: 200, height: 150 };
    startX = 0;
    startY = 0;
    startWidth = 0;
    startHeight = 0;
    startTop = 0;
    startLeft = 0;
    addedToBody = false;
    isDragging = false;
    isResizing = false;
    prevPosition = null;
    resizeHandle = null;
    resizeObserver;
    // --- Public Methods ---
    async setOpen() {
        this.open = true;
    }
    async setClose() {
        this.open = false;
    }
    async setMaximum() {
        this.maximum = true;
    }
    async setRestore() {
        this.maximum = false;
        this.minimum = false;
    }
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
    handleOpenChange(isOpen) {
        if (isOpen) {
            this.appendToRoot();
        }
        else {
            this.closeWindow();
        }
    }
    handleStatusChange() {
        if (this.maximum) {
            this.handleMaximum();
        }
        else if (this.minimum) {
            this.handleMinimum();
        }
        else if (this.status === 'maximum' || this.status === 'minimum') {
            this.handleRestore();
        }
    }
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
    handleActivation = () => {
        if (this.isDragging || this.isResizing || this.isActive) {
            return;
        }
        this.host.parentElement?.appendChild(this.host);
        document.querySelectorAll('sy-modeless').forEach((el) => {
            if (el !== this.host) {
                el.setAttribute('is-active', 'false');
                el.removeAttribute('is-active');
            }
        });
        this.isActive = true;
        this.host.setAttribute('is-active', 'true');
    };
    onDragStart = (event) => {
        if (!this.isdraggable || this.status !== 'restore' || event.button !== 0) {
            return;
        }
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.startTop = this.position.top;
        this.startLeft = this.position.left;
        window.addEventListener('mousemove', this.handleDragMove);
        window.addEventListener('mouseup', this.handleDragEnd);
    };
    handleDragMove = (event) => {
        if (!this.isDragging) {
            const movedEnough = Math.abs(event.clientX - this.startX) > 5 ||
                Math.abs(event.clientY - this.startY) > 5;
            if (movedEnough) {
                this.isDragging = true;
            }
            else {
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
    handleDragEnd = () => {
        window.removeEventListener('mousemove', this.handleDragMove);
        window.removeEventListener('mouseup', this.handleDragEnd);
        if (this.isDragging) {
            this.setNewPosition();
        }
        this.isDragging = false;
    };
    onResizeStart = (event) => {
        if (!this.resizable || this.status !== 'restore' || event.button !== 0)
            return;
        const target = event.target;
        if (!target.classList.contains('resize-handle'))
            return;
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
    };
    onResize = (event) => {
        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;
        let newTop = this.startTop;
        let newLeft = this.startLeft;
        let newWidth = this.startWidth;
        let newHeight = this.startHeight;
        if (this.resizeHandle.contains('bottom-right')) {
            newWidth += dx;
            newHeight += dy;
        }
        else if (this.resizeHandle.contains('bottom-left')) {
            newWidth -= dx;
            newHeight += dy;
            newLeft += dx;
        }
        else if (this.resizeHandle.contains('top-right')) {
            newWidth += dx;
            newHeight -= dy;
            newTop += dy;
        }
        else if (this.resizeHandle.contains('top-left')) {
            newWidth -= dx;
            newHeight -= dy;
            newTop += dy;
            newLeft += dx;
        }
        else if (this.resizeHandle.contains('top')) {
            newHeight -= dy;
            newTop += dy;
        }
        else if (this.resizeHandle.contains('bottom')) {
            newHeight += dy;
        }
        else if (this.resizeHandle.contains('left')) {
            newWidth -= dx;
            newLeft += dx;
        }
        else if (this.resizeHandle.contains('right')) {
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
            if (newLeft < scrollX) {
                newWidth += newLeft - scrollX;
                newLeft = scrollX;
            }
            if (newTop < scrollY) {
                newHeight += newTop - scrollY;
                newTop = scrollY;
            }
            if (newLeft + newWidth > scrollX + viewportWidth) {
                newWidth = scrollX + viewportWidth - newLeft;
            }
            if (newTop + newHeight > scrollY + viewportHeight) {
                newHeight = scrollY + viewportHeight - newTop;
            }
        }
        this.position = { top: newTop, left: newLeft, width: newWidth, height: newHeight };
        this.updatePosition();
    };
    onResizeEnd = () => {
        window.removeEventListener('mousemove', this.onResize);
        window.removeEventListener('mouseup', this.onResizeEnd);
        if (this.isResizing) {
            this.setNewPosition();
        }
        this.isResizing = false;
    };
    onWindowResize() {
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
    appendToRoot() {
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
    setInitialPosition() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const width = Math.max(this.minWidth, this.width);
        const height = Math.max(this.minHeight, this.height);
        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;
        let top;
        let left;
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
            }
            else {
                top = (windowHeight - height) / 2;
                left = (windowWidth - width) / 2;
            }
        }
        else {
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
    _updateMinDimensions() {
        const header = this.host.querySelector('.header');
        const title = this.host.querySelector('.title');
        const headerIcons = this.host.querySelector('.header-icons');
        if (!header || !title || !headerIcons)
            return;
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
        if (needsUpdate)
            this.updatePosition();
    }
    handleMaximum() {
        if (!this.maximizable || this.status === 'maximum')
            return;
        this.prevPosition = { ...this.position };
        this.status = 'maximum';
        this.position = { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        this.host.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
        this.updatePosition();
        this.emitStatus();
    }
    handleMinimum() {
        if (!this.minimizable || this.status === 'minimum')
            return;
        this.prevPosition = { ...this.position };
        this.status = 'minimum';
        const header = this.host.querySelector('.header');
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
    handleRestore() {
        if (this.status === 'restore')
            return;
        this.status = 'restore';
        if (this.prevPosition) {
            this.position = { ...this.prevPosition };
        }
        else {
            this.setInitialPosition();
            return;
        }
        this.host.style.position = 'absolute';
        this.restoreBodyScroll();
        this.updatePosition();
        this.updateMinimizedPositions();
        this.emitStatus();
    }
    updateMinimizedPositions() {
        const minimizedModeless = Array.from(document.querySelectorAll('sy-modeless[minimum]'));
        let currentLeft = 0;
        const gap = 8;
        minimizedModeless.forEach(el => {
            const element = el;
            if (element.getAttribute('data-status') !== 'minimum')
                return;
            const header = element.querySelector('.header');
            const headerHeight = header?.offsetHeight || 40;
            element.style.left = `${currentLeft}px`;
            element.style.top = `${window.innerHeight - headerHeight - 8}px`;
            currentLeft += element.offsetWidth + gap;
        });
    }
    setNewPosition() {
        const rect = this.host.getBoundingClientRect();
        this.position = {
            width: rect.width,
            height: rect.height,
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
        };
        this.emitPosition();
    }
    updatePosition() {
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
    closeWindow() {
        this.closed.emit({ id: this.host.id || '' });
        if (this.status === 'maximum')
            this.restoreBodyScroll();
        this.addedToBody = false;
        this.open = false;
        setTimeout(() => this.updateMinimizedPositions(), 0);
    }
    isAnyModelessMaximized() {
        return !!document.querySelector('sy-modeless[maximum]');
    }
    restoreBodyScroll() {
        if (!this.isAnyModelessMaximized()) {
            document.body.style.overflow = '';
        }
    }
    emitStatus() {
        this.statusChanged.emit({
            id: this.host.id || '',
            status: this.status
        });
    }
    emitPosition() {
        this.positionChanged.emit({
            id: this.host.id || '',
            position: this.position
        });
    }
    _onMaximizeClick = () => { this.maximum = true; };
    _onMinimizeClick = () => { this.minimum = true; };
    _onRestoreClick = () => {
        this.maximum = false;
        this.minimum = false;
    };
    // --- Render Method ---
    render() {
        return (h(Host, { key: 'af9678319672f24f89f04889ebe2e7a3553e68fd' }, h("div", { key: 'b20f2cb1934f0a8dca9917d4f770cd7fecad3b72', class: "header", onMouseDown: this.onDragStart, hidden: !this.isdraggable }, h("div", { key: 'c7384e5a31957318c2f2dd8e496a90b72df2dab9', class: "title" }, h("slot", { key: 'dd362a6a997262be7d6fd0342e0181ccaa613bda', name: "title" })), h("div", { key: 'cb0f659d75bd749ddbcf5ff4a1b564a3eed048dd', class: "header-icons" }, h("slot", { key: '034ff7cf00e7af6ba1ab140c11b77676e9900587', name: "header" }), this.minimizable && this.status !== 'maximum' && (this.status === 'minimum' ? (h("sy-icon", { size: "large", selectable: true, onSelected: this._onRestoreClick }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z" })))) : (h("sy-icon", { size: "large", selectable: true, onSelected: this._onMinimizeClick }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { d: "M64 488C64 474.7 74.7 464 88 464L552 464C565.3 464 576 474.7 576 488C576 501.3 565.3 512 552 512L88 512C74.7 512 64 501.3 64 488z" }))))), this.maximizable && this.status !== 'minimum' && (this.status === 'maximum' ? (h("sy-icon", { size: "large", selectable: true, onSelected: this._onRestoreClick }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M256 120C256 106.7 245.3 96 232 96C218.7 96 208 106.7 208 120L208 208L120 208C106.7 208 96 218.7 96 232C96 245.3 106.7 256 120 256L232 256C245.3 256 256 245.3 256 232L256 120zM120 384C106.7 384 96 394.7 96 408C96 421.3 106.7 432 120 432L208 432L208 520C208 533.3 218.7 544 232 544C245.3 544 256 533.3 256 520L256 408C256 394.7 245.3 384 232 384L120 384zM432 120C432 106.7 421.3 96 408 96C394.7 96 384 106.7 384 120L384 232C384 245.3 394.7 256 408 256L520 256C533.3 256 544 245.3 544 232C544 218.7 533.3 208 520 208L432 208L432 120zM408 384C394.7 384 384 394.7 384 408L384 520C384 533.3 394.7 544 408 544C421.3 544 432 533.3 432 520L432 432L520 432C533.3 432 544 421.3 544 408C544 394.7 533.3 384 520 384L408 384z" })))) : (h("sy-icon", { size: "large", selectable: true, onSelected: this._onMaximizeClick }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z" }))))), this.closable && (h("sy-icon", { key: '930606cbab4de689e4f9d4f2b55ccd7d9e5baedf', size: "large", selectable: true, onSelected: this.closeWindow.bind(this) }, h("svg", { key: 'fbe9819b8bcb8ad1d357fd6bfaee3448b71874b9', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '51d51c9a84314303b822d2cf00ad74abc383bf6d', fill: "currentColor", d: "M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z" })))))), h("div", { key: 'a5150c985d3ce2346e974b7781b2a0d041be79d8', class: `body${this.status === 'minimum' ? ' minimum' : ''}` }, h("slot", { key: 'bec28a1d01d502c99b3f8967c65606749167948b', name: "content" })), this.resizable && (h(h.Fragment, null, h("div", { key: '2ffdd8a1842a9409d355f4aabd5311b362579450', class: "resize-handle top", onMouseDown: this.onResizeStart }), h("div", { key: '441a9a847292d8a9de2d8b6198d0b34a18ff1169', class: "resize-handle bottom", onMouseDown: this.onResizeStart }), h("div", { key: '31c9f00084427b63aad95259457208e06cd7de67', class: "resize-handle left", onMouseDown: this.onResizeStart }), h("div", { key: '3ab931ac8045deb23fccf9eb5e3787bb2808e5f8', class: "resize-handle right", onMouseDown: this.onResizeStart }), h("div", { key: 'c5aca4635e09e55e8c3cc6d4c5992efb0e1243dd', class: "resize-handle bottom-right", onMouseDown: this.onResizeStart }), h("div", { key: 'd16e691728ead03dec1a7ecaae13cfe3dd4e73cd', class: "resize-handle bottom-left", onMouseDown: this.onResizeStart }), h("div", { key: '8c0747971152ab8af79808c6f6358b1a503e7598', class: "resize-handle top-right", onMouseDown: this.onResizeStart }), h("div", { key: 'a17c9bade5e39aa37cff5625f798f399e33ce0fe', class: "resize-handle top-left", onMouseDown: this.onResizeStart })))));
    }
    static get watchers() { return {
        "open": ["handleOpenChange"],
        "maximum": ["handleStatusChange"],
        "minimum": ["handleStatusChange"],
        "width": ["handlePositionChange"],
        "height": ["handlePositionChange"],
        "top": ["handlePositionChange"],
        "left": ["handlePositionChange"]
    }; }
    static get style() { return syModelessCss; }
}, [262, "sy-modeless", {
        "open": [1540],
        "isdraggable": [4, "draggable"],
        "resizable": [4],
        "closable": [4],
        "minimizable": [4],
        "maximizable": [4],
        "edge": [4],
        "maximum": [516],
        "minimum": [516],
        "top": [2],
        "left": [2],
        "width": [2],
        "height": [2],
        "minWidth": [1026, "minwidth"],
        "minHeight": [1026, "minheight"],
        "status": [32],
        "isActive": [32],
        "position": [32],
        "setOpen": [64],
        "setClose": [64],
        "setMaximum": [64],
        "setRestore": [64],
        "setMinimum": [64]
    }, [[9, "resize", "onWindowResize"]], {
        "open": ["handleOpenChange"],
        "maximum": ["handleStatusChange"],
        "minimum": ["handleStatusChange"],
        "width": ["handlePositionChange"],
        "height": ["handlePositionChange"],
        "top": ["handlePositionChange"],
        "left": ["handlePositionChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-modeless", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-modeless":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyModeless);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyModeless as S, defineCustomElement as d };
