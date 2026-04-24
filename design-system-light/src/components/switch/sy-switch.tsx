import { Component, Prop, State, Event, EventEmitter, h, Watch, Element, AttachInternals } from '@stencil/core';

/**
 * sy-switch — binary on/off toggle with form-association.
 *
 * Spec: design-system-specs/components/switch.yaml
 *
 * The switch is form-associated so it submits its checked state under `name`
 * inside a <form>. The spec does not define a `required` constraint for
 * switch, so there is no validation UI — it's a simple form control.
 *
 * Props: checked, disabled, readonly, loading, size (small | medium), label, name, value.
 * When `loading` is true, the internal disabled flag is forced so the handle
 * shows a spinner and clicks are ignored.
 *
 * Events: `changed` — emitted with the new checked boolean.
 */
@Component({
  tag: 'sy-switch',
  styleUrl: 'sy-switch.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SySwitch {
  @Element() host!: HTMLSySwitchElement;
  @AttachInternals() internals!: ElementInternals;

  // Props
  @Prop({ reflect: true, mutable: true }) checked: boolean = false;
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop() label: string = '';
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' = 'medium';
  @Prop() name: string = '';
  /** Value submitted as the form value when checked. Defaults to `"on"` (native convention). */
  @Prop() value: string = 'on';

  // State
  @State() private internalDisabled: boolean = false;

  // Events
  @Event() changed!: EventEmitter<boolean>;

  // --- Form-association lifecycle ---
  formAssociatedCallback() { this.syncFormValue(); }
  formResetCallback() { this.checked = false; this.syncFormValue(); }
  formDisabledCallback(disabled: boolean) { this.disabled = disabled; }
  formStateRestoreCallback(state: string | File | FormData | null) {
    this.checked = state === this.value || state === 'on';
    this.syncFormValue();
  }

  // Lifecycle
  componentWillLoad() {
    this.updateInternalDisabled();
    this.syncFormValue();
  }

  // Watchers
  @Watch('loading')
  @Watch('disabled')
  handleLoadingOrDisabledChange() {
    this.updateInternalDisabled();
  }

  @Watch('checked')
  handleCheckedChange() {
    this.syncFormValue();
    this.changed.emit(this.checked);
  }

  // --- Private helpers ---
  private updateInternalDisabled() {
    this.internalDisabled = this.loading ? true : this.disabled;
  }

  private syncFormValue() {
    // Only submit a value when checked (matches native checkbox convention).
    this.internals?.setFormValue(this.checked ? this.value : null);
  }

  private handleClick = () => {
    if (this.internalDisabled || this.readonly) return;
    this.checked = !this.checked;
    // `changed` event is emitted by the @Watch('checked') handler above to
    // avoid double-firing when consumers set `checked` programmatically.
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.internalDisabled || this.readonly) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.checked = !this.checked;
    }
  };

  // Render
  render() {
    const switchClasses = {
      switch: true,
      on: this.checked,
      readonly: this.readonly,
      disabled: this.internalDisabled,
      'switch--small': this.size === 'small',
      'switch--medium': this.size === 'medium',
    };

    return (
      <div>
        <div
          class={switchClasses}
          tabindex={this.internalDisabled ? -1 : 0}
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          aria-disabled={this.internalDisabled ? 'true' : undefined}
          aria-readonly={this.readonly ? 'true' : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          <div class="handle">
            {this.loading && <div class="loader"></div>}
          </div>
        </div>
        {this.label && <span class="switch-label">{this.label}</span>}
      </div>
    );
  }
}
