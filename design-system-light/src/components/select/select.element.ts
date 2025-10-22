import { LitElement, html, css, CSSResultGroup, unsafeCSS, nothing } from "lit";
import { customElement, query, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
import globalCSS from "./styles/select.scss?inline";
import "../tag/tag.element";
import "../icon/icon.element";
import "../input/input.element";
import { OptionElement } from "./select-option.element";
import { InputElement } from "../input/input.element";

const OPTION = 'SY-OPTION';

@customElement("sy-select")
export class SelectElement extends LitElement {
  // 폼 연동을 위한 속성 추가
  static formAssociated = true;
  
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  // ElementInternals 인스턴스 저장
  private internals: ElementInternals;
  private initialSelectedOptions: { value: string; label?: string }[] = [];
  private resizeObserver: ResizeObserver | null = null;
 // 자신의 옵션 컨테이너 참조

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.addEventListener('invalid', this.handleInvalid);
  }

  @property({ type: Boolean }) clearable: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) empty: boolean = false;
  @property({ type: Boolean }) error: boolean = false;
  @property({ type: Boolean }) hide: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({
    type: Number,
    converter: {
      fromAttribute: (value, type) => {
        const n = Number(value);
        return isNaN(n) ? 0 : n > 0 ? n : 0; 
      },
    },
  })
  maxTagCount: number = 0;

  @property({ type: String, reflect: true }) defaultValue: string = "";
  @property({ type: String }) placeholder: string = '';
  @property({ type: String }) size: "small" | "medium" | "large" = "medium";
  @property({ type: String }) mode: 'default' | 'searchable' | 'multiple' | 'tag' = 'default';
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String }) name: string = ''; // 폼 연동을 위한 name 추가
  @property({ type: Boolean }) noNativeValidity = false;

  @query("slot") slot!: any;
  @query("input") input!: InputElement;
  @state() isOpen: boolean = false;
  @state() isTreeSelect: boolean = false;
  @state() selectedOptions: { value: string; label?: string }[] = [];
  @state() private models: string[] = [];
  @state() private inputPlaceholder: string = '';
  @state() private options: OptionElement[] = [];
  @state() private tempOption: OptionElement | null = null; 
  @state() private inputValue: string = '';
  @state() private activeOptionIndex: number = -1;
  @state() private touched = false;
  @state() private formSubmitted = false;
  // private optionsObserver: MutationObserver | null = null;
  @state() private optionsReady: boolean = false;
  @state() private pendingDefaultValue: string = "";

  @state() private isValid: boolean = true;
  @state() private validStatus: 'valueMissing' | 'custom' | '' = "";  // 상태 코드 추가: valid, required 등
  @state() private hasSlotErrorMessage: boolean = false;
  @state() private hasPopupErrorComponent: boolean = false;

  private handleOutsideClick = this.handleOutsideClickEvent.bind(this);
  private optionsContainer: HTMLElement | null = null;


  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener('keydown', this.handleDocumentKeydown.bind(this));
    // 초기 선택 옵션 저장 (리셋 시 사용)
    this.initialSelectedOptions = [...this.selectedOptions];
    this.formSubmitListener();
  }

  async firstUpdated() {
    await this.updateComplete;
    this.updatePopupPosition();
    this.updatePlaceholder();
    
    // Form 값 초기화
    this.updateFormValue();
    
    window.addEventListener("resize", this.updatePopupPosition.bind(this));
    window.addEventListener("scroll", this.updatePopupPosition.bind(this), true);

    const selectContainer = this.shadowRoot?.querySelector('.select-container');
    if (selectContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        // 옵션 목록이 열려 있을 때만 위치를 업데이트합니다.
        if (this.isOpen) {
          this.updatePopupPosition();
        }
      });
      this.resizeObserver.observe(selectContainer);
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("isOpen")) {
      if (!this.isOpen) {
        this.closeSelectOption();
      } else {
        this.openSelectOption();
      }
    } 
    if(changedProperties.has('empty')) {
      this.removeEmptyOption();
    } 
    if (changedProperties.has("loading")) {
      this.removeLoadingOption();
    } 
    if (changedProperties.has("mode")) {     
      let customOptions: OptionElement[] = [];

      if(this.mode === 'default' || this.mode === 'searchable') {
        this.models = this.models.slice(0, 1);
        this.updateModel();
      }

      if(!this.isTreeSelect) {
        this.options?.forEach((option: OptionElement) => {
          const isSelected = this.selectedOptions.some(o => o.value.toString() === option.value.toString() && !option.disabled);
          option.selected = isSelected;
          option.hide = isSelected && this.hide ? true : false;
  
          if(option.isCustomTag) {
            customOptions.push(option);    
          } 
        });
  
        if(customOptions.length) {
          this.selectedOptions = this.selectedOptions.filter(opt => customOptions.some(copt => copt.value.toString() === opt.value.toString() && copt.label?.toString() === opt.label?.toString()));
          this.options = this.options.filter(opt => !customOptions.some(copt => copt.value.toString() === opt.value.toString() && copt.label?.toString() === opt.label?.toString()));
  
          customOptions.forEach(copt => {
            copt.remove()
          });
        }
      }

      this.updatePlaceholder();
      this.requestUpdate();
    }

    if (changedProperties.has('defaultValue')) {
      this.pendingDefaultValue = this.defaultValue;
      this.applyDefaultValue();
    }

    if(changedProperties.has('placeholder')) {
      this.updatePlaceholder();
    }

    // selectedOptions가 변경되면 폼 값도 업데이트
    if (changedProperties.has('selectedOptions')) {
      this.updateFormValue();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleDocumentKeydown.bind(this));
    window.removeEventListener("resize", this.updatePopupPosition.bind(this));
    window.removeEventListener("scroll", this.updatePopupPosition.bind(this), true);
    this.removeEventListener('invalid', this.handleInvalid);
    this.formSubmitListenerRemover();

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    // 셀렉트가 제거될 때 관련 옵션 요소들도 함께 제거
    this.cleanupOptionsFromDOM();
  }

  private formSubmitListener() {
    if(this.internals.form) {
      this.internals.form.addEventListener('submit', this.handleFormSubmit);
    }
  }
  private formSubmitListenerRemover() {
    if(this.internals.form) {
      this.internals.form.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  /**
   * DOM에서 관련 옵션 요소와 컨테이너를 정리합니다.
   * 셀렉트가 제거될 때 관련된 모든 옵션 요소를 찾아 제거합니다.
   */
  private cleanupOptionsFromDOM() {
    try {
      // 자신의 옵션 컨테이너가 있으면 제거
      if (this.optionsContainer && this.optionsContainer.parentNode === document.body) {
        // 안전하게 제거하기 전에 이벤트 리스너 제거
        const options = this.optionsContainer.querySelectorAll('sy-option');
        options.forEach(option => {
          // 이벤트 리스너가 많은 요소이므로 복제해서 교체하는 방식으로 모든 리스너 제거
          const newOption = option.cloneNode(true);
          if (option.parentNode) {
            option.parentNode.replaceChild(newOption, option);
          }
        });
        
        // 컨테이너 제거
        document.body.removeChild(this.optionsContainer);
        this.optionsContainer = null;
      }
      
      // document.body에 직접 추가된 독립적인 sy-option 요소들도 제거
      const orphanedOptions = document.body.querySelectorAll('body > sy-option');
      orphanedOptions.forEach(option => {
        document.body.removeChild(option);
      });
    } catch (error) {
      console.error('옵션 요소 정리 중 오류 발생:', error);
    }
  }

  public setValue(values: string[] | string) {
    if((this.mode !== 'multiple')){
      const value = Array.isArray(values) ? values.join(',') : values;

      this.inputValue = value as string;
  
      if(this.input) {
        this.input.value = value as string;
      } 
    }   
  }

  public clearValue() {
    this.inputValue = '';

    if(this.input) {
      this.input.value = '';
    }
  }


  // select에 포커스랑 엔터
  render() {
    const optionList =
      (this.mode !== 'default' && this.mode !== 'searchable') && this.maxTagCount > 0
        ? this.selectedOptions.slice(0, this.maxTagCount)
        : [...this.selectedOptions];
        
    const overFlowList =
      (this.mode !== 'default' && this.mode !== 'searchable') && this.maxTagCount > 0 ? this.selectedOptions.slice(this.maxTagCount) : [];

      // 
    return html`
      <div
        class=${classMap({
          "select-container": true,
          open: this.isOpen,
          disabled: this.disabled,
          "status-error": this.error,
          "status-invalid": (this.formSubmitted || this.touched) && this.required && !this.isValid,
          "size-small": this.size === "small",
          "size-medium": this.size === "medium",
          "size-large": this.size === "large",
        })}
        ?disabled=${this.disabled}
        @click="${this.toggleDropdown}"
      >
        <div class="tag-group">
          ${this.selectedOptions?.length && (this.mode === 'multiple' || this.mode === 'tag')
              ? repeat(
                  optionList,
                  (option) => option,
                  (option, index) => html`
                    <sy-tag
                      removable
                      size=${this.size}
                      ?disabled=${this.disabled}
                      ?readonly=${this.readonly}
                      @removed=${(e: any) => this.removeItem(e, option)}
                      >${option.label}</sy-tag>`
                )
              : nothing}

          ${(this.mode !== 'default' && this.mode !== 'searchable') && overFlowList?.length
            ? html` <sy-tag size=${this.size} ?disabled=${this.disabled} ?readonly=${this.readonly}> +${overFlowList.length} </sy-tag> `
            : nothing}
  
          <input 
            borderless
            class=${classMap({
              "mode-default": this.mode === 'default',
            })}
            ?disabled=${this.disabled || this.readonly}
            ?readonly=${this.mode === 'default'}
            .placeholder="${this.inputPlaceholder}"
            .value="${(this.mode === 'default') && this.selectedOptions?.length ? (this.selectedOptions[0]?.label ?? '') : this.inputValue}"
            @focus=${this.handleSearchInputFocus}
            @blur=${this.handleSearchInputBlur}
            @input=${this.handleSearchInputChanged}
            />        
        </div>
     
          ${this.clearable && optionList?.length
          ? html`
              <sy-icon
                selectable
                @selected=${this.handleClear}
                @click=${this.handleClearClick}
                size="${this.size}"
                class="remove"
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg></sy-icon>
            `
          : nothing}
          <sy-icon class="angle-down" size="${this.size}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"/></svg></sy-icon> 
      </div>

      <slot style="display:none;" @slotchange=${this.handleSlotChange}></slot>
      
      <div class="${classMap({
        'error-container': true,
        'popup-error-container': this.hasPopupErrorComponent,
        'text-error-container': !this.hasPopupErrorComponent,
        'visible-error': (this.touched || this.formSubmitted) && !this.isValid // 유효한 상태일 때는 숨김
        })}">
        <slot name="error" class="error-message" @slotchange=${this.handleCustomErrorSlot}></slot>
      </div>
    `;
  }

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    this.formSubmitted = true;
    
    this.updateValidityState();
    this.requestUpdate();
  }

  private applyDefaultValue() {
    // Apply pendingDefaultValue only if the options are ready
    if (this.optionsReady && this.pendingDefaultValue) {
      this.models = this.pendingDefaultValue.split(",").map((element: string) => element.trim());
      if ((this.mode === 'default' || this.mode === 'searchable') && this.models?.length) {
        this.models = [this.models[0]];
      }
      this.updateModel();
      this.pendingDefaultValue = "";
    }
  }

  // modify #handleSlotChange method
  private handleSlotChange(e: any) {
    this.optionsReady = true;
    this.applyDefaultValue();
  }
  
  private updateModel() {
    if (this.isTreeSelect) {
      if (this.models?.length) {
          this.selectedOptions = this.models.map((modelValue) => ({
              value: modelValue,
              label: modelValue 
          }));
          if(this.mode === 'searchable') {
            this.inputValue = this.models[0];
          }
      } else {
          this.selectedOptions = []; 
      }
      
    } else {
      const options = this.slot?.assignedElements().filter((el: any) => el.tagName === OPTION);
      
      if (options?.length) {
        const filterOptions = options.filter(
            (opt: any) => this.models?.some((m) => (opt.value.toString() && m === opt.value.toString()) && !opt.disabled)
        );

        if (filterOptions?.length) {
            this.selectedOptions = filterOptions.map((opt: any) => ({
                value: opt.value.toString(),
                label: !opt?.label ? opt.value.toString() : opt.label.toString(),
            }));
        } else {
            this.selectedOptions = [];
        }
      }
    }
    
    this.requestUpdate();
  }

  /**
   * 토글 드롭다운 - 개선된 버전
   */
  private toggleDropdown(e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (this.disabled || this.readonly) {
      return;
    }

    if(!this.isTreeSelect) {
      if (!this.isOpen || !this.optionsContainer) {
        this.allSelectClose();
  
        setTimeout(() => {
          this.isOpen = true;    
  
          this.dispatchEvent(
            new CustomEvent("opened", {
              bubbles: true,
              composed: true,
            })
          );
        }, 0);
        
        this.activeOptionIndex = -1; // 초기화
      }
    }
  }

  private openSelectOption() {
    this.renderOptionsPopup();
    this.initializePopup();
    this.updatePopupPosition();

    if(this.mode === 'searchable') {
      this.input.value = '';
      this.inputPlaceholder = this.selectedOptions?.length ? (this.selectedOptions[0]?.label ?? '') : this.placeholder;
    } else if(this.mode === 'multiple' || this.mode === 'tag') {
      this.inputPlaceholder = !this.selectedOptions?.length ? (this.placeholder ?? '') : '';
    }

    if(this.activeOptionIndex >= 0) {
      if (!this.optionsContainer) return;
  
      const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as OptionElement[];
      const visibleOptions = options.filter(opt => !opt.hide && !opt.disabled && !opt.readonly);
      this.setActiveOption(visibleOptions);
    }
  }

  private appendOption(type: 'loading' | 'empty' | 'option', value: string = '') {
    if(type === 'loading') {
      this.appendLoadingOption();
    } else if (type === 'empty') {
      this.appendEmptyOption();
    } else {
      this.appendCustomTagOption(value);
    }
  }
  
  private removeOption(type: 'loading' | 'empty' | 'option', value: string = '') {
    if(type === 'loading') {
      this.removeLoadingOption();
    } else if (type === 'empty') {
      this.removeEmptyOption();
    } 
  }

  private appendCustomTagOption(value: string) {
    if (!this.tempOption) {
      const option = document.createElement("sy-option") as OptionElement;
      option.setAttribute('value', value);
      option.setAttribute('label', value); // label 속성 설정
      option.isCustomTag = true;
      option.label = value;
      option.value = value;

      // textContent 제거 - label 속성으로 표시됨
      
      option.addEventListener("selected", () => {
        this.handleTemporaryOptionSelection(option);
      });
  
      this.tempOption = option;
  
      if (this.optionsContainer) {
        this.optionsContainer.insertBefore(option, this.optionsContainer.firstChild);
      }
    } else {
      this.tempOption.setAttribute('value', value);
      this.tempOption.setAttribute('label', value);
      this.tempOption.label = value;
      // textContent 제거
    }
  }

  private handleTemporaryOptionSelection(option: OptionElement) {
    const selectedTempOption = { value: option.value, label: option.label };
    const exist = this.selectedOptions.some(o => o.value.toString() === selectedTempOption.value.toString() && o.label?.toString() === selectedTempOption.label?.toString());
  
    if (!exist) {
      this.selectedOptions = [...this.selectedOptions, selectedTempOption];
      this.options = [...this.options, option];      
    } else {
      this.selectedOptions = this.selectedOptions.filter(o => o.value.toString() !== selectedTempOption.value.toString());
      this.options = this.options.filter(o => o.value.toString() !== selectedTempOption.value.toString());
      option.remove();
    }
  
    this.tempOption = null;
    this.inputValue = '';
    this.updateOptions();
    this.updatePlaceholder();
    this.requestUpdate();
  }
  

  private updateCustomTagOption(customTagOption: OptionElement, value: string, existOption: OptionElement | undefined) {
    customTagOption.setAttribute('value', value);
    customTagOption.setAttribute('label', value);
    customTagOption.dataset.preset = value;
    // textContent 제거 - label 속성으로 표시됨
    customTagOption.hide = existOption && customTagOption.label?.toString() === existOption.label?.toString() && customTagOption.value.toString() === existOption.value.toString() ? true : false;
  }



  private appendLoadingOption() {
    const existingLoadingOption = this.optionsContainer?.querySelector("#syLoadingOption");
    if (!existingLoadingOption && this.optionsContainer) {
      const option = document.createElement("sy-option") as OptionElement;
      option.id = "syLoadingOption";
      option.loading = true;
      option.empty = false;

      this.optionsContainer.appendChild(option);
    }
  }

  private removeLoadingOption() {
    const existingLoadingOption = this.optionsContainer?.querySelector("#syLoadingOption");

    if (existingLoadingOption) {
      existingLoadingOption.remove();
    }
  }
  private appendEmptyOption() {
    const existingEmptyOption = this.optionsContainer?.querySelector("#syEmptyOption");
    if (!existingEmptyOption && this.optionsContainer) {
      const option = document.createElement("sy-option") as OptionElement;
      option.id = "syEmptyOption";
      option.readonly = true;
      option.loading = false;
      option.empty = true;
      option.hide = false;  // empty 옵션은 항상 보이도록 설정
      
      this.optionsContainer.appendChild(option); 
    } 
  }

  private removeEmptyOption() {
    const existingEmptyOption = this.optionsContainer?.querySelector("#syEmptyOption");
  
    if (existingEmptyOption) {
      existingEmptyOption.remove();
    }
  }

  /**
   * 모든 select를 닫는 메서드 - 개선된 버전
   */
  private allSelectClose() {
    // 자기 자신을 제외한 모든 select 닫기
    const allSelects = Array.from(document.querySelectorAll('sy-select'));
    allSelects.forEach(select => {
      if (select !== this) {
        (select as SelectElement).isOpen = false;
      }
    });
    
    // 자신의 컨테이너 참조만 제거 (각 select가 자신의 컨테이너를 관리)
    this.optionsContainer = null;
  }

  private updateOptions(isSearch: boolean = false, value?: string) {
    if (this.options.length && this.optionsContainer) {
      const options = this.optionsContainer.querySelectorAll('sy-option') as NodeListOf<OptionElement>;
      if(!options) {
        return;
      }
  
      const allSlotOptions = Array.from(options);
      const emptyOption = allSlotOptions.find(opt => opt.id === 'syEmptyOption');
      const normalOptions = allSlotOptions.filter(opt => opt.id !== 'syEmptyOption');
      const allOptions = [...normalOptions];
  
      let hasVisibleOptions = false;
      allOptions.forEach(option => {
        const isMatchingSearch = !value || (value && option.label.toLowerCase().includes((value || '').toLowerCase())); 
        option.selected = this.selectedOptions.some(opt => opt.value.toString() === option.value.toString());
        
        // 검색 시에는 hide 상태와 관계없이 검색어와 일치하는 옵션을 보여줌
        if (isSearch) {
          option.hide = !isMatchingSearch;
        } else {
          option.hide = (this.hide && option.selected);
        }
        
        if (!option.hide) {
          hasVisibleOptions = true;
        }
      });
  
      if (this.mode === 'tag') {      
        if(this.hide) {
          const originOptions = allOptions.filter(opt => !opt.isCustomTag);
          const selectedCount = originOptions.filter(opt => opt.selected).length;
          
          if(selectedCount === originOptions.length && selectedCount > 0) {
            if (!emptyOption) {
              this.appendOption('empty');
            }
          } else {
            this.removeOption('empty');
          }
        } else {
          const matchingCustomTags = normalOptions.filter(opt => 
            opt.isCustomTag && 
            opt.value.toLowerCase().startsWith((value || '').toLowerCase())
          );
          matchingCustomTags.forEach(opt => {
            opt.hide = false;
            hasVisibleOptions = true;
          });
        }
      } else {     
        if (!hasVisibleOptions) {
          if (!emptyOption) {
            this.appendOption('empty');
          }
        } else {
          this.removeOption('empty');
        }
      }
  
      this.requestUpdate();
    }
  
    if (this.input) {
      this.updatePlaceholder();
    }
  }
  
  private updatePlaceholder() {
    if(this.input) {
      if(this.mode === 'searchable') {
        this.input.value = this.selectedOptions?.length ? (this.selectedOptions[0]?.label ?? '') : '';
        this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : (this.selectedOptions[0]?.label ?? '');
      } else if(this.mode === 'default') {
        this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : '';
        this.input.value = this.selectedOptions?.length ? (this.selectedOptions[0]?.label ?? '') : '';
      } else {
        this.input.value = '';
        this.inputPlaceholder = !this.selectedOptions?.length ? this.placeholder : '';
      }
    }
  }

  private removeItem(e: any, item: {value: string, label?: string}) {
    if (!this.disabled && !this.readonly) {
      e.stopPropagation(); 
      this.selectedOptions = this.selectedOptions.filter(
        (opt) => !(opt.value.toString() === item.value.toString())
      );
  
      const optList = document.querySelectorAll('sy-option') as NodeListOf<OptionElement>;
      
      optList?.forEach((option: OptionElement) => {
        const isSelected = this.selectedOptions.some(
          (so) => so.value.toString() === option.value.toString() && !option.disabled
        );
  
        option.selected = isSelected;
        option.hide = isSelected && this.hide ? true : false;
      });
  
      if (this.mode === 'tag') {
        this.inputValue = '';
        this.selectedOptions = this.selectedOptions.filter((o: any) => o.value.toString() !== item.value.toString() && o.label?.toString() !== item.label?.toString());
        this.options = this.options.filter((o: any) => {
          if(o.value.toString() !== item.value.toString() && o.label?.toString() !== item.label?.toString()) {
            return true;
          } else if(o.isCustomTag) {
            o.remove();
          }
          return false;
        });
  
        const visibleOptionsCount = Array.from(optList).filter(opt => !opt.hide).length;
        const hasCustomTagInput = this.inputValue?.trim();
        
        if (visibleOptionsCount === 0 && !hasCustomTagInput) {
          this.appendOption('empty');
        } else {
          this.removeOption('empty');
        }
      }

      this.updateValidityState();
  
      if (this.mode !== 'default' && this.mode !== 'searchable') {
        this.inputPlaceholder = !this.selectedOptions?.length ? (this.placeholder ?? '') : '';
        
        this.dispatchEvent(
          new CustomEvent("removed", {
            detail: {item, selectedOptions: this.selectedOptions, isValid: this.isValid, status: this.validStatus},
            bubbles: true,
            composed: true,
          })
        );
      } else {
        this.dispatchEvent(
          new CustomEvent("removed", {
            detail: {
              item: {
                label: this.selectedOptions[0]?.label,
                value: this.selectedOptions[0]?.value,
              },
              selectedOptions: this.selectedOptions,
              isValid: this.isValid, status: this.validStatus
            },
            bubbles: true,
            composed: true,
          })
        );
      }
  
      if (this.optionsContainer) {
        this.updatePopupPosition();
      }
  
      this.updateOptions();
    }
  }

  private handleSearchInputFocus(e: any) { 
    e.stopPropagation();

    this.removeEmptyOption();

    if(!this.isTreeSelect) {
      e.target.value = '';
      this.updateOptions();
    }
        
    this.dispatchEvent(
      new CustomEvent("focused", {
        bubbles: true,
        composed: true,
      })
    );
    this.updatePlaceholder()
  }

  private handleSearchInputBlur(e: any) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("blured", {
        bubbles: true,
        composed: true
      })
    );
  }

  private handleDocumentKeydown = (e: KeyboardEvent) => {
    // Only handle keyboard events if this select is open
    e.stopPropagation();
    if (!this.isOpen) return;
    
    if (!this.optionsContainer) return;

    const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as OptionElement[];
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
        this.handleEnterKey(options, availableOptions);
        break;
      case 'Backspace':
        this.handleBackspace();
        break;
    }
  };

  private handleEnterKey(allSlotOptions: OptionElement[], visibleOptions: OptionElement[]) {
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
    // 
    if (this.inputValue?.length && this.mode === 'tag') {
      const existSelectedOption = this.selectedOptions.find(opt => opt.label === this.inputValue);

      const options = this.optionsContainer?.querySelectorAll('sy-option') as NodeListOf<OptionElement>;
      if (!options || !this.optionsContainer) {
        return;
      }
  
      const allSlotOptions = Array.from(options);
      const existOriginOption = allSlotOptions.filter(opt => !opt.isCustomTag).find(opt => opt.label === this.inputValue);
  
      if (existOriginOption) {
        allSlotOptions.forEach(option => {
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
        const exist = allSlotOptions.find(opt => opt.value.toString() === existSelectedOption.value.toString());
        if (exist) {
          exist.remove();
        }
  
        this.selectedOptions = this.selectedOptions.filter(opt => opt.value.toString() !== existSelectedOption.value.toString());
        let filteredAllOptions = allSlotOptions.filter(opt => opt.value.toString() !== existSelectedOption.value.toString());
        
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

    this.requestUpdate();
  }

  private handleBackspace() {
    // 선택된 값이 있고 input에는 값이 없을 때, backspace를 입력하면 가장 마지막 선택된 option부터 제거된다.
    if(this.mode === 'multiple' || this.mode === 'tag') {
      if(this.selectedOptions?.length > 0 && this.inputValue?.length === 0) {
        this.selectedOptions.pop();

        const options = this.optionsContainer?.querySelectorAll('sy-option') as NodeListOf<OptionElement>;
        if(!options || !this.optionsContainer) {
          return;
        }
        
        const allSlotOptions = Array.from(options);
        
        allSlotOptions.forEach(option => {
          const exist = this.selectedOptions.some(opt => opt.value.toString() === option.value.toString());
          if(!exist) {
            option.hide = false;
            option.selected = false;
            if(option.isCustomTag) {
              option.remove();
            }
          }
        });
          
        this.requestUpdate();
      }
    }
  }

  private navigateOptions(direction: 'up' | 'down', visibleOptions: OptionElement[]) {
    if (!visibleOptions.length) return;
    if (this.isTreeSelect) return;

    // 현재 활성화된 옵션이 없는 경우
    if (this.activeOptionIndex === -1) {
      this.activeOptionIndex = direction === 'down' ? 0 : visibleOptions.length - 1;
    } else {
      // 다음/이전 옵션으로 이동
      if (direction === 'down') {
        this.activeOptionIndex = (this.activeOptionIndex + 1) % visibleOptions.length;
      } else {
        this.activeOptionIndex = (this.activeOptionIndex - 1 + visibleOptions.length) % visibleOptions.length;
      }
    }

    this.setActiveOption(visibleOptions);
    // // 모든 옵션의 active 상태를 false로 초기화
    // visibleOptions.forEach((option, index) => {
    //   option.active = index === this.activeOptionIndex;
    // });

    // // 활성화된 옵션이 보이도록 스크롤
    // const activeOption = visibleOptions[this.activeOptionIndex];
    // if (activeOption) {
    //   activeOption.scrollIntoView({ block: 'nearest' });
    // }

    this.requestUpdate();
  }

  private setActiveOption(visibleOptions: OptionElement[]) {
    // 모든 옵션의 active 상태를 false로 초기화
    visibleOptions.forEach((option, index) => {
      option.active = index === this.activeOptionIndex;
    });

    // 활성화된 옵션이 보이도록 스크롤
    const activeOption = visibleOptions[this.activeOptionIndex];
    if (activeOption) {
      activeOption.scrollIntoView({ block: 'nearest' });
    }
  }

  private handleSearchInputChanged(e: any) {
    this.inputValue = e.target.value;
    this.activeOptionIndex = -1;

    // isTreeSelect이면 통과
    // isTreeSelect가 아니면 optionsContainer가 있을때만 통과

    if(this.isTreeSelect || (!this.isTreeSelect && this.optionsContainer)) {
      if(!this.isTreeSelect) {
        const options = this.optionsContainer?.querySelectorAll('sy-option') as NodeListOf<OptionElement>;
        const allSlotOptions = Array.from(options);
        const visibleOptions = allSlotOptions.filter(opt => !opt.hide && !opt.disabled && !opt.readonly);
    
        // 모든 옵션의 active 상태를 false로 초기화
        visibleOptions.forEach((option, index) => {
          option.active = index === this.activeOptionIndex;
        });
        
    
        this.updateOptions(true, this.inputValue);
      
        if (this.mode === 'tag') {
          const existOption = allSlotOptions.find(opt => opt.label === this.inputValue);
      
          // 입력된 값과 일치하는 옵션이 있는 경우
          if(existOption) {
            // 입력중인 customtag는 제거하고 기존 option을 노출
            existOption.hide = false;
            this.tempOption?.remove();
            this.tempOption = null;
          } else {
            // 입력중인 customtag가 없는 경우 새로 추가
            this.appendOption('option', this.inputValue);
      
            if (this.tempOption) {
              this.updateCustomTagOption(this.tempOption, this.inputValue, existOption);
            }
          }
        }
      }
    
      this.dispatchEvent(
        new CustomEvent("inputChanged", {
          detail: this.inputValue,
          bubbles: true,
          composed: true,
        })
      );
    }

  }
  
  /**
   * 외부 클릭 이벤트 핸들러 - 개선된 버전
   */
  private handleOutsideClickEvent(e: MouseEvent) {
    // isOpen 상태가 아니면 무시
    if (!this.isOpen) return;
    
    const target = e.target as HTMLElement;
    const selectContainer = this.shadowRoot?.querySelector('.select-container');

    // 클릭된 요소가 selct 내부 또는 옵션 컨테이너 내부에 있는지 확인
    const isInsideSelect = selectContainer?.contains(target) || 
                          this.contains(target) ||
                          target === this;
    const isInsideContainer = this.optionsContainer?.contains(target) || 
                             target === this.optionsContainer ||
                             target.tagName === 'SY-OPTION';

    // select 외부 클릭 시 닫기
    if (!isInsideSelect && !isInsideContainer) {
      // mode가 tag인 경우 추가 정리 작업
      if (this.optionsContainer?.dataset?.mode === 'tag') {
        this.tempOption = null;
        if (this.input) this.input.value = '';
        this.options = this.options.filter(opt => opt.isCustomTag);
      }
      // searchable 모드인 경우 라벨 복원
      else if (this.optionsContainer?.dataset?.mode === 'searchable' && this.input) {
        this.input.value = this.selectedOptions?.length ? 
          (this.selectedOptions[0]?.label ?? '') : '';
        this.inputPlaceholder = this.selectedOptions?.length ? 
          (this.selectedOptions[0]?.label ?? '') : this.placeholder;
      }

      this.closeSelectOption();
      this.isOpen = false; // 상태 업데이트
    }
  }

  private optionSelection(option: OptionElement) {
    if (option.nodeName === OPTION) {
      const isDisabled =
        option.hasAttribute("disabled") &&
        option.getAttribute("disabled") !== "false";
      const isReadonly =
        option.hasAttribute("readonly") &&
        option.getAttribute("readonly") !== "false";

      if (isDisabled || isReadonly) {
        return;
      }

      const value = option.value;
      const label = !option?.label ? option.value : option.label;
      const selectedOption = { value, label };
      
      if (this.mode !== 'default' && this.mode !== 'searchable') {
        const exist = this.selectedOptions.some((opt) => opt.value.toString() === value?.toString());
        
        if (exist) {
          this.selectedOptions = this.selectedOptions.filter(
            (opt) => !(opt.value.toString() === value?.toString())
          );
          option.selected = false;
          option.hide = false;
        } else {
          if (!this.options.some(opt => opt.value.toString() === value?.toString())) {
            this.options = [...this.options, option];
          }
          this.selectedOptions = [...this.selectedOptions, selectedOption];
          option.selected = true;
          option.hide = this.hide ? true : false;
        }

        // 옵션이 선택되면 touched true (리셋 후에도 정상 동작하도록)
        this.touched = true;

        this.updateValidityState();

        this.dispatchEvent(
          new CustomEvent("selected", {
            detail: {selectedOptions: this.selectedOptions, isValid: this.isValid, status: this.validStatus},
            bubbles: true,
            composed: true,
          })
        );
      } else {
        this.selectedOptions = [selectedOption];

        this.options?.forEach((opt: any) => {
          opt.selected = false;
          opt.hide = false;
        });

        option.selected = true;
        option.hide = this.hide ? true : false;

        // 옵션이 선택되면 touched true (리셋 후에도 정상 동작하도록)
        this.touched = true;

        if(this.mode !== 'searchable') {
          this.closeSelectOption();
        }
        
        this.updateValidityState();

        this.dispatchEvent(
          new CustomEvent("selected", {
            detail: { 
              selectedOptions: this.selectedOptions,
              isValid: this.isValid, status: this.validStatus
            },
            bubbles: true,
            composed: true,
          })
        );
      }
      
      this.updateOptions();
      this.requestUpdate();

      this.updatePopupPosition();

    }
  }


  /**
   * Select 옵션 팝업 렌더링 - 개선된 버전
   */
  private renderOptionsPopup() {
    if (!this.optionsContainer) {
      const popupContainer = document.createElement("div");
      popupContainer.classList.add("sy-select-options-container");
      popupContainer.dataset.mode = this.mode;
      document.body.appendChild(popupContainer);
      this.optionsContainer = popupContainer; // 자신의 컨테이너 참조 저장
      
      if (this.loading) {
        this.appendOption('loading');
      } else if(this.empty) {
        this.appendOption('empty');
      } else {       
        this.options = [];
        
        // Skip option handling for tree select
        if (!this.isTreeSelect) {
          const slotOptions = this.slot
            .assignedElements()
            .filter((el: any) => el.tagName === OPTION) as OptionElement[];

          const customTagOptions = this.selectedOptions
            .filter(opt => !slotOptions.some(slotOpt => slotOpt.value.toString() === opt.value.toString()))
            .map(opt => {
              const customOption = document.createElement("sy-option") as OptionElement;
              customOption.setAttribute('value', opt.value.toString());
              customOption.setAttribute('label', opt.label?.toString() || opt.value?.toString());
              customOption.isCustomTag = true;
              return customOption;
            }) as OptionElement[];

          const allOptions: OptionElement[] = [...customTagOptions, ...slotOptions];

          allOptions.forEach((option: any) => {
            const isSelected = this.selectedOptions?.some(
              opt => opt.value.toString() === option.value.toString() && !option.disabled
            );
            option.selected = isSelected;
            option.hide = isSelected && this.hide;
          });

          const visibleOptionsCount = allOptions.filter((opt: OptionElement) => !opt.hide).length;
          const hasCustomTagInput = this.mode === 'tag' && this.inputValue?.trim();
          
          if (visibleOptionsCount === 0 && !hasCustomTagInput) {
            this.appendOption('empty');
          } else {
            this.removeOption('empty');
          }

          allOptions.forEach((option: any, index: number) => {
            option.index = index;
            
            const optionClone = option.cloneNode(true);
            optionClone.selected = option.selected;
            optionClone.hide = option.hide;
            optionClone.index = option.index;
            optionClone.disabled = option.disabled;
            optionClone.isCustomTag = option.isCustomTag;
             
            if(optionClone?.label && optionClone?.textContent && optionClone?.label.trim() === optionClone?.textContent.trim()) {
              // 값이 같으면 textContent 제거
              optionClone.textContent = '';
            }

            this.options.push(optionClone);

            optionClone.addEventListener('mouseenter', () => {
              if (!optionClone.disabled && !optionClone.readonly && !optionClone.hide) {
                if (!this.optionsContainer) return;

                const options = Array.from(this.optionsContainer.querySelectorAll('sy-option')) as OptionElement[];
                const visibleOptions = options.filter(opt => !opt.hide && !opt.disabled && !opt.readonly);
                
                this.activeOptionIndex = visibleOptions.findIndex(opt => opt === optionClone);
                
                visibleOptions.forEach((opt, idx) => {
                  opt.active = idx === this.activeOptionIndex;
                });
              }
            });

            optionClone.addEventListener('selected', (e: any) => {
              e.stopPropagation();
              this.optionSelection(optionClone);

              if ((this.mode === 'default' || this.mode === 'searchable') && !optionClone.readonly && !optionClone.disabled) {
                this.closeSelectOption();
                this.isOpen = false;
              }
              if(this.mode === 'tag' && this.tempOption) {
                this.tempOption.remove();
                this.tempOption = null;
              }
            });

            this.optionsContainer?.appendChild(optionClone);
          });
        }
      }
    }
  }

  private initializePopup() {
    if (this.optionsContainer) {
      this.optionsContainer.style.display = "none";
      // this.optionsContainer.style.backgroundColor = "#fff";
      this.optionsContainer.style.position = "absolute";
      this.optionsContainer.style.overflow = "hidden";
      this.optionsContainer.style.boxShadow = "0px 4px 8px rgba(0 0 0 / 0.24)";
      this.optionsContainer.style.borderRadius = "3px";
      this.optionsContainer.style.zIndex = "500";
    }
  }

  /**
   * 팝업 닫기 - 개선된 버전
   */
  private closeSelectOption() {
    if (this.optionsContainer) {
      this.removeOption('loading');

      if(this.input) {
        if(!this.selectedOptions?.length) {
          this.inputValue = '';
          this.input.value = '';
        }   
      }

      // 컨테이너 초기화 및 리소스 정리
      this.initializePopup();
      this.models = [];
      
      if (this.mode === 'tag') {
        const customTagOptions = this.options.filter(opt => opt.isCustomTag);
        this.options = customTagOptions;
      } else {
        this.options = [];
      }
      
      // DOM에서 제거
      this.optionsContainer.remove();
      this.optionsContainer = null; // 참조 제거
    }
  }

  private updatePopupPosition() {   
    if (this.optionsContainer) {
      const selectContainer =
        this.shadowRoot?.querySelector(".select-container");

      if (selectContainer) {
        // [수정] requestAnimationFrame을 사용하여 렌더링이 완료된 후 위치를 계산하도록 변경
        requestAnimationFrame(() => {
          // 이 콜백 함수 안에서는 optionsContainer와 그 자식들의 렌더링이 완료되어
          // scrollHeight가 정확한 값으로 계산됩니다.
          if (!this.optionsContainer) return; // 콜백 실행 시점에 컨테이너가 없을 수 있으므로 방어 코드 추가

          const selectContainerRect = selectContainer.getBoundingClientRect();
          const viewportHeight = window.innerHeight; 

          this.optionsContainer.style.display = "block";
          this.optionsContainer.style.position = "absolute";
          this.optionsContainer.style.boxSizing = "border-box";
          this.optionsContainer.style.marginTop = "4px";
          this.optionsContainer.style.maxHeight = "300px";
          this.optionsContainer.style.width = `${selectContainerRect.width}px`;

          this.optionsContainer.style.overflowY = "hidden";

          this.repositionByscrollY(selectContainerRect, viewportHeight);
          this.optionsContainer.style.left = `${selectContainerRect.left + window.scrollX}px`; // scrollX를 더해주는 것이 더 안정적입니다.
        });
      }
    }
  }

  private repositionByscrollY(selectContainerRect: DOMRect, viewportHeight: number) {
    if (!this.optionsContainer) return;
    
    const scrollY = window.scrollY || document.documentElement.scrollTop; 
    const spaceBelow = viewportHeight - selectContainerRect.bottom;
    // 이전 수정 사항은 그대로 유지합니다.
    const spaceAbove = selectContainerRect.top;
    const popupHeight = this.optionsContainer.scrollHeight; 

    // --- 디버깅을 위한 콘솔 로그 ---
    // console.log({
    //   spaceBelow,
    //   spaceAbove,
    //   popupHeight,
    //   selectTop: selectContainerRect.top,
    //   selectBottom: selectContainerRect.bottom,
    //   viewportHeight
    // });
    // -------------------------

    let newTop = 0;

    if (spaceBelow >= popupHeight) {
      // console.log('결정: 아래쪽으로 표시');
      newTop = selectContainerRect.bottom + scrollY;
    } else if (spaceAbove >= popupHeight) {
      // console.log('결정: 위쪽으로 표시');
      newTop = selectContainerRect.top - popupHeight + scrollY; 
    } else {
      // console.log('결정: 공간이 더 넓은 쪽으로 표시');
      if (spaceBelow > spaceAbove) {
        newTop = selectContainerRect.bottom + scrollY;
      } else {
        newTop = selectContainerRect.top - popupHeight + scrollY; 
      }
    }

    this.optionsContainer.style.top = `${newTop}px`;
    this.optionsContainer.style.bottom = "auto";
    this.optionsContainer.style.overflowY = "auto";
  }


  private handleTagClick = (e: any) => {
    console.log({ e });
  };
  private handleClearClick = (e: any) => {
    e.stopPropagation();
  };
  private handleClear = (e: any) => {
    e.stopPropagation();
    this.removeEmptyOption();

    const optionList = document.querySelectorAll('sy-option') as NodeListOf<OptionElement>;
    this.inputPlaceholder = this.placeholder;
    this.input.value = '';

    this.selectedOptions = [];
    this.models = [];


    if (this.optionsContainer) {
      optionList.forEach(opt => {
        if(this.mode === 'tag') {
          if(opt.isCustomTag) {
            opt.remove();
          }
        }
        opt.selected = false;
        opt.hide = false;
      });

      const children = Array.from(this.optionsContainer.children);

      children.forEach((child: any) => {
        if (child?.nodeName === OPTION) {
          child.selected = false;
          child.hide = false;
        }
      });

      this.updatePopupPosition();
    }

    this.dispatchEvent(
      new CustomEvent("cleared", {
        bubbles: true,
        composed: true,
      })
    );
  };

  // Form 값 업데이트 메서드
  private updateFormValue() {
    // 선택된 항목이 없으면 null 값 설정
    if (!this.selectedOptions.length) {
      this.internals.setFormValue(null);
      this.updateValidityState(); // 유효성 상태 업데이트 추가
      return;
    }

    // 다중 선택 모드일 때 FormData 처리
    if (this.mode === 'multiple' || this.mode === 'tag') {
      // FormData에서 같은 이름으로 여러 값을 지원하기 위한 FormData 객체 생성
      const formData = new FormData();
      
      this.selectedOptions.forEach(option => {
        formData.append(this.name, option.value);
      });
      
      // FormData를 사용하여 폼 값 설정
      this.internals.setFormValue(formData);
    } else {
      // 단일 선택 모드일 때는 첫 번째 선택된 값만 폼에 설정
      this.internals.setFormValue(this.selectedOptions[0]?.value || null);
    }

    // 마지막에 유효성 상태 업데이트 추가
    this.updateValidityState();
  }

  // 폼 연결 콜백
  formAssociatedCallback() {
    this.updateFormValue();
  }

  // 폼 비활성화 콜백
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  // 폼 리셋 콜백
  formResetCallback() {
    // 모든 옵션의 선택 상태 해제
    this.options?.forEach((opt: any) => {
      opt.selected = false;
      opt.hide = false;
    });
    
    // tree-select인 경우 항상 빈 상태로 초기화, 일반 select는 초기값 복원
    if (this.isTreeSelect) {
      this.selectedOptions = [];
      this.models = [];
      this.inputValue = '';
      if (this.input) {
        this.input.value = '';
      }
    } else {
      // 초기 선택 값으로 복원
      this.selectedOptions = [...this.initialSelectedOptions];
      
      // 초기값이 있으면 초기값으로 설정, 없으면 비움
      if (this.defaultValue) {
        this.models = this.defaultValue.split(",").map((element: string) => element.trim());
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
    this.requestUpdate(); // render 업데이트 추가
  }

  // 폼 상태 복원 콜백
  formStateRestoreCallback(state: any) {
    if (!state) {
      this.selectedOptions = [];
    } else if (state instanceof FormData) {
      // 다중 선택 모드일 때 FormData에서 값을 추출
      const formValues = state.getAll(this.name);
      
      // FormDataEntryValue[]를 string[]로 변환
      const values = formValues.map(value => value.toString());
      
      // 값에 해당하는 옵션을 찾아 선택
      this.models = values;
      this.updateModel();
    } else if (typeof state === 'string') {
      // 단일 선택 모드일 때 문자열 값 처리
      this.models = [state];
      this.updateModel();
    }
    
    this.updatePlaceholder();
    this.updateOptions();
  }

  // 새로운 메서드 추가: custom error 설정
  public setCustomError() {
    this.customSettingError();
  }

  // 새로운 메서드 추가: custom error 제거
  public clearCustomError() {
    if(!this.isValid && this.validStatus === 'custom') {
      this.validStatus = '';
    }
    this.updateValidityState();
  }

  /*******************************************************
   * Form validation with custom error handling
   *******************************************************/

  // validity 상태를 반환 - 커스텀 에러 상태 고려
  get validity() { 
    // 커스텀 에러나 슬롯 에러가 설정된 경우 가상의 ValidationState 반환
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      // 브라우저의 ValidityState와 유사한 객체 반환
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
        valueMissing: this.validStatus === 'valueMissing'
      };
    }
    return this.internals.validity; 
  }

  // validation 메시지 반환 - 커스텀 에러 상태 고려
  get validationMessage() { 
    if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
      // 커스텀 메시지를 반환하거나 기본 메시지 사용
      return this.getErrorMessage(this.validStatus);
    }
    
    return this.internals.validationMessage; 
  }

  // 폼 내 유효성 상태 확인 - 항상 true 반환 (커스텀 에러 처리 가능)
  get willValidate() { 
    return this.internals.willValidate; 
  }

  // 사용자 정의 유효성 검사를 실행하고 폼에 보고
  public checkValidity(): boolean {
    // 항상 최신 슬롯 상태 확인
    this.updateValidityState();
    return this.internals.checkValidity();
  }

  public reportValidity(): boolean {
    // 최신 상태 확인
    this.updateValidityState();
    return this.internals.reportValidity();
  }

  // 기존 updateFormValue 메서드 아래에 추가
  private updateValidityState() {
    // 이미 사용자가 직접 에러 설정한 경우, 기본 유효성 검사 건너뛰기
    if (this.validStatus === 'custom' && !this.isValid) {
      return;
    }

    this.isValid = true;
    this.validStatus = "";

    // 필수 입력 검증
    if (this.required && (!this.selectedOptions || this.selectedOptions.length === 0)) {
      this.isValid = false;
      this.validStatus = "valueMissing";
    }

    const validityMessage = this.getErrorMessage(this.validStatus);

    // ElementInternals에 유효성 상태 보고
    if (!this.isValid) {
      if (this.hasSlotErrorMessage) {
        // 슬롯 에러가 있으면 customError만 설정
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯 에러가 없으면 기본 유효성 검사 에러를 사용
        this.internals.setValidity({ [this.validStatus]: true }, validityMessage);
      }
    } else {
      this.internals.setValidity({});
    }
  }

  private customSettingError() {
    this.isValid = false;
    this.validStatus = 'custom';
    
    // 사용자 정의 오류 설정
    this.internals.setValidity({ customError: true }, "Custom validation error");
    
    this.requestUpdate();
  }

  private handleInvalid = (e: Event) => {
    // 최신 슬롯 상태 확인 (Light DOM에서 직접)
    const hasErrorSlot = !!this.querySelector('[slot="error"]');
    
    // 슬롯 상태 확인
    if (this.noNativeValidity || hasErrorSlot) {
      // 슬롯에 있는 내용 확인
      const errorSlotElement = this.querySelector('[slot="error"]');
      const hasContent = errorSlotElement?.textContent?.trim();
                        
      if (hasContent) {
        // 슬롯에 내용이 있을 때만 커스텀 에러 처리
        this.hasSlotErrorMessage = true;
        this.setAttribute('has-custom-error', '');
        
        // 브라우저 기본 UI 방지
        e.preventDefault();
        e.stopPropagation();
        
        // 커스텀 에러 설정
        this.internals.setValidity({ customError: true }, " ");
      } else {
        // 슬롯이 비어 있으면 기본 브라우저 에러 사용
        this.hasSlotErrorMessage = false;
        this.removeAttribute('has-custom-error');
      }
    } else {
      // 슬롯이 없으면 브라우저 기본 에러 사용
      this.hasSlotErrorMessage = false;
      this.removeAttribute('has-custom-error');
    }
    
    // 이벤트와 관계없이 무효 상태 설정
    this.isValid = false;
  };

  private handleCustomErrorSlot() {
    const errorSlot = this.renderRoot?.querySelector('slot[name="error"]') as HTMLSlotElement;
    if (!errorSlot) return;
    
    // 슬롯에 할당된 노드들을 가져옴
    const errorNodes = errorSlot.assignedNodes();
    
    // 특수 컴포넌트(tooltip, popover 등) 존재 여부 확인
    this.hasPopupErrorComponent = errorNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName?.toLowerCase() || '';
        
        // 직접 특수 컴포넌트인지 확인
        if (tagName === 'sy-tooltip' || 
            tagName === 'sy-popover' || 
            tagName === 'sy-popconfirm' || 
            tagName === 'sy-inline-message') {
          return true;
        }
        
        // 자식 요소로 특수 컴포넌트를 포함하는지 확인
        return !!element.querySelector(
          'sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message'
        );
      }
      return false;
    });
    
    // 슬롯에 실제 콘텐츠가 있는지 확인
    this.hasSlotErrorMessage = errorNodes.some(node => {
      // 텍스트 노드이고 내용이 있는 경우
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      // 엘리먼트 노드이고 내부에 실제 콘텐츠가 있는 경우
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        // 내부 텍스트가 있거나 자식 요소가 있는 경우만 콘텐츠로 간주
        return !!(element.textContent?.trim() || element.children.length > 0);
      }
      return false;
    });
    
    // 요소가 업데이트되도록 상태 변경을 알림
    this.requestUpdate();
  }

  private getErrorMessage(type: 'valueMissing' | 'custom' | '') {
    const validityMessage = {
      valueMissing: "Please select an option",
      custom: 'Invalid by custom'
    }

    return (type === 'custom' || type === '' ? '' : validityMessage[type]) || '';
  }
}
