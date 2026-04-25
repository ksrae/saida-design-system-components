import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$2 } from './p-DeTd2AfI.js';

const syPopconfirmCss = ".sc-sy-popconfirm:root,.sc-sy-popconfirm-h{display:none;position:absolute;background-color:var(--popconfirm-background-enabled);color:var(--popconfirm-text-enabled);box-shadow:var(--box-shadow);padding:var(--spacing-small);z-index:var(--z-index-popconfirm);border-radius:var(--border-radius-small)}.sc-sy-popconfirm:root .popconfirm-content.sc-sy-popconfirm,.sc-sy-popconfirm-h .popconfirm-content.sc-sy-popconfirm{margin-bottom:var(--spacing-2xsmall)}.sc-sy-popconfirm:root .popconfirm-footer.sc-sy-popconfirm,.sc-sy-popconfirm-h .popconfirm-footer.sc-sy-popconfirm{display:flex;align-items:center;justify-content:end;gap:var(--spacing-3xsmall)}";

const SyPopconfirm$1 = /*@__PURE__*/ proxyCustomElement(class SyPopconfirm extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.visibleChanged = createEvent(this, "visibleChanged");
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    parentDom;
    addedToBody = false;
    ARROW_HEIGHT = 6;
    DefaultOpendelay = 0;
    DefaultClosedelay = 0;
    arrowElement;
    closeTimer;
    openTimer;
    visibility = false;
    arrow = false;
    closable = false;
    position = 'top';
    trigger = 'click';
    opendelay = 0;
    closedelay = 0;
    confirmText = 'OK';
    cancelText = 'Cancel';
    sticky = false;
    visibleChanged;
    selected;
    // Prop 변경 감지
    handlePropChanges() {
        if (this.addedToBody) {
            this.updatePopconfirmPosition();
        }
    }
    // 라이프사이클 메서드
    componentWillLoad() {
        this.parentDom = this.host.parentElement;
        document.addEventListener("click", this.handleOutsideClick, true);
        // Use utility to read legacy alias attributes and only assign when present.
        // 두개의 alias를 모두 여기서 지원할 수도 있고, 둘 중 하나는 Prop({ attribute: ... })로 지정하고 여기에서는 다른 하나만 지원하는 방식을 취해도 됩니다.
        // 명시적으로는 Prop에서 attribute를 camelCase를 사용하고, alias로 snake-case를 지원하는 방식을 권장합니다.
        this.confirmText = fnAssignPropFromAlias(this.host, 'confirm-text') ?? this.confirmText;
        this.cancelText = fnAssignPropFromAlias(this.host, 'cancel-text') ?? this.cancelText;
    }
    componentDidLoad() {
        this.setOpendelay();
        this.setClosedelay();
        this.addEvent();
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick, true);
        if (this.addedToBody) {
            this.removePopconfirm(); // 컴포넌트 강제 제거 시 정리
        }
        if (this.parentDom) {
            this.parentDom.removeEventListener("click", this.parentClick);
        }
    }
    // 공개 메서드
    async setOpen() {
        if (this.isParentDisabledOrReadonly())
            return;
        this.appendToRoot(true);
    }
    async setClose() {
        this.delayedPopconfirmClose();
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
    // 핵심 로직: 열기 / 닫기
    appendToRoot = (force = false) => {
        if (this.isParentDisabledOrReadonly())
            return;
        if (this.trigger === 'click' || force) {
            if (this.addedToBody)
                return;
            document.body.appendChild(this.host);
            this.addedToBody = true;
            window.addEventListener("scroll", this.updatePopconfirmPosition, true);
            window.addEventListener("resize", this.updatePopconfirmPosition, true);
            window.addEventListener("keydown", this.handleKeydown, true);
            this.updatePopconfirmPosition();
        }
    };
    removePopconfirm = () => {
        if (!this.addedToBody)
            return;
        // 1. DOM에서 제거하기 전에 먼저 상태를 변경하고 이벤트를 보냅니다.
        this.setVisibility(false);
        // 2. 그 다음 모든 정리 작업을 수행합니다.
        window.removeEventListener("scroll", this.updatePopconfirmPosition, true);
        window.removeEventListener("resize", this.updatePopconfirmPosition, true);
        window.removeEventListener("keydown", this.handleKeydown, true);
        if (this.openTimer)
            clearTimeout(this.openTimer);
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
        // 3. 마지막으로 DOM에서 컴포넌트를 제거합니다.
        if (this.host.parentElement === document.body) {
            document.body.removeChild(this.host);
        }
        this.addedToBody = false;
        // setVisibility는 이미 위에서 호출했으므로 여기서는 addedToBody만 설정합니다.
    };
    // 이벤트 핸들러
    addEvent() {
        if (this.trigger === "click" && this.parentDom) {
            this.parentDom.addEventListener("click", this.parentClick);
        }
    }
    parentClick = (event) => {
        event.preventDefault();
        if (this.isParentDisabledOrReadonly())
            return;
        if (this.addedToBody) {
            this.removePopconfirm();
        }
        else {
            this.appendToRoot();
        }
    };
    delayedPopconfirmClose = () => {
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(() => {
            this.removePopconfirm();
        }, this.closedelay);
    };
    handleOutsideClick = (event) => {
        if (!this.addedToBody || !this.closable)
            return;
        const target = event.target;
        const isInPopConfirm = this.host.contains(target);
        const isParent = this.parentDom?.contains(target);
        if (!isInPopConfirm && !isParent) {
            this.eventEmit("cancel");
        }
    };
    handleKeydown = (e) => {
        e.stopPropagation();
        if (e.code === "Escape") {
            this.eventEmit("cancel");
        }
    };
    // 위치 및 화살표 스타일 업데이트
    updatePopconfirmPosition = () => {
        if (!this.parentDom || !this.addedToBody)
            return;
        // ===== 여기부터 추가 =====
        // sticky가 false이고(기본값) 부모가 화면 밖에 있으면, Popconfirm을 숨기고 함수를 종료합니다.
        if (!this.sticky && !this.isParentInView()) {
            this.host.style.visibility = 'hidden';
            this.setVisibility(false); // visibility 상태와 이벤트도 동기화
            return;
        }
        // ===== 여기까지 추가 =====
        this.host.style.display = "block";
        this.host.style.visibility = "hidden";
        this.setVisibility(false);
        requestAnimationFrame(() => {
            this.setPopconfirmPosition();
            if (this.openTimer)
                clearTimeout(this.openTimer);
            this.openTimer = setTimeout(() => {
                this.host.style.visibility = "visible";
                this.setVisibility(true);
            }, this.opendelay);
        });
    };
    setPopconfirmPosition = () => {
        if (this.addedToBody && this.parentDom) {
            const parentRect = this.parentDom.getBoundingClientRect();
            const popconfirmRect = this.host.getBoundingClientRect();
            const positions = this.calculateAllPositions(parentRect, popconfirmRect);
            const { position: bestPosition, coords } = this.findBestPosition(positions, this.position, parentRect, popconfirmRect);
            this.host.style.position = "absolute";
            this.host.style.top = `${coords.top}px`;
            this.host.style.left = `${coords.left}px`;
            const adjusted = this.adjustForScreenBounds(popconfirmRect);
            if (this.arrow && this.arrowElement) {
                const popconfirmPos = { top: parseFloat(this.host.style.top), left: parseFloat(this.host.style.left) };
                this.arrowElement.style.position = 'absolute';
                this.arrowElement.style.width = '8px';
                this.arrowElement.style.height = '8px';
                this.arrowElement.style.boxShadow = 'rgba(0 0 0 / 0.24) 0px 5px 1px';
                this.arrowElement.style.background = 'white';
                if (adjusted) {
                    this.positionArrowRelativeToParent(this.arrowElement, bestPosition, parentRect, popconfirmPos, popconfirmRect);
                }
                else {
                    this.positionArrowStandard(this.arrowElement, bestPosition);
                }
            }
        }
    };
    // 헬퍼 함수
    setVisibility(visible) {
        if (this.visibility !== visible) {
            this.visibility = visible;
            this.visibleChanged.emit(this.visibility);
        }
    }
    isParentDisabledOrReadonly() {
        if (!this.parentDom)
            return false;
        return this.parentDom.hasAttribute('disabled') || this.parentDom.getAttribute('aria-disabled') === 'true' ||
            this.parentDom.hasAttribute('readonly') || this.parentDom.getAttribute('aria-readonly') === 'true';
    }
    setOpendelay() { this.opendelay = Math.max(this.opendelay, this.DefaultOpendelay); }
    setClosedelay() { this.closedelay = Math.max(this.closedelay, this.DefaultClosedelay); }
    cancelClick = (e) => { e.preventDefault(); this.eventEmit("cancel"); };
    okClick = (e) => { e.preventDefault(); this.eventEmit("ok"); };
    eventEmit(type) {
        this.selected.emit(type);
        this.delayedPopconfirmClose();
    }
    findBestPosition(positions, preferredPosition, _parentRect, popconfirmRect) {
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
                return crds.top + popconfirmRect.height > scrollY + viewportHeight;
            if (pos.startsWith('left'))
                return crds.left < scrollX;
            if (pos.startsWith('right'))
                return crds.left + popconfirmRect.width > scrollX + viewportWidth;
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
    adjustForScreenBounds(popconfirmRect) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let adjusted = false;
        const currentLeft = parseFloat(this.host.style.left);
        const currentTop = parseFloat(this.host.style.top);
        if (currentLeft < window.scrollX) {
            this.host.style.left = `${window.scrollX}px`;
            adjusted = true;
        }
        else if (currentLeft + popconfirmRect.width > window.scrollX + viewportWidth) {
            this.host.style.left = `${window.scrollX + viewportWidth - popconfirmRect.width}px`;
            adjusted = true;
        }
        if (currentTop < window.scrollY) {
            this.host.style.top = `${window.scrollY}px`;
            adjusted = true;
        }
        else if (currentTop + popconfirmRect.height > window.scrollY + viewportHeight) {
            this.host.style.top = `${window.scrollY + viewportHeight - popconfirmRect.height}px`;
            adjusted = true;
        }
        return adjusted;
    }
    positionArrowRelativeToParent(arrowElement, position, parentRect, popconfirmPos, popconfirmRect) {
        let targetX = 0, targetY = 0;
        switch (position) {
            case 'top':
                targetX = parentRect.left + parentRect.width / 2;
                targetY = parentRect.top;
                break;
            case 'topLeft':
                targetX = parentRect.left + 8;
                targetY = parentRect.top;
                break;
            case 'topRight':
                targetX = parentRect.right - 8;
                targetY = parentRect.top;
                break;
            case 'bottom':
                targetX = parentRect.left + parentRect.width / 2;
                targetY = parentRect.bottom;
                break;
            case 'bottomLeft':
                targetX = parentRect.left + 8;
                targetY = parentRect.bottom;
                break;
            case 'bottomRight':
                targetX = parentRect.right - 8;
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
            const arrowX = Math.max(8, Math.min(popconfirmRect.width - 8, targetX - popconfirmPos.left));
            arrowElement.style.left = `${arrowX - 4}px`;
        }
        else if (position.startsWith('bottom')) {
            arrowElement.style.top = '-4px';
            arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
            arrowElement.style.transform = 'rotate(45deg)';
            const arrowX = Math.max(8, Math.min(popconfirmRect.width - 8, targetX - popconfirmPos.left));
            arrowElement.style.left = `${arrowX - 4}px`;
        }
        else if (position.startsWith('left')) {
            arrowElement.style.right = '-4px';
            arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
            arrowElement.style.transform = 'rotate(45deg)';
            const arrowY = Math.max(8, Math.min(popconfirmRect.height - 8, targetY - popconfirmPos.top));
            arrowElement.style.top = `${arrowY - 4}px`;
        }
        else if (position.startsWith('right')) {
            arrowElement.style.left = '-4px';
            arrowElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%)';
            arrowElement.style.transform = 'rotate(-135deg)';
            const arrowY = Math.max(8, Math.min(popconfirmRect.height - 8, targetY - popconfirmPos.top));
            arrowElement.style.top = `${arrowY - 4}px`;
        }
    }
    positionArrowStandard(arrowElement, position) {
        switch (position) {
            case "top":
                arrowElement.style.bottom = "-4px";
                arrowElement.style.left = "calc(50% - 4px)";
                arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)";
                arrowElement.style.transform = "rotate(-45deg)";
                break;
            case "left":
                arrowElement.style.left = "calc(100% - 4px)";
                arrowElement.style.top = "calc(50% - 4px)";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
                arrowElement.style.transform = "rotate(45deg)";
                break;
            case "right":
                arrowElement.style.right = "calc(100% - 4px)";
                arrowElement.style.top = "calc(50% - 4px)";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
                arrowElement.style.transform = "rotate(-135deg)";
                break;
            case "bottom":
                arrowElement.style.top = "-4px";
                arrowElement.style.left = "calc(50% - 4px)";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
                arrowElement.style.transform = "rotate(45deg)";
                break;
            case "topLeft":
                arrowElement.style.bottom = "-4px";
                arrowElement.style.left = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)";
                arrowElement.style.transform = "rotate(-45deg)";
                break;
            case "topRight":
                arrowElement.style.bottom = "-4px";
                arrowElement.style.right = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 0 100%, 100% 100%)";
                arrowElement.style.transform = "rotate(-45deg)";
                break;
            case "bottomLeft":
                arrowElement.style.top = "-4px";
                arrowElement.style.left = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
                arrowElement.style.transform = "rotate(45deg)";
                break;
            case "bottomRight":
                arrowElement.style.top = "-4px";
                arrowElement.style.right = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 0 100%)";
                arrowElement.style.transform = "rotate(45deg)";
                break;
            case "leftTop":
                arrowElement.style.left = "calc(100% - 4px)";
                arrowElement.style.top = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
                arrowElement.style.transform = "rotate(45deg)";
                break;
            case "leftBottom":
                arrowElement.style.left = "calc(100% - 4px)";
                arrowElement.style.bottom = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
                arrowElement.style.transform = "rotate(45deg)";
                break;
            case "rightTop":
                arrowElement.style.right = "calc(100% - 4px)";
                arrowElement.style.top = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
                arrowElement.style.transform = "rotate(-135deg)";
                break;
            case "rightBottom":
                arrowElement.style.right = "calc(100% - 4px)";
                arrowElement.style.bottom = "8px";
                arrowElement.style.clipPath = "polygon(0 0, 100% 0, 100% 100%)";
                arrowElement.style.transform = "rotate(-135deg)";
                break;
        }
    }
    calculateAllPositions(parentRect, popconfirmRect) {
        const arrowOffset = this.arrow ? this.ARROW_HEIGHT : 0;
        return {
            'top': { top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset, left: window.scrollX + parentRect.left + (parentRect.width - popconfirmRect.width) / 2 },
            'bottom': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + parentRect.left + (parentRect.width - popconfirmRect.width) / 2 },
            'left': { top: window.scrollY + parentRect.top + (parentRect.height - popconfirmRect.height) / 2, left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset },
            'right': { top: window.scrollY + parentRect.top + (parentRect.height - popconfirmRect.height) / 2, left: window.scrollX + parentRect.right + arrowOffset },
            'topLeft': { top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset, left: window.scrollX + parentRect.left },
            'topRight': { top: window.scrollY + parentRect.top - popconfirmRect.height - arrowOffset, left: window.scrollX + (parentRect.right - popconfirmRect.width) },
            'bottomLeft': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + parentRect.left },
            'bottomRight': { top: window.scrollY + parentRect.bottom + arrowOffset, left: window.scrollX + (parentRect.right - popconfirmRect.width) },
            'leftTop': { top: window.scrollY + parentRect.top, left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset },
            'leftBottom': { top: window.scrollY + parentRect.top + parentRect.height - popconfirmRect.height, left: window.scrollX + parentRect.left - popconfirmRect.width - arrowOffset },
            'rightTop': { top: window.scrollY + parentRect.top, left: window.scrollX + parentRect.right + arrowOffset },
            'rightBottom': { top: window.scrollY + parentRect.top + parentRect.height - popconfirmRect.height, left: window.scrollX + parentRect.right + arrowOffset }
        };
    }
    // Render 함수
    render() {
        return (h("div", { key: '3d43e07dc2732b65ab0744f3beb56e8d06e31c5f', class: "popconfirm-wrapper" }, this.arrow && h("div", { key: 'a0ea087116cf0dbc93865965800e26ad1c66ff46', class: "arrow", ref: (el) => (this.arrowElement = el) }), h("div", { key: 'fe37c89c8a3be8333128868119a1404ed6ffbb1f', class: "popconfirm-content" }, h("slot", { key: 'c146beb08cc2553929a7fa517f7e07b9fb284338' })), h("div", { key: '38c778f070c5cb2eadd84377a44466c7102858fe', class: "popconfirm-footer" }, h("sy-button", { key: '5c1e0e6845485e997a5d86b6aa34b699f1e09603', size: "small", class: "popconfirm-cancel", onClick: this.cancelClick }, this.cancelText), h("sy-button", { key: '44ce62f03875ec9fb950950ba595f9d78d6def12', size: "small", class: "popconfirm-ok", variant: "primary", onClick: this.okClick }, this.confirmText))));
    }
    static get watchers() { return {
        "position": ["handlePropChanges"],
        "arrow": ["handlePropChanges"]
    }; }
    static get style() { return syPopconfirmCss; }
}, [262, "sy-popconfirm", {
        "arrow": [516],
        "closable": [4],
        "position": [513],
        "trigger": [513],
        "opendelay": [1538],
        "closedelay": [1538],
        "confirmText": [1025, "confirmtext"],
        "cancelText": [1025, "canceltext"],
        "sticky": [4],
        "setOpen": [64],
        "setClose": [64]
    }, undefined, {
        "position": ["handlePropChanges"],
        "arrow": ["handlePropChanges"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-popconfirm", "sy-button"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-popconfirm":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyPopconfirm$1);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyPopconfirm = SyPopconfirm$1;
const defineCustomElement = defineCustomElement$1;

export { SyPopconfirm, defineCustomElement };
