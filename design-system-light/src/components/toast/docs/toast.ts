import { html } from "lit";
import "../toast.element";
import "../toast-item.element";
import "../../button/button.element";
import "../../icon/icon.element";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface ToastProps {
  latestTop: boolean;
  closable: boolean;
  duration: number;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  variant: 'neutral' | 'success' | 'error' | 'info' | 'warning';
  iconSlot: string | HTMLElement;
  headerSlot: string | HTMLElement;
  bodySlot: string | HTMLElement;
  footerSlot: string | HTMLElement;
  slotContent: any;
  closeToast?: () => any;
  createNeutralToast?: () => any;
  createErrorToast?: () => any;
  createInfoToast?: () => any;
  createSuccessToast?: () => any;
  createToast?: () => any;
  createWarningToast?: () => any;
}

export const Toast = ({ latestTop, closable, duration, position, variant, slotContent, iconSlot, headerSlot, bodySlot, footerSlot }: ToastProps) => {
  return html`
    <sy-toast-message
      id="mainToast" 
      ?latestTop=${latestTop}
      ?closable=${closable}
      duration=${duration?.toString() ?? '3000'}
      position=${position?.toString() ?? 'topRight'}
      variant=${variant}>
      ${unsafeHTML(iconSlot as any)}
      <div slot="header">Toast Header</div>
      <div slot="body">This is the body of the toast.</div>
      <div slot="footer">Footer Content</div>
    </sy-toast-message>

    <sy-button id="btnMainToast" class="button-toast">Open Toast</sy-button>
    <script>
      (() => {
      const mainToast = document.querySelector('#mainToast');
      const btnMainToast = document.querySelector('#btnMainToast');

      btnMainToast.addEventListener('click', (e) => {
        const closable = mainToast.getAttribute('closable');
        const duration = mainToast.getAttribute('duration');
        const position = mainToast.getAttribute('position');
        const variant = mainToast.getAttribute('variant');      

        e.preventDefault();
        mainToast.createToast(
          variant, 
          //wraps in a object literal
          {
            closable: closable === '' ? true : false,
            duration: Number(duration),
            position: position, 
          }
        );
      });
    })();
    </script>
  `;
};

export const ToastLatestTop = (args: {latestTop: boolean}) => {
  return html`
<sy-toast-message 
  id="latestTopToast" ?latestTop=${args.latestTop}>

</sy-toast-message>

<sy-button id="btnLatestTopToast" class="button-toast">Open Toast</sy-button>

<script>
  (() => {  
  let index = 0;
  const latestTopToast = document.querySelector('#latestTopToast');
  const btnLatestTopToast = document.querySelector('#btnLatestTopToast');

  btnLatestTopToast.addEventListener('click', (e) => {
    e.preventDefault();
    latestTopToast.createInfoToast(
      {
        headerSlot: 'Latest top Toast',
        bodySlot: 'Toast No: ' + (index++).toString(),
      }
    );
  });

  })();
</script>
`;
};
 

export const ToastClosable = (args: {closable: boolean}) => {
  return html`
<sy-toast-message 
  id="closableToast">
  <div slot="header">Toast Header</div>
  <div slot="body">This is the body of the toast.</div>
  <div slot="footer">Footer Content</div>
</sy-toast-message>

<sy-button id="btnClosableToast" class="button-toast">Open Toast</sy-button>

<script>
  (() => {  
  const closableToast = document.querySelector('#closableToast');
  const btnClosableToast = document.querySelector('#btnClosableToast');

  const updatedArgs = ${JSON.stringify(args)};

  btnClosableToast.addEventListener('click', (e) => {
    e.preventDefault();
    const controlClosable = document.querySelector('#control-closable')?.checked;
    const closable = controlClosable ?? updatedArgs.closable;

    closableToast.createNeutralToast({closable: closable});
  });

  })();
</script>
`;
};
 
