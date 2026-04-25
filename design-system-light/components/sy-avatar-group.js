import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$3 } from './p-Do5G1xew.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syAvatarGroupCss = "@charset \"UTF-8\";.sc-sy-avatar-group-h{display:block}.sy-avatar-group.sc-sy-avatar-group{display:flex;align-items:center;flex-wrap:nowrap}.avatar-group-inner.sc-sy-avatar-group{display:flex;align-items:center;flex-wrap:nowrap}.avatar-container.sc-sy-avatar-group{display:flex;align-items:center}.remain-avatars-list.sc-sy-avatar-group{display:flex;align-items:center;position:relative}.more-avatars.sc-sy-avatar-group{display:inline-flex;align-items:center;justify-content:center;background-color:var(--avatar-lightgray-background-enabled);color:var(--avatar-lightgray-text-enabled);border:var(--border-small, 1px solid) var(--avatar-lightgray-border-enabled);border-radius:50%;text-align:center;font-size:var(--avatar-font-size);box-sizing:border-box;user-select:none}.more-avatars.sc-sy-avatar-group:focus-visible{outline:var(--border-small) var(--focus-outline);outline-offset:2px}[size=small].sc-sy-avatar-group-h .more-avatars.sc-sy-avatar-group{width:var(--component-small);height:var(--component-small);line-height:var(--component-small)}[size=medium].sc-sy-avatar-group-h .more-avatars.sc-sy-avatar-group{width:var(--component-medium);height:var(--component-medium);line-height:var(--component-medium)}[size=large].sc-sy-avatar-group-h .more-avatars.sc-sy-avatar-group{width:var(--component-large);height:var(--component-large);line-height:var(--component-large)}[variant=stack].sc-sy-avatar-group-h .avatar-group-inner.sc-sy-avatar-group{flex-wrap:nowrap}[variant=stack].sc-sy-avatar-group-h .avatar-container.sc-sy-avatar-group:first-child{margin-left:0 !important}[variant=stack][size=small].sc-sy-avatar-group-h .avatar-container.sc-sy-avatar-group:not(:first-child){margin-left:-4px}[variant=stack][size=small].sc-sy-avatar-group-h .remain-avatars-list.sc-sy-avatar-group{margin-left:-4px}[variant=stack][size=medium].sc-sy-avatar-group-h .avatar-container.sc-sy-avatar-group:not(:first-child){margin-left:-6px}[variant=stack][size=medium].sc-sy-avatar-group-h .remain-avatars-list.sc-sy-avatar-group{margin-left:-6px}[variant=stack][size=large].sc-sy-avatar-group-h .avatar-container.sc-sy-avatar-group:not(:first-child){margin-left:-8px}[variant=stack][size=large].sc-sy-avatar-group-h .remain-avatars-list.sc-sy-avatar-group{margin-left:-8px}[variant=grid][size=small].sc-sy-avatar-group-h .avatar-group-inner.sc-sy-avatar-group{gap:var(--spacing-4xsmall)}[variant=grid][size=small].sc-sy-avatar-group-h .avatar-container.sc-sy-avatar-group,[variant=grid][size=small].sc-sy-avatar-group-h .remain-avatars-list.sc-sy-avatar-group{margin-left:0}[variant=grid][size=medium].sc-sy-avatar-group-h .avatar-group-inner.sc-sy-avatar-group{gap:var(--spacing-3xsmall)}[variant=grid][size=medium].sc-sy-avatar-group-h .avatar-container.sc-sy-avatar-group,[variant=grid][size=medium].sc-sy-avatar-group-h .remain-avatars-list.sc-sy-avatar-group{margin-left:0}[variant=grid][size=large].sc-sy-avatar-group-h .avatar-group-inner.sc-sy-avatar-group{gap:var(--spacing-2xsmall)}[variant=grid][size=large].sc-sy-avatar-group-h .avatar-container.sc-sy-avatar-group,[variant=grid][size=large].sc-sy-avatar-group-h .remain-avatars-list.sc-sy-avatar-group{margin-left:0}[clickable].sc-sy-avatar-group-h .more-avatars.sc-sy-avatar-group{cursor:pointer}[clickable].sc-sy-avatar-group-h .more-avatars.sc-sy-avatar-group:hover{background-color:var(--avatar-lightgray-background-hover, var(--avatar-lightgray-background-enabled))}.more-avatars-container.sc-sy-avatar-group{display:none;width:140px;background:var(--menu-dropdownmenu-background-enabled);border-radius:var(--border-radius-small);box-shadow:var(--box-shadow)}.more-avatars-container-inner.sc-sy-avatar-group{display:flex;align-items:center;padding:var(--spacing-3xsmall) var(--spacing-xsmall);gap:var(--spacing-3xsmall)}.more-avatars-container-inner.sc-sy-avatar-group:hover{background-color:var(--menu-menuitem-default-background-hover, rgba(0, 0, 0, 0.04))}.more-avatars-container-inner.sc-sy-avatar-group:focus-visible{outline:var(--border-small) var(--focus-outline);outline-offset:-2px}.more-avatars-container-inner.sc-sy-avatar-group span.sc-sy-avatar-group{display:flex;align-items:center}";

