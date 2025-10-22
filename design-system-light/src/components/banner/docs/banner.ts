import { html } from 'lit';
import '../banner.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface BannerProps {
  closable: boolean;
  neutralIcon: string;
  showIcon: boolean;
  message: string;
  header: string;
  variant: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  slotFooter: any;
}

export const Banner = ({closable, neutralIcon, showIcon, message, header, variant, slotFooter} : BannerProps) => {
  return html`
  <p>A banner is a persistent notification placed at the top of the screen or page. <br/>
  The banner remains at the top as the first child of <b>document.body</b> until it is closed, and it is not stacked when navigating between pages.</p>
    <sy-banner-messsage
      id="mainBanner"
      ?closable=${closable}
      neutralIcon=${neutralIcon}
      ?showIcon=${showIcon}
      message=${message}
      header=${header}
      variant=${variant}>
      ${unsafeHTML(slotFooter)}
      </sy-banner-messsage>`;
};

// export const BannerBtnLabel = (args: {btn1Label: string, btn2Label: string}) => { 
//   return html`
// <sy-banner-messsage 
//   icon 
//   header="Setting btn1Label and btn2Label" 
//   message="Banner message will be displayed here." 
//   variant="warning" 
//   closable 
//   btn1Label="${args.btn1Label}" 
//   btn2Label="${args.btn2Label}">
// </sy-banner-messsage>
//   `;
// };

// export const BannerBtnType = (args: {btn1Type:'default' | 'primary' | 'secondary' | 'borderless', btn2Type: 'default' | 'primary' | 'secondary' | 'borderless'}) => {
//   return html`
// <sy-banner-messsage 
//   header="Primary type action button" 
//   message="Banner message will be displayed here." 
//   variant="info" 
//   closable 
//   btn1Label="Button 1" 
//   btn1Type="${args.btn1Type}"
//   btn2Label="Button 2" 
//   btn2Type="${args.btn2Type}"
//   >
// </sy-banner-messsage>
//   `;
// }

export const BannerClosable = (args: {closable: boolean}) => {
  return html`
<sy-banner-messsage 
  header="Closable banner" 
  variant="info" 
  message="Banner message will be displayed here." 
  ?closable=${args.closable}>
</sy-banner-messsage>
  `;
};

export const BannerShowIcon = (args: {showIcon: boolean, variant: 'info' | 'success' | 'warning' | 'error' | 'neutral'}) => {
  return html`
<sy-banner-messsage 
  ?showIcon=${args.showIcon}
  variant=${args.variant}
  header="Success banner with icon" 
  message="Banner message will be displayed here." 
  variant="success">
</sy-banner-messsage>
  `;
}

export const BannerSlotFooter = (args: { slotFooter: any }) => {
  return html`
    <sy-banner-messsage id="banner"
      header="Set banner footer with slotFooter" 
      message="Banner message will be displayed here." 
      variant="success">
      ${unsafeHTML(args.slotFooter)}
    </sy-banner-messsage>

  <p id="click-result"></p>

  <script>
  (() => {
    let bannerElem = document.querySelector('#banner');   
    let result = document.querySelector('#click-result');    

    let handleClicked = (e) => {
      result.textContent = e.target.textContent + ' is clicked.';
    };

    const btn1 = bannerElem.querySelector('#btn1');
    const btn2 = bannerElem.querySelector('#btn2');

    btn1.addEventListener('click', handleClicked);
    btn2.addEventListener('click', handleClicked);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('click', handleButtonClick);
    });
    
  })();
  </script>
  `;
};

export const BannerneutralIcon = (args: {showIcon: boolean, neutralIcon: string}) => {
  return html`
<sy-banner-messsage 
  header="Banner neutralIcon" 
  message="It should be one of the types available in the sy-icon component." 
  neutralIcon="${args.neutralIcon}" 
  ?showIcon=${args.showIcon}
  variant="neutral">
</sy-banner-messsage>
  `;
}


export const BannerMessage = (args: {message: string}) => {
  return html`
<sy-banner-messsage 
  variant="success" 
  closable 
  header="Banner with message" 
  message="${args.message}">
</sy-banner-messsage>
  `;
};

export const BannerTitle = (args: {header: string}) => { 
  return html`
<sy-banner-messsage 
  header="${args.header}" 
  variant="warning" 
  closable 
  message="If the title prop is set, the banner title will be rendered at the top of the banner message in a bolder and bigger font."></sy-banner-messsage>
  `;
};

export const BannerVariant = (args: {variant: 'info' | 'success' | 'warning' | 'error' | 'neutral', showIcon: boolean}) => { 
  return html`
<sy-banner-messsage 
  variant="${args.variant}"
  ?showIcon=${args.showIcon}
  header="banner" 
  message="Confirm a task was completed as expected.">
</sy-banner-messsage>
  `;
};
