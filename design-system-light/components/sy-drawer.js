import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias, a as fnHasSlotContentByName } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syDrawerCss = "@charset \"UTF-8\";.sc-sy-drawer-h{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:var(--z-index-drawer);pointer-events:none}[parentid].sc-sy-drawer-h{position:absolute}[open].sc-sy-drawer-h{display:block}.drawer-wrapper.sc-sy-drawer{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.drawer-mask.sc-sy-drawer{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--drawer-backdrop-background-enabled);pointer-events:all;display:none}.drawer-container.sc-sy-drawer{position:absolute;transition:transform var(--transition-fast) ease;pointer-events:all;display:flex;flex-direction:column}.drawer-container.sc-sy-drawer .drawer-header.sc-sy-drawer,.drawer-container.sc-sy-drawer .drawer-body.sc-sy-drawer,.drawer-container.sc-sy-drawer .drawer-footer.sc-sy-drawer{padding:var(--spacing-small)}.drawer-container.sc-sy-drawer .drawer-header.sc-sy-drawer{display:flex;align-items:center;border-bottom:var(--border-small) var(--drawer-header-border-enabled);background-color:var(--drawer-header-background-enabled);height:var(--header-medium);box-sizing:border-box;gap:var(--spacing-3xsmall);justify-content:space-between;font-family:\"Roboto\";font-size:16px;font-weight:500;line-height:24px;letter-spacing:0.15px}.drawer-container.sc-sy-drawer .drawer-body.sc-sy-drawer{flex:1;overflow:auto;background-color:var(--drawer-content-background-enabled)}.drawer-container.sc-sy-drawer .drawer-footer.sc-sy-drawer{background-color:var(--drawer-footer-background-enabled);border-top:var(--border-small) var(--drawer-header-border-enabled);display:flex;justify-content:flex-end;height:var(--header-medium);box-sizing:border-box;align-items:center}[open].sc-sy-drawer-h .drawer-mask.sc-sy-drawer{display:block;background:rgba(0, 0, 0, 0.5)}.drawer-container.right.sc-sy-drawer{transform:translateX(100%)}.drawer-container.left.sc-sy-drawer{transform:translateX(-100%)}.drawer-container.top.sc-sy-drawer{transform:translateY(-100%)}.drawer-container.bottom.sc-sy-drawer{transform:translateY(100%)}[open].sc-sy-drawer-h .drawer-container.sc-sy-drawer{transform:translate(0, 0)}.drawer-container.left.sc-sy-drawer{box-shadow:2px 0px 8px var(--border-default)}.drawer-container.right.sc-sy-drawer{box-shadow:-2px 0px 8px var(--border-default)}.drawer-container.top.sc-sy-drawer{box-shadow:0px 2px 8px var(--border-default)}.drawer-container.bottom.sc-sy-drawer{box-shadow:0px -2px 8px var(--border-default)}.drawer-container.left.small.sc-sy-drawer,.drawer-container.right.small.sc-sy-drawer{width:150px;height:100%}.drawer-container.top.small.sc-sy-drawer,.drawer-container.bottom.small.sc-sy-drawer{height:150px;width:100%}.drawer-container.left.large.sc-sy-drawer,.drawer-container.right.large.sc-sy-drawer{width:500px;height:100%}.drawer-container.top.large.sc-sy-drawer,.drawer-container.bottom.large.sc-sy-drawer{height:500px;width:100%}.drawer-container.left.medium.sc-sy-drawer,.drawer-container.right.medium.sc-sy-drawer{width:300px;height:100%}.drawer-container.top.medium.sc-sy-drawer,.drawer-container.bottom.medium.sc-sy-drawer{height:300px;width:100%}.drawer-container.right.sc-sy-drawer{right:0}.drawer-container.left.sc-sy-drawer{left:0}.drawer-container.top.sc-sy-drawer{top:0}.drawer-container.bottom.sc-sy-drawer{bottom:0}.drawer-header-button-container.sc-sy-drawer{display:flex;align-items:center}.drawer-header-button-container.sc-sy-drawer sy-icon.sc-sy-drawer{color:var(--drawer-header-icon-enabled);cursor:pointer}@keyframes sy-drawer-pulse{0%,100%{transform:translate(0, 0)}25%{transform:translate(-4px, 0)}50%{transform:translate(4px, 0)}75%{transform:translate(-4px, 0)}}.drawer-container.drawer--pulse.sc-sy-drawer{animation:sy-drawer-pulse 250ms ease-in-out}";

