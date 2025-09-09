import { Component, Element, Prop, State, Watch, h } from "@stencil/core";

export interface HTMLSyBadgeElement extends HTMLElement {
  dot: boolean;
  hidden: boolean;
  standalone: boolean;
  overflowCount: number;
  value: number;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  size: 'small' | 'medium';
  variant: 'red' | 'yellow' | 'green' | 'blue' | 'gray';
}

@Component({
  tag: 'sy-badge',
  styleUrl: 'sy-badge.scss',
  shadow: false,
  scoped: true,
})
export class Sybadge {
  @Element() host: HTMLSyBadgeElement;
 
  @Prop({ reflect: true }) dot = false;
  @Prop({ reflect: true }) hidden = false;
  @Prop({ reflect: true }) standalone: boolean = false; 
  @Prop({ reflect: true, attribute: 'overflowCount' }) overflowCount: number = Infinity;
  @Prop({ reflect: true }) value: number = 0;
  @Prop() position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight';
  @Prop() size: 'small' | 'medium' = 'medium';
  @Prop() variant: 'red' | 'yellow' | 'green' | 'blue' | 'gray' = 'red';
  
  @State() private displayValue!: string;

  componentWillLoad() {
    this.setValue();
  }    
  // updated
  @Watch('dot')
  @Watch('value')
  @Watch('overflowCount')
  handleValueChange() {
    this.setValue();
  }

  componentDidRender() {
    // this.setValue();
  }

  render() {
    const classNames = {
      badge: true,
      dot: this.dot,
      visible: !this.hidden,
      standalone: this.standalone,
      'badge-over': this.displayValue?.length >= 2,
      'badge-red': this.variant === 'red',
      'badge-yellow': this.variant === 'yellow',
      'badge-green': this.variant === 'green',
      'badge-blue': this.variant === 'blue',
      'badge-gray': this.variant === 'gray',
      [this.size]: true,
      [this.position]: !this.standalone,
    };

    return (
      <div class="container">
        <span class="badge-content"><slot></slot></span>
        <div class={Object.keys(classNames).filter(key => classNames[key]).join(' ')}>
          {this.displayValue}
        </div>
      </div>
    );
  }
  
  private setValue() {
    // this.overflowCount = this.overflowCount !== null ? parseFloat(this.overflowCount as any) : Infinity;

    const numValue = Math.floor(this.value);
    this.displayValue = this.dot ? '' : this.overflowCount !== Infinity && numValue > this.overflowCount ? `${this.overflowCount}+` : `${numValue}`;
  }
}
