import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$3 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syModalCss = "@charset \"UTF-8\";.sc-sy-modal:root .modal-wrapper.sc-sy-modal,.sc-sy-modal-h .modal-wrapper.sc-sy-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;justify-content:center;align-items:center;pointer-events:none;z-index:var(--z-index-modal)}.sc-sy-modal:root .modal-wrapper.mask.sc-sy-modal,.sc-sy-modal-h .modal-wrapper.mask.sc-sy-modal{background:var(--backdrop-background);pointer-events:auto}.sc-sy-modal:root .modal-wrapper--open.sc-sy-modal,.sc-sy-modal-h .modal-wrapper--open.sc-sy-modal{display:flex}.sc-sy-modal:root .modal-container.sc-sy-modal,.sc-sy-modal-h .modal-container.sc-sy-modal{display:flex;flex-direction:column;background:var(--modal-content-background-enabled);border-radius:var(--border-radius-small);overflow:hidden;box-shadow:var(--box-shadow);position:absolute;min-width:200px;pointer-events:auto;cursor:auto;opacity:0}.sc-sy-modal:root .modal-container.hidden.sc-sy-modal,.sc-sy-modal-h .modal-container.hidden.sc-sy-modal{display:none}.sc-sy-modal:root .modal-header.sc-sy-modal,.sc-sy-modal-h .modal-header.sc-sy-modal{height:var(--header-medium);box-sizing:border-box;padding:0 var(--spacing-small);border-bottom:1px solid var(--modal-header-border-enabled);background:var(--modal-header-background-enabled);display:flex;align-items:center;justify-content:space-between}.sc-sy-modal:root .modal-header.sc-sy-modal .header-title.sc-sy-modal,.sc-sy-modal-h .modal-header.sc-sy-modal .header-title.sc-sy-modal{font-family:\"Roboto\";font-size:16px;font-weight:500;line-height:24px;letter-spacing:0.15px;display:inline-flex;width:-webkit-fill-available}.sc-sy-modal:root .modal-header.sc-sy-modal .header-button-container.sc-sy-modal,.sc-sy-modal-h .modal-header.sc-sy-modal .header-button-container.sc-sy-modal{display:flex;color:var(--modal-header-icon-enabled)}.sc-sy-modal:root .modal-header.sc-sy-modal .header-button-container.sc-sy-modal:hover,.sc-sy-modal-h .modal-header.sc-sy-modal .header-button-container.sc-sy-modal:hover{color:var(--modal-header-icon-hover)}.sc-sy-modal:root .modal-header.draggable.sc-sy-modal,.sc-sy-modal-h .modal-header.draggable.sc-sy-modal{cursor:move}.sc-sy-modal:root .modal-body.sc-sy-modal,.sc-sy-modal-h .modal-body.sc-sy-modal{padding:var(--spacing-small);width:auto;white-space:normal}.sc-sy-modal:root .modal-footer.sc-sy-modal,.sc-sy-modal-h .modal-footer.sc-sy-modal{height:var(--header-medium);padding:0 var(--spacing-small);background:var(--modal-footer-background-enabled);box-sizing:border-box;border-top:1px solid var(--modal-footer-border-enabled);display:flex;align-items:center}.sc-sy-modal:root .modal-footer.hidden.sc-sy-modal,.sc-sy-modal-h .modal-footer.hidden.sc-sy-modal{display:none}.sc-sy-modal:root .footer-button-container.sc-sy-modal,.sc-sy-modal-h .footer-button-container.sc-sy-modal{display:flex;gap:var(--spacing-2xsmall);width:100%;justify-content:flex-end;box-sizing:border-box}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.sc-sy-modal{position:absolute;z-index:10}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.bottom-right.sc-sy-modal{position:absolute;z-index:10;right:0;bottom:0;width:15px;height:15px;cursor:se-resize}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.bottom-left.sc-sy-modal{position:absolute;z-index:10;left:0;bottom:0;width:15px;height:15px;cursor:sw-resize}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.top-right.sc-sy-modal{position:absolute;z-index:10;right:0;top:0;width:15px;height:15px;cursor:ne-resize}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.top-left.sc-sy-modal{position:absolute;z-index:10;left:0;top:0;width:15px;height:15px;cursor:nw-resize}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.top.sc-sy-modal{left:15px;top:0;width:calc(100% - 30px);height:8px;cursor:n-resize}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.bottom.sc-sy-modal{left:15px;bottom:0;width:calc(100% - 30px);height:8px;cursor:s-resize}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.left.sc-sy-modal{left:0;top:15px;width:8px;height:calc(100% - 30px);cursor:w-resize}sy-modal[variant=modal].sc-sy-modal-h .resize-handle.right.sc-sy-modal{right:0;top:15px;width:8px;height:calc(100% - 30px);cursor:e-resize}sy-modal[variant=modal].sc-sy-modal-h .modal-container.sc-sy-modal{display:flex;flex-direction:column}sy-modal[variant=modal].sc-sy-modal-h .modal-header.sc-sy-modal{flex-shrink:0}sy-modal[variant=modal].sc-sy-modal-h .modal-body.sc-sy-modal{flex:1 1 auto;overflow:auto;min-height:50px}sy-modal[variant=modal].sc-sy-modal-h .modal-footer.sc-sy-modal{flex-shrink:0}.modal-wrapper--open.sc-sy-modal{opacity:1}.modal-wrapper--open.sc-sy-modal .modal-container.sc-sy-modal{opacity:1}";

