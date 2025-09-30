import { Component, Element, Event, EventEmitter, Listen, Prop, Watch, h } from "@stencil/core";

// HTMLSyRadioElement interface
export interface HTMLSyRadioElement extends HTMLElement {
  // Props
  checked: boolean;
  disabled: boolean;
  readonly: boolean;
  value: string;

  // Events
  selected: EventEmitter<string>;
}

@Component({
  tag: 'sy-radio',
  styleUrl: 'sy-radio.scss',
  shadow: false,
  scoped: true,
})
export class SyRadio {
  // --- Element References ---
  @Element() host: HTMLSyRadioElement;
  private input!: HTMLInputElement;

  // --- Props ---
  @Prop({ reflect: true, mutable: true }) checked: boolean = false;
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop() value: string = '';

  // --- Events ---
  @Event() selected: EventEmitter<string>;

  // --- Lifecycle Methods ---
  componentDidLoad() {
    if (this.checked && this.input) {
      this.input.checked = this.checked;
    }
  }

  // --- Watchers ---
  @Watch('checked')
  handleCheckedChange() {
    if (this.input) {
      this.input.checked = this.checked;
    }
  }

  // --- Host Event Listeners ---
  @Listen('keydown')
  handleKeydown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    if (!this.checked) {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        this.setChecked();
      }
    }
  }

  // --- Event Handlers ---
  private handleLabelClick = (e: MouseEvent) => {
    e.preventDefault();
    // input 클릭은 별도로 처리되므로 여기서는 무시
    if ((e.target as HTMLElement).tagName === 'INPUT') return;

    if (this.disabled || this.readonly) return;

    if (!this.checked) {
      this.setChecked();
    }
  };

  private handleInputChange = (e: Event) => {
    e.stopPropagation();

    if (this.disabled || this.readonly) {
      e.preventDefault();
      return;
    }

    const target = e.target as HTMLInputElement;
    if (target.checked && !this.checked) {
      this.setChecked();
    }
  };

  private setChecked() {
    this.checked = true;
    this.selected.emit(this.value);
  }

  // --- Render Method ---
  render() {
    return (
      <label onClick={this.handleLabelClick}>
        <input
          ref={(el) => (this.input = el as HTMLInputElement)}
          type="radio"
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
          onChange={this.handleInputChange}
        />
        <span class="radio-checkmark" tabindex="0"></span>
        <slot></slot>
      </label>
    );
  }
}
