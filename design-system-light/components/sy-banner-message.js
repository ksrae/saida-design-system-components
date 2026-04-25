import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syBannerCss = ".sc-sy-banner-message-h{display:flex;box-sizing:border-box;width:100%;min-height:100px}.banner-group.sc-sy-banner-message{display:flex;align-items:start;gap:var(--spacing-xsmall);width:100%}.banner-group.sc-sy-banner-message .banner-icon.sc-sy-banner-message{--icon-xxxlarge:26px}.banner-message-group.sc-sy-banner-message{display:flex;align-items:baseline;flex-direction:column;gap:var(--spacing-2xsmall);flex:1}.banner-message-group.sc-sy-banner-message .banner-message-area.sc-sy-banner-message{display:flex;flex-direction:column;gap:var(--spacing-3xsmall)}.banner-message-group.sc-sy-banner-message .banner-button.sc-sy-banner-message{display:flex;width:100%;justify-content:flex-end;gap:var(--spacing-3xsmall)}.banner-content.sc-sy-banner-message{width:100%;display:flex;justify-content:space-between;gap:var(--spacing-3xsmall)}.banner-content.sc-sy-banner-message .banner-title.sc-sy-banner-message{font-family:\"Roboto\";font-size:16px;font-weight:500;line-height:26px;letter-spacing:0.5px;width:100%}.banner-content.sc-sy-banner-message .banner-message.sc-sy-banner-message{width:100%}.banner-container.sc-sy-banner-message{width:100%;padding:var(--spacing-small) var(--spacing-small);border-radius:var(--border-radius-small);box-sizing:border-box}.banner-container.info.sc-sy-banner-message{color:var(--banner-informational-text-enabled);background-color:var(--banner-informational-background-enabled);border:1px solid var(--banner-informational-border-enabled)}.banner-container.info.sc-sy-banner-message .banner-icon.sc-sy-banner-message{color:var(--banner-informational-icon-enabled)}.banner-container.success.sc-sy-banner-message{color:var(--banner-success-text-enabled);background-color:var(--banner-success-background-enabled);border:1px solid var(--banner-success-border-enabled)}.banner-container.success.sc-sy-banner-message .banner-icon.sc-sy-banner-message{color:var(--banner-success-icon-enabled)}.banner-container.warning.sc-sy-banner-message{color:var(--banner-warning-text-enabled);background-color:var(--banner-warning-background-enabled);border:1px solid var(--banner-warning-border-enabled)}.banner-container.warning.sc-sy-banner-message .banner-icon.sc-sy-banner-message{color:var(--banner-warning-icon-enabled)}.banner-container.error.sc-sy-banner-message{color:var(--banner-error-text-enabled);background-color:var(--banner-error-background-enabled);border:1px solid var(--banner-error-border-enabled)}.banner-container.error.sc-sy-banner-message .banner-icon.sc-sy-banner-message{color:var(--banner-error-icon-enabled)}.banner-container.neutral.sc-sy-banner-message{color:var(--banner-neutral-text-enabled);background-color:var(--banner-neutral-background-enabled);border:1px solid var(--banner-neutral-border-enabled)}.banner-container.neutral.sc-sy-banner-message .banner-icon.sc-sy-banner-message{color:var(--banner-neutral-icon-enabled)}.banner-container.sc-sy-banner-message .banner-close.sc-sy-banner-message{color:var(--banner-closeable-icon-enabled);display:none}.banner-container.sc-sy-banner-message .banner-close.sc-sy-banner-message sy-icon.sc-sy-banner-message{margin:0px}.banner-container.sc-sy-banner-message .banner-close.sc-sy-banner-message sy-icon.sc-sy-banner-message:hover{cursor:pointer;color:var(--banner-closeable-icon-hover)}.banner-container.sc-sy-banner-message .banner-footer.sc-sy-banner-message{display:flex;justify-content:end;width:100%}.banner-container .banner-footer.sc-sy-banner-message-s>[slot=footer],.banner-container .banner-footer .sc-sy-banner-message-s>[slot=footer]{display:flex;gap:var(--spacing-3xsmall)}.banner-container.closable.sc-sy-banner-message .banner-close.sc-sy-banner-message{display:flex}";

