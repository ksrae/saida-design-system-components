import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const syLabelCss = "@charset \"UTF-8\";.sc-sy-label:root,.sc-sy-label-h{display:inline-flex;align-items:center}.label.sc-sy-label{font-family:var(--sy-font-family, sans-serif);font-size:var(--sy-font-size-base, 14px);display:inline-flex;align-items:center;height:100%}.label-title.sc-sy-label{display:flex;height:100%;padding-right:4px;align-items:center}.label-content.sc-sy-label{display:flex;height:100%}.required-mark-left.sc-sy-label{color:var(--text-error);margin-right:var(--spacing-4xsmall)}.required-mark-right.sc-sy-label{color:var(--text-error);margin-left:var(--spacing-4xsmall)}.align-left.sc-sy-label{text-align:left;justify-content:start}.align-right.sc-sy-label{text-align:right;justify-content:end}.align-center.sc-sy-label{text-align:center;justify-content:center}";

const SyLabel$1 = /*@__PURE__*/ proxyCustomElement(class SyLabel extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    disabled = false;
    required = false;
    requiredPosition = 'right';
    htmlFor = '';
    value = '';
    // Attribute mirrors the JS property name so `<sy-label valuePosition="right">`
    // works verbatim in storybook stories (HTML lowercases to `valueposition`, which
    // Stencil observes via the explicit attribute mapping).
    valuePosition = 'left';
    width = '';
    labelWidth = 'auto';
    implicitInput = null;
    internalHtmlFor = '';
    mutationObserver = null;
    resizeObserver = null;
    componentWillLoad() {
        this.requiredPosition = fnAssignPropFromAlias(this.host, 'required-position') ?? this.requiredPosition;
        const valuePos = fnAssignPropFromAlias(this.host, 'value-position');
        if (valuePos)
            this.valuePosition = valuePos;
        // width 초기 설정
        if (this.width && this.width.length) {
            this.labelWidth = this.getSizeValue(this.width);
        }
        else {
            this.labelWidth = 'auto';
        }
    }
    componentDidLoad() {
        // 초기 타겟 요소 업데이트
        this.updateTargetElement();
        // MutationObserver로 자식 요소 변경 감지
        this.observeChildren();
        // 초기 라벨 가능한 요소 찾기
        this.findAndApplyLabelingWithoutTriggeringRerender();
    }
    disconnectedCallback() {
        // MutationObserver 정리
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
        // ResizeObserver 정리
        if (this.resizeObserver && this.implicitInput) {
            this.resizeObserver.unobserve(this.implicitInput);
            this.resizeObserver = null;
        }
    }
    watchTargetProps() {
        this.updateTargetElement();
    }
    watchWidth() {
        if (this.width && this.width.length) {
            this.labelWidth = this.getSizeValue(this.width);
        }
        else {
            this.labelWidth = 'auto';
        }
    }
    observeChildren() {
        // 라벨 아이템 컨테이너 찾기
        const labelItem = this.host.querySelector('.label-item');
        if (!labelItem) {
            // 아직 렌더링되지 않은 경우 짧은 지연 후 재시도
            setTimeout(() => this.observeChildren(), 10);
            return;
        }
        // MutationObserver 생성
        this.mutationObserver = new MutationObserver((mutations) => {
            // 자식 노드가 변경되었을 때
            const hasChildListChange = mutations.some(mutation => mutation.type === 'childList' &&
                (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0));
            if (hasChildListChange) {
                this.findAndApplyLabeling();
            }
        });
        // 옵저버 시작
        this.mutationObserver.observe(labelItem, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
    }
    findAndApplyLabelingWithoutTriggeringRerender() {
        const labelItem = this.host.querySelector('.label-item');
        if (!labelItem)
            return;
        // 모든 자식 요소 가져오기
        const elements = Array.from(labelItem.children);
        // 라벨 가능한 요소 찾기
        const newImplicitInput = this.findLabelableElement(elements);
        // 이전과 다른 요소인 경우에만 업데이트
        if (newImplicitInput !== this.implicitInput) {
            // 이전 ResizeObserver 정리
            if (this.resizeObserver && this.implicitInput) {
                this.resizeObserver.unobserve(this.implicitInput);
                this.resizeObserver = null;
            }
            this.implicitInput = newImplicitInput;
            this.applyImplicitLabelingWithoutPropChange();
            // 새로운 요소에 ResizeObserver 설정 (필요한 경우)
            if (this.implicitInput) {
                this.setupResizeObserver();
            }
        }
    }
    findAndApplyLabeling() {
        const labelItem = this.host.querySelector('.label-item');
        if (!labelItem)
            return;
        // 모든 자식 요소 가져오기
        const elements = Array.from(labelItem.children);
        // 라벨 가능한 요소 찾기
        const newImplicitInput = this.findLabelableElement(elements);
        // 이전과 다른 요소인 경우에만 업데이트
        if (newImplicitInput !== this.implicitInput) {
            // 이전 ResizeObserver 정리
            if (this.resizeObserver && this.implicitInput) {
                this.resizeObserver.unobserve(this.implicitInput);
                this.resizeObserver = null;
            }
            this.implicitInput = newImplicitInput;
            this.applyImplicitLabeling();
            // 새로운 요소에 ResizeObserver 설정 (필요한 경우)
            if (this.implicitInput) {
                this.setupResizeObserver();
            }
        }
    }
    setupResizeObserver() {
        if (!this.implicitInput || !window.ResizeObserver)
            return;
        this.resizeObserver = new ResizeObserver(() => {
            // 크기 변경 시 필요한 작업 수행
            // 예: 라벨 정렬 업데이트 등
        });
        this.resizeObserver.observe(this.implicitInput);
    }
    findLabelableElement(elements) {
        // 라벨 가능한 요소 목록
        const labelableTypes = [
            'button', 'input', 'progress', 'select', 'textarea',
            'sy-button', 'sy-input', 'sy-input-number', 'sy-textarea', 'sy-select',
            'sy-progress-bar', 'sy-checkbox', 'sy-radio', 'sy-switch',
        ];
        // 직접적인 자식 요소 중 라벨 가능한 요소 찾기
        for (const element of elements) {
            const tagName = element.tagName.toLowerCase();
            // hidden 타입의 input은 제외
            if (tagName === 'input' && element.type === 'hidden') {
                continue;
            }
            if (labelableTypes.includes(tagName)) {
                return element;
            }
            // sy- 접두사 확인
            if (tagName.startsWith('sy-') && labelableTypes.some(type => tagName.includes(type))) {
                return element;
            }
            // 자식 요소 재귀적으로 확인 (깊이 우선 탐색)
            const childResult = this.findLabelableElement(Array.from(element.children));
            if (childResult) {
                return childResult;
            }
        }
        return null;
    }
    applyImplicitLabelingWithoutPropChange() {
        if (!this.implicitInput)
            return;
        // 요소에 id가 없으면 자동으로 생성
        if (!this.implicitInput.id) {
            this.implicitInput.id = `sy-label-input-${Math.random().toString(36).substring(2, 11)}`;
        }
        // htmlFor를 내부 변수에만 저장하고 prop은 변경하지 않음
        this.internalHtmlFor = this.implicitInput.id;
        // required 속성 설정
        if (this.required) {
            this.implicitInput.setAttribute('required', 'true');
            // 커스텀 컴포넌트인 경우 prop으로도 설정
            if (this.implicitInput.required !== undefined) {
                this.implicitInput.required = true;
            }
        }
        else {
            this.implicitInput.removeAttribute('required');
            if (this.implicitInput.required !== undefined) {
                this.implicitInput.required = false;
            }
        }
        // disabled 속성 설정
        if (this.disabled) {
            this.implicitInput.setAttribute('disabled', 'true');
            if (this.implicitInput.disabled !== undefined) {
                this.implicitInput.disabled = true;
            }
        }
        else {
            this.implicitInput.removeAttribute('disabled');
            if (this.implicitInput.disabled !== undefined) {
                this.implicitInput.disabled = false;
            }
        }
    }
    applyImplicitLabeling() {
        if (!this.implicitInput)
            return;
        // 요소에 id가 없으면 자동으로 생성
        if (!this.implicitInput.id) {
            this.implicitInput.id = `sy-label-input-${Math.random().toString(36).substring(2, 11)}`;
        }
        // htmlFor 속성이 명시적으로 설정되지 않은 경우에만 암시적 라벨링 적용
        const newHtmlFor = this.implicitInput.id;
        // Only update htmlFor if it's different to avoid re-render warnings
        if (this.htmlFor !== newHtmlFor) {
            this.htmlFor = newHtmlFor;
        }
        // required 속성 설정
        if (this.required) {
            this.implicitInput.setAttribute('required', 'true');
            // 커스텀 컴포넌트인 경우 prop으로도 설정
            if (this.implicitInput.required !== undefined) {
                this.implicitInput.required = true;
            }
        }
        else {
            this.implicitInput.removeAttribute('required');
            if (this.implicitInput.required !== undefined) {
                this.implicitInput.required = false;
            }
        }
        // disabled 속성 설정
        if (this.disabled) {
            this.implicitInput.setAttribute('disabled', 'true');
            if (this.implicitInput.disabled !== undefined) {
                this.implicitInput.disabled = true;
            }
        }
        else {
            this.implicitInput.removeAttribute('disabled');
            if (this.implicitInput.disabled !== undefined) {
                this.implicitInput.disabled = false;
            }
        }
    }
    updateTargetElement() {
        // 암시적 라벨링이 적용된 경우는 별도로 처리
        if (this.implicitInput && this.implicitInput.id === this.htmlFor) {
            this.applyImplicitLabeling();
            return;
        }
        // 명시적 라벨링 처리
        if (!this.htmlFor)
            return;
        // 전체 문서에서 ID로 요소 찾기
        const targetElement = document.getElementById(this.htmlFor);
        if (!targetElement)
            return;
        // required 속성 설정
        if (this.required) {
            targetElement.setAttribute('required', 'true');
            if (targetElement.required !== undefined) {
                targetElement.required = true;
            }
        }
        else {
            targetElement.removeAttribute('required');
            if (targetElement.required !== undefined) {
                targetElement.required = false;
            }
        }
        // disabled 속성 설정
        if (this.disabled) {
            targetElement.setAttribute('disabled', 'true');
            if (targetElement.disabled !== undefined) {
                targetElement.disabled = true;
            }
        }
        else {
            targetElement.removeAttribute('disabled');
            if (targetElement.disabled !== undefined) {
                targetElement.disabled = false;
            }
        }
    }
    getSizeValue(value) {
        if (!value)
            return '100%';
        // If the value is just a number, add 'px'
        if (/^\d+$/.test(value)) {
            return `${value}px`;
        }
        // Otherwise, return as is
        return value;
    }
    render() {
        const labelClass = {
            'label': true,
            [`align-${this.valuePosition}`]: true
        };
        // Use internalHtmlFor if set (from implicit labeling), otherwise use htmlFor prop
        const effectiveHtmlFor = this.internalHtmlFor || this.htmlFor || undefined;
        return (h("label", { key: '6a470b7026445b1b95100dfecfd64c9378f48556', class: Object.keys(labelClass).filter(k => labelClass[k]).join(' '), style: { width: this.labelWidth }, htmlFor: effectiveHtmlFor }, h("div", { key: '0cb367fbd05cdff8f071b4d79efe659e686526d0', class: "label-title" }, this.required && this.requiredPosition === 'left' && (h("span", { key: '7ebf587939d30febb437a4ee2a267399e17a63ac', class: "required-mark-left" }, "*")), h("span", { key: '41be565feae0abcd8a30a50035b4249393323373', class: "label-content" }, this.value), this.required && this.requiredPosition === 'right' && (h("span", { key: 'c076c7142ae1a801c26ca5ad53abed778032344f', class: "required-mark-right" }, "*"))), h("div", { key: 'feffbe26dfb7f75d25e9900eecbd8953369c7e59', class: "label-item" }, h("slot", { key: '82d9127b93d83751de90f7ee6ba0d90e8d720c11' }))));
    }
    static get watchers() { return {
        "htmlFor": ["watchTargetProps"],
        "required": ["watchTargetProps"],
        "disabled": ["watchTargetProps"],
        "width": ["watchWidth"]
    }; }
    static get style() { return syLabelCss; }
}, [262, "sy-label", {
        "disabled": [516],
        "required": [516],
        "requiredPosition": [1537, "requiredposition"],
        "htmlFor": [1025, "for"],
        "value": [1],
        "valuePosition": [1537, "valueposition"],
        "width": [1],
        "labelWidth": [32]
    }, undefined, {
        "htmlFor": ["watchTargetProps"],
        "required": ["watchTargetProps"],
        "disabled": ["watchTargetProps"],
        "width": ["watchWidth"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-label"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-label":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyLabel$1);
            }
            break;
    } });
}

const SyLabel = SyLabel$1;
const defineCustomElement = defineCustomElement$1;

export { SyLabel, defineCustomElement };