export const ToastDuration = (args: {duration: number}) => {
  return html`
<sy-toast-message id="durationToast">
  <div slot="header">Toast Header</div>
  <div slot="body">This is the body of the toast.</div>
  <div slot="footer">Footer Content</div>
</sy-toast-message>

<sy-button id="btnDurationToast" class="button-toast">Open Duration Toast</sy-button>

<script>
  (() => {
    const durationToast = document.querySelector('#durationToast');
    const btnDurationToast = document.querySelector('#btnDurationToast');

    const updatedArgs = ${JSON.stringify(args)};

    btnDurationToast.addEventListener('click', (e) => {
      e.preventDefault();
      const controlDuration = document.querySelector('#control-duration')?.value;
      const value = Number(controlDuration ?? updatedArgs.duration);
      
      durationToast.createNeutralToast({duration: value });
    });
  })();
</script>
`;
};

export const ToastPosition = (args: {position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'}) => {
  return html`
<sy-toast-message id="positionToast">
  <div slot="header">Toast Header</div>
  <div slot="body">This is the body of the toast.</div>
  <div slot="footer">Footer Content</div>
</sy-toast-message>

<sy-button id="btnPositionToast" class="button-toast">Open Toast</sy-button>

<script>
  (() => {
    const positionToast = document.querySelector('#positionToast');
    const btnPositionToast = document.querySelector('#btnPositionToast');

    const updatedArgs = ${JSON.stringify(args)};

    btnPositionToast.addEventListener('click', (e) => {
      e.preventDefault();
      const controlPosition = document.querySelector('#control-position')?.value;
      const value = controlPosition ?? updatedArgs.position;
      
      positionToast.createSuccessToast({position: value});
    });
  })();
</script>
`;
};


export const ToastVariant = (args: {variant: 'neutral' | 'success' | 'error' | 'info' | 'warning', iconSlot: any}) => {
  return html`
<sy-toast-message id="variantToast">
  <div slot="header">Toast Header</div>
  <div slot="body">This is the body of the toast.</div>
  <div slot="footer">Footer Content</div>
    ${unsafeHTML(args.iconSlot)}
</sy-toast-message>
<sy-button id="btnVariantToast" class="button-toast">Open Toast</sy-button>
<script>
  (() => {
    const variantToast = document.querySelector('#variantToast');
    const btnVariantToast = document.querySelector('#btnVariantToast');
    
    const updatedArgs = ${JSON.stringify(args)};


    btnVariantToast.addEventListener('click', (e) => {
      e.preventDefault();
      const controlVariant = document.querySelector('#control-variant')?.value;
      const variant = controlVariant ?? updatedArgs.variant;
      variantToast.createToast(variant);
    });
  })();
</script>
`;
};

export const ToastCustomMessage = () => {
  return html`
<h3>Custom By Slot</h3>
<sy-toast-message id="customSlotToast">
  <div slot="header">Toast Header</div>
  <div slot="body">This is the body of the toast.</div>
  <div slot="footer">Footer Content</div>
</sy-toast-message>
<sy-button id="btnSlotToast" class="button-toast">Open Toast</sy-button>
<script>
  (() => {
  const customSlotToast = document.querySelector('#customSlotToast');

  btnSlotToast.addEventListener('click', (e) => {
    e.preventDefault();
    customSlotToast.createNeutralToast();
  });
  })();
</script>

<br/><br/>

<h3>Custom By Function</h3>
<sy-toast-message id="customAttributeToast"></sy-toast-message>
<sy-button id="btnAttributeToast" class="button-toast">Open Toast</sy-button>

<script>
  (() => {
  const customAttributeToast = document.querySelector('#customAttributeToast');

  btnAttributeToast.addEventListener('click', (e) => {
    e.preventDefault();
    customAttributeToast.createNeutralToast(
      {
        iconSlot: '<sy-icon size="xxlarge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg></sy-icon>',
        headerSlot: 'Attribute Custom Header',
        bodySlot: 'Attribute Custom Body',
        footerSlot: 'Attribute Custom Footer',
      }
    );
  });
  })();
</script>
`
};
