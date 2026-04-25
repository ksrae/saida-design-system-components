import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syAvatarCss = "@charset \"UTF-8\";.sc-sy-avatar-h{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;box-sizing:border-box;width:auto;overflow:hidden;border-radius:var(--border-radius-full, 50%)}.sc-sy-avatar-h img.sc-sy-avatar{width:100%;height:100%;object-fit:cover;display:block}.sc-sy-avatar-h .avatar-item.sc-sy-avatar{display:flex;justify-content:center;align-items:center;box-sizing:border-box;border-radius:var(--border-radius-full, 50%);border:var(--border-small, 1px solid) transparent;overflow:hidden;user-select:none;transition:opacity 120ms ease}.sc-sy-avatar-h .avatar-item.avatar--small.sc-sy-avatar{width:var(--component-small);height:var(--component-small)}.sc-sy-avatar-h .avatar-item.avatar--small.sc-sy-avatar .letter.sc-sy-avatar{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-avatar-h .avatar-item.avatar--medium.sc-sy-avatar{width:var(--component-medium);height:var(--component-medium)}.sc-sy-avatar-h .avatar-item.avatar--medium.sc-sy-avatar .letter.sc-sy-avatar{font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-avatar-h .avatar-item.avatar--large.sc-sy-avatar{width:var(--component-large);height:var(--component-large)}.sc-sy-avatar-h .avatar-item.avatar--large.sc-sy-avatar .letter.sc-sy-avatar{font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}.sc-sy-avatar-h .avatar-item.avatar--lightgray.sc-sy-avatar{background-color:var(--avatar-lightgray-background-enabled);border-color:var(--avatar-lightgray-border-enabled);color:var(--avatar-lightgray-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--red.sc-sy-avatar{background-color:var(--avatar-red-background-enabled);border-color:var(--avatar-red-border-enabled);color:var(--avatar-red-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--orange.sc-sy-avatar{background-color:var(--avatar-orange-background-enabled);border-color:var(--avatar-orange-border-enabled);color:var(--avatar-orange-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--yellow.sc-sy-avatar{background-color:var(--avatar-yellow-background-enabled);border-color:var(--avatar-yellow-border-enabled);color:var(--avatar-yellow-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--lime.sc-sy-avatar{background-color:var(--avatar-lime-background-enabled);border-color:var(--avatar-lime-border-enabled);color:var(--avatar-lime-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--green.sc-sy-avatar{background-color:var(--avatar-green-background-enabled);border-color:var(--avatar-green-border-enabled);color:var(--avatar-green-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--teal.sc-sy-avatar{background-color:var(--avatar-teal-background-enabled);border-color:var(--avatar-teal-border-enabled);color:var(--avatar-teal-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--blue.sc-sy-avatar{background-color:var(--avatar-blue-background-enabled);border-color:var(--avatar-blue-border-enabled);color:var(--avatar-blue-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--purple.sc-sy-avatar{background-color:var(--avatar-purple-background-enabled);border-color:var(--avatar-purple-border-enabled);color:var(--avatar-purple-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--magenta.sc-sy-avatar{background-color:var(--avatar-magenta-background-enabled);border-color:var(--avatar-magenta-border-enabled);color:var(--avatar-magenta-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--darkgray.sc-sy-avatar{background-color:var(--avatar-darkgray-background-enabled);border-color:var(--avatar-darkgray-border-enabled);color:var(--avatar-darkgray-text-enabled)}.sc-sy-avatar-h .avatar-item.avatar--clickable.sc-sy-avatar{cursor:pointer}.sc-sy-avatar-h .avatar-item.avatar--clickable.sc-sy-avatar:focus-visible{outline:var(--border-small) var(--focus-outline);outline-offset:2px}.sc-sy-avatar-h .avatar-item.avatar--disabled.sc-sy-avatar{opacity:0.5;cursor:not-allowed;pointer-events:none}.sc-sy-avatar-h .letter.sc-sy-avatar{display:flex;align-items:center;justify-content:center;width:100%;height:100%;text-align:center;color:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sc-sy-avatar-h sy-icon.sc-sy-avatar{color:inherit;display:inline-flex}[disabled].sc-sy-avatar-h{cursor:not-allowed}[clickable].sc-sy-avatar-h:not([disabled]){cursor:pointer}";

