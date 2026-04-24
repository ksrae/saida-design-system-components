import { Component, Prop, State, h, Element, Watch, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'sy-autocomplete-option',
  styleUrl: 'sy-autocomplete.scss',
  scoped: true,
  shadow: false,
})
export class SyAutocompleteOption {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true }) source: string[] = [];
  @Prop() loading: boolean = false;
  @Prop({ mutable: true }) activeIndex: number = -1;
  @Prop({ mutable: true }) searchTerm: string = '';
  @Prop() caseSensitive: boolean = false;
  @Prop() highlightMatches: boolean = false;

  @State() hoverIndex: number = -1;

  @Event() activeChanged!: EventEmitter<number>;
  @Event() selected!: EventEmitter<string>;

  @Watch('hoverIndex')
  handleHoverIndexChange() {
    this.activeIndex = this.hoverIndex;
    this.activeChanged.emit(this.activeIndex);
  }

  @Watch('source')
  handleSourceChange() {
    if (this.source.length > 0 && this.activeIndex === -1) {
      this.activeIndex = 0;
    } else if (this.source.length === 0) {
      this.activeIndex = -1;
    }
  }

  @Method()
  async setEvent(index: number) {
    this.eventEmitter(this.source[index]);
  }

  @Method()
  async forceUpdate() {
    this.source = [...this.source];
  }

  private handleMouseEnter(index: number) {
    this.hoverIndex = index;
    this.activeChanged.emit(this.hoverIndex);
  }

  private handleMouseDown(e: MouseEvent, index: number) {
    e.preventDefault();
    this.activeIndex = index;
    this.activeChanged.emit(this.activeIndex);

    const selectedValue = this.source[index];
    if (selectedValue !== undefined) {
      this.eventEmitter(selectedValue);
    }
  }

  private eventEmitter(value: string) {
    this.selected.emit(value);
  }

  private renderLabel(value: string) {
    if (!this.highlightMatches || !this.searchTerm) {
      return <span>{value}</span>;
    }

    const needle = this.caseSensitive ? this.searchTerm : this.searchTerm.toLowerCase();
    if (needle.length === 0) return <span>{value}</span>;

    const haystack = this.caseSensitive ? value : value.toLowerCase();
    const idx = haystack.indexOf(needle);
    if (idx < 0) return <span>{value}</span>;

    const before = value.substring(0, idx);
    const match = value.substring(idx, idx + needle.length);
    const after = value.substring(idx + needle.length);

    // Inline styles guarantee rendering regardless of Stencil scoped-CSS resolution.
    const markStyle = {
      backgroundColor: 'transparent',
      color: 'inherit',
      fontWeight: '700',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
    };

    return (
      <span>
        {before}
        <mark class="option--highlight" style={markStyle}>{match}</mark>
        {after}
      </span>
    );
  }

  render() {
    const hasSource = this.source && Array.isArray(this.source) && this.source.length > 0;

    return (
      <div class="autocomplete-option-container" role="listbox">
        {this.loading ? (
          <div class="autocomplete-option-loading">
            <sy-spinner></sy-spinner>
          </div>
        ) : hasSource ? (
          this.source.map((value, index) => (
            <div
              role="option"
              aria-selected={this.activeIndex === index ? 'true' : 'false'}
              class={{
                'option--list': true,
                'option--active': this.activeIndex === index,
              }}
              onMouseDown={(e) => this.handleMouseDown(e, index)}
              onMouseEnter={() => this.handleMouseEnter(index)}
            >
              <div class="option--list-inner">{this.renderLabel(value)}</div>
            </div>
          ))
        ) : (
          <sy-empty></sy-empty>
        )}
      </div>
    );
  }
}
