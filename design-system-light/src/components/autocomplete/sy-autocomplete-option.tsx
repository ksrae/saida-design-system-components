import { Component, Prop, State, h, Element, Watch, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'sy-autocomplete-option',
  styleUrl: 'sy-autocomplete.scss',
  scoped: true,
  shadow: false,
})
export class SyAutocompleteOption {
  @Element() host: HTMLElement;

  @Prop({ mutable: true }) source: string[] = [];
  @Prop() loading: boolean = false;
  @Prop({ mutable: true }) activeIndex: number = -1;

  @State() hoverIndex!: number;

  @Event() activeChanged: EventEmitter<number>;
  @Event() selected: EventEmitter<string>;

  @Watch('hoverIndex')
  handleHoverIndexChange() {
    this.activeIndex = this.hoverIndex;
    this.activeChanged.emit(this.activeIndex);
  }

  @Watch('activeIndex')
  handleActiveIndexChange() {
    console.log('[sy-autocomplete-option] activeIndex changed to:', this.activeIndex);
  }

  @Watch('source')
  handleSourceChange() {
    if (this.source.length > 0 && this.activeIndex === -1) {
      this.activeIndex = 0;
    } else if (this.source.length === 0) {
      this.activeIndex = -1;
    }
  }

  componentDidLoad() {
    // Component loaded
  }

  @Method()
  async setEvent(index: number) {
    this.eventEmitter(this.source[index]);
  }

  private handleMouseEnter(index: number) {
    this.hoverIndex = index;
    this.activeChanged.emit(this.hoverIndex);
  }

  private handleMouseDown(e: MouseEvent, index: number) {
    this.activeIndex = index;
    this.activeChanged.emit(this.activeIndex);
    
    const target = e.target as HTMLElement;
    const selectedValue = target.innerText;
    if (selectedValue) {
      this.eventEmitter(selectedValue);
    }
  }

  private eventEmitter(value: string) {
    this.selected.emit(value);
  }

  render() {
    const hasSource = this.source && Array.isArray(this.source) && this.source.length > 0;
    
    return (
      <div class="autocomplete-option-container">
        {this.loading ? (
          <sy-spinner></sy-spinner>
        ) : hasSource ? (
          this.source.map((value, index) => (
            <div
              class={{
                "option--list": true,
                "option--active": this.activeIndex === index,
              }}
              onMouseDown={(e) => this.handleMouseDown(e, index)}
              onMouseEnter={() => this.handleMouseEnter(index)}
            >
              <div class="option--list-inner">{value}</div>
            </div>
          ))
        ) : (
          <sy-empty></sy-empty>
        )}
      </div>
    );
  }
}
