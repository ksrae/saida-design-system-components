import { Component, Prop, State, Event, EventEmitter, Watch, h, Element } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-avatar',
  styleUrl: 'sy-avatar.scss',
  shadow: false,
  scoped: true,
})
export class SyAvatar {
  @Element() host: HTMLSyAvatarElement;
  @Prop({ reflect: true }) clickable: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() image: string = '';
  @Prop() text: string = '';
  @Prop() icon: string = '';
  @Prop() letter: string = '';
  @Prop({ reflect: true }) variant: "lightgray"| "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "blue" | "purple" | "magenta" | "darkgray" = "lightgray";
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ mutable: true, attribute: 'tooltipContent' }) tooltipContent: string = '';

  @State() private imageLoaded: boolean = false;
  // @State() private shape: 'circle' | 'square' = 'circle';
  @State() private exposedText: string = '';
  @State() private isTooltipContentUserSet: boolean = false;

  @Event() selected: EventEmitter<{
    letter: string;
    text: string;
    icon: string;
    image: string;
  }>;

  @Event() disableStatus: EventEmitter<{ disabled: boolean }>;

  componentWillLoad() {
    // tooltipContent가 이미 설정되어 있으면 HTML 태그 제거 후 사용자가 설정한 것으로 간주
    if (this.tooltipContent?.trim()?.length) {
      const tooltipContent = fnAssignPropFromAlias(this.host, 'tooltip-content') ?? this.tooltipContent;
      this.tooltipContent = this.sanitizeHtml(tooltipContent);
      this.isTooltipContentUserSet = true;
    }

    // image 처리
    if (this.image?.trim()?.length) {
      this.imgPreload();
    }

    // text 처리
    if (this.text?.trim()?.length) {
      this.setText();
    }

    // letter 처리
    if (this.letter?.trim()?.length) {
      if (this.letter.length > 2) {
        this.letter = this.letter.slice(0, 2).toUpperCase();
      }
    }
  }

  @Watch('tooltipContent')
  watchTooltipContent(newValue: string) {
    this.tooltipContent = this.sanitizeHtml(newValue);
    this.isTooltipContentUserSet = !!this.tooltipContent?.trim()?.length;
  }

  @Watch('image')
  watchImage(newValue: string) {
    if (newValue && newValue.trim()?.length) {
      this.imgPreload();
    }
  }

  @Watch('text')
  watchText() {
    this.setText();
  }

  @Watch('letter')
  watchLetter(newValue: string) {
    if (newValue && newValue?.length > 2) {
      this.letter = newValue.slice(0, 2).toUpperCase();
    }
  }

  @Watch('disabled')
  watchDisabled(newValue: boolean) {
    this.disableStatus.emit({ disabled: newValue });
  }

  private setText() {
    if (this.text.includes(' ')) {
      const fullName = this.text.split(' ');
      this.exposedText = fullName.map((name) => name.charAt(0)).join('').toUpperCase();
    } else {
      if (this.text.length > 2) {
        this.exposedText = this.text.slice(0, 2).toUpperCase();
      } else {
        this.exposedText = this.text.toUpperCase();
      }
    }
  }

  private imgPreload() {
    const img = new Image();
    img.src = this.image;

    img.onload = () => {
      this.imageLoaded = true;
    };

    img.onerror = () => {
      this.imageLoaded = false;
      this.image = '';
    };
  }

  private handleClick = (e: Event) => {
    e.preventDefault();

    if (this.clickable && !this.disabled) {
      this.selected.emit({
        letter: this.letter ?? '',
        text: this.text ?? '',
        icon: this.icon ?? '',
        image: this.image ?? '',
      });
    }
  }

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  private getComputedTooltipContent(): string {
    // 사용자가 명시적으로 설정한 경우 그 값을 사용
    if (this.isTooltipContentUserSet && this.tooltipContent?.trim()?.length) {
      return this.sanitizeHtml(this.tooltipContent);
    }

    if (this.image?.trim()?.length) {
      return this.sanitizeHtml(this.image);
    } else if (this.icon?.trim()?.length) {
      return this.sanitizeHtml(this.icon);
    } else if (this.text?.trim()?.length) {
      return this.sanitizeHtml(this.text);
    } else if (this.letter?.trim()?.length) {
      return this.sanitizeHtml(this.letter);
    }

    return '';
  }

  private getAvatarClasses() {
    return {
      'avatar-item': true,
      [`avatar--${this.variant}`]: true,
      [`avatar--${this.size}`]: true,
      'disabled': this.disabled,
    };
  }

  private renderContent() {
    if (this.image?.trim()?.length > 0 && this.imageLoaded) {
      return <img src={this.image} alt={this.getComputedTooltipContent()} />;
    } else if (this.icon?.trim()?.length > 0) {
      const iconSize = this.size === 'large' ? 'xxlarge' : this.size === 'medium' ? 'large' : this.size;
      return (
        <sy-icon size={iconSize} svgMarkup={this.icon}></sy-icon>
      );
    } else if (this.letter?.trim()?.length || this.exposedText?.trim()?.length) {
      return (
        <span class="letter">
          {this.letter?.trim()?.length ? this.letter : this.exposedText}
        </span>
      );
    }
    return null;
  }

  render() {
    const computedTooltip = this.getComputedTooltipContent();

    return (
      <div
        class={this.getAvatarClasses()}
        title={computedTooltip}
        onClick={this.handleClick}
      >
        {this.renderContent()}
      </div>
    );
  }
}
