// src/components/select/select.tsx

import { Component, Prop, State, h, Element, Watch, Event, EventEmitter, Host, AttachInternals, Method } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

const OPTION = 'SY-OPTION';

@Component({
  tag: 'sy-select',
  styleUrl: 'sy-select.scss',
  scoped: true,
  shadow: false,
  formAssociated: true,
})
export class SySelect {
  @Element() private host: HTMLSySelectElement;
  @AttachInternals() internals: ElementInternals;

  private initialSelectedOptions: { value: string; label?: string }[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private optionsContainer: HTMLElement | null = null;
  private inputEl: HTMLInputElement;
  private searchTimeout: any;
  private isComposing: boolean = false;

  @Event() opened: EventEmitter<void>;
  @Event() removed: EventEmitter<any>;
  @Event() selected: EventEmitter<any>;
  @Event() focused: EventEmitter<void>;
  @Event() blured: EventEmitter<void>;
  @Event() inputChanged: EventEmitter<string>;
  @Event() cleared: EventEmitter<void>;

  @Prop() clearable: boolean = false;
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() empty: boolean = false;
  @Prop() error: boolean = false;
  @Prop() hide: boolean = false;
  @Prop() loading: boolean = false;
  @Prop({ attribute: 'maxTagCount', mutable: true }) maxTagCount: number = 0;
  @Prop({ attribute: 'defaultValue', mutable: true, reflect: true }) defaultValue: string = '';
  @Prop() placeholder: string = '';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() mode: 'default' | 'searchable' | 'multiple' | 'tag' = 'default';
  @Prop({ reflect: true }) required: boolean = false;
  @Prop() name: string = '';
  @Prop({ attribute: 'noNativeValidity', mutable: true }) noNativeValidity: boolean = false;

  @State() isOpen: boolean = false;
  @State() isTreeSelect: boolean = false;
  @State() selectedOptions: { value: string; label?: string }[] = [];
  @State() private models: string[] = [];
  @State() private inputPlaceholder: string = '';
  @State() private options: HTMLSyOptionElement[] = []; // 타입을 인터페이스로 지정
  @State() private tempOption: HTMLSyOptionElement | null = null; // 타입을 인터페이스로 지정
  @State() private inputValue: string = '';
  @State() private activeOptionIndex: number = -1;
  @State() private touched: boolean = false;
  @State() private formSubmitted: boolean = false;


  @State() private isValid: boolean = true;
  @State() private validStatus: 'valueMissing' | 'custom' | '' = '';
  @State() private hasSlotErrorMessage: boolean = false;
  @State() private hasPopupErrorComponent: boolean = false;

  private handleOutsideClick = this.handleOutsideClickEvent.bind(this);

  constructor() {
    this.host?.addEventListener('invalid', this.handleInvalid);
  }

  connectedCallback() {
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleDocumentKeydown.bind(this));
    this.initialSelectedOptions = [...this.selectedOptions];
    this.formSubmitListener();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleDocumentKeydown.bind(this));
    window.removeEventListener('resize', this.updatePopupPosition.bind(this));
    window.removeEventListener('scroll', this.updatePopupPosition.bind(this), true);
    this.host?.removeEventListener('invalid', this.handleInvalid);
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
    this.noNativeValidity = fnAssignPropFromAlias(this.host, 'no-native-validity') ?? this.noNativeValidity;

    this.isValid = true;
    this.validStatus = '';
    this.updatePopupPosition();

