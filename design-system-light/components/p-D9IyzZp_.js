import { p as proxyCustomElement, H, c as createEvent, h, a as Host } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$6 } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$5 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$4 } from './p-Dt2pN6ep.js';
import { d as defineCustomElement$3 } from './p-Dx2eAEw1.js';
import { d as defineCustomElement$2 } from './p-Bd6oegtc.js';
import { d as defineCustomElement$1 } from './p-C0DM0GPD.js';

const sySelectCss = "@charset \"UTF-8\";.sc-sy-select-h{display:block;position:relative;overflow:hidden;width:-webkit-fill-available;width:100%;position:relative}.sc-sy-select-h .error-container.sc-sy-select{display:none;width:100%;margin-top:var(--spacing-3xsmall);box-sizing:border-box;color:var(--required)}.sc-sy-select-h .popup-error-container.sc-sy-select{position:absolute;top:0;left:0;right:0;bottom:0;margin-top:0;z-index:1;pointer-events:none}.sc-sy-select-h .error-message.sc-sy-select{display:block;width:100%;height:100%}.sc-sy-select-h .error-message.sc-sy-select-s>*{display:block;width:100%;height:100%}.sc-sy-select-h .visible-error.sc-sy-select{display:block}sy-select[clearable].sc-sy-select-h .remove.sc-sy-select{display:none}sy-select[clearable].sc-sy-select-h .remove.sc-sy-select:active{color:var(--select-clearable-border-enabled)}sy-select[clearable].sc-sy-select-h .select-container.sc-sy-select:hover .remove.sc-sy-select{display:inline-flex}sy-select.sc-sy-select-h .status-error.sc-sy-select{border:var(--border-small) var(--select-form-border-error)}sy-select[readonly].sc-sy-select-h .select-container.sc-sy-select{border:var(--border-small) var(--select-form-border-readonly);background-color:var(--select-form-background-readonly);position:relative;cursor:auto}sy-select[readonly].sc-sy-select-h .select-container.sc-sy-select input.sc-sy-select{cursor:auto}.select-container.sc-sy-select{position:relative;display:flex;align-items:center;justify-content:space-between;border-radius:0px;border:var(--border-small) var(--select-form-border-enabled);border-radius:var(--border-radius-medium);gap:var(--spacing-3xsmall);box-sizing:border-box;background-color:var(--select-form-background-enabled);cursor:var(--cursor-button)}.select-container.sc-sy-select input.sc-sy-select{color:var(--select-form-text-enabled)}.select-container.sc-sy-select input.sc-sy-select::placeholder{color:var(--select-form-text-placeholder)}.select-container.size-medium.sc-sy-select{height:var(--component-medium);padding:0 var(--spacing-xsmall)}.select-container.size-medium.sc-sy-select input.sc-sy-select{font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;height:var(--component-small)}.select-container.size-large.sc-sy-select{height:var(--component-large);padding:0 var(--spacing-xsmall)}.select-container.size-large.sc-sy-select input.sc-sy-select{font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px;height:var(--component-medium)}.select-container.size-small.sc-sy-select{height:var(--component-small);padding:0 var(--spacing-xsmall);border-radius:var(--border-radius-small)}.select-container.size-small.sc-sy-select input.sc-sy-select{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;height:var(--component-xsmall)}.select-container.sc-sy-select:hover{border:var(--border-small) var(--select-form-border-hover);background-color:var(--select-form-background-hover)}.select-container.sc-sy-select:hover sy-icon.angle-down.sc-sy-select{color:var(--select-form-icon-hover)}.select-container.disabled.sc-sy-select{border:var(--border-small) var(--select-form-border-disabled);background-color:var(--select-form-background-disabled)}.select-container.disabled.sc-sy-select sy-tag.sc-sy-select{color:var(--select-form-text-disabled)}.select-container.disabled.sc-sy-select{cursor:auto}.select-container.disabled.sc-sy-select input.sc-sy-select{color:var(--select-form-text-disabled);cursor:auto !important}.select-container.disabled.sc-sy-select input.sc-sy-select::placeholder{color:var(--select-form-text-placeholder)}.select-container.disabled.sc-sy-select:hover .remove.sc-sy-select{display:none !important}.select-container.status-invalid.sc-sy-select{border:1px solid var(--select-form-border-error)}.select-container.sc-sy-select .tag-group.sc-sy-select{display:flex;gap:var(--spacing-3xsmall);overflow:hidden;align-items:center;flex:1;width:min-content}.select-container.sc-sy-select .tag-group.sc-sy-select .select-inner.sc-sy-select{color:var(--select-form-text-placeholder)}.select-container.sc-sy-select .tag-group.sc-sy-select input.sc-sy-select{background-color:transparent;border:var(--border-small) transparent;padding:0px;cursor:pointer;width:100%;flex:1}.select-container.sc-sy-select .tag-group.sc-sy-select input.sc-sy-select:focus{border:var(--border-small) transparent;outline:var(--border-small) transparent}.select-container.sc-sy-select .remove.sc-sy-select{cursor:pointer;position:absolute;right:7px;z-index:1;background:var(--background-default);color:var(--select-clearable-border-enabled)}.select-container.sc-sy-select .remove.sc-sy-select:hover{color:var(--select-clearable-icon-hover)}.select-container.sc-sy-select .remove.sc-sy-select:active{color:var(--select-clearable-icon-active)}.select-container.sc-sy-select sy-icon.angle-down.sc-sy-select{color:var(--select-form-icon-enabled)}.dropdown-content.sc-sy-select{max-height:0;overflow:hidden;transition:max-height 0.2s ease-out}.show.sc-sy-select{visibility:visible;max-height:200px}.hidden.sc-sy-select{visibility:hidden}slot.sc-sy-select{display:flex;flex-direction:column}.sc-sy-select-s>sy-option{cursor:var(--cursor-button)}.sc-sy-select-s>sy-option:hover{color:var(--select-form-text-hover);background-color:var(--select-form-background-hover)}sy-select[mode=multiple].sc-sy-select-h input.sc-sy-select{width:10px}";