const SyAvatarGroup$1 = /*@__PURE__*/ proxyCustomElement(class SyAvatarGroup extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    // --- Public Properties (spec: props) ---
    clickable = false;
    maxCount = Infinity;
    size = 'medium';
    variant = 'stack';
    // --- Private State ---
    isHovering = false;
    hoverItemIndex = null;
    // Cache the original children's avatar data so we can re-render them without
    // disturbing the user's slot markup.
    originalAvatarData = [];
    overflowContainer = null;
    // --- Events (spec: api.events.selected) ---
    selected;
    // Bound listeners (stable references for add/removeEventListener).
    boundHandleOutsideClick = () => this.handleOutsideClick();
    handleOverflowMouseEnter = () => { this.isHovering = true; };
    handleOverflowMouseLeave = () => {
        this.isHovering = false;
        this.handleLeaveMoreAvatar();
    };
    // --- Lifecycle ---
    connectedCallback() {
        document.addEventListener('click', this.boundHandleOutsideClick, true);
    }
    componentWillLoad() {
        this.maxCount = fnAssignPropFromAlias(this.host, 'max-count') ?? this.maxCount;
        this.collectOriginalAvatarData();
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.boundHandleOutsideClick, true);
        if (this.overflowContainer && this.overflowContainer.parentElement === document.body) {
            try {
                document.body.removeChild(this.overflowContainer);
            }
            catch (_e) { /* noop */ }
        }
    }
    // --- Helpers ---
    collectOriginalAvatarData() {
        const avatarElements = Array.from(this.host.children).filter(child => child.tagName.toLowerCase() === 'sy-avatar');
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
    requestUpdate() {
        this.collectOriginalAvatarData();
        // Trigger a re-render by touching a state field.
        this.hoverItemIndex = this.hoverItemIndex;
    }
    getAvatarDisplayText(avatar) {
        if (avatar.letter)
            return avatar.letter;
        if (avatar.text)
            return avatar.text;
        if (avatar.tooltipContent)
            return avatar.tooltipContent;
        if (avatar.image) {
            const filename = String(avatar.image).split('/').pop() || '';
            return filename.replace(/\.[^/.]+$/, '') || 'Image';
        }
        if (avatar.icon)
            return 'Icon';
        return 'Avatar';
    }
    // --- Interaction ---
    handleOverflowItemClick(avatarData) {
        if (!this.clickable)
            return;
        const eventDetail = {
            letter: avatarData.letter || '',
            text: avatarData.text || '',
            icon: avatarData.icon || '',
            image: avatarData.image || '',
        };
        this.handleLeaveMoreAvatar();
        this.selected.emit(eventDetail);
    }
    handleOverflowItemKeydown = (e, avatarData) => {
        if (!this.clickable)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleOverflowItemClick(avatarData);
        }
    };
    handleOutsideClick() {
        const menuElement = document.querySelector('sy-menu');
        if (menuElement) {
            menuElement.delayedMenuClose?.();
        }
    }
    handleEnterMoreAvatar() {
        const more = this.host.querySelector('.more-avatars');
        if (!more)
            return;
        const rect = more.getBoundingClientRect();
        const container = this.host.querySelector('.more-avatars-container');
        if (!container)
            return;
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
    handleLeaveMoreAvatar() {
        setTimeout(() => {
            if (!this.isHovering && this.overflowContainer) {
                this.overflowContainer.style.display = 'none';
                try {
                    if (this.overflowContainer.parentElement === document.body) {
                        document.body.removeChild(this.overflowContainer);
                    }
                    this.host.appendChild(this.overflowContainer);
                }
                catch (_e) { /* noop */ }
            }
        }, 100);
    }
    // --- Render ---
    render() {
        return (h("div", { key: '7d4c0aaa83fb42f483aac7b3ecfae745c5dfbb46', class: { 'sy-avatar-group': true, [`variant-${this.variant}`]: true }, role: "list", "aria-label": "Avatar group" }, h("div", { key: '8b52a514be6de374f73404e9c2f43c5b0dae2f1e', style: { display: 'none' } }, h("slot", { key: '5845eb99e3dbeabc83bee8f291077e93442363de', onSlotchange: () => this.requestUpdate() })), this.renderGroupedAvatars()));
    }
    renderGroupedAvatars() {
        if (this.originalAvatarData.length === 0)
            this.collectOriginalAvatarData();
        const avatarData = this.originalAvatarData;
        const count = avatarData.length;
        if (count === 0)
            return null;
        const limit = this.maxCount;
        if (count > limit) {
            const displayed = avatarData.slice(0, limit);
            const remaining = avatarData.slice(limit);
            return (h("div", { class: "avatar-group-inner" }, displayed.map((ad, idx) => (h("span", { class: "avatar-container", role: "listitem", "data-index": String(idx) }, h("sy-avatar", { disabled: ad.disabled, image: ad.image, icon: ad.icon, letter: ad.letter, text: ad.text, variant: ad.variant, size: this.size, clickable: this.clickable, tooltipContent: ad.tooltipContent })))), h("div", { class: "remain-avatars-list" }, h("span", { class: "more-avatars", role: "button", tabindex: this.clickable ? 0 : -1, "aria-label": `Show ${remaining.length} more avatar${remaining.length === 1 ? '' : 's'}`, onMouseEnter: () => this.handleEnterMoreAvatar(), onMouseLeave: () => this.handleLeaveMoreAvatar(), onFocus: () => this.handleEnterMoreAvatar(), onBlur: () => this.handleLeaveMoreAvatar() }, `+${remaining.length}`), h("div", { class: "more-avatars-container", style: { display: 'none' } }, remaining.map((ad, idx) => (h("div", { class: `more-avatars-container-inner avatar--${idx}`, role: this.clickable ? 'button' : 'listitem', tabindex: this.clickable ? 0 : -1, style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--spacing-3xsmall) var(--spacing-xsmall)',
                    gap: 'var(--spacing-3xsmall)',
                    cursor: this.clickable ? 'pointer' : 'default',
                }, onMouseEnter: () => { this.hoverItemIndex = idx; }, onMouseLeave: () => { this.hoverItemIndex = null; }, onClick: () => this.handleOverflowItemClick(ad), onKeyDown: (e) => this.handleOverflowItemKeydown(e, ad) }, h("sy-avatar", { disabled: ad.disabled, image: ad.image, icon: ad.icon, letter: ad.letter, text: ad.text, variant: ad.variant, size: "small", clickable: this.clickable, tooltipContent: ad.tooltipContent }), h("span", { "data-sy-typography": true, "data-sytype": "roboto-regular" }, this.getAvatarDisplayText(ad)))))))));
        }
        return (h("div", { class: "avatar-group-inner" }, avatarData.map((ad, idx) => (h("span", { class: "avatar-container", role: "listitem", "data-index": String(idx) }, h("sy-avatar", { disabled: ad.disabled, image: ad.image, icon: ad.icon, letter: ad.letter, text: ad.text, variant: ad.variant, size: this.size, clickable: this.clickable, tooltipContent: ad.tooltipContent }))))));
    }
    static get style() { return syAvatarGroupCss; }
}, [262, "sy-avatar-group", {
        "clickable": [516],
        "maxCount": [1538, "maxcount"],
        "size": [513],
        "variant": [513],
        "isHovering": [32],
        "hoverItemIndex": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-avatar-group", "sy-avatar", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-avatar-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyAvatarGroup$1);
            }
            break;
        case "sy-avatar":
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

const SyAvatarGroup = SyAvatarGroup$1;
const defineCustomElement = defineCustomElement$1;

export { SyAvatarGroup, defineCustomElement };