    window.addEventListener('resize', this.updatePopupPosition.bind(this));
    window.addEventListener('scroll', this.updatePopupPosition.bind(this), true);

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
  @Watch('inputValue')
  watchInputValue(_newValue: string, _oldValue: string) {
    // inputValue 변경 감지
  }
  @Watch('isOpen')
  onIsOpenChange(newValue: boolean) {
    if (!newValue) {
      this.closeSelectOption();
    } else {
      this.openSelectOption();
    }
  }
  @Watch('empty')
  onEmptyChange() {
    this.removeEmptyOption();
  }
  @Watch('loading')
  onLoadingChange() {
    this.removeLoadingOption();
  }
  @Watch('mode')
  onModeChange() {
    let customOptions: HTMLSyOptionElement[] = [];
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
  @Watch('defaultValue')
  onDefaultValueChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      // 다음 렌더링 사이클에서 실행하여 안정성 확보
      requestAnimationFrame(() => {
        this.applyDefaultValue();
      });
    }
  }
  @Watch('placeholder')
  onPlaceholderChange() {
    this.updatePlaceholder();
  }
  @Watch('selectedOptions')
  onSelectedOptionsChange() {
    this.updateFormValue();
  }

  private formSubmitListener() {
    if (this.internals.form) {
      this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
  }
  private formSubmitListenerRemover() {
    if (this.internals.form) {
      this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  private cleanupOptionsFromDOM() {
    try {
      if (this.optionsContainer && this.optionsContainer.parentNode === document.body) {
        document.body.removeChild(this.optionsContainer);
        this.optionsContainer = null;
      }
      const orphanedOptions = document.body.querySelectorAll('body > sy-option');
      orphanedOptions.forEach(option => {
        document.body.removeChild(option);
      });
    } catch (error) {
      console.error('옵션 요소 정리 중 오류 발생:', error);
    }
  }

  @Method()
  async setValue(values: string[] | string) {
    if (this.mode !== 'multiple' && this.mode !== 'tag') {
      const value = Array.isArray(values) ? values.join(',') : values;
      this.inputValue = value as string;
      if (this.inputEl) {
        this.inputEl.value = value as string;
      }
    }
  }

  @Method()
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

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    this.updateValidityState();
  };

  private applyDefaultValue() {
    // defaultValue가 없으면 아무것도 하지 않음
    if (!this.defaultValue) {
      // 기존 선택값 초기화 (옵션)
      // this.selectedOptions = [];
      // this.updateModel();
      return;
    }

    const newModels = this.defaultValue.split(',').map((element: string) => element.trim());

    if ((this.mode === 'default' || this.mode === 'searchable') && newModels?.length) {
      this.models = [newModels[0]];
    } else {
      this.models = newModels;
    }
    
    // 모델이 설정된 후, 모델에 따라 selectedOptions를 업데이트
    this.updateModel();
  }

  private handleSlotChange() {
    // slot의 자식들이 준비되었으므로, defaultValue를 다시 적용합니다.
    this.applyDefaultValue();
  }

  private updateModel() {
    if (this.isTreeSelect) {
      if (this.models?.length) {
        this.selectedOptions = this.models.map(modelValue => ({
          value: modelValue,
          label: modelValue,
        }));
        if (this.mode === 'searchable') {
          this.inputValue = this.models[0];
        }
      } else {
        this.selectedOptions = [];
      }
    } else {
      // `this.host.children` 대신 `querySelectorAll` 사용
      const options = Array.from(this.host.querySelectorAll(OPTION)) as HTMLSyOptionElement[];
      
      if (options?.length) {
        const filterOptions = options.filter(opt => this.models?.some(m => opt.value?.toString() && m === opt.value.toString() && !opt.disabled));

        if (filterOptions?.length) {
          this.selectedOptions = filterOptions.map(opt => ({
            value: opt.value.toString(),
            label: !opt?.label ? opt.value.toString() : opt.label.toString(),
          }));
        } else {
          // defaultValue와 일치하는 옵션이 없는 경우, 선택을 비웁니다.
          this.selectedOptions = [];
        }
      } else {
        // 옵션이 아직 없는 경우
        this.selectedOptions = [];
      }
    }
    // placeholder와 폼 값을 업데이트합니다.
    this.updatePlaceholder();
    this.updateFormValue();
  }

  private toggleDropdown = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.disabled || this.readonly) {
      return;
    }
    if (!this.isTreeSelect) {
      if (!this.isOpen || !this.optionsContainer) {
        this.allSelectClose();
        setTimeout(() => {
          this.isOpen = true;
          this.opened.emit();
        }, 0);
        this.activeOptionIndex = -1;
      }
    }
  };

  private openSelectOption() {
    this.renderOptionsPopup();
    this.initializePopup();
    this.updatePopupPosition();
    if (this.mode === 'searchable') {
      this.inputEl.value = '';
      this.inputPlaceholder = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : this.placeholder;
    } else if (this.mode === 'multiple' || this.mode === 'tag') {
      this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder ?? '' : '';
    }
    if (this.activeOptionIndex >= 0) {
      if (!this.optionsContainer) return;
      const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
      const visibleOptions = options.filter(opt => !opt.hide && !opt.disabled && !opt.readonly);
      this.setActiveOption(visibleOptions);
    }
  }

  private appendOption(type: 'loading' | 'empty' | 'option', value: string = '') {
    if (type === 'loading') {
      this.appendLoadingOption();
    } else if (type === 'empty') {
      this.appendEmptyOption();
    } else {
      this.appendCustomTagOption(value);
    }
  }

  private removeOption(type: 'loading' | 'empty') {
    if (type === 'loading') {
      this.removeLoadingOption();
    } else if (type === 'empty') {
      this.removeEmptyOption();
    }
  }

  private appendCustomTagOption(value: string) {
    if (!this.tempOption) {
      const option = document.createElement('sy-option') as unknown as HTMLSyOptionElement;
      option.value = value;
      option.label = value;
      option.isCustomTag = true;
          option.addEventListener('activated', (e: any) => {
        e.stopPropagation();
        this.handleTemporaryOptionSelection(option);
      });
      this.tempOption = option;
      if (this.optionsContainer) {
        this.optionsContainer.insertBefore(option, this.optionsContainer.firstChild);
      }
    } else {
      this.tempOption.value = value;
      this.tempOption.label = value;
    }
  }

  private handleTemporaryOptionSelection(option: HTMLSyOptionElement) {
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
    } else {
      // 이미 있는 태그 제거 - 하지만 커스텀 태그는 DOM에서 유지
      this.selectedOptions = this.selectedOptions.filter(o => o.value.toString() !== selectedTempOption.value.toString());

      // 임시 옵션만 제거하고 기존 커스텀 태그가 있다면 유지
      const existingCustomTag = this.options.find(opt =>
        opt.isCustomTag &&
        opt.value.toString() === option.value.toString() &&
        opt.label?.toString() === option.label?.toString() &&
        opt !== option
      );

      if (!existingCustomTag) {
        option.remove();
      }
      this.tempOption = null;
    }

    this.inputValue = '';
    this.updateOptions();
    this.updatePlaceholder();
  }

  private updateCustomTagOption(customTagOption: HTMLSyOptionElement, value: string, existOption: HTMLSyOptionElement | undefined) {
    customTagOption.value = value;
    customTagOption.label = value;
    customTagOption.dataset.preset = value;

    // 커스텀 태그가 선택되어 있는지 확인
    const isCustomTagSelected = this.selectedOptions.some(opt =>
      opt.value.toString() === customTagOption.value.toString() &&
      opt.label?.toString() === customTagOption.label?.toString()
    );

    // 동일한 값의 기존 옵션이 있고, 커스텀 태그가 선택되지 않았을 때만 숨김
    customTagOption.hide = !!(existOption &&
      customTagOption.label?.toString() === existOption.label?.toString() &&
      customTagOption.value.toString() === existOption.value.toString() &&
      !isCustomTagSelected);
  }

  private appendLoadingOption() {
    const existingLoadingOption = this.optionsContainer?.querySelector('#syLoadingOption');
    if (!existingLoadingOption && this.optionsContainer) {
      const option = document.createElement('sy-option') as unknown as HTMLSyOptionElement;
      option.id = 'syLoadingOption';
      option.loading = true;
      option.empty = false;
      this.optionsContainer.appendChild(option);
    }
  }

  private removeLoadingOption() {
    const existingLoadingOption = this.optionsContainer?.querySelector('#syLoadingOption');
    if (existingLoadingOption) {
      existingLoadingOption.remove();
    }
  }
  private appendEmptyOption() {
    const existingEmptyOption = this.optionsContainer?.querySelector('#syEmptyOption');
    if (!existingEmptyOption && this.optionsContainer) {
      const option = document.createElement('sy-option') as unknown as HTMLSyOptionElement;
      option.id = 'syEmptyOption';
      option.readonly = true;
      option.loading = false;
      option.empty = true;
      option.hide = false;
      this.optionsContainer.appendChild(option);
    }
  }

  private removeEmptyOption() {
    const existingEmptyOption = this.optionsContainer?.querySelector('#syEmptyOption');
    if (existingEmptyOption) {
      existingEmptyOption.remove();
    }
  }

  private allSelectClose() {
    const allSelects = Array.from(document.querySelectorAll('sy-select'));
    allSelects.forEach(select => {
      if (select !== this.host) {
        (select as any).isOpen = false;
      }
    });
    this.optionsContainer = null;
  }

  private updateOptions(isSearch: boolean = false, value?: string) {
    if (this.optionsContainer) {
      const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
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
          } else {
            // 매칭되는 항목이 없으면 모든 옵션을 표시
            option.hide = this.hide && option.selected;
          }
        } else {
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
          const isSelected = this.selectedOptions.some(opt =>
            opt.value.toString() === tag.value.toString() &&
            opt.label?.toString() === tag.label?.toString()
          );

          tag.selected = isSelected;

          // 검색 필터링 - 검색어가 있을 때만 필터링 적용
          let shouldHide = false;

          if (isSearch && value && value.trim()) {
            // 검색 중일 때: 검색어와 매치되는지 확인
            const isMatch = tag.value.toLowerCase().includes(value.toLowerCase()) ||
                           tag.label.toLowerCase().includes(value.toLowerCase());
            shouldHide = !isMatch;
          } else {
            // 검색 중이 아닐 때: 선택된 태그만 hide 설정에 따라 숨김
            // 선택되지 않은 커스텀 태그는 항상 표시
            shouldHide = isSelected && this.hide;
          }

          tag.hide = shouldHide;

          if (!tag.hide) hasVisibleOptions = true;
        });

        // 기본 옵션 상태 관리
        originOptions.forEach(option => {
          const isSelected = this.selectedOptions.some(opt =>
            opt.value.toString() === option.value.toString() &&
            opt.label?.toString() === option.label?.toString()
          );

          option.selected = isSelected;

          // 검색 필터링 - 검색어가 있을 때만 필터링 적용
          let shouldHide = false;

          if (isSearch && value && value.trim()) {
            // 검색 중일 때: 검색어와 매치되는지 확인
            const isMatch = option.value.toLowerCase().includes(value.toLowerCase()) ||
                           option.label.toLowerCase().includes(value.toLowerCase());
            shouldHide = !isMatch;
          } else {
            // 검색 중이 아닐 때: 선택된 옵션은 hide 설정에 따라
            shouldHide = isSelected && this.hide;
          }

          option.hide = shouldHide;

          if (!option.hide) hasVisibleOptions = true;
        });

        if (this.hide) {
          const visibleOptions = originOptions.filter(opt => !opt.hide && !opt.selected).length;
          if (visibleOptions === 0 && !this.inputValue?.trim()) {
            if (!emptyOption) this.appendOption('empty');
          } else {
            this.removeOption('empty');
          }
        }
      } else {
        if (!hasVisibleOptions) {
          if (!emptyOption) this.appendOption('empty');
        } else {
          this.removeOption('empty');
        }
      }
    }
    if (this.inputEl) {
      this.updatePlaceholder();
    }
  }

  private updatePlaceholder() {
    if (this.inputEl) {
      if (this.mode === 'searchable') {
        this.inputEl.value = this.inputValue;
        this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : this.selectedOptions[0]?.label ?? '';
      } else if (this.mode === 'default') {
        this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : '';
        this.inputEl.value = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : '';
      } else {
        this.inputEl.value = '';
        this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : '';
      }
    }
  }