const SyBannerMessage$1 = /*@__PURE__*/ proxyCustomElement(class SyBannerMessage extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    // --- Public Properties (spec: props) ---
    closable = false;
    showIcon = false;
    neutralIcon = '';
    message = '';
    header = '';
    variant = 'info';
    iconVariant = '';
    // --- Watchers ---
    handlePropsChange() {
        this.updateIconVariant();
        if (this.host.isConnected) {
            this.createBanner();
        }
    }
    componentWillLoad() {
        this.showIcon = fnAssignPropFromAlias(this.host, 'show-icon') ?? this.showIcon;
        this.neutralIcon = fnAssignPropFromAlias(this.host, 'neutral-icon') ?? this.neutralIcon;
        this.updateIconVariant();
    }
    componentDidLoad() {
        this.createBanner();
    }
    // --- Icon resolution ---
    updateIconVariant() {
        if (!this.showIcon) {
            this.iconVariant = '';
            return;
        }
        switch (this.variant) {
            case 'info':
                this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>';
                break;
            case 'success':
                this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z"/></svg>';
                break;
            case 'warning':
                this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z"/></svg>';
                break;
            case 'error':
                this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>';
                break;
            case 'neutral':
                this.iconVariant = this.neutralIcon.length > 0 ? this.neutralIcon : '';
                break;
        }
    }
    // --- DOM lifecycle (singleton + auto-prepend) ---
    createBanner() {
        document.querySelectorAll('sy-banner-message').forEach((banner) => {
            if (banner !== this.host)
                banner.remove();
        });
        if (document.body.firstChild !== this.host) {
            document.body.prepend(this.host);
        }
    }
    removeBanner = () => {
        if (this.host.parentElement === document.body) {
            document.body.removeChild(this.host);
        }
    };
    render() {
        const showIconCondition = (this.showIcon && this.variant !== 'neutral') ||
            (this.showIcon && this.variant === 'neutral' && this.neutralIcon);
        // The banner is a critical system-wide announcement — expose it to assistive tech
        // via the native alert live region (announces on insert without requiring focus).
        const liveRole = this.variant === 'error' ? 'alert' : 'status';
        return (h("div", { key: '0b2f920addeaba0a88ad9921e4c70b34443d0e36', class: `banner-container ${this.variant} ${this.closable ? 'closable' : ''}`, role: liveRole, "aria-live": this.variant === 'error' ? 'assertive' : 'polite' }, h("div", { key: '6cfcb96a68546f1f7ad1bba14c4bae7508895d4e', class: "banner-content" }, h("div", { key: 'f412832d31a2d17ce9d6255964deecd5c6bfe623', class: "banner-group" }, showIconCondition && this.iconVariant && (h("sy-icon", { key: 'dfcee7378243a88ac1ada58331428d8da4157714', size: "xxxlarge", naturalAspect: this.variant === 'neutral', class: "banner-icon", svgMarkup: this.iconVariant })), h("div", { key: 'baaf522f8938c7d8221c580f8de2c9ac2a8495cc', class: "banner-message-group" }, h("div", { key: 'f186dea6db76e90c54ffe289aacb302fa3effa17', class: "banner-message-area" }, this.header && h("div", { key: 'eb1d4eef35af8f321bdd6b8671a0c02b76b5d0a3', class: "banner-title" }, this.header), this.message && h("div", { key: '0d7cd9bc6f126ccb2709415f0e1c35ceb9165bd1', class: "banner-message" }, this.message)), h("div", { key: '4504003648e06245d629580cd239b591c6a30b8f', class: "banner-footer" }, h("slot", { key: '279e731a575478b3c28bbd6fcf4b636c097c4c94', name: "footer" })))), h("div", { key: '1be6cee9bfe54822f79cdb650259f523421f2a92', class: "banner-close" }, this.closable && (h("sy-icon", { key: 'b746192ff2d7dc94037a7be9e72aeb615f3c8653', onSelected: this.removeBanner, size: "large", selectable: true, "aria-label": "Dismiss banner" }, h("svg", { key: '3361c9e1852084c87e3048997679cadaa915d95b', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '08194c5f38ba069958815b4ac746dc6b39ab1b04', fill: "currentColor", d: "M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z" }))))))));
    }
    static get watchers() { return {
        "variant": ["handlePropsChange"],
        "neutralIcon": ["handlePropsChange"],
        "showIcon": ["handlePropsChange"]
    }; }
    static get style() { return syBannerCss; }
}, [262, "sy-banner-message", {
        "closable": [516],
        "showIcon": [1028, "showicon"],
        "neutralIcon": [1025, "neutral-icon"],
        "message": [1],
        "header": [1],
        "variant": [513],
        "iconVariant": [32]
    }, undefined, {
        "variant": ["handlePropsChange"],
        "neutralIcon": ["handlePropsChange"],
        "showIcon": ["handlePropsChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-banner-message", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-banner-message":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyBannerMessage$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyBannerMessage = SyBannerMessage$1;
const defineCustomElement = defineCustomElement$1;

export { SyBannerMessage, defineCustomElement };