const SyDrawer$1 = /*@__PURE__*/ proxyCustomElement(class SyDrawer extends H {
    get host() { return this; }
    // --- Public Properties (code API; spec names accepted as aliases below) ---
    maskless = false;
    preventClose = false;
    closable = false;
    open = false;
    customSize = 100;
    position = 'right';
    size = 'medium';
    /** When true, clicking the backdrop closes the drawer. Spec: `maskClosable`. */
    maskClosable = true;
    /** When true, drawer closes on browser history navigation. Spec default: true. */
    closeOnNavigation = true;
    /** ID of a parent element that should contain this drawer instead of document.body.
     *  When set, `position: absolute` is used so the drawer is scoped to that region.
     *  When empty (default), the drawer uses `position: fixed` and mounts on document.body. */
    parentId = '';
    opened;
    closed;
    // Tracks where the drawer was relocated to so disconnectedCallback can clean up
    // correctly regardless of whether we landed in body or in a scoped parent.
    mountedParent = null;
    popstateHandler;
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.opened = createEvent(this, "opened");
        this.closed = createEvent(this, "closed");
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    connectedCallback() {
        document.addEventListener('click', this.handleOutsideClick, true);
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick, true);
        if (this.popstateHandler) {
            window.removeEventListener('popstate', this.popstateHandler);
            this.popstateHandler = undefined;
        }
        if (this.mountedParent && this.mountedParent.contains(this.host)) {
            this.mountedParent.removeChild(this.host);
        }
        this.mountedParent = null;
    }
    componentWillLoad() {
        // Legacy + spec aliases resolved here so both attribute names work on the host.
        this.preventClose = fnAssignPropFromAlias(this.host, 'prevent-close') ?? this.preventClose;
        this.customSize = fnAssignPropFromAlias(this.host, 'custom-size') ?? this.customSize;
        this.maskClosable = fnAssignPropFromAlias(this.host, 'mask-closable', 'maskClosable') ?? this.maskClosable;
        this.closeOnNavigation = fnAssignPropFromAlias(this.host, 'close-on-navigation', 'closeOnNavigation') ?? this.closeOnNavigation;
        const placement = fnAssignPropFromAlias(this.host, 'placement');
        if (placement)
            this.position = placement;
        const openedAttr = fnAssignPropFromAlias(this.host, 'opened');
        if (openedAttr !== null && openedAttr !== undefined)
            this.open = openedAttr;
        // Accept both camelCase `parentId` and kebab-case `parent-id` attribute spellings
        // in addition to the primary all-lowercase `parentid`.
        const parent = fnAssignPropFromAlias(this.host, 'parent-id', 'parentId');
        if (parent)
            this.parentId = parent;
        if (this.closeOnNavigation) {
            this.popstateHandler = () => {
                if (this.open)
                    this.open = false;
            };
            window.addEventListener('popstate', this.popstateHandler);
        }
    }
    componentDidLoad() {
        // When `open=true` is set via attribute at mount, @Watch('open') does NOT fire for the
        // initial value — Stencil only dispatches watch callbacks for subsequent prop changes.
        // Without this, the host element stays inside its original parent, and `position:fixed`
        // resolves against any transformed ancestor so the drawer only covers that area.
        if (this.open) {
            this.mountToTarget();
            this.opened.emit();
        }
    }
    handleOpenChange(newValue) {
        if (newValue) {
            this.mountToTarget();
            this.opened.emit();
        }
        else {
            this.host.removeAttribute('open');
            this.closed.emit();
        }
    }
    handleParentIdChange() {
        // If the scoping target changes while open, relocate the host. Otherwise wait
        // until the next open to mount into the new target.
        if (this.open)
            this.mountToTarget();
    }
    handleDocumentKeydown(e) {
        if (!this.open)
            return;
        if (e.key === 'Escape') {
            if (this.preventClose) {
                this.pulse();
            }
            else {
                this.open = false;
            }
        }
    }
    /** Resolve the mounting target based on parentId, moving the host there if needed. */
    mountToTarget() {
        const target = this.resolveMountTarget();
        if (this.mountedParent === target && target.contains(this.host))
            return;
        // If the host is currently mounted somewhere else, leave it there — appendChild
        // will move it. We just need to make sure our bookkeeping stays accurate.
        target.appendChild(this.host);
        this.mountedParent = target;
        // When scoped to a non-body parent, ensure that parent provides a positioning
        // context for our `position: absolute` host.
        if (target !== document.body) {
            const computed = window.getComputedStyle(target);
            if (computed.position === 'static') {
                target.style.position = 'relative';
            }
        }
    }
    /** `parentid` → matching element, else `document.body`. Falls back to body on miss. */
    resolveMountTarget() {
        if (this.parentId) {
            const el = document.getElementById(this.parentId);
            if (el)
                return el;
            console.warn(`sy-drawer: parentid="${this.parentId}" did not match any element; falling back to document.body.`);
        }
        return document.body;
    }
    pulse() {
        const container = this.host.querySelector('.drawer-container');
        if (!container)
            return;
        container.classList.remove('drawer--pulse');
        container.classList.add('drawer--pulse');
    }
    handleOutsideClick(event) {
        if (!this.open)
            return;
        if (this.preventClose || !this.maskClosable)
            return;
        const container = this.host.querySelector('.drawer-container');
        const path = event.composedPath();
        if (container && !path.includes(container)) {
            this.open = false;
        }
    }
    handleMaskClick() {
        if (this.preventClose) {
            this.pulse();
            return;
        }
        if (!this.maskClosable)
            return;
        this.open = false;
    }
    handleCloseButtonClick() {
        if (this.preventClose) {
            this.pulse();
            return;
        }
        this.open = false;
    }
    getCustomSizeStyles() {
        if (this.size !== 'custom')
            return {};
        switch (this.position) {
            case 'left':
            case 'right': return { width: `${this.customSize}px` };
            case 'top':
            case 'bottom': return { height: `${this.customSize}px` };
            default: return {};
        }
    }
    render() {
        const hasHeader = fnHasSlotContentByName(this.host, 'header');
        const hasFooter = fnHasSlotContentByName(this.host, 'footer');
        const containerClasses = {
            'drawer-container': true,
            [this.position]: true,
            [this.size]: this.size !== 'custom',
        };
        return (h("div", { key: '8b50e4771bf460f5839cf5d22c8d729d68e01085', class: "drawer-wrapper", role: "dialog", "aria-modal": "true", "aria-hidden": this.open ? 'false' : 'true' }, !this.maskless && (h("div", { key: 'be1d81a4eec28c611d1075d534d447f219cd9516', class: "drawer-mask", onClick: () => this.handleMaskClick() })), h("div", { key: '6891cd711d9f47eeb4db3f58df4b458cbf406c0a', class: containerClasses, style: this.getCustomSizeStyles() }, (this.closable || hasHeader) && (h("div", { key: 'd39398fd5e5eed871b8158591d034170057baa99', class: "drawer-header" }, h("div", { key: '722f8d9e8d3cf85ae36a56270031667bc870f5c5', class: "drawer-header-content" }, h("slot", { key: '11344c744c955995596707bf680fa52c774da7e0', name: "header" })), this.closable && (h("div", { key: '2be3eb751de1adf3d33044d526dd1f6b84d886c8', class: "drawer-header-button-container" }, h("sy-icon", { key: '1f29602f4f0e129563839f5aead9044f5a8ed652', selectable: true, size: "large", "aria-label": "Close drawer", onClick: () => this.handleCloseButtonClick() }, h("svg", { key: '921a7f6c67081faa672aa7039e2216e16cb60582', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '5c6a0742fad8f68bd744440c8490001eeda1c120', fill: "currentColor", d: "M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z" }))))))), h("div", { key: '90b78e6331e394e82c3b2395f6f41afd60876889', class: "drawer-body" }, h("slot", { key: '8cc73662a26c8a9b837cc1ff44a85b1e164634b3', name: "body" })), hasFooter && (h("div", { key: 'fb4e4379a72ab6beb27a9fa12a58cf6934755f66', class: "drawer-footer" }, h("slot", { key: '779019af0699b4a28ab88d8a6f7fba40a38d5266', name: "footer" }))))));
    }
    static get watchers() { return {
        "open": ["handleOpenChange"],
        "parentId": ["handleParentIdChange"]
    }; }
    static get style() { return syDrawerCss; }
}, [262, "sy-drawer", {
        "maskless": [516],
        "preventClose": [1540, "preventclose"],
        "closable": [516],
        "open": [1540],
        "customSize": [1538, "customsize"],
        "position": [1025],
        "size": [1025],
        "maskClosable": [1028, "mask-closable"],
        "closeOnNavigation": [1028, "close-on-navigation"],
        "parentId": [1537, "parentid"]
    }, [[4, "keydown", "handleDocumentKeydown"]], {
        "open": ["handleOpenChange"],
        "parentId": ["handleParentIdChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-drawer", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-drawer":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyDrawer$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyDrawer = SyDrawer$1;
const defineCustomElement = defineCustomElement$1;

export { SyDrawer, defineCustomElement };
