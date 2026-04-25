import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const syTooltipCss = ".sc-sy-tooltip-h{display:none;position:absolute;border-radius:var(--border-radius-small);z-index:var(--z-index-tooltip);padding:var(--spacing-2xsmall) var(--spacing-xsmall);background-color:var(--tooltip-background-enabled)}.tooltip-content.sc-sy-tooltip{word-break:keep-all;overflow-wrap:anywhere;max-width:var(--tooltip-maxWidth);color:var(--tooltip-text-enabled);box-sizing:border-box}";

const SyTooltip = /*@__PURE__*/ proxyCustomElement(class SyTooltip extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    /**
     * Controls whether the tooltip arrow is hidden
     * @default false
     */
    hideArrow = false;
    /**
     * Controls whether the tooltip is currently open/visible
     * @default false
     */
    open = false;
    /**
     * Delay in milliseconds before closing the tooltip after trigger event ends
     * @default 0
     */
    closedelay = 0;
    /**
     * Maximum width of the tooltip in pixels
     * @default null
     */
    maxWidth = null;
    /**
     * Delay in milliseconds before opening the tooltip after trigger event starts
     * @default 0
     */
    opendelay = 0;
    /**
     * The content text to display inside the tooltip
     * @default ''
     */
    content = '';
    /**
     * Position of the tooltip relative to the trigger element
     * Options: 'top', 'topLeft', 'topRight', 'right', 'rightTop', 'rightBottom',
     * 'bottom', 'bottomLeft', 'bottomRight', 'left', 'leftTop', 'leftBottom'
     * @default 'top'
     */
    position = 'top';
    /**
     * Event that triggers the tooltip to show
     * Options: 'hover', 'click', 'focus', 'none'
     * @default 'hover'
     */
    trigger = 'hover';
    arrowElement;
    replaceContent = '';
    parentObserver = null;
    addedToBody = false;
    ARROW_HEIGHT = 6;
    closeTimer;
    openTimer;
    parentDom;
    DefaultOpendelay = 150;
    DefaultClosedelay = 100;
    watchTrigger() {
        if (!this.open) {
            this.addEvent();
        }
    }
    watchOpendelay() {
        this.setOpendelay();
    }
    watchClosedelay() {
        this.setClosedelay();
    }
    watchOpen() {
        this.setOpened();
    }
    watchContent() {
        const sanitized = this.sanitizeHtml(this.content);
        this.replaceContent = this.replaceSpecialChars(sanitized);
    }
    componentWillLoad() {
        this.hideArrow = fnAssignPropFromAlias(this.host, 'hide-arrow') ?? this.hideArrow;
        this.maxWidth = fnAssignPropFromAlias(this.host, 'max-width') ?? this.maxWidth;
        if (!this.host.id) {
            this.host.id = `tooltip-${Date.now()}`;
        }
        const sanitized = this.sanitizeHtml(this.content);
        this.replaceContent = this.replaceSpecialChars(sanitized);
        this.parentDom = this.host.parentElement;
        this.observeParentRemoval();
    }
    componentDidLoad() {
        this.setupGlobalClickListener();
        if (!this.hideArrow) {
            this.host.setAttribute('arrow', 'true');
        }
        else {
            this.host.removeAttribute('arrow');
        }
        this.addEvent();
        this.setOpened();
    }
    setupGlobalClickListener() {
        document.removeEventListener('click', this.handleOutsideClick, true);
        document.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener("scroll", this.onScroll, { passive: true });
        window.addEventListener("resize", this.updateTooltipPosition, true);
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.updateTooltipPosition, true);
        this.disconnectParentObserver();
        if (this.openTimer)
            clearTimeout(this.openTimer);
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
    }
    async close() {
        this.open = false;
    }
    isParentInView() {
        if (!this.parentDom) {
            return false;
        }
        const rect = this.parentDom.getBoundingClientRect();
        return (rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0);
    }
    updateTooltipPosition = () => {
        if (!this.open || !this.addedToBody || !this.parentDom) {
            return;
        }
        if (!this.isParentInView()) {
            this.host.style.visibility = 'hidden';
            return;
        }
        const parentRect = this.parentDom.getBoundingClientRect();
        if (!parentRect || (parentRect.width === 0 && parentRect.height === 0)) {
            console.warn('Tooltip parent not found or has zero size');
            this.open = false;
            return;
        }
        this.host.style.display = 'block';
        this.host.style.visibility = 'hidden';
        this.host.style.position = 'absolute';
        this.host.style.left = '0';
        this.host.style.top = '0';
        requestAnimationFrame(() => {
            if (!this.open)
                return;
            const tooltipRect = this.host.getBoundingClientRect();
            const positions = this.calculateAllPositions(parentRect, tooltipRect);
            const { position: bestPosition, coords } = this.findBestPosition(positions, this.position, parentRect, tooltipRect);
            this.host.style.top = `${coords.top}px`;
            this.host.style.left = `${coords.left}px`;
            const adjusted = this.adjustForScreenBounds(tooltipRect);
            if (this.host.contains(this.arrowElement)) {
                this.host.removeChild(this.arrowElement);
            }
            if (!this.hideArrow) {
                this.arrowElement = this.createArrow(bestPosition, parentRect, adjusted ? { top: parseFloat(this.host.style.top), left: parseFloat(this.host.style.left) } : coords, tooltipRect, adjusted);
                this.host.appendChild(this.arrowElement);
            }
            this.openTimer = setTimeout(() => {
                if (this.open) {
                    this.host.style.visibility = 'visible';
                }
            }, this.opendelay);
        });
    };
    onScroll = () => {
        if (!this.open || !this.addedToBody)
            return;
        this.host.style.visibility = 'hidden';
        if (this.openTimer) {
            clearTimeout(this.openTimer);
        }
        this.openTimer = setTimeout(() => {
            this.updateTooltipPosition();
        }, 100);
    };
    appendToRoot = () => {
        if (this.parentDom !== document.body) {
            document.body.appendChild(this.host);
            this.addedToBody = true;
            this.updateTooltipPosition();
        }
    };
    addEvent() {
        const parent = this.parentDom;
        if (!this.open && parent) {
            if (this.trigger === 'hover') {
                parent.removeEventListener('focus', this.setFocus);
                parent.removeEventListener('blur', this.setBlur);
                parent.removeEventListener('click', this.parentClick);
                parent.addEventListener('mouseenter', this.parentMouseEnter);
                parent.addEventListener('mouseleave', this.parentMouseLeave);
            }
            else if (this.trigger === 'focus') {
                parent.removeEventListener('mouseenter', this.parentMouseEnter);
                parent.removeEventListener('mouseleave', this.parentMouseLeave);
                parent.removeEventListener('click', this.parentClick);
                parent.addEventListener('focus', this.setFocus);
                parent.addEventListener('blur', this.setBlur);
            }
            else if (this.trigger === 'click') {
                parent.removeEventListener('focus', this.setFocus);
                parent.removeEventListener('blur', this.setBlur);
                parent.removeEventListener('mouseenter', this.parentMouseEnter);
                parent.removeEventListener('mouseleave', this.parentMouseLeave);
                parent.addEventListener('click', this.parentClick);
            }
            else {
                parent.removeEventListener('focus', this.setFocus);
                parent.removeEventListener('blur', this.setBlur);
                parent.removeEventListener('mouseenter', this.parentMouseEnter);
                parent.removeEventListener('mouseleave', this.parentMouseLeave);
                parent.removeEventListener('click', this.parentClick);
            }
        }
    }
    observeParentRemoval() {
        if (this.parentObserver || !this.parentDom) {
            return;
        }
        this.parentObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const removedNodes = Array.from(mutation.removedNodes);
                    if (removedNodes.some(node => node === this.parentDom || node.contains(this.parentDom))) {
                        this.disconnectParentObserver();
                        this.open = false;
                        this.removeTooltip();
                        return;
                    }
                }
            });
        });
        this.observeGrandParent();
    }
    observeGrandParent() {
        const grandparent = this.parentDom.parentNode;
        if (grandparent && this.parentObserver) {
            this.parentObserver.observe(grandparent, { childList: true, subtree: true });
        }
    }
    disconnectParentObserver() {
        if (this.parentObserver) {
            this.parentObserver.disconnect();
            this.parentObserver = null;
        }
    }
    setOpened() {
        if (!this.open) {
            this.delayedTooltipClose();
        }
        else {
            this.appendToRoot();
        }
    }
    calculateAllPositions(parentRect, tooltipRect) {
        const arrowOffset = !this.hideArrow ? this.ARROW_HEIGHT : 0;
        return {
            'top': {
                top: window.scrollY + parentRect.top - tooltipRect.height - arrowOffset,
                left: window.scrollX + parentRect.left + (parentRect.width - tooltipRect.width) / 2
            },
            'bottom': {
                top: window.scrollY + parentRect.bottom + arrowOffset,
                left: window.scrollX + parentRect.left + (parentRect.width - tooltipRect.width) / 2
            },
            'left': {
                top: window.scrollY + parentRect.top + (parentRect.height - tooltipRect.height) / 2,
                left: window.scrollX + parentRect.left - tooltipRect.width - arrowOffset
            },
            'right': {
                top: window.scrollY + parentRect.top + (parentRect.height - tooltipRect.height) / 2,
                left: window.scrollX + parentRect.right + arrowOffset
            },
            'topLeft': {
                top: window.scrollY + parentRect.top - tooltipRect.height - arrowOffset,
                left: window.scrollX + parentRect.left
            },
            'topRight': {
                top: window.scrollY + parentRect.top - tooltipRect.height - arrowOffset,
                left: window.scrollX + parentRect.right - tooltipRect.width
            },
            'bottomLeft': {
                top: window.scrollY + parentRect.bottom + arrowOffset,
                left: window.scrollX + parentRect.left
            },
            'bottomRight': {
                top: window.scrollY + parentRect.bottom + arrowOffset,
                left: window.scrollX + parentRect.right - tooltipRect.width
            },
            'leftTop': {
                top: window.scrollY + parentRect.top,
                left: window.scrollX + parentRect.left - tooltipRect.width - arrowOffset
            },
            'leftBottom': {
                top: window.scrollY + parentRect.bottom - tooltipRect.height,
                left: window.scrollX + parentRect.left - tooltipRect.width - arrowOffset
            },
            'rightTop': {
                top: window.scrollY + parentRect.top,
                left: window.scrollX + parentRect.right + arrowOffset
            },
            'rightBottom': {
                top: window.scrollY + parentRect.bottom - tooltipRect.height,
                left: window.scrollX + parentRect.right + arrowOffset
            }
        };
    }
    findBestPosition(positions, preferredPosition, _parentRect, tooltipRect) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const scrollX = window.scrollX || window.pageXOffset || 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const oppositePositions = {
            'top': 'bottom', 'bottom': 'top', 'left': 'right', 'right': 'left',
            'topLeft': 'bottomLeft', 'topRight': 'bottomRight', 'bottomLeft': 'topLeft', 'bottomRight': 'topRight',
            'leftTop': 'rightTop', 'leftBottom': 'rightBottom', 'rightTop': 'leftTop', 'rightBottom': 'leftBottom'
        };
        let position = preferredPosition;
        let coords = positions[preferredPosition];
        const checkDirection = (pos, crds) => {
            if (pos.startsWith('top'))
                return crds.top < scrollY;
            if (pos.startsWith('bottom'))
                return crds.top + tooltipRect.height > scrollY + viewportHeight;
            if (pos.startsWith('left'))
                return crds.left < scrollX;
            if (pos.startsWith('right'))
                return crds.left + tooltipRect.width > scrollX + viewportWidth;
            return false;
        };
        if (checkDirection(preferredPosition, coords)) {
            const oppositePosition = oppositePositions[preferredPosition];
            if (oppositePosition) {
                position = oppositePosition;
                coords = positions[oppositePosition];
            }
        }
        return { position, coords };
    }
    adjustForScreenBounds(tooltipRect) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let adjusted = false;
        const currentLeft = parseFloat(this.host.style.left);
        const currentTop = parseFloat(this.host.style.top);
        if (currentLeft < window.scrollX) {
            this.host.style.left = `${window.scrollX}px`;
            adjusted = true;
        }
        else if (currentLeft + tooltipRect.width > window.scrollX + viewportWidth) {
            this.host.style.left = `${window.scrollX + viewportWidth - tooltipRect.width}px`;
            adjusted = true;
        }
        if (currentTop < window.scrollY) {
            this.host.style.top = `${window.scrollY}px`;
            adjusted = true;
        }
        else if (currentTop + tooltipRect.height > window.scrollY + viewportHeight) {
            this.host.style.top = `${window.scrollY + viewportHeight - tooltipRect.height}px`;
            adjusted = true;
        }
        return adjusted;
    }
    createArrow(position, parentRect, tooltipPos, tooltipRect, positionAdjusted) {
        const arrowElement = document.createElement('div');
        arrowElement.classList.add('arrow');
        arrowElement.style.position = 'absolute';
        arrowElement.style.width = '8px';
        arrowElement.style.height = '8px';
        arrowElement.style.background = 'black';
        if (positionAdjusted) {
            this.positionArrowRelativeToParent(arrowElement, position, parentRect, tooltipPos, tooltipRect);
        }
        else {
            this.positionArrowStandard(arrowElement, position);
        }
        return arrowElement;
    }
    positionArrowRelativeToParent(arrowElement, position, parentRect, tooltipPos, tooltipRect) {
        let targetX, targetY;
        switch (position) {
            case 'top':
                targetX = parentRect.left + parentRect.width / 2;
                targetY = parentRect.top;
                break;
            case 'topLeft':
                targetX = parentRect.left + 4;
                targetY = parentRect.top;
                break;
            case 'topRight':
                targetX = parentRect.right - 4;
                targetY = parentRect.top;
                break;
            case 'bottom':
                targetX = parentRect.left + parentRect.width / 2;
                targetY = parentRect.bottom;
                break;
            case 'bottomLeft':
                targetX = parentRect.left + 4;
                targetY = parentRect.bottom;
                break;
            case 'bottomRight':
                targetX = parentRect.right - 4;
                targetY = parentRect.bottom;
                break;
            case 'left':
                targetX = parentRect.left;
                targetY = parentRect.top + parentRect.height / 2;
                break;
            case 'leftTop':
                targetX = parentRect.left;
                targetY = parentRect.top;
                break;
            case 'leftBottom':
                targetX = parentRect.left;
                targetY = parentRect.bottom;
                break;
            case 'right':
                targetX = parentRect.right;
                targetY = parentRect.top + parentRect.height / 2;
                break;
            case 'rightTop':
                targetX = parentRect.right;
                targetY = parentRect.top;
                break;
            case 'rightBottom':
                targetX = parentRect.right;
                targetY = parentRect.bottom;
                break;
            default:
                targetX = parentRect.left + parentRect.width / 2;
                targetY = parentRect.top + parentRect.height / 2;
        }
        targetX += window.scrollX;
        targetY += window.scrollY;
        if (position.startsWith('top')) {
            arrowElement.style.bottom = '-4px';
            arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
            arrowElement.style.transform = 'rotate(-45deg)';
            const arrowX = Math.max(8, Math.min(tooltipRect.width - 8, targetX - tooltipPos.left));
            arrowElement.style.left = `${arrowX - 4}px`;
        }
        else if (position.startsWith('bottom')) {
            arrowElement.style.top = '-4px';
            arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
            arrowElement.style.transform = 'rotate(45deg)';
            const arrowX = Math.max(8, Math.min(tooltipRect.width - 8, targetX - tooltipPos.left));
            arrowElement.style.left = `${arrowX - 4}px`;
        }
        else if (position.startsWith('left')) {
            arrowElement.style.right = '-4px';
            arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
            arrowElement.style.transform = 'rotate(45deg)';
            const arrowY = Math.max(8, Math.min(tooltipRect.height - 8, targetY - tooltipPos.top));
            arrowElement.style.top = `${arrowY - 4}px`;
        }
        else if (position.startsWith('right')) {
            arrowElement.style.left = '-4px';
            arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
            arrowElement.style.transform = 'rotate(-135deg)';
            const arrowY = Math.max(8, Math.min(tooltipRect.height - 8, targetY - tooltipPos.top));
            arrowElement.style.top = `${arrowY - 4}px`;
        }
    }
    positionArrowStandard(arrowElement, position) {
        switch (position) {
            case 'top':
                arrowElement.style.bottom = '-4px';
                arrowElement.style.left = 'calc(50% - 4px)';
                arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
                arrowElement.style.transform = 'rotate(-45deg)';
                break;
            case 'left':
                arrowElement.style.left = 'calc(100% - 4px)';
                arrowElement.style.top = 'calc(50% - 4px)';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
                arrowElement.style.transform = 'rotate(45deg)';
                break;
            case 'right':
                arrowElement.style.right = 'calc(100% - 4px)';
                arrowElement.style.top = 'calc(50% - 4px)';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
                arrowElement.style.transform = 'rotate(-135deg)';
                break;
            case 'bottom':
                arrowElement.style.top = '-4px';
                arrowElement.style.left = 'calc(50% - 4px)';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
                arrowElement.style.transform = 'rotate(45deg)';
                break;
            case 'topLeft':
                arrowElement.style.bottom = '-4px';
                arrowElement.style.left = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
                arrowElement.style.transform = 'rotate(-45deg)';
                break;
            case 'topRight':
                arrowElement.style.bottom = '-4px';
                arrowElement.style.right = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%)';
                arrowElement.style.transform = 'rotate(-45deg)';
                break;
            case 'bottomLeft':
                arrowElement.style.top = '-4px';
                arrowElement.style.left = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
                arrowElement.style.transform = 'rotate(45deg)';
                break;
            case 'bottomRight':
                arrowElement.style.top = '-4px';
                arrowElement.style.right = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
                arrowElement.style.transform = 'rotate(45deg)';
                break;
            case 'leftTop':
                arrowElement.style.left = 'calc(100% - 4px)';
                arrowElement.style.top = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
                arrowElement.style.transform = 'rotate(45deg)';
                break;
            case 'leftBottom':
                arrowElement.style.left = 'calc(100% - 4px)';
                arrowElement.style.bottom = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
                arrowElement.style.transform = 'rotate(45deg)';
                break;
            case 'rightTop':
                arrowElement.style.right = 'calc(100% - 4px)';
                arrowElement.style.top = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
                arrowElement.style.transform = 'rotate(-135deg)';
                break;
            case 'rightBottom':
                arrowElement.style.right = 'calc(100% - 4px)';
                arrowElement.style.bottom = '8px';
                arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
                arrowElement.style.transform = 'rotate(-135deg)';
                break;
        }
    }
    parentMouseEnter = () => {
        if (this.openTimer)
            clearTimeout(this.openTimer);
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
        if (!this.open) {
            this.open = true;
        }
    };
    parentMouseLeave = () => {
        if (this.open) {
            this.open = false;
        }
    };
    setFocus = () => {
        if (!this.open) {
            this.open = true;
        }
    };
    setBlur = () => {
        if (this.open) {
            this.open = false;
        }
    };
    delayedTooltipClose = () => {
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(() => {
            this.removeTooltip();
        }, this.closedelay);
    };
    removeTooltip() {
        try {
            if (this.host.parentNode === document.body) {
                document.body.removeChild(this.host);
            }
            this.addedToBody = false;
        }
        catch (err) {
            // 에러 무시
        }
    }
    parentClick = (event) => {
        event.preventDefault();
        this.open = !this.open;
    };
    handleOutsideClick = (event) => {
        if (this.trigger !== 'click' || !this.open || !this.addedToBody) {
            return;
        }
        const target = event.target;
        const isInTooltip = this.host?.contains(target);
        const isParent = this.parentDom?.contains(target);
        if (!isInTooltip && !isParent) {
            this.open = false;
        }
    };
    setOpendelay() {
        this.opendelay = this.opendelay < this.DefaultOpendelay ? this.DefaultOpendelay : this.opendelay;
    }
    setClosedelay() {
        this.closedelay = this.closedelay < this.DefaultClosedelay ? this.DefaultClosedelay : this.closedelay;
    }
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerText.trim();
    }
    render() {
        const maxWidthStyle = this.maxWidth && this.maxWidth > 0 ? `${this.maxWidth}px` : null;
        return (h("div", { key: '40aa1e78ae83592b551a124792a0a4475fd9f0da', class: "tooltip-content", style: { '--tooltip-maxWidth': maxWidthStyle } }, h("span", { key: 'f56b4f02894cabe7c99228a067fa0710723d11a4', innerHTML: this.replaceContent })));
    }
    replaceAll(str, search, replacement) {
        if (typeof search === 'string') {
            return str.split(search).join(replacement);
        }
        else {
            return str.replace(search, replacement);
        }
    }
    replaceEscapeChars(content) {
        if (!content?.length)
            return content;
        let result = content;
        result = this.replaceAll(result, '<', '&lt;');
        result = this.replaceAll(result, '>', '&gt;');
        result = this.replaceAll(result, '"', '&quot;');
        result = this.replaceAll(result, "'", '&apos;');
        result = this.replaceAll(result, '-', '&ndash;');
        result = result.replace(/\\n/g, '<br>');
        result = result.replace(/\n/g, '<br>');
        result = result.replace(/\r/g, '');
        return result;
    }
    replaceSpecialChars(content) {
        content = this.replaceEscapeChars(content);
        if (!content?.length)
            return content;
        let result = content;
        result = this.replaceAll(result, '\t', '    ');
        result = this.replaceAll(result, ' ', ' ');
        result = result.replace(/\\n/g, '<br>');
        result = result.replace(/\n/g, '<br>');
        result = result.replace(/\r/g, '');
        return result;
    }
    static get watchers() { return {
        "trigger": ["watchTrigger"],
        "opendelay": ["watchOpendelay"],
        "closedelay": ["watchClosedelay"],
        "open": ["watchOpen"],
        "content": ["watchContent"]
    }; }
    static get style() { return syTooltipCss; }
}, [258, "sy-tooltip", {
        "hideArrow": [1540, "hidearrow"],
        "open": [1540],
        "closedelay": [514],
        "maxWidth": [1538, "maxwidth"],
        "opendelay": [514],
        "content": [1],
        "position": [1],
        "trigger": [1],
        "arrowElement": [32],
        "replaceContent": [32],
        "close": [64]
    }, undefined, {
        "trigger": ["watchTrigger"],
        "opendelay": ["watchOpendelay"],
        "closedelay": ["watchClosedelay"],
        "open": ["watchOpen"],
        "content": ["watchContent"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTooltip);
            }
            break;
    } });
}

export { SyTooltip as S, defineCustomElement as d };