private handleTagRemove(event: CustomEvent, itemToRemove: { value: string; label?: string }) {
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
  this.selectedOptions = this.selectedOptions.filter(
    option => !(option.value === itemToRemove.value && option.label === itemToRemove.label)
  );

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

  private handleSearchInputFocus = (e: any) => {
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

  private handleSearchInputBlur = (e: any) => {
    e.stopPropagation();
    this.touched = true;

    const currentInput = this.inputEl?.value || '';
    const isValidInput = this.options.some(opt => opt.label === currentInput);

    if (!isValidInput) {
      // 잘못된 값이면 무조건 이전 선택값으로 복원
      if (this.selectedOptions?.length > 0) {
        this.inputValue = this.selectedOptions[0].label ?? '';
        if (this.inputEl) {
          this.inputEl.value = this.inputValue;
        }
      } else {
        // 이전 선택값이 없으면 입력창을 비움
        this.inputValue = '';
        if (this.inputEl) {
          this.inputEl.value = '';
        }
      }
    }

    this.updateValidityState();
    this.blured.emit();
  };

  private handleDocumentKeydown = (e: KeyboardEvent) => {
    if (!this.isOpen || !this.optionsContainer) return;
    const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
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

  private handleEnterKey(allSlotOptions: HTMLSyOptionElement[], visibleOptions: HTMLSyOptionElement[]) {
    // If there's exactly one visible option, select it regardless of active state
    if (this.isTreeSelect) {
      return;
    }

    if (visibleOptions.length === 1) {
      if (this.mode === 'searchable' || this.mode === 'multiple') {
        const visibleOption = visibleOptions[0];
        if (!visibleOption.disabled && !visibleOption.readonly) {
          this.optionSelection(visibleOption);
        } else {
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

      const options = this.optionsContainer?.querySelectorAll('sy-option') as unknown as NodeListOf<HTMLSyOptionElement>;
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
              this.selectedOptions.push({value: option.value, label: option.label});
            } else {
              this.selectedOptions = this.selectedOptions.filter(opt => opt.value.toString() !== option.value.toString());
            }
          }
          option.hide = this.hide && option.selected ? true : false;
        });
      } else if (!existSelectedOption) {
        this.appendCustomTagOption(this.inputValue);
        if (this.tempOption) {
          this.handleTemporaryOptionSelection(this.tempOption);
        }
      } else {
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

  private handleBackspace() {
    if (this.mode === 'multiple' || this.mode === 'tag') {
      if (this.selectedOptions?.length > 0 && this.inputValue?.length === 0) {
        this.selectedOptions.pop();
        if (!this.optionsContainer) return;
        const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
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

  private navigateOptions(direction: 'up' | 'down', visibleOptions: HTMLSyOptionElement[]) {
    if (!visibleOptions.length || this.isTreeSelect) return;
    if (this.activeOptionIndex === -1) {
      this.activeOptionIndex = direction === 'down' ? 0 : visibleOptions.length - 1;
    } else {
      if (direction === 'down') {
        this.activeOptionIndex = (this.activeOptionIndex + 1) % visibleOptions.length;
      } else {
        this.activeOptionIndex = (this.activeOptionIndex - 1 + visibleOptions.length) % visibleOptions.length;
      }
    }
    this.setActiveOption(visibleOptions);
  }

  private setActiveOption(visibleOptions: HTMLSyOptionElement[]) {
    visibleOptions.forEach((option, index) => {
      option.active = index === this.activeOptionIndex;
    });
    const activeOption = visibleOptions[this.activeOptionIndex];
    if (activeOption) {
      activeOption.scrollIntoView({ block: 'nearest' });
    }
  }

  private handleSearchInputChanged = (e: any) => {
    const value = e.target.value;
    this.inputValue = value;

    if (!this.isComposing) {
      // 즉시 검색 실행
      this.performSearch(value);
    }
    e.stopPropagation();

  };

  private performSearch = (searchValue: string) => {
    this.activeOptionIndex = -1;

    if (this.isTreeSelect || this.optionsContainer) {
      if (!this.isTreeSelect) {
        const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
        options.forEach(option => option.active = false);

        // 검색어가 비어있지 않으면 검색 실행
        if (searchValue && searchValue.trim()) {
          this.updateOptions(true, searchValue);
        } else {
          // 검색어가 비어있으면 모든 옵션 표시
          this.updateOptions(false, '');
        }

        if (this.mode === 'tag') {
          const existOption = options.find(opt => opt.label === searchValue);
          if (existOption) {
            existOption.hide = false;
            this.tempOption?.remove();
            this.tempOption = null;
          } else if (searchValue) {
            this.appendOption('option', searchValue);
            if (this.tempOption) {
              this.updateCustomTagOption(this.tempOption, searchValue, existOption);
            }
          } else {
            this.tempOption?.remove();
            this.tempOption = null;
          }
        }
      }
      this.inputChanged.emit(searchValue);
    }
  };

  private handleOutsideClickEvent(e: MouseEvent) {
    if (!this.isOpen) return;
    const target = e.target as HTMLElement;
    const selectContainer = this.host.querySelector('.select-container');
    const isInsideSelect = selectContainer?.contains(target) || this.host.contains(target);
    // sy-option 엘리먼트 또는 그 내부 엘리먼트인지 확인
    const closestSyOption = target.closest('sy-option');
    const isInsideContainer = this.optionsContainer?.contains(target) ||
                              target === this.optionsContainer ||
                              target.tagName === 'SY-OPTION' ||
                              closestSyOption !== null;
    if (!isInsideSelect && !isInsideContainer) {
      if (this.optionsContainer?.dataset?.mode === 'tag') {
        this.tempOption = null;
        if (this.inputEl) this.inputEl.value = '';
        this.options = this.options.filter(opt => opt.isCustomTag);
      } else if (this.optionsContainer?.dataset?.mode === 'searchable' && this.inputEl) {
        this.inputEl.value = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : '';
        this.inputPlaceholder = this.selectedOptions?.length ? this.selectedOptions[0]?.label ?? '' : this.placeholder;
      }
      this.closeSelectOption();
      this.isOpen = false;
    }
  }

  private optionSelection(option: HTMLSyOptionElement) {
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
            this.options = this.options.filter(opt =>
              !(opt.isCustomTag &&
                opt.value.toString() === value?.toString() &&
                opt.label?.toString() === label?.toString())
            );

            // DOM에서 커스텀 태그 제거
            if (this.optionsContainer) {
              const customTagsInDOM = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
              customTagsInDOM.forEach(opt => {
                if (opt.isCustomTag &&
                    opt.value.toString() === value?.toString() &&
                    opt.label?.toString() === label?.toString()) {
                  opt.remove();
                }
              });
            }
          } else {
            // 일반 옵션의 경우 선택 해제만
            if (this.optionsContainer) {
              const allOptions = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
              allOptions.forEach(opt => {
                if (opt.value.toString() === value?.toString()) {
                  opt.selected = false;
                  opt.hide = false;
                  opt.removeAttribute('selected');
                }
              });
            }
          }
        } else {
          // 태그 모드에서 사용자 정의 태그 처리
          if (this.mode === 'tag' && option.isCustomTag) {
            // 사용자 정의 태그는 options에 추가
            if (!this.options.some(opt =>
              opt.value.toString() === value?.toString() &&
              opt.label?.toString() === label?.toString()
            )) {
              this.options = [...this.options, option];
            }
          }
          // 기본 옵션 처리
          else if (!option.isCustomTag) {
            // 기존 커스텀 태그는 유지하면서 새로운 옵션 추가
            this.options = [...this.options.filter(opt =>
              opt.isCustomTag ||
              (opt.value.toString() !== value?.toString() ||
               opt.label?.toString() !== label?.toString())
            ), option];
          }
          this.selectedOptions = [...this.selectedOptions, selectedOption];
          option.selected = true;
          option.hide = !!this.hide;
        }
        this.touched = true;
        this.updateValidityState();
        this.selected.emit({ selectedOptions: this.selectedOptions, isValid: this.isValid, status: this.validStatus });
      } else {
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

  private renderOptionsPopup() {
    if (!this.optionsContainer) {
      const popupContainer = document.createElement('div');
      popupContainer.classList.add('sy-select-options-container');
      popupContainer.dataset.mode = this.mode;
      document.body.appendChild(popupContainer);
      this.optionsContainer = popupContainer;
      if (this.loading) {
        this.appendOption('loading');
      } else if (this.empty) {
        this.appendOption('empty');
      } else {
        if (!this.isTreeSelect) {
          const slotOptions = Array.from(this.host.querySelectorAll(OPTION)) as HTMLSyOptionElement[];

          // 커스텀 태그 처리
          // 선택된 커스텀 태그만 유지 (선택 해제된 커스텀 태그는 제거)
          const existingCustomTags = this.mode === 'tag' ?
            this.options.filter(opt =>
              opt.isCustomTag &&
              this.selectedOptions.some(selected =>
                selected.value.toString() === opt.value.toString() &&
                selected.label?.toString() === opt.label?.toString()
              )
            )
            : [];

          // options 배열에서 선택되지 않은 커스텀 태그 제거
          if (this.mode === 'tag') {
            this.options = this.options.filter(opt =>
              !opt.isCustomTag ||
              this.selectedOptions.some(selected =>
                selected.value.toString() === opt.value.toString() &&
                selected.label?.toString() === opt.label?.toString()
              )
            );
          }

          // 새로운 커스텀 태그 생성
          const newCustomTags = this.mode === 'tag' ?
            this.selectedOptions
              .filter(opt =>
                !slotOptions.some(slot =>
                  slot.value.toString() === opt.value.toString() &&
                  slot.label?.toString() === opt.label?.toString()
                ) &&
                !existingCustomTags.some(existing =>
                  existing.value.toString() === opt.value.toString() &&
                  existing.label?.toString() === opt.label?.toString()
                )
              )
              .map(opt => {
                const customOption = document.createElement('sy-option') as unknown as HTMLSyOptionElement;
                customOption.value = opt.value.toString();
                customOption.label = opt.label?.toString() || opt.value?.toString();
                customOption.isCustomTag = true;
                return customOption;
              })
            : [];

          // 전체 옵션 병합 - 기존 커스텀 태그, 새 커스텀 태그, 기본 옵션 순서로
          const allOptions: HTMLSyOptionElement[] = [...existingCustomTags, ...newCustomTags, ...slotOptions];
          this.options = allOptions;
          allOptions.forEach((option) => {
            const isSelected = this.selectedOptions?.some(opt => opt.value.toString() === option.value.toString() && !option.disabled);
            option.selected = isSelected;
            option.hide = isSelected && this.hide;
          });
          if (allOptions.filter((opt) => !opt.hide).length === 0 && !(this.mode === 'tag' && this.inputValue?.trim())) {
            this.appendOption('empty');
          } else {
            this.removeOption('empty');
          }
          allOptions.forEach((option, index) => {
            const optionClone = option.cloneNode(true) as HTMLSyOptionElement;
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
            this.options.push(optionClone);
            optionClone.addEventListener('mouseenter', () => {
              if (!optionClone.disabled && !optionClone.readonly && !optionClone.hide) {
                if (!this.optionsContainer) return;
                const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
                const visibleOptions = options.filter(opt => !opt.hide && !opt.disabled && !opt.readonly);
                this.activeOptionIndex = visibleOptions.findIndex(opt => opt === optionClone);
                visibleOptions.forEach((opt, idx) => {
                  opt.active = idx === this.activeOptionIndex;
                });
              }
            });
            optionClone.addEventListener('activated', (e: any) => {
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
  }

  private initializePopup() {
    if (this.optionsContainer) {
      this.optionsContainer.style.display = 'none';
      this.optionsContainer.style.position = 'absolute';
      this.optionsContainer.style.overflow = 'hidden';
      this.optionsContainer.style.boxShadow = '0px 4px 8px rgba(0 0 0 / 0.24)';
      this.optionsContainer.style.borderRadius = '3px';
      this.optionsContainer.style.zIndex = '500';
    }
  }

  private closeSelectOption() {
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
      } else {
        this.options = [];
      }
      this.optionsContainer.remove();
      this.optionsContainer = null;
    }
  }

  private updatePopupPosition() {
    if (this.isOpen && this.optionsContainer) {
      const selectContainer = this.host.querySelector('.select-container');
      if (selectContainer) {
        requestAnimationFrame(() => {
          if (!this.optionsContainer) return;
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

  private repositionByscrollY(selectContainerRect: DOMRect, viewportHeight: number) {
    if (!this.optionsContainer) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const spaceBelow = viewportHeight - selectContainerRect.bottom;
    const spaceAbove = selectContainerRect.top;
    const popupHeight = this.optionsContainer.scrollHeight;
    let newTop = 0;
    if (spaceBelow >= popupHeight) {
      newTop = selectContainerRect.bottom + scrollY;
    } else if (spaceAbove >= popupHeight) {
      newTop = selectContainerRect.top - popupHeight + scrollY;
    } else {
      newTop = spaceBelow > spaceAbove ? selectContainerRect.bottom + scrollY : selectContainerRect.top - popupHeight + scrollY;
    }
    this.optionsContainer.style.top = `${newTop}px`;
    this.optionsContainer.style.bottom = 'auto';
    this.optionsContainer.style.overflowY = 'auto';
  }

  // private handleTagClick = (e: any) => {
  //   console.log({ e });
  // };
  private handleClearClick = (e: any) => {
    e.stopPropagation();
  };
  private handleClear = (e: any) => {
    e.stopPropagation();
    this.removeEmptyOption();
    const optionList = Array.from(document.querySelectorAll('sy-option'))  as unknown as HTMLSyOptionElement[];
    this.inputPlaceholder = this.placeholder;
    if (this.inputEl) this.inputEl.value = '';
    this.selectedOptions = [];
    this.models = [];
    if (this.optionsContainer) {
      const liveOptions = Array.from(this.optionsContainer.children) as HTMLSyOptionElement[];
      liveOptions.forEach(opt => {
        if (this.mode === 'tag' && opt.isCustomTag) {
          opt.remove();
        } else {
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

  private updateFormValue() {
    if (!this.selectedOptions.length) {
      this.internals.setFormValue(null);
    } else if (this.mode === 'multiple' || this.mode === 'tag') {
      const formData = new FormData();
      this.selectedOptions.forEach(option => {
        formData.append(this.name, option.value);
      });
      this.internals.setFormValue(formData);
    } else {
      this.internals.setFormValue(this.selectedOptions[0]?.value || null);
    }
    this.updateValidityState();
  }

  formAssociatedCallback() {
    this.updateFormValue();
  }
  formDisabledCallback(disabled: boolean) {
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
      if (this.inputEl) this.inputEl.value = '';
    } else {
      this.selectedOptions = [...this.initialSelectedOptions];
      if (this.defaultValue) {
        this.models = this.defaultValue.split(',').map(element => element.trim());
        this.updateModel();
      } else {
        this.selectedOptions = [];
      }
    }
    this.touched = false;
    this.formSubmitted = false;
    this.updateFormValue();
    this.updatePlaceholder();
    this.updateValidityState();
  }
  formStateRestoreCallback(state: any) {
    if (!state) {
      this.selectedOptions = [];
    } else if (state instanceof FormData) {
      const formValues = state.getAll(this.name);
      const values = formValues.map(value => value.toString());
      this.models = values;
      this.updateModel();
    } else if (typeof state === 'string') {
      this.models = [state];
      this.updateModel();
    }
    this.updatePlaceholder();
    this.updateOptions();
  }

  @Method()
  async setCustomError() {
    this.customSettingError();
  }
  @Method()
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
  @Method()
  async checkValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals.checkValidity();
  }
  @Method()
  async reportValidity(): Promise<boolean> {
    this.updateValidityState();
    return this.internals.reportValidity();
  }

  private updateValidityState() {
    if (this.validStatus === 'custom' && !this.isValid) {
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
        this.internals.setValidity({ customError: true }, ' ');
      } else {
        this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
      }
    } else {
      this.internals.setValidity({});
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    this.internals.setValidity({ customError: true }, 'Custom validation error');
  }

  private handleInvalid = (e: Event) => {
    const hasErrorSlot = !!this.host.querySelector('[slot="error"]');
    if (this.noNativeValidity || hasErrorSlot) {
      const errorSlotElement = this.host.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
      if (hasContent) {
        this.hasSlotErrorMessage = true;
        this.host.setAttribute('has-custom-error', '');
        e.preventDefault();
        e.stopPropagation();
        this.internals.setValidity({ customError: true }, ' ');
      } else {
        this.hasSlotErrorMessage = false;
        this.host.removeAttribute('has-custom-error');
      }
    } else {
      this.hasSlotErrorMessage = false;
      this.host.removeAttribute('has-custom-error');
    }
    this.isValid = false;
  };

  private handleCustomErrorSlot = () => {
    const errorSlot = this.host.querySelector('slot[name="error"]') as HTMLSlotElement;
    if (!errorSlot) return;
    const errorNodes = errorSlot.assignedNodes();
    this.hasPopupErrorComponent = errorNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
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
        const element = node as Element;
        return !!(element.textContent?.trim() || element.children.length > 0);
      }
      return false;
    });
  };

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: 'Please select an option',
      custom: 'Invalid by custom',
    };
    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }

  render() {
    const optionList =
      (this.mode !== 'default' && this.mode !== 'searchable') && this.maxTagCount > 0
        ? this.selectedOptions.slice(0, this.maxTagCount)
        : [...this.selectedOptions];

    const overFlowList =
      (this.mode !== 'default' && this.mode !== 'searchable') && this.maxTagCount > 0 ? this.selectedOptions.slice(this.maxTagCount) : [];

    return (
      <Host>
        {/* 원본 <sy-option> 요소들을 화면에 표시하지 않기 위해 숨겨진 div 안에 slot을 배치합니다. */}
        <div style={{ display: 'none' }}>
          <slot onSlotchange={this.handleSlotChange.bind(this)}></slot>
        </div>

        <div
          class={{
            'select-container': true,
            open: this.isOpen,
            disabled: this.disabled,
            'status-error': this.error,
            // 'this.form-submitted' -> 'this.formSubmitted' 오타 수정
            'status-invalid': (this.formSubmitted || this.touched) && this.required && !this.isValid,
            'size-small': this.size === 'small',
            'size-medium': this.size === 'medium',
            'size-large': this.size === 'large',
          }}
          onClick={this.toggleDropdown}
        >
          <div class="tag-group">
            {this.selectedOptions?.length > 0 && (this.mode === 'multiple' || this.mode === 'tag')
              ? optionList.map(option => (
                  <sy-tag
                    key={`${option.value}-${option.label}`}
                    removable
                    size={this.size}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    onRemoved={(e: CustomEvent) => this.handleTagRemove(e, option)}
                  >
                    {option.label}
                  </sy-tag>
                ))
              : null}

            {overFlowList?.length > 0
              ? <sy-tag size={this.size} disabled={this.disabled} readonly={this.readonly}> +{overFlowList.length} </sy-tag>
              : null}

            <input
              ref={(el) => (this.inputEl = el as HTMLInputElement)}
              class={{ 'mode-default': this.mode === 'default' }}
              disabled={this.disabled || this.readonly}
              readOnly={this.mode === 'default'}
              placeholder={this.inputPlaceholder}
              value={this.mode === 'default' ? (this.selectedOptions[0]?.label ?? '') : this.inputValue}
              onFocus={this.handleSearchInputFocus}
              onBlur={this.handleSearchInputBlur}
              onInput={this.handleSearchInputChanged}
              onCompositionstart={() => this.isComposing = true}
              onCompositionend={() => this.isComposing = false}
            />
          </div>

          {this.clearable && optionList?.length > 0
          ? <sy-icon
              selectable
              onSelected={this.handleClear}
              onClick={this.handleClearClick}
              size={this.size}
              class="remove"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg></sy-icon>
          : null}
          <sy-icon class="angle-down" size={this.size}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"/></svg></sy-icon>
        </div>

        <div class={{
          'error-container': true,
          'popup-error-container': this.hasPopupErrorComponent,
          'text-error-container': !this.hasPopupErrorComponent,
          'visible-error': (this.touched || this.formSubmitted) && !this.isValid
        }}>
          <slot name="error" onSlotchange={this.handleCustomErrorSlot}></slot>
        </div>
      </Host>
    );
  }
}