const SyAvatar = /*@__PURE__*/ proxyCustomElement(class SyAvatar extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
        this.disableStatus = createEvent(this, "disableStatus");
    }
    get host() { return this; }
    // --- Public Properties (spec: avatar.yaml :: props) ---
    clickable = false;
    disabled = false;
    image = '';
    icon = '';
    text = '';
    letter = '';
    variant = 'lightgray';
    size = 'medium';
    tooltipContent = '';
    // --- Private State ---
    imageLoaded = false;
    exposedText = '';
    isTooltipContentUserSet = false;
    // --- Events (spec: avatar.yaml :: api.events) ---
    selected;
    disableStatus;
    // --- Lifecycle ---
    componentWillLoad() {
        const aliasTooltip = fnAssignPropFromAlias(this.host, 'tooltip-content');
        if (aliasTooltip?.trim()?.length) {
            this.tooltipContent = this.sanitizeHtml(aliasTooltip);
            this.isTooltipContentUserSet = true;
        }
        else if (this.tooltipContent?.trim()?.length) {
            this.tooltipContent = this.sanitizeHtml(this.tooltipContent);
            this.isTooltipContentUserSet = true;
        }
        if (this.image?.trim()?.length)
            this.imgPreload();
        if (this.text?.trim()?.length)
            this.computeInitialsFromText();
        if (this.letter?.trim()?.length && this.letter.length > 2) {
            this.letter = this.letter.slice(0, 2).toUpperCase();
        }
    }
    // --- Watchers ---
    watchTooltipContent(newValue) {
        this.tooltipContent = this.sanitizeHtml(newValue);
        this.isTooltipContentUserSet = !!this.tooltipContent?.trim()?.length;
    }
    watchImage(newValue) {
        this.imageLoaded = false;
        if (newValue?.trim()?.length)
            this.imgPreload();
    }
    watchText() {
        this.computeInitialsFromText();
    }
    watchLetter(newValue) {
        if (newValue && newValue.length > 2) {
            this.letter = newValue.slice(0, 2).toUpperCase();
        }
    }
    watchDisabled(newValue) {
        this.disableStatus.emit({ disabled: newValue });
    }
    // --- Helpers ---
    /** Derive a ≤2-char uppercase initial string from this.text. */
    computeInitialsFromText() {
        if (!this.text) {
            this.exposedText = '';
            return;
        }
        if (this.text.includes(' ')) {
            const parts = this.text.split(' ').filter(Boolean);
            this.exposedText = parts
                .map(part => part.charAt(0))
                .join('')
                .slice(0, 2)
                .toUpperCase();
        }
        else {
            this.exposedText = this.text.slice(0, 2).toUpperCase();
        }
    }
    /** Non-blocking image preload to avoid flashing unloaded <img>s. */
    imgPreload() {
        const url = this.image;
        const img = new Image();
        img.onload = () => {
            if (this.image === url)
                this.imageLoaded = true;
        };
        img.onerror = () => {
            if (this.image === url) {
                this.imageLoaded = false;
                this.image = '';
            }
        };
        img.src = url;
    }
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return (tempDiv.textContent ?? tempDiv.innerText ?? '').trim();
    }
    getComputedTooltipContent() {
        if (this.isTooltipContentUserSet && this.tooltipContent?.trim()?.length) {
            return this.sanitizeHtml(this.tooltipContent);
        }
        if (this.image?.trim()?.length)
            return this.sanitizeHtml(this.image);
        if (this.icon?.trim()?.length)
            return this.sanitizeHtml(this.icon);
        if (this.text?.trim()?.length)
            return this.sanitizeHtml(this.text);
        if (this.letter?.trim()?.length)
            return this.sanitizeHtml(this.letter);
        return '';
    }
    // --- Interaction ---
    emitSelected() {
        this.selected.emit({
            letter: this.letter ?? '',
            text: this.text ?? '',
            icon: this.icon ?? '',
            image: this.image ?? '',
        });
    }
    handleClick = (e) => {
        if (!this.clickable || this.disabled)
            return;
        e.preventDefault();
        this.emitSelected();
    };
    handleKeydown = (e) => {
        if (!this.clickable || this.disabled)
            return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            this.emitSelected();
        }
    };
    // --- Render ---
    renderContent() {
        if (this.image?.trim()?.length > 0 && this.imageLoaded) {
            return h("img", { src: this.image, alt: this.getComputedTooltipContent() || '' });
        }
        if (this.icon?.trim()?.length > 0) {
            const iconSize = this.size === 'large' ? 'xxlarge' : this.size === 'medium' ? 'large' : this.size;
            return h("sy-icon", { size: iconSize, svgMarkup: this.icon });
        }
        const letterText = (this.letter?.trim()?.length ? this.letter : this.exposedText) ?? '';
        if (letterText.length > 0) {
            return h("span", { class: "letter" }, letterText);
        }
        return null;
    }
    render() {
        const tooltip = this.getComputedTooltipContent();
        const interactive = this.clickable && !this.disabled;
        const classes = {
            'avatar-item': true,
            [`avatar--${this.variant}`]: true,
            [`avatar--${this.size}`]: true,
            'avatar--clickable': this.clickable,
            'avatar--disabled': this.disabled,
        };
        return (h("div", { key: '9605b37cd444f091fc32ee76357821b41af43490', class: classes, role: this.clickable ? 'button' : 'img', "aria-label": tooltip || undefined, "aria-disabled": this.disabled ? 'true' : null, tabindex: interactive ? 0 : -1, title: tooltip || undefined, onClick: this.handleClick, onKeyDown: this.handleKeydown }, this.renderContent()));
    }
    static get watchers() { return {
        "tooltipContent": ["watchTooltipContent"],
        "image": ["watchImage"],
        "text": ["watchText"],
        "letter": ["watchLetter"],
        "disabled": ["watchDisabled"]
    }; }
    static get style() { return syAvatarCss; }
}, [258, "sy-avatar", {
        "clickable": [516],
        "disabled": [516],
        "image": [1025],
        "icon": [1],
        "text": [1],
        "letter": [1025],
        "variant": [513],
        "size": [513],
        "tooltipContent": [1025, "tooltipcontent"],
        "imageLoaded": [32],
        "exposedText": [32],
        "isTooltipContentUserSet": [32]
    }, undefined, {
        "tooltipContent": ["watchTooltipContent"],
        "image": ["watchImage"],
        "text": ["watchText"],
        "letter": ["watchLetter"],
        "disabled": ["watchDisabled"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-avatar", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-avatar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyAvatar);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyAvatar as S, defineCustomElement as d };
