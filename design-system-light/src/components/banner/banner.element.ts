import { css, CSSResultGroup, html, LitElement, nothing, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import globalCss from "./styles/banner.scss?inline";
import "../button/button.element";
import "../icon/icon.element";

@customElement('sy-banner-messsage')
export class BannerElement extends LitElement {

  static styles: CSSResultGroup = css`${unsafeCSS(globalCss)};`;

  @property({ type: Boolean, reflect: true }) closable = false;
  @property({ type: String }) neutralIcon: string = '';
  @property({ type: Boolean }) showIcon = false;

  @property({ type: String }) message: string = '';
  @property({ type: String }) header:string = '';
  @property({ type: String }) variant: 'info' | 'success' | 'warning' | 'error' | 'neutral' = 'info';

  @state() private iconVariant!: string;
  
  async firstUpdated() {
    await this.updateComplete;
    this.createBanner()
  }


  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('variant')) {
      switch (this.variant) {
        case 'info': 
          this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>'; 
          break;
        case 'success': 
          this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z"/></svg>';
          break;
        case 'warning': 
          this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z"/></svg>';
          break;
        case 'error':  
          this.iconVariant = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>';
          break;
        case 'neutral':  
          this.iconVariant = this.neutralIcon.length > 0 ? this.neutralIcon : '';
          break;
      } 
    }
    this.createBanner();
  }

  // disconnectedCallback() {
  //   super.disconnectedCallback();
  // }

  private createBanner() {
    const banner = document.body.querySelector('sy-banner-messsage');
    const firstChild = document.body.firstChild;

    if(!banner) {
      document.body.insertBefore(this, document.body.firstChild);
    }
    else if(banner) {
      if(firstChild?.nodeName.toLocaleLowerCase() === 'sy-banner-messsage') {
        // if firstChild is sy-banner-messsage, replace with new one
        document.body.replaceChild(this, firstChild);
      } else {
        document.body.insertBefore(this, document.body.firstChild);
      }
    }
  }

  private removeBanner() {
    document.body.removeChild(this);
  };

  
  render() {
    return html` 
      <div class="banner-container ${this.variant}">
        <div class="banner-content">
          <div class="banner-group">
            ${(this.showIcon && this.variant !=='neutral') || (this.showIcon && this.variant === 'neutral' && this.neutralIcon) ? html`
            <sy-icon size="xxlarge" class="banner-icon">
              ${unsafeHTML(this.iconVariant)}
            </sy-icon>`
            : nothing }
            <div class="banner-message-group">
                <div class="banner-message-area">
                  <!-- Title 없을 시 div hidden 처리 -->            
                  <div class="banner-title">${this.header}</div>
                  <!-- mseeage 없을 시 div hidden 처리 -->
                  <div class="banner-message">${this.message}</div>  
                </div>
                <slot name="footer" class="banner-footer"></slot>
               </div>
            </div>
          <div class="banner-close">              
            ${this.closable ? html`
              <sy-icon @selected=${this.removeBanner} size="large" selectable>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg>
              </sy-icon>` : nothing }            
          </div>
        </div>
      </div>`
  }       
}