const SyModal$1 = /*@__PURE__*/ proxyCustomElement(class SyModal extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.closed = createEvent(this, "closed");
    }
    get host() { return this; }
    // Props
    cancelText = '';
    closable = false;
    enableModalMaximize = false;
    hideFooter = false;
    maskClosable = false;
    okText = '';
    open = false;
    width = 0;
    /** Custom height in pixels (`modal` variant only). 0 = auto. */
    height = 0;
    top = '-1';
    left = '-1';
    variant = 'dialog';
    /** Fires when the modal closes. `detail.event` distinguishes ok / cancel / close. */
    closed;
    // State
    maximized = false;
    isCustomHeader = false;
    isCustomFooter = false;
    modalWidth = '';
    // Private properties
    dragging = false;
    offsetX = 0;
    offsetY = 0;
    startX = 0;
    startY = 0;
    startWidth = 0;
    startHeight = 0;
    startLeft = 0;
    startTop = 0;
    resizeHandle = null;
    addedToBody = false;
    originalParent = null;
    originalNextSibling = null;
    scrollsize = 15;
    minWidth = 100;
    minHeight = 1;
    connectedCallback() {
        document.addEventListener('keydown', this.handleKeydown);
    }
    componentWillLoad() {
        this.cancelText = fnAssignPropFromAlias(this.host, 'cancel-text') ?? this.cancelText;
        this.enableModalMaximize = fnAssignPropFromAlias(this.host, 'enable-modal-maximize') ?? this.enableModalMaximize;
        this.hideFooter = fnAssignPropFromAlias(this.host, 'hide-footer') ?? this.hideFooter;
        this.maskClosable = fnAssignPropFromAlias(this.host, 'mask-closable') ?? this.maskClosable;
        this.okText = fnAssignPropFromAlias(this.host, 'ok-text') ?? this.okText;
        if (this.top === undefined) {
            this.top = '-1';
        }
        if (this.left === undefined) {
            this.left = '-1';
        }
        // Don't check slots here - wait for after render
    }
    componentDidLoad() {
        // Set up MutationObserver to watch for slot changes
        this.setupSlotObserver();
        // Initial check after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.updateSlotContents();
        }, 10);
    }
    slotObserver = null;
    setupSlotObserver() {
        if (typeof window !== 'undefined' && this.host) {
            this.slotObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        this.updateSlotContents();
                    }
                });
            });
            this.slotObserver.observe(this.host, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['slot']
            });
        }
    }
    updateSlotContents() {
        this.isCustomFooter = this.hasSlotContents('footer');
        this.isCustomHeader = this.hasSlotContents('header');
    }
    handleOpenChange() {
        if (this.open) {
            this.setOpen();
        }
        else {
            this.removeModal();
        }
    }
    handleWidthChange() {
        this.modalWidth = this.width > 0 ? `${this.width}px` : 'auto';
    }
    handleHeightChange() {
        if (this.variant !== 'modal')
            return;
        const container = this.host.querySelector('.modal-container');
        if (!container)
            return;
        container.style.height = this.height > 0 ? `${this.height}px` : 'auto';
    }
    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeydown);
        this.removeModal();
        // Clean up MutationObserver
        if (this.slotObserver) {
            this.slotObserver.disconnect();
            this.slotObserver = null;
        }
    }
    // Public methods
    async setOpen() {
        if (!this.open) {
            this.open = true;
        }
        this.appendToRoot();
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            this.setModalPosition();
            // Re-check slot contents when modal opens
            this.updateSlotContents();
        }, 0);
    }
    async setClose(value) {
        this.closeModal('close', value);
    }
    async setCancel(value) {
        this.closeModal('cancel', value);
    }
    async setOk(value) {
        this.closeModal('ok', value);
    }
    async setMaximum() {
        if (this.variant === 'modal' && this.enableModalMaximize) {
            this.maximized = !this.maximized;
            const modalContainer = this.host.querySelector('.modal-container');
            if (modalContainer) {
                if (this.maximized) {
                    // Save original position and size
                    this.startLeft = modalContainer.offsetLeft;
                    this.startTop = modalContainer.offsetTop;
                    this.startWidth = modalContainer.offsetWidth;
                    // Set maximized state
                    modalContainer.style.left = '0';
                    modalContainer.style.top = '0';
                    this.modalWidth = '100%';
                    modalContainer.style.height = '100%';
                }
                else {
                    // Restore original size and position
                    modalContainer.style.left = `${this.startLeft}px`;
                    modalContainer.style.top = `${this.startTop}px`;
                    this.modalWidth = `${this.startWidth}px`;
                    modalContainer.style.height = 'auto';
                }
            }
        }
    }
    appendToRoot = () => {
        if (!this.addedToBody) {
            this.originalParent = this.host.parentNode;
            this.originalNextSibling = this.host.nextSibling;
            document.body.appendChild(this.host);
            this.addedToBody = true;
            const hasHeaderText = this.hasSlotContents('header');
            this.isCustomHeader = hasHeaderText;
            const hasFooterText = this.hasSlotContents('footer');
            this.isCustomFooter = hasFooterText;
        }
    };
    setModalPosition() {
        const modalContainer = this.host.querySelector('.modal-container');
        if (!modalContainer)
            return;
        const modalWidth = modalContainer.offsetWidth;
        const modalHeight = modalContainer.offsetHeight;
        const topValue = this.parsePosition(this.top);
        const leftValue = this.parsePosition(this.left);
        if (leftValue !== -1 && topValue !== -1) {
            modalContainer.style.left = `${leftValue}px`;
            modalContainer.style.top = `${topValue}px`;
        }
        else {
            const left = Math.max(0, (window.innerWidth - modalWidth) / 2);
            const top = Math.max(0, (window.innerHeight - modalHeight) / 2);
            modalContainer.style.left = `${left}px`;
            modalContainer.style.top = `${top}px`;
        }
    }
    parsePosition(value) {
        if (value === undefined || value === 'undefined' || value === '' || value === null) {
            return -1;
        }
        const numValue = Number(value);
        return isNaN(numValue) ? -1 : numValue;
    }
    removeModal = () => {
        if (this.host.isConnected && this.addedToBody) {
            try {
                this.open = false;
                if (this.originalParent?.isConnected) {
                    this.originalParent.insertBefore(this.host, this.originalNextSibling?.parentNode === this.originalParent ? this.originalNextSibling : null);
                }
                else {
                    document.body.removeChild(this.host);
                }
                this.addedToBody = false;
            }
            catch (err) {
                // console.log({err});
            }
        }
    };
    handleKeydown = (e) => {
        if (e.key === 'Escape') {
            if (this.closable) {
                this.closeModal('close');
            }
        }
    };
    handleWrapperClick = (e) => {
        if (this.variant === 'modal' && this.resizeHandle) {
            this.resizeHandle = null;
            return;
        }
        if (this.maskClosable) {
            const modalContainer = this.host.querySelector('.modal-container');
            if (modalContainer && modalContainer.contains(e.target)) {
                return;
            }
            e.preventDefault();
            this.closeModal('close');
        }
    };
    handleMaximized = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setMaximum();
    };
    handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal('close');
    };
    handleCancel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal('cancel');
    };
    handleOk = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal('ok');
    };
    closeModal(eventName, value) {
        this.setEvent(eventName, value);
        this.removeModal();
    }
    setEvent(eventName, value) {
        const modalContainer = this.host.querySelector('.modal-container');
        let position = { top: '0', left: '0' };
        if (modalContainer) {
            position = {
                top: modalContainer.style.top || '0',
                left: modalContainer.style.left || '0'
            };
        }
        this.closed.emit({
            event: eventName,
            value: value ?? '',
            maximized: this.maximized,
            position,
        });
    }
    onMouseDown = (event) => {
        event.preventDefault();
        if (this.variant === 'modal' && !this.maximized) {
            const modalContainer = this.host.querySelector('.modal-container');
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.offsetX = modalContainer.offsetLeft;
            this.offsetY = modalContainer.offsetTop;
            this.dragging = true;
            window.addEventListener('mousemove', this.onMouseMove);
            window.addEventListener('mouseup', this.onMouseUp);
        }
    };
    onMouseMove = (event) => {
        if (this.dragging) {
            const modalContainer = this.host.querySelector('.modal-container');
            const left = this.offsetX + (event.clientX - this.startX);
            const top = this.offsetY + (event.clientY - this.startY);
            const maxLeft = window.innerWidth - modalContainer.offsetWidth;
            const maxTop = window.innerHeight - modalContainer.offsetHeight;
            const offsetLeft = Math.max(0, Math.min(maxLeft, left));
            const offsetTop = Math.max(0, Math.min(maxTop, top));
            const isOverflow = this.hasOverflow(modalContainer);
            modalContainer.style.left = `${isOverflow.height ? Math.max(0, offsetLeft - this.scrollsize) : offsetLeft}px`;
            modalContainer.style.top = `${isOverflow.width ? Math.max(0, offsetTop - this.scrollsize) : offsetTop}px`;
        }
    };
    hasOverflow(_element) {
        const isWidthOverflow = document.body.scrollWidth > window.innerWidth;
        const isHeightOverflow = document.body.scrollHeight > window.innerHeight;
        return { width: isWidthOverflow, height: isHeightOverflow };
    }
    onMouseUp = () => {
        this.dragging = false;
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    };
    onResizeStart = (event) => {
        if (this.variant !== 'modal' || (this.variant === 'modal' && this.maximized))
            return;
        const target = event.target;
        if (!target.classList.contains('resize-handle')) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.startX = event.clientX;
        this.startY = event.clientY;
        const modalContainer = this.host.querySelector('.modal-container');
        this.startWidth = modalContainer.offsetWidth;
        this.startHeight = modalContainer.offsetHeight;
        this.startLeft = modalContainer.offsetLeft;
        this.startTop = modalContainer.offsetTop;
        this.resizeHandle = target.classList;
        window.addEventListener('mousemove', this.onResize);
        window.addEventListener('mouseup', this.onResizeEnd);
    };
    onResize = (event) => {
        if (this.resizeHandle === null)
            return;
        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;
        const modalContainer = this.host.querySelector('.modal-container');
        let newWidth = this.startWidth;
        let newHeight = this.startHeight;
        let newLeft = this.startLeft;
        let newTop = this.startTop;
        if (this.resizeHandle.contains('bottom-right')) {
            newWidth = this.startWidth + dx;
            newHeight = this.startHeight + dy;
        }
        else if (this.resizeHandle.contains('bottom-left')) {
            newWidth = this.startWidth - dx;
            newHeight = this.startHeight + dy;
            newLeft = this.startLeft + dx;
        }
        else if (this.resizeHandle.contains('top-right')) {
            newWidth = this.startWidth + dx;
            newHeight = this.startHeight - dy;
            newTop = this.startTop + dy;
        }
        else if (this.resizeHandle.contains('top-left')) {
            newWidth = this.startWidth - dx;
            newHeight = this.startHeight - dy;
            newLeft = this.startLeft + dx;
            newTop = this.startTop + dy;
        }
        else if (this.resizeHandle.contains('top')) {
            newHeight = this.startHeight - dy;
            newTop = this.startTop + dy;
        }
        else if (this.resizeHandle.contains('bottom')) {
            newHeight = this.startHeight + dy;
        }
        else if (this.resizeHandle.contains('left')) {
            newWidth = this.startWidth - dx;
            newLeft = this.startLeft + dx;
        }
        else if (this.resizeHandle.contains('right')) {
            newWidth = this.startWidth + dx;
        }
        const finalWidth = Math.max(newWidth, this.minWidth);
        const finalHeight = Math.max(newHeight, this.minHeight);
        if (finalWidth !== newWidth) {
            if (this.resizeHandle.contains('left') || this.resizeHandle.contains('top-left') || this.resizeHandle.contains('bottom-left')) {
                newLeft = this.startLeft - (finalWidth - this.startWidth);
            }
        }
        if (finalHeight !== newHeight) {
            if (this.resizeHandle.contains('top') || this.resizeHandle.contains('top-left') || this.resizeHandle.contains('top-right')) {
                newTop = this.startTop - (finalHeight - this.startHeight);
            }
        }
        modalContainer.style.width = `${finalWidth}px`;
        modalContainer.style.height = `${finalHeight}px`;
        modalContainer.style.left = `${newLeft}px`;
        modalContainer.style.top = `${newTop}px`;
    };
    onResizeEnd = () => {
        window.removeEventListener('mousemove', this.onResize);
        window.removeEventListener('mouseup', this.onResizeEnd);
    };
    hasSlotContents(slot) {
        // For Light DOM, check if there are elements with slot attribute
        const slottedElements = this.host.querySelectorAll(`[slot="${slot}"]`);
        if (slottedElements.length === 0) {
            // console.log(`Slot "${slot}" is empty`);
            return false;
        }
        // Check if any slotted element has meaningful content
        const hasContent = Array.from(slottedElements).some(element => {
            // Skip empty elements
            if (!element.textContent?.trim() && element.children.length === 0) {
                return false;
            }
            // Check if element has children with actual content (recursive)
            const hasChildrenWithContent = Array.from(element.children).some(child => {
                // Recursively check nested children
                if (child.children.length > 0) {
                    return Array.from(child.children).some(grandChild => grandChild.textContent?.trim() !== '' || grandChild.children.length > 0);
                }
                return child.textContent?.trim() !== '';
            });
            // Check if element itself has meaningful text content
            const hasText = element.textContent?.trim() !== '';
            // Check if element has meaningful attributes (excluding slot attribute)
            const meaningfulAttrs = Array.from(element.attributes).filter(attr => attr.name !== 'slot' && attr.value.trim() !== '');
            const result = hasChildrenWithContent || hasText || meaningfulAttrs.length > 0;
            return result;
        });
        return hasContent;
    }
    render() {
        const maximizeIcon = this.maximized ?
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M256 120C256 106.7 245.3 96 232 96C218.7 96 208 106.7 208 120L208 208L120 208C106.7 208 96 218.7 96 232C96 245.3 106.7 256 120 256L232 256C245.3 256 256 245.3 256 232L256 120zM120 384C106.7 384 96 394.7 96 408C96 421.3 106.7 432 120 432L208 432L208 520C208 533.3 218.7 544 232 544C245.3 544 256 533.3 256 520L256 408C256 394.7 245.3 384 232 384L120 384zM432 120C432 106.7 421.3 96 408 96C394.7 96 384 106.7 384 120L384 232C384 245.3 394.7 256 408 256L520 256C533.3 256 544 245.3 544 232C544 218.7 533.3 208 520 208L432 208L432 120zM408 384C394.7 384 384 394.7 384 408L384 520C384 533.3 394.7 544 408 544C421.3 544 432 533.3 432 520L432 432L520 432C533.3 432 544 421.3 544 408C544 394.7 533.3 384 520 384L408 384z"/></svg>' :
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z"/></svg>';
        const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg>';
        return (h("div", { key: 'fa051e841a24b71d804fc06b4d62a9e1b8787ee1', class: {
                'modal-wrapper': true,
                'modal-wrapper--open': this.open,
                'modal-wrapper--maximize': this.maximized && this.variant === 'modal',
                'mask': true,
            }, onClick: this.handleWrapperClick }, h("div", { key: '738a29808a7b27a573d94516e8b93fc522047407', class: "modal-container", style: { width: this.modalWidth }, onClick: (e) => e.stopPropagation() }, h("div", { key: '4ead24eb86064189f1762c0f4f5d4b2e3cca8a04', class: {
                'modal-header': true,
                'draggable': this.variant === 'modal',
            }, onMouseDown: this.onMouseDown }, h("div", { key: 'cdda00adb66706a6700d0027399a95b5507c5ff3', class: "header-title" }, h("slot", { key: 'aae0c8677bb5ba8e071877c76766e8e8dcdf1db4', name: "header" }), !this.isCustomHeader && 'Modal'), h("div", { key: 'eb7ef4e1e49c0c4ea1943ffe99ff606a03a4e8e7', class: "header-button-container" }, this.variant === 'modal' && this.enableModalMaximize ? (h("sy-icon", { size: "large", onClick: this.handleMaximized, svgMarkup: maximizeIcon })) : null, this.closable ? (h("sy-icon", { size: "large", onClick: this.handleClose, svgMarkup: closeIcon })) : null)), h("div", { key: '79f20661be06b76d6bfa1ef547d7894bd1bcb30a', class: "modal-body" }, h("slot", { key: '145b8f904e2fe065a89b04134f9c7a111ce9ab43', name: "body" })), h("div", { key: '07a9c96aa1ec2d7b5c0c8413d4a55b995ae676c7', class: {
                'modal-footer': true,
                'hidden': this.hideFooter,
            } }, h("slot", { key: '7cfaadb76fbe26e5fb170658c5f637f20fa58890', name: "footer" }), !this.isCustomFooter ? (h("div", { class: "footer-button-container" }, h("sy-button", { size: "medium", onClick: this.handleCancel }, this.cancelText || 'Cancel'), h("sy-button", { size: "medium", variant: "primary", onClick: this.handleOk }, this.okText || 'Ok'))) : null), this.variant === 'modal' ? (h("div", null, h("div", { class: "resize-handle bottom-right", onMouseDown: this.onResizeStart }), h("div", { class: "resize-handle bottom-left", onMouseDown: this.onResizeStart }), h("div", { class: "resize-handle top-right", onMouseDown: this.onResizeStart }), h("div", { class: "resize-handle top-left", onMouseDown: this.onResizeStart }), h("div", { class: "resize-handle top", onMouseDown: this.onResizeStart }), h("div", { class: "resize-handle bottom", onMouseDown: this.onResizeStart }), h("div", { class: "resize-handle left", onMouseDown: this.onResizeStart }), h("div", { class: "resize-handle right", onMouseDown: this.onResizeStart }))) : null)));
    }
    static get watchers() { return {
        "open": ["handleOpenChange"],
        "width": ["handleWidthChange"],
        "height": ["handleHeightChange"]
    }; }
    static get style() { return syModalCss; }
}, [262, "sy-modal", {
        "cancelText": [1025, "canceltext"],
        "closable": [4],
        "enableModalMaximize": [1028, "enablemodalmaximize"],
        "hideFooter": [1028, "hidefooter"],
        "maskClosable": [1028, "maskclosable"],
        "okText": [1025, "oktext"],
        "open": [1028],
        "width": [2],
        "height": [2],
        "top": [1],
        "left": [1],
        "variant": [1],
        "maximized": [32],
        "isCustomHeader": [32],
        "isCustomFooter": [32],
        "modalWidth": [32],
        "setOpen": [64],
        "setClose": [64],
        "setCancel": [64],
        "setOk": [64],
        "setMaximum": [64]
    }, undefined, {
        "open": ["handleOpenChange"],
        "width": ["handleWidthChange"],
        "height": ["handleHeightChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-modal", "sy-button", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-modal":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyModal$1);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyModal = SyModal$1;
const defineCustomElement = defineCustomElement$1;

export { SyModal, defineCustomElement };