const OPTION = 'SY-OPTION';
const SySelect = /*@__PURE__*/ proxyCustomElement(class SySelect extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.opened = createEvent(this, "opened");
        this.removed = createEvent(this, "removed");
        this.selected = createEvent(this, "selected");
        this.focused = createEvent(this, "focused");
        this.blured = createEvent(this, "blured");
        this.inputChanged = createEvent(this, "inputChanged");
        this.cleared = createEvent(this, "cleared");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    initialSelectedOptions = [];
    resizeObserver = null;
    optionsContainer = null;
    inputEl;
    searchTimeout;
    isComposing = false;
    boundDocumentKeydown = (event) => this.handleDocumentKeydown(event);
    boundUpdatePopupPosition = () => this.updatePopupPosition();
    opened;
    removed;
    selected;
    focused;
    blured;
    inputChanged;
    cleared;
    clearable = false;
    disabled = false;
    readonly = false;
    empty = false;
    error = false;
    hide = false;
    loading = false;
    maxTagCount = 0;
    defaultValue = '';
    placeholder = '';
    size = 'medium';
    mode = 'default';
    required = false;
    name = '';
    noNativeValidity = false;
    isTreeSelect = false;
    selectedOptions = [];
    isOpen = false;
    models = [];
    inputPlaceholder = '';
    options = []; // 타입을 인터페이스로 지정
    tempOption = null; // 타입을 인터페이스로 지정
    inputValue = '';
    activeOptionIndex = -1;
    touched = false;
    formSubmitted = false;
    isValid = true;
    validStatus = '';
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    handleOutsideClick = this.handleOutsideClickEvent.bind(this);
    connectedCallback() {
        document.addEventListener('click', this.handleOutsideClick);
        document.addEventListener('keydown', this.boundDocumentKeydown);
        this.initialSelectedOptions = [...this.selectedOptions];
        this.formSubmitListener();
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick);
        document.removeEventListener('keydown', this.boundDocumentKeydown);
        window.removeEventListener('resize', this.boundUpdatePopupPosition);
        window.removeEventListener('scroll', this.boundUpdatePopupPosition, true);
        this.formSubmitListenerRemover();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.cleanupOptionsFromDOM();
    }
    componentWillLoad() {
        this.maxTagCount = fnAssignPropFromAlias(this.host, 'max-tag-count') ?? this.maxTagCount;
        this.defaultValue = fnAssignPropFromAlias(this.host, 'default-value') ?? this.defaultValue;
        this.isTreeSelect = fnAssignPropFromAlias(this.host, 'is-tree-select') ?? this.isTreeSelect;
        this.selectedOptions = fnAssignPropFromAlias(this.host, 'selected-options') ?? this.selectedOptions;
        this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;
        this.isValid = true;
        this.validStatus = '';
    }
    componentDidLoad() {
        window.addEventListener('resize', this.boundUpdatePopupPosition);
        window.addEventListener('scroll', this.boundUpdatePopupPosition, true);
        const selectContainer = this.host.querySelector('.select-container');
        if (selectContainer) {
            this.resizeObserver = new ResizeObserver(() => {
                if (this.isOpen) {
                    this.updatePopupPosition();
                }
            });
            this.resizeObserver.observe(selectContainer);
        }
    }
    onIsOpenChange(newValue) {
        if (!newValue) {
            this.closeSelectOption();
        }
        else {
            this.openSelectOption();
        }
    }
    onEmptyChange() {
        this.removeEmptyOption();
    }
    onLoadingChange() {
        this.removeLoadingOption();
    }
    onModeChange() {
        let customOptions = [];
        if (this.mode === 'default' || this.mode === 'searchable') {
            this.models = this.models.slice(0, 1);
            this.updateModel();
        }
        if (!this.isTreeSelect) {
            this.options?.forEach((option) => {
                const isSelected = this.selectedOptions.some(o => o.value.toString() === option.value.toString() && !option.disabled);
                option.selected = isSelected;
                option.hide = isSelected && this.hide;
                if (option.isCustomTag) {
                    customOptions.push(option);
                }
            });
            if (customOptions.length) {
                this.selectedOptions = this.selectedOptions.filter(opt => customOptions.some(copt => copt.value.toString() === opt.value.toString() && copt.label?.toString() === opt.label?.toString()));
                this.options = this.options.filter(opt => !customOptions.some(copt => copt.value.toString() === opt.value.toString() && copt.label?.toString() === opt.label?.toString()));
                customOptions.forEach(copt => copt.remove());
            }
        }
        this.updatePlaceholder();
    }
    onDefaultValueChange(newValue, oldValue) {
        if (newValue !== oldValue) {
            // 다음 렌더링 사이클에서 실행하여 안정성 확보
            requestAnimationFrame(() => {
                this.applyDefaultValue();
            });
        }
    }
    onPlaceholderChange() {
        this.updatePlaceholder();
    }
    onSelectedOptionsChange(newVal, oldVal) {
        if (this.isTreeSelect && newVal !== oldVal) {
            // 기존 코드
            this.updateFormValue();
            this.updatePlaceholder();
            this.updateOptions();
        }
        else if (!this.isTreeSelect) {
            this.updateFormValue();
        }
    }
    formSubmitListener() {
        if (this.internals.form) {
            this.internals.form.addEventListener('submit', this.handleFormSubmit);
        }
    }
    formSubmitListenerRemover() {
        if (this.internals.form) {
            this.internals.form.removeEventListener('submit', this.handleFormSubmit);
        }
    }
    cleanupOptionsFromDOM() {
        try {
            if (this.optionsContainer && this.optionsContainer.parentNode === document.body) {
                document.body.removeChild(this.optionsContainer);
                this.optionsContainer = null;
            }
            const orphanedOptions = document.body.querySelectorAll('body > sy-option');
            orphanedOptions.forEach(option => {
                document.body.removeChild(option);
            });
        }
        catch (error) {
            console.error('옵션 요소 정리 중 오류 발생:', error);
        }
    }
    async setValue(values) {
        const value = Array.isArray(values) ? values.join(',') : values;
        if (this.mode === 'tag' || this.mode === 'multiple') {
            // tag/multiple 모드에서는 defaultValue를 업데이트
            this.defaultValue = value;
            this.applyDefaultValue();
        }
        else {
            this.inputValue = value;
            if (this.inputEl) {
                this.inputEl.value = value;
            }
        }
    }
    async clearValue() {
        // 태그 모드이고 입력 중일 때는 입력값을 유지
        if (this.mode === 'tag' && this.isComposing) {
            return;
        }
        this.inputValue = '';
        if (this.inputEl) {
            this.inputEl.value = '';
        }
    }
    async closeDropdown() {
        this.isOpen = false;
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.formSubmitted = true;
        this.updateValidityState();
    };
    applyDefaultValue() {
        // defaultValue가 없으면 아무것도 하지 않음
        if (!this.defaultValue) {
            // 기존 선택값 초기화 (옵션)
            // this.selectedOptions = [];
            // this.updateModel();
            return;
        }
        const newModels = this.defaultValue.split(',').map((element) => element.trim());
        if ((this.mode === 'default' || this.mode === 'searchable') && newModels?.length) {
            this.models = [newModels[0]];
        }
        else {
            this.models = newModels;
        }
        // 모델이 설정된 후, 모델에 따라 selectedOptions를 업데이트
        this.updateModel();
    }
    handleSlotChange() {
        // slot의 자식들이 준비되었으므로, defaultValue를 다시 적용합니다.
        this.applyDefaultValue();
    }
    updateModel() {
        if (this.isTreeSelect) {
            return;
            // if (this.models?.length) {
            //   this.selectedOptions = this.models.map(modelValue => ({
            //     value: modelValue,
            //     label: modelValue,
            //   }));
            //   if (this.mode === 'searchable') {
            //     this.inputValue = this.models[0];
            //   }
            // } else {
            //   this.selectedOptions = [];
            // }
        }
        else {
            // `this.host.children` 대신 `querySelectorAll` 사용
            const options = Array.from(this.host.querySelectorAll(OPTION));
            if (options?.length) {
                const filterOptions = options.filter(opt => this.models?.some(m => opt.value?.toString() && m === opt.value.toString() && !opt.disabled));
                if (filterOptions?.length) {
                    this.selectedOptions = filterOptions.map(opt => ({
                        value: opt.value.toString(),
                        label: !opt?.label ? opt.value.toString() : opt.label.toString(),
                    }));
                }
                else {
                    // defaultValue와 일치하는 옵션이 없는 경우, 선택을 비웁니다.
                    this.selectedOptions = [];
                }
            }
            else {
                // 옵션이 아직 없는 경우
                this.selectedOptions = [];
            }
        }
        // placeholder와 폼 값을 업데이트합니다.
        this.updatePlaceholder();
        this.updateFormValue();
    }
    toggleDropdown = (e) => {
        // When used as part of a TreeSelect, allow the parent `sy-tree-select`
        // to handle the click and control opening. In that case we must not
        // stop propagation here because it would prevent the parent handler
        // from receiving the event. For normal selects, keep the original
        // behavior of preventing default and stopping propagation.
        if (this.isTreeSelect) {
            // still respect disabled/readonly
            if (this.disabled || this.readonly) {
                return;
            }
            // Do not open the internal select popup for tree-select; parent will handle it
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        if (!this.isOpen || !this.optionsContainer) {
            this.allSelectClose();
            setTimeout(() => {
                this.isOpen = true;
                this.opened.emit();
            }, 0);
            this.activeOptionIndex = -1;
        }
    };
    openSelectOption() {
        this.renderOptionsPopup();
        this.initializePopup();
        this.updatePopupPosition();
        if (this.mode === 'searchable') {
            this.inputEl.value = '';
            this.inputPlaceholder = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : this.placeholder;
        }
        else if (this.mode === 'multiple' || this.mode === 'tag') {
            this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder ?? '' : '';
        }
        if (this.activeOptionIndex >= 0) {
            if (!this.optionsContainer)
                return;
            const options = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
            const visibleOptions = options.filter(opt => !opt.hide && !opt.disabled && !opt.readonly);
            this.setActiveOption(visibleOptions);
        }
    }
    appendOption(type, value = '') {
        if (type === 'loading') {
            this.appendLoadingOption();
        }
        else if (type === 'empty') {
            this.appendEmptyOption();
        }
        else {
            this.appendCustomTagOption(value);
        }
    }
    removeOption(type) {
        if (type === 'loading') {
            this.removeLoadingOption();
        }
        else if (type === 'empty') {
            this.removeEmptyOption();
        }
    }
    appendCustomTagOption(value) {
        if (!this.tempOption) {
            const option = document.createElement('sy-option');
            option.value = value;
            option.label = value;
            option.isCustomTag = true;
            option.addEventListener('activated', (e) => {
                e.stopPropagation();
                this.handleTemporaryOptionSelection(option);
            });
            this.tempOption = option;
            if (this.optionsContainer) {
                this.optionsContainer.insertBefore(option, this.optionsContainer.firstChild);
            }
        }
        else {
            this.tempOption.value = value;
            this.tempOption.label = value;
        }
    }
    handleTemporaryOptionSelection(option) {
        const selectedTempOption = { value: option.value, label: option.label };
        const exist = this.selectedOptions.some(o => o.value.toString() === selectedTempOption.value.toString() && o.label?.toString() === selectedTempOption.label?.toString());
        if (!exist) {
            // 새로운 태그 추가
            this.selectedOptions = [...this.selectedOptions, selectedTempOption];
            option.isCustomTag = true; // 커스텀 태그 플래그 설정
            // 기존 커스텀 태그는 보존하면서 새로운 태그 추가
            this.options = [...this.options.filter(opt => opt.isCustomTag), option];
            // 임시 옵션을 정식 옵션으로 변환
            this.tempOption = null;
        }
        else {
            // 이미 있는 태그 제거 - 하지만 커스텀 태그는 DOM에서 유지
            this.selectedOptions = this.selectedOptions.filter(o => o.value.toString() !== selectedTempOption.value.toString());
            // 임시 옵션만 제거하고 기존 커스텀 태그가 있다면 유지
            const existingCustomTag = this.options.find(opt => opt.isCustomTag &&
                opt.value.toString() === option.value.toString() &&
                opt.label?.toString() === option.label?.toString() &&
                opt !== option);
            if (!existingCustomTag) {
                option.remove();
            }
            this.tempOption = null;
        }
        this.inputValue = '';
        this.updateOptions();
        this.updatePlaceholder();
    }
    updateCustomTagOption(customTagOption, value, existOption) {
        customTagOption.value = value;
        customTagOption.label = value;
        customTagOption.dataset.preset = value;
        // 커스텀 태그가 선택되어 있는지 확인
        const isCustomTagSelected = this.selectedOptions.some(opt => opt.value.toString() === customTagOption.value.toString() &&
            opt.label?.toString() === customTagOption.label?.toString());
        // 동일한 값의 기존 옵션이 있고, 커스텀 태그가 선택되지 않았을 때만 숨김
        customTagOption.hide = !!(existOption &&
            customTagOption.label?.toString() === existOption.label?.toString() &&
            customTagOption.value.toString() === existOption.value.toString() &&
            !isCustomTagSelected);
    }
    appendLoadingOption() {
        const existingLoadingOption = this.optionsContainer?.querySelector('#syLoadingOption');
        if (!existingLoadingOption && this.optionsContainer) {
            const option = document.createElement('sy-option');
            option.id = 'syLoadingOption';
            option.loading = true;
            option.empty = false;
            this.optionsContainer.appendChild(option);
        }
    }
    removeLoadingOption() {
        const existingLoadingOption = this.optionsContainer?.querySelector('#syLoadingOption');
        if (existingLoadingOption) {
            existingLoadingOption.remove();
        }
    }
    appendEmptyOption() {
        const existingEmptyOption = this.optionsContainer?.querySelector('#syEmptyOption');
        if (!existingEmptyOption && this.optionsContainer) {
            const option = document.createElement('sy-option');
            option.id = 'syEmptyOption';
            option.readonly = true;
            option.loading = false;
            option.empty = true;
            option.hide = false;
            this.optionsContainer.appendChild(option);
        }
    }
    removeEmptyOption() {
        const existingEmptyOption = this.optionsContainer?.querySelector('#syEmptyOption');
        if (existingEmptyOption) {
            existingEmptyOption.remove();
        }
    }
    allSelectClose() {
        const allSelects = Array.from(document.querySelectorAll('sy-select'));
        allSelects.forEach(select => {
            if (select !== this.host) {
                select.closeDropdown?.();
            }
        });
    }
    updateOptions(isSearch = false, value) {
        if (this.optionsContainer) {
            const options = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
            const emptyOption = options.find(opt => opt.id === 'syEmptyOption');
            const normalOptions = options.filter(opt => opt.id !== 'syEmptyOption');
            let hasVisibleOptions = false;
            // 먼저 매칭되는 옵션이 있는지 확인 (현재 숨겨지지 않은 옵션들 중에서)
            const hasMatchingOptions = normalOptions.some(option => {
                const isMatching = !value || (value && option.label.toLowerCase().includes(value.toLowerCase()));
                return isMatching && !(this.hide && option.selected);
            });
            normalOptions.forEach(option => {
                const isMatchingSearch = !value || (value && option.label.toLowerCase().includes((value || '').toLowerCase()));
                option.selected = this.selectedOptions.some(opt => opt.value.toString() === option.value.toString());
                if (isSearch && value && value.trim()) {
                    if (hasMatchingOptions) {
                        // 매칭되는 항목이 있으면 검색 결과만 표시
                        option.hide = !isMatchingSearch;
                    }
                    else {
                        // 매칭되는 항목이 없으면 모든 옵션을 표시
                        option.hide = this.hide && option.selected;
                    }
                }
                else {
                    // 검색어가 없거나 검색 모드가 아닌 경우 모든 옵션 표시
                    option.hide = this.hide && option.selected;
                }
                if (!option.hide) {
                    hasVisibleOptions = true;
                }
            });
            if (this.mode === 'tag') {
                // 커스텀 태그와 기본 옵션 분리
                const customTags = normalOptions.filter(opt => opt.isCustomTag);
                const originOptions = normalOptions.filter(opt => !opt.isCustomTag);
                // 커스텀 태그 상태 관리
                customTags.forEach(tag => {
                    const isSelected = this.selectedOptions.some(opt => opt.value.toString() === tag.value.toString() &&
                        opt.label?.toString() === tag.label?.toString());
                    tag.selected = isSelected;
                    // 검색 필터링 - 검색어가 있을 때만 필터링 적용
                    let shouldHide = false;
                    if (isSearch && value && value.trim()) {
                        // 검색 중일 때: 검색어와 매치되는지 확인
                        const isMatch = tag.value.toLowerCase().includes(value.toLowerCase()) ||
                            tag.label.toLowerCase().includes(value.toLowerCase());
                        shouldHide = !isMatch;
                    }
                    else {
                        // 검색 중이 아닐 때: 선택된 태그만 hide 설정에 따라 숨김
                        // 선택되지 않은 커스텀 태그는 항상 표시
                        shouldHide = isSelected && this.hide;
                    }
                    tag.hide = shouldHide;
                    if (!tag.hide)
                        hasVisibleOptions = true;
                });
                // 기본 옵션 상태 관리
                originOptions.forEach(option => {
                    const isSelected = this.selectedOptions.some(opt => opt.value.toString() === option.value.toString() &&
                        opt.label?.toString() === option.label?.toString());
                    option.selected = isSelected;
                    // 검색 필터링 - 검색어가 있을 때만 필터링 적용
                    let shouldHide = false;
                    if (isSearch && value && value.trim()) {
                        // 검색 중일 때: 검색어와 매치되는지 확인
                        const isMatch = option.value.toLowerCase().includes(value.toLowerCase()) ||
                            option.label.toLowerCase().includes(value.toLowerCase());
                        shouldHide = !isMatch;
                    }
                    else {
                        // 검색 중이 아닐 때: 선택된 옵션은 hide 설정에 따라
                        shouldHide = isSelected && this.hide;
                    }
                    option.hide = shouldHide;
                    if (!option.hide)
                        hasVisibleOptions = true;
                });
                if (this.hide) {
                    const visibleOptions = originOptions.filter(opt => !opt.hide && !opt.selected).length;
                    if (visibleOptions === 0 && !this.inputValue?.trim()) {
                        if (!emptyOption)
                            this.appendOption('empty');
                    }
                    else {
                        this.removeOption('empty');
                    }
                }
            }
            else {
                if (!hasVisibleOptions) {
                    if (!emptyOption)
                        this.appendOption('empty');
                }
                else {
                    this.removeOption('empty');
                }
            }
        }
        if (this.inputEl) {
            this.updatePlaceholder();
        }
    }
    updatePlaceholder() {
        if (this.inputEl) {
            if (this.mode === 'searchable') {
                this.inputEl.value = this.inputValue;
                this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : this.selectedOptions[0]?.label ?? '';
            }
            else if (this.mode === 'default') {
                this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : '';
                this.inputEl.value = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : '';
            }
            else {
                // tag/multiple 모드
                this.inputEl.value = '';
                this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : '';
            }
        }
    }
    handleTagRemove(event, itemToRemove) {
        // 1. 이벤트의 기본 동작(sy-tag의 자체 제거)을 막겠다는 의도를 명확히 합니다.
        //    실제 sy-tag가 preventDefault를 지원하지 않으므로, 이 이벤트의 전파를 막아
        //    다른 리스너가 반응하지 않도록 합니다.
        event.stopPropagation();
        event.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        // 2. 이 코드가 실행되는 시점에는 sy-tag의 `this.host.remove()`가 아직 호출되지 않았습니다.
        //    (이벤트 리스너는 이벤트 발생 즉시 동기적으로 실행되므로)
        //    따라서 경쟁 상태가 발생하기 전에 상태를 먼저 업데이트합니다.
        this.selectedOptions = this.selectedOptions.filter(option => !(option.value === itemToRemove.value && option.label === itemToRemove.label));
        // 3. 상태가 업데이트되었으므로 Stencil이 리렌더링을 예약합니다.
        //    이제 Stencil의 VDOM 엔진이 유일한 진실의 원천(Single Source of Truth)이 되어
        //    key를 기반으로 정확한 sy-tag DOM 노드를 제거할 것입니다.
        //    sy-tag 자체의 remove() 로직은 이 리렌더링 사이클에서 사실상 무시됩니다.
        //    (제거될 컴포넌트의 후속 로직은 의미가 없으므로)
        // 4. 나머지 후속 처리 로직을 실행합니다.
        this.updateValidityState();
        this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder ?? '' : '';
        this.removed.emit({
            item: itemToRemove,
            selectedOptions: this.selectedOptions,
            isValid: this.isValid,
            status: this.validStatus,
        });
        if (this.optionsContainer) {
            this.updatePopupPosition();
        }
        this.updateOptions();
    }
    handleSearchInputFocus = (e) => {
        e.stopPropagation();
        this.removeEmptyOption();
        if (!this.isTreeSelect) {
            // searchable 모드에서는 입력창만 비우고 선택 상태는 유지
            if (this.mode === 'searchable') {
                e.target.value = '';
                this.inputValue = '';
            }
            this.updateOptions();
        }
        this.focused.emit();
    };
    handleSearchInputBlur = (e) => {
        e.stopPropagation();
        this.touched = true;
        // tree-select이고 tag 모드일 때는 input을 비워둠
        if (this.isTreeSelect && this.mode === 'tag') {
            this.inputValue = '';
            if (this.inputEl) {
                this.inputEl.value = '';
            }
        }
        else {
            // 기존 로직
            const currentInput = this.inputEl?.value || '';
            const isValidInput = this.options.some(opt => opt.label === currentInput);
            if (!isValidInput) {
                if (this.selectedOptions?.length > 0) {
                    this.inputValue = this.selectedOptions[0].label ?? '';
                    if (this.inputEl) {
                        this.inputEl.value = this.inputValue;
                    }
                }
                else {
                    this.inputValue = '';
                    if (this.inputEl) {
                        this.inputEl.value = '';
                    }
                }
            }
        }
        this.updateValidityState();
        this.blured.emit();
    };
    handleDocumentKeydown = (e) => {
        if (!this.isOpen || !this.optionsContainer)
            return;
        const options = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
        const availableOptions = options.filter(opt => !opt.hide);
        switch (e.code) {
            case 'ArrowDown':
                e.preventDefault();
                this.navigateOptions('down', availableOptions);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateOptions('up', availableOptions);
                break;
            case 'Enter':
                e.preventDefault();
                this.handleEnterKey(options, availableOptions);
                break;
            case 'Backspace':
                this.handleBackspace();
                break;
        }
    };
    handleEnterKey(allSlotOptions, visibleOptions) {
        // If there's exactly one visible option, select it regardless of active state
        if (this.isTreeSelect) {
            return;
        }
        if (visibleOptions.length === 1) {
            if (this.mode === 'searchable' || this.mode === 'multiple') {
                const visibleOption = visibleOptions[0];
                if (!visibleOption.disabled && !visibleOption.readonly) {
                    this.optionSelection(visibleOption);
                }
                else {
                    // If the only visible option is disabled/readonly, show all options
                    allSlotOptions.forEach(opt => {
                        opt.hide = this.hide && opt.selected ? true : false;
                    });
                }
            }
        }
        // If there are multiple visible options and one is active, select the active option
        else if (visibleOptions.length > 1 && this.activeOptionIndex >= 0) {
            const activeOption = visibleOptions[this.activeOptionIndex];
            if (activeOption && !activeOption.disabled && !activeOption.readonly) {
                this.optionSelection(activeOption);
            }
        }
        // If there are no visible options or only disabled/readonly options are visible
        else if (visibleOptions.length === 0 || visibleOptions.every(opt => opt.disabled || opt.readonly)) {
            this.removeOption('empty');
            // Show all options again with their original hide state
            allSlotOptions.forEach(opt => {
                opt.hide = this.hide && opt.selected ? true : false;
            });
            this.clearValue();
        }
        // Handle tag mode specific logic
        if (this.inputValue?.length && this.mode === 'tag') {
            const existSelectedOption = this.selectedOptions.find(opt => opt.label === this.inputValue);
            const options = this.optionsContainer?.querySelectorAll('sy-option');
            if (!options || !this.optionsContainer) {
                return;
            }
            const allOptionsInDOM = Array.from(options);
            const existOriginOption = allOptionsInDOM.filter(opt => !opt.isCustomTag).find(opt => opt.label === this.inputValue);
            if (existOriginOption) {
                allOptionsInDOM.forEach(option => {
                    let isSameContent = false;
                    isSameContent = option.label === this.inputValue;
                    if (isSameContent) {
                        option.selected = !option.selected;
                        if (option.selected) {
                            this.selectedOptions.push({ value: option.value, label: option.label });
                        }
                        else {
                            this.selectedOptions = this.selectedOptions.filter(opt => opt.value.toString() !== option.value.toString());
                        }
                    }
                    option.hide = this.hide && option.selected ? true : false;
                });
            }
            else if (!existSelectedOption) {
                this.appendCustomTagOption(this.inputValue);
                if (this.tempOption) {
                    this.handleTemporaryOptionSelection(this.tempOption);
                }
            }
            else {
                const exist = allOptionsInDOM.find(opt => opt.value.toString() === existSelectedOption.value.toString());
                if (exist) {
                    exist.remove();
                }
                this.selectedOptions = this.selectedOptions.filter(opt => opt.value.toString() !== existSelectedOption.value.toString());
                let filteredAllOptions = allOptionsInDOM.filter(opt => opt.value.toString() !== existSelectedOption.value.toString());
                filteredAllOptions = filteredAllOptions.map(opt => {
                    opt.hide = this.hide && opt.selected ? true : false;
                    return opt;
                });
                this.options = filteredAllOptions;
            }
        }
        this.tempOption = null;
        if (this.mode !== 'searchable') {
            this.clearValue();
        }
    }
    handleBackspace() {
        if (this.mode === 'multiple' || this.mode === 'tag') {
            if (this.selectedOptions?.length > 0 && this.inputValue?.length === 0) {
                this.selectedOptions.pop();
                if (!this.optionsContainer)
                    return;
                const options = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
                options.forEach(option => {
                    const exist = this.selectedOptions.some(opt => opt.value.toString() === option.value.toString());
                    if (!exist) {
                        option.hide = false;
                        option.selected = false;
                        if (option.isCustomTag) {
                            option.remove();
                        }
                    }
                });
            }
        }
    }
    navigateOptions(direction, visibleOptions) {
        if (!visibleOptions.length || this.isTreeSelect)
            return;
        if (this.activeOptionIndex === -1) {
            this.activeOptionIndex = direction === 'down' ? 0 : visibleOptions.length - 1;
        }
        else {
            if (direction === 'down') {
                this.activeOptionIndex = (this.activeOptionIndex + 1) % visibleOptions.length;
            }
            else {
                this.activeOptionIndex = (this.activeOptionIndex - 1 + visibleOptions.length) % visibleOptions.length;
            }
        }
        this.setActiveOption(visibleOptions);
    }
    setActiveOption(visibleOptions) {
        visibleOptions.forEach((option, index) => {
            option.active = index === this.activeOptionIndex;
        });
        const activeOption = visibleOptions[this.activeOptionIndex];
        if (activeOption) {
            activeOption.scrollIntoView({ block: 'nearest' });
        }
    }
    handleSearchInputChanged = (e) => {
        const value = e.target.value;
        this.inputValue = value;
        if (!this.isComposing) {
            // 즉시 검색 실행
            this.performSearch(value);
        }
        e.stopPropagation();
    };
    performSearch = (searchValue) => {
        this.activeOptionIndex = -1;
        if (this.isTreeSelect || this.optionsContainer) {
            if (!this.isTreeSelect) {
                const options = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
                options.forEach(option => option.active = false);
                // 검색어가 비어있지 않으면 검색 실행
                if (searchValue && searchValue.trim()) {
                    this.updateOptions(true, searchValue);
                }
                else {
                    // 검색어가 비어있으면 모든 옵션 표시
                    this.updateOptions(false, '');
                }
                if (this.mode === 'tag') {
                    const existOption = options.find(opt => opt.label === searchValue);
                    if (existOption) {
                        existOption.hide = false;
                        this.tempOption?.remove();
                        this.tempOption = null;
                    }
                    else if (searchValue) {
                        this.appendOption('option', searchValue);
                        if (this.tempOption) {
                            this.updateCustomTagOption(this.tempOption, searchValue, existOption);
                        }
                    }
                    else {
                        this.tempOption?.remove();
                        this.tempOption = null;
                    }
                }
            }
            this.inputChanged.emit(searchValue);
        }
    };
    handleOutsideClickEvent(e) {
        if (!this.isOpen)
            return;
        const target = e.target;
        const selectContainer = this.host.querySelector('.select-container');
        const isInsideSelect = selectContainer?.contains(target) || this.host.contains(target);
        const closestSyOption = target.closest('sy-option');
        const isInsideContainer = this.optionsContainer?.contains(target) ||
            target === this.optionsContainer ||
            target.tagName === 'SY-OPTION' ||
            closestSyOption !== null;
        if (!isInsideSelect && !isInsideContainer) {
            if (this.optionsContainer?.dataset?.mode === 'tag') {
                this.tempOption = null;
                if (this.inputEl) {
                    this.inputEl.value = '';
                }
                this.options = this.options.filter(opt => opt.isCustomTag);
            }
            else if (this.optionsContainer?.dataset?.mode === 'searchable' && this.inputEl) {
                this.inputEl.value = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : '';
                this.inputPlaceholder = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : this.placeholder;
            }
            this.closeSelectOption();
            this.isOpen = false;
        }
    }
    optionSelection(option) {
        if (option.nodeName === OPTION) {
            if (option.disabled || option.readonly) {
                return;
            }
            const { value, label: optLabel } = option;
            const label = !optLabel ? value : optLabel;
            const selectedOption = { value, label };
            if (this.mode !== 'default' && this.mode !== 'searchable') {
                // value로만 비교하여 존재 여부 확인
                const exist = this.selectedOptions.some(opt => opt.value.toString() === value?.toString());
                if (exist) {
                    // value로만 비관하여 선택 해제
                    this.selectedOptions = this.selectedOptions.filter(opt => opt.value.toString() !== value?.toString());
                    // 커스텀 태그 선택 해제 시 DOM과 options 배열에서 제거
                    if (this.mode === 'tag' && option.isCustomTag) {
                        // options 배열에서 커스텀 태그 제거
                        this.options = this.options.filter(opt => !(opt.isCustomTag &&
                            opt.value.toString() === value?.toString() &&
                            opt.label?.toString() === label?.toString()));
                        // DOM에서 커스텀 태그 제거
                        if (this.optionsContainer) {
                            const customTagsInDOM = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
                            customTagsInDOM.forEach(opt => {
                                if (opt.isCustomTag &&
                                    opt.value.toString() === value?.toString() &&
                                    opt.label?.toString() === label?.toString()) {
                                    opt.remove();
                                }
                            });
                        }
                    }
                    else {
                        // 일반 옵션의 경우 선택 해제만
                        if (this.optionsContainer) {
                            const allOptions = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
                            allOptions.forEach(opt => {
                                if (opt.value.toString() === value?.toString()) {
                                    opt.selected = false;
                                    opt.hide = false;
                                    opt.removeAttribute('selected');
                                }
                            });
                        }
                    }
                }
                else {
                    // 태그 모드에서 사용자 정의 태그 처리
                    if (this.mode === 'tag' && option.isCustomTag) {
                        // 사용자 정의 태그는 options에 추가
                        if (!this.options.some(opt => opt.value.toString() === value?.toString() &&
                            opt.label?.toString() === label?.toString())) {
                            this.options = [...this.options, option];
                        }
                    }
                    // 기본 옵션 처리
                    else if (!option.isCustomTag) {
                        // 기존 커스텀 태그는 유지하면서 새로운 옵션 추가
                        this.options = [...this.options.filter(opt => opt.isCustomTag ||
                                (opt.value.toString() !== value?.toString() ||
                                    opt.label?.toString() !== label?.toString())), option];
                    }
                    this.selectedOptions = [...this.selectedOptions, selectedOption];
                    option.selected = true;
                    option.hide = !!this.hide;
                }
                this.touched = true;
                this.updateValidityState();
                this.selected.emit({ selectedOptions: this.selectedOptions, isValid: this.isValid, status: this.validStatus });
            }
            else {
                this.selectedOptions = [selectedOption];
                this.options?.forEach((opt) => {
                    opt.selected = false;
                    opt.hide = false;
                });
                option.selected = true;
                option.setAttribute('selected', '');
                option.hide = !!this.hide;
                this.touched = true;
                if (this.mode === 'default') {
                    this.isOpen = false;
                }
                this.updateValidityState();
                this.selected.emit({
                    selectedOptions: this.selectedOptions,
                    isValid: this.isValid,
                    status: this.validStatus,
                });
            }
            this.updateOptions();
            this.updatePopupPosition();
        }
    }
    renderOptionsPopup() {
        if (this.isTreeSelect) {
            // Tree-select manages its own popup, so don't render anything here
            return;
        }
        if (!this.optionsContainer) {
            const popupContainer = document.createElement('div');
            popupContainer.classList.add('sy-select-options-container');
            popupContainer.dataset.mode = this.mode;
            document.body.appendChild(popupContainer);
            this.optionsContainer = popupContainer;
            if (this.loading) {
                this.appendOption('loading');
            }
            else if (this.empty) {
                this.appendOption('empty');
            }
            else {
                const slotOptions = Array.from(this.host.querySelectorAll(OPTION));
                // 커스텀 태그 처리
                // 선택된 커스텀 태그만 유지 (선택 해제된 커스텀 태그는 제거)
                const existingCustomTags = this.mode === 'tag' ?
                    this.options.filter(opt => opt.isCustomTag &&
                        this.selectedOptions.some(selected => selected.value.toString() === opt.value.toString() &&
                            selected.label?.toString() === opt.label?.toString()))
                    : [];
                // options 배열에서 선택되지 않은 커스텀 태그 제거
                if (this.mode === 'tag') {
                    this.options = this.options.filter(opt => !opt.isCustomTag ||
                        this.selectedOptions.some(selected => selected.value.toString() === opt.value.toString() &&
                            selected.label?.toString() === opt.label?.toString()));
                }
                // 새로운 커스텀 태그 생성
                const newCustomTags = this.mode === 'tag' ?
                    this.selectedOptions
                        .filter(opt => !slotOptions.some(slot => slot.value.toString() === opt.value.toString() &&
                        slot.label?.toString() === opt.label?.toString()) &&
                        !existingCustomTags.some(existing => existing.value.toString() === opt.value.toString() &&
                            existing.label?.toString() === opt.label?.toString()))
                        .map(opt => {
                        const customOption = document.createElement('sy-option');
                        customOption.value = opt.value.toString();
                        customOption.label = opt.label?.toString() || opt.value?.toString();
                        customOption.isCustomTag = true;
                        return customOption;
                    })
                    : [];
                // 전체 옵션 병합 - 기존 커스텀 태그, 새 커스텀 태그, 기본 옵션 순서로
                const allOptions = [...existingCustomTags, ...newCustomTags, ...slotOptions];
                this.options = allOptions;
                allOptions.forEach((option) => {
                    const isSelected = this.selectedOptions?.some(opt => opt.value.toString() === option.value.toString() && !option.disabled);
                    option.selected = isSelected;
                    option.hide = isSelected && this.hide;
                });
                if (allOptions.filter((opt) => !opt.hide).length === 0 && !(this.mode === 'tag' && this.inputValue?.trim())) {
                    this.appendOption('empty');
                }
                else {
                    this.removeOption('empty');
                }
                allOptions.forEach((option, index) => {
                    const optionClone = option.cloneNode(true);
                    // @ts-ignore
                    optionClone.index = index;
                    optionClone.selected = option.selected;
                    optionClone.hide = option.hide;
                    optionClone.disabled = option.disabled;
                    optionClone.isCustomTag = option.isCustomTag;
                    // 선택 상태를 명시적으로 설정하고 DOM에 반영
                    if (option.selected) {
                        optionClone.setAttribute('selected', '');
                        optionClone.selected = true;
                    }
                    if (optionClone?.label && optionClone?.textContent && optionClone?.label.trim() === optionClone?.textContent.trim()) {
                        optionClone.textContent = '';
                    }
                    optionClone.addEventListener('mouseenter', () => {
                        if (!optionClone.disabled && !optionClone.readonly && !optionClone.hide) {
                            if (!this.optionsContainer)
                                return;
                            const options = Array.from(this.optionsContainer.querySelectorAll('sy-option'));
                            const visibleOptions = options.filter(opt => !opt.hide && !opt.disabled && !opt.readonly);
                            this.activeOptionIndex = visibleOptions.findIndex(opt => opt === optionClone);
                            visibleOptions.forEach((opt, idx) => {
                                opt.active = idx === this.activeOptionIndex;
                            });
                        }
                    });
                    optionClone.addEventListener('activated', (e) => {
                        e.stopPropagation();
                        this.optionSelection(optionClone);
                        if ((this.mode === 'default' || this.mode === 'searchable') && !optionClone.readonly && !optionClone.disabled) {
                            this.isOpen = false;
                        }
                        // 태그 모드에서는 tempOption을 자동으로 제거하지 않음
                        // tempOption의 제거는 handleTemporaryOptionSelection에서 처리
                    });
                    this.optionsContainer?.appendChild(optionClone);
                });
            }
        }
    }
    initializePopup() {
        if (this.optionsContainer) {
            this.optionsContainer.style.display = 'none';
            this.optionsContainer.style.position = 'absolute';
            this.optionsContainer.style.overflow = 'hidden';
            this.optionsContainer.style.boxShadow = '0px 4px 8px rgba(0 0 0 / 0.24)';
            this.optionsContainer.style.borderRadius = '3px';
        }
    }
    closeSelectOption() {
        if (this.optionsContainer) {
            this.removeOption('loading');
            if (this.inputEl && !this.selectedOptions?.length) {
                this.inputValue = '';
                this.inputEl.value = '';
            }
            this.initializePopup();
            this.models = [];
            if (this.mode === 'tag') {
                this.options = this.options.filter(opt => opt.isCustomTag);
            }
            else {
                this.options = [];
            }
            this.optionsContainer.remove();
            this.optionsContainer = null;
        }
    }
    updatePopupPosition() {
        if (this.isOpen && this.optionsContainer) {
            const selectContainer = this.host.querySelector('.select-container');
            if (selectContainer) {
                requestAnimationFrame(() => {
                    if (!this.optionsContainer)
                        return;
                    const selectContainerRect = selectContainer.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    this.optionsContainer.style.display = 'block';
                    this.optionsContainer.style.position = 'absolute';
                    this.optionsContainer.style.boxSizing = 'border-box';
                    this.optionsContainer.style.marginTop = '4px';
                    this.optionsContainer.style.maxHeight = '300px';
                    this.optionsContainer.style.width = `${selectContainerRect.width}px`;
                    this.optionsContainer.style.overflowY = 'hidden';
                    this.repositionByscrollY(selectContainerRect, viewportHeight);
                    this.optionsContainer.style.left = `${selectContainerRect.left + window.scrollX}px`;
                });
            }
        }
    }
    repositionByscrollY(selectContainerRect, viewportHeight) {
        if (!this.optionsContainer)
            return;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const spaceBelow = viewportHeight - selectContainerRect.bottom;
        const spaceAbove = selectContainerRect.top;
        const popupHeight = this.optionsContainer.scrollHeight;
        let newTop = 0;
        if (spaceBelow >= popupHeight) {
            newTop = selectContainerRect.bottom + scrollY;
        }
        else if (spaceAbove >= popupHeight) {
            newTop = selectContainerRect.top - popupHeight + scrollY;
        }
        else {
            newTop = spaceBelow > spaceAbove ? selectContainerRect.bottom + scrollY : selectContainerRect.top - popupHeight + scrollY;
        }
        this.optionsContainer.style.top = `${newTop}px`;
        this.optionsContainer.style.bottom = 'auto';
        this.optionsContainer.style.overflowY = 'auto';
    }
    // private handleTagClick = (e: any) => {
    //   console.log({ e });
    // };
    handleClearClick = (e) => {
        e.stopPropagation();
    };
    handleClear = (e) => {
        e.stopPropagation();
        this.removeEmptyOption();
        const optionList = Array.from(this.host.querySelectorAll('sy-option'));
        this.inputPlaceholder = this.placeholder;
        if (this.inputEl)
            this.inputEl.value = '';
        this.selectedOptions = [];
        this.models = [];
        if (this.optionsContainer) {
            const liveOptions = Array.from(this.optionsContainer.children);
            liveOptions.forEach(opt => {
                if (this.mode === 'tag' && opt.isCustomTag) {
                    opt.remove();
                }
                else {
                    opt.selected = false;
                    opt.hide = false;
                }
            });
            this.updatePopupPosition();
        }
        optionList.forEach(opt => {
            opt.selected = false;
            opt.hide = false;
        });
        this.cleared.emit();
    };
    updateFormValue() {
        if (!this.selectedOptions.length) {
            this.internals.setFormValue(null);
        }
        else if (this.mode === 'multiple' || this.mode === 'tag') {
            const formData = new FormData();
            this.selectedOptions.forEach(option => {
                formData.append(this.name, option.value);
            });
            this.internals.setFormValue(formData);
        }
        else {
            this.internals.setFormValue(this.selectedOptions[0]?.value || null);
        }
        this.updateValidityState();
    }
    formAssociatedCallback() {
        this.updateFormValue();
    }
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    formResetCallback() {
        this.options?.forEach((opt) => {
            opt.selected = false;
            opt.hide = false;
        });
        if (this.isTreeSelect) {
            this.selectedOptions = [];
            this.models = [];
            this.inputValue = '';
            if (this.inputEl)
                this.inputEl.value = '';
        }
        else {
            this.selectedOptions = [...this.initialSelectedOptions];
            if (this.defaultValue) {
                this.models = this.defaultValue.split(',').map(element => element.trim());
                this.updateModel();
            }
            else {
                this.selectedOptions = [];
            }
        }
        this.touched = false;
        this.formSubmitted = false;
        this.updateFormValue();
        this.updatePlaceholder();
        this.updateValidityState();
    }
    formStateRestoreCallback(state) {
        if (!state) {
            this.selectedOptions = [];
        }
        else if (state instanceof FormData) {
            const formValues = state.getAll(this.name);
            const values = formValues.map(value => value.toString());
            this.models = values;
            this.updateModel();
        }
        else if (typeof state === 'string') {
            this.models = [state];
            this.updateModel();
        }
        this.updatePlaceholder();
        this.updateOptions();
    }
    async setCustomError() {
        this.customSettingError();
    }
    async clearCustomError() {
        if (!this.isValid && this.validStatus === 'custom') {
            this.validStatus = '';
        }
        this.updateValidityState();
    }
    get validity() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return {
                badInput: false,
                customError: this.validStatus === 'custom',
                patternMismatch: false,
                rangeOverflow: false,
                rangeUnderflow: false,
                stepMismatch: false,
                tooLong: false,
                tooShort: false,
                typeMismatch: false,
                valid: false,
                valueMissing: this.validStatus === 'valueMissing',
            };
        }
        return this.internals.validity;
    }
    get validationMessage() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return this.getErrorMessage(this.validStatus);
        }
        return this.internals.validationMessage;
    }
    get willValidate() {
        return this.internals.willValidate;
    }
    async checkValidity() {
        this.updateValidityState();
        return this.internals.checkValidity();
    }
    async reportValidity() {
        this.updateValidityState();
        return this.internals.reportValidity();
    }
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority — use slot text as the
        // validity message so reportValidity surfaces the same copy that's on
        // screen. Matches autocomplete's setCustomError flow.
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || 'Custom validation error';
            this.internals.setValidity({ customError: true }, msg);
            return;
        }
        this.isValid = true;
        this.validStatus = '';
        if (this.required && (!this.selectedOptions || this.selectedOptions.length === 0)) {
            this.isValid = false;
            this.validStatus = 'valueMissing';
        }
        const validityMessage = this.getErrorMessage(this.validStatus);
        if (!this.isValid) {
            if (this.hasSlotErrorMessage) {
                const slotText = this.getSlotErrorText() || validityMessage || ' ';
                this.internals.setValidity({ customError: true }, slotText);
            }
            else {
                this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
            }
        }
        else {
            this.internals.setValidity({});
        }
    }
    customSettingError() {
        this.isValid = false;
        this.validStatus = 'custom';
        // Force visual invalid state immediately — developer-triggered errors
        // shouldn't wait for the user to interact with the select.
        this.touched = true;
        // Slot UI becomes the surface for programmatic errors regardless of the
        // noNativeValidity toggle.
        const errorSlot = this.host.querySelector('[slot="error"]');
        this.hasSlotErrorMessage =
            !!errorSlot && ((errorSlot.textContent?.trim().length ?? 0) > 0 || errorSlot.children.length > 0);
        this.updateValidityState();
    }
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        this.isValid = false;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;
        // Same clear-cut toggle used across every form-associated component:
        //   noNativeValidity=true  → native popup suppressed, slot = UI
        //   noNativeValidity=false → browser shows native popup; do NOT call
        //     preventDefault (per HTML spec, one preventDefaulted invalid event
        //     suppresses popups on the entire form).
        if (this.noNativeValidity) {
            e.preventDefault();
            e.stopPropagation();
            this.hasSlotErrorMessage = slotHasContent;
            if (slotHasContent) {
                this.host.setAttribute('has-custom-error', '');
                this.internals.setValidity({ customError: true }, ' ');
            }
            else {
                this.host.removeAttribute('has-custom-error');
            }
        }
        else {
            this.hasSlotErrorMessage = false;
            this.host.removeAttribute('has-custom-error');
        }
        this.updateValidityState();
    }
    handleCustomErrorSlot = () => {
        const errorSlot = this.host.querySelector('slot[name="error"]');
        if (!errorSlot)
            return;
        const errorNodes = errorSlot.assignedNodes();
        this.hasPopupErrorComponent = errorNodes.some(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                const tagName = element.tagName?.toLowerCase() || '';
                if (['sy-tooltip', 'sy-popover', 'sy-popconfirm', 'sy-inline-message'].includes(tagName)) {
                    return true;
                }
                return !!element.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
            }
            return false;
        });
        this.hasSlotErrorMessage = errorNodes.some(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                return true;
            }
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                return !!(element.textContent?.trim() || element.children.length > 0);
            }
            return false;
        });
    };
    getErrorMessage(type) {
        const validityMessage = {
            valueMissing: 'Please select an option',
            custom: 'Invalid by custom',
        };
        return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
    }
    render() {
        const optionList = (this.mode !== 'default' && this.mode !== 'searchable') && this.maxTagCount > 0
            ? this.selectedOptions.slice(0, this.maxTagCount)
            : [...this.selectedOptions];
        const overFlowList = (this.mode !== 'default' && this.mode !== 'searchable') && this.maxTagCount > 0 ? this.selectedOptions.slice(this.maxTagCount) : [];
        return (h(Host, { key: 'fce8c10c0f6cb9914cfd8ea60903e03436f2dee5' }, h("div", { key: '32a78f812971b91545aa987eb465f8d3e5492911', style: { display: 'none' } }, h("slot", { key: 'd28e605d4c7b89e658fffda0b53e7800d8f39bd3', onSlotchange: this.handleSlotChange.bind(this) })), h("div", { key: 'e23dd861fa1be87895d6e86c0eaea6c2a2e6139b', class: {
                'select-container': true,
                open: this.isOpen,
                disabled: this.disabled,
                'status-error': this.error,
                // 'this.form-submitted' -> 'this.formSubmitted' 오타 수정
                'status-invalid': (this.formSubmitted || this.touched) && this.required && !this.isValid,
                'size-small': this.size === 'small',
                'size-medium': this.size === 'medium',
                'size-large': this.size === 'large',
            }, onClick: this.toggleDropdown }, h("div", { key: 'd04baabd4c8c2c23a4783145efc13530a527e357', class: "tag-group" }, this.selectedOptions?.length > 0 && (this.mode === 'multiple' || this.mode === 'tag')
            ? optionList.map(option => (h("sy-tag", { key: `${option.value}-${option.label}`, removable: true, size: this.size, disabled: this.disabled, readonly: this.readonly, onRemoved: (e) => this.handleTagRemove(e, option) }, option.label)))
            : null, overFlowList?.length > 0
            ? h("sy-tag", { size: this.size, disabled: this.disabled, readonly: this.readonly }, " +", overFlowList.length, " ")
            : null, h("input", { key: 'eefc8b4945ff418e02d4f6f544238a5dbf2ce977', ref: (el) => (this.inputEl = el), class: { 'mode-default': this.mode === 'default' }, disabled: this.disabled || this.readonly, readOnly: this.mode === 'default', placeholder: this.inputPlaceholder, value: this.mode === 'default' ? (this.selectedOptions[0]?.label ?? '') : this.inputValue, onFocus: this.handleSearchInputFocus, onBlur: this.handleSearchInputBlur, onInput: this.handleSearchInputChanged, onCompositionstart: () => this.isComposing = true, onCompositionend: () => this.isComposing = false })), this.clearable && optionList?.length > 0
            ? h("sy-icon", { selectable: true, onSelected: this.handleClear, onClick: this.handleClearClick, size: this.size, class: "remove" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z" })))
            : null, h("sy-icon", { key: 'f841d4e6f2165329d6015bd0613dcaad2d8c1c4b', class: "angle-down", size: this.size }, h("svg", { key: '73f7e561b6180795805ae5e701eb698b126af0dc', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: 'f63d7cf495e641c4a697b6f6e692b12f507c91ce', fill: "currentColor", d: "M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z" })))), h("div", { key: '5bc98886f736694e25a46c6225559f829ca76724', class: {
                'error-container': true,
                'popup-error-container': this.hasPopupErrorComponent,
                'text-error-container': !this.hasPopupErrorComponent,
                'visible-error': (this.touched || this.formSubmitted) && !this.isValid
            } }, h("slot", { key: '04c840c2b133663960d0a07021f7a448b987d83a', name: "error", onSlotchange: this.handleCustomErrorSlot }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "isOpen": ["onIsOpenChange"],
        "empty": ["onEmptyChange"],
        "loading": ["onLoadingChange"],
        "mode": ["onModeChange"],
        "defaultValue": ["onDefaultValueChange"],
        "placeholder": ["onPlaceholderChange"],
        "selectedOptions": ["onSelectedOptionsChange"]
    }; }
    static get style() { return sySelectCss; }
}, [326, "sy-select", {
        "clearable": [4],
        "disabled": [1028],
        "readonly": [4],
        "empty": [4],
        "error": [4],
        "hide": [4],
        "loading": [4],
        "maxTagCount": [1026, "maxtagcount"],
        "defaultValue": [1537, "defaultvalue"],
        "placeholder": [1],
        "size": [1],
        "mode": [1],
        "required": [516],
        "name": [1],
        "noNativeValidity": [1028, "nonativevalidity"],
        "isTreeSelect": [1028, "istreeselect"],
        "selectedOptions": [1040],
        "isOpen": [32],
        "models": [32],
        "inputPlaceholder": [32],
        "options": [32],
        "tempOption": [32],
        "inputValue": [32],
        "activeOptionIndex": [32],
        "touched": [32],
        "formSubmitted": [32],
        "isValid": [32],
        "validStatus": [32],
        "hasSlotErrorMessage": [32],
        "hasPopupErrorComponent": [32],
        "setValue": [64],
        "clearValue": [64],
        "closeDropdown": [64],
        "setCustomError": [64],
        "clearCustomError": [64],
        "checkValidity": [64],
        "reportValidity": [64]
    }, [[2, "invalid", "handleInvalidEvent"]], {
        "isOpen": ["onIsOpenChange"],
        "empty": ["onEmptyChange"],
        "loading": ["onLoadingChange"],
        "mode": ["onModeChange"],
        "defaultValue": ["onDefaultValueChange"],
        "placeholder": ["onPlaceholderChange"],
        "selectedOptions": ["onSelectedOptionsChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-select", "sy-empty", "sy-icon", "sy-option", "sy-spinner", "sy-tag", "sy-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-select":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SySelect);
            }
            break;
        case "sy-empty":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-tag":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SySelect as S, defineCustomElement as d };
