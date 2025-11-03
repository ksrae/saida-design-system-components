import { html } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Components } from '../../../components';

export interface SyButtonProps extends Components.SyButton {
  slot: any;
  click?: (event: MouseEvent) => void;
}

export const Button = ({disabled, justified, loading, size, type, variant, slot}: SyButtonProps) => {
  return html`
    <sy-button
      ?disabled=${disabled}
      ?justified=${justified}
      ?loading=${loading}
      size=${size}
      type=${type}
      variant=${variant}
      >
      ${unsafeHTML(slot)}
    </sy-button>`;
};

// Variant
export const ButtonAttribute = (args: {disabled: boolean}) => {
  return html`
    <sy-button ?disabled=${args.disabled}>Button</sy-button>
  `;
}

export const ButtonDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-button ?disabled=${args.disabled}>Button</sy-button>
`
}

export const ButtonJustified = (args: {justified: boolean}) => {
  return html`
<sy-button ?justified=${args.justified}>Button</sy-button>
`;
}

export const ButtonLoading = (args: {loading: boolean}) => {
  return html`
<sy-button ?loading=${args.loading}>Button</sy-button>
`;
}

export const ButtonSize = (args: {size: 'small' | 'medium' | 'large'}) => {
  return html`
<sy-button size="${args.size}">Button</sy-button>
`;
}

export const ButtonType = (args: {type: 'button' | 'submit' | 'reset'}) => {
  return html`
    <form id="sampleForm" style="display:flex;gap:4px;">
      <sy-input type="text" name="testInput" value="test input value" /></sy-input>
      <sy-button type=${args.type} id="buttonType">Button</sy-button>
    </form>
    <p id="formResult"></p>
    <script>
      (() => {
        const form = document.querySelector('#sampleForm');
        const result = document.querySelector('#formResult');
        const buttonType = document.querySelector('#buttonType');

        buttonType.addEventListener('click', () => {
          if(buttonType.type === 'button') { // Since the event occurs in overlap with a submit or reset, it is executed only when the button type is a button.
            result.textContent = 'button clicked';
          }
        });

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          result.textContent = 'Form submitted!';
        });

        form.addEventListener('reset', (e) => {
          result.textContent = 'Form reset!';
        });
      })();
    </script>
  `;
}

export const ButtonSlot = (args: {slotContent: any}) => {
  return html`
	<sy-button>
    ${unsafeHTML(args.slotContent)}
  </sy-button>
  `;
}

export const ButtonVariant = (args: {variant: 'default' | 'primary' | 'secondary' | 'borderless'}) => {
  return html`
<sy-button variant="${args.variant}">Button</sy-button>
`;
}

export const ButtonFocusBlur = () => {
  return html`
<sy-button id="btnFocusElem">Button</sy-button>
<p id="btnFocusResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#btnFocusElem');
    const result = document.querySelector('#btnFocusResult');

    // focus button by force with function in 1 sec.
    setTimeout(() => {
      elem.setFocus();
    }, 1000);

    // blur button by force with function in 4 sec.
    setTimeout(() => {
      elem.setBlur();
    }, 4000);


    const handleFocus = (e) => {
      result.textContent = 'focus';
    };

    const handleBlur = (e) => {
      result.textContent = 'blur';
    };

    elem.addEventListener('focus', handleFocus);
    elem.addEventListener('blur', handleBlur);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('focus', handleFocus);
      elem.removeEventListener('blur', handleBlur);
    });
  })();

</script>`;
}

export const ButtonClick = () => {
  return html`
    <sy-button id="btnClickElem">Button</sy-button>
    <p id="btnClickResult"></p>
    <script>
      (() => {
        const elem = document.querySelector('#btnClickElem');
        const result = document.querySelector('#btnClickResult');

        const handleButtonClick = (e) => {
          result.textContent = 'clicked';
        };

        elem.addEventListener('click', handleButtonClick);

        // this is for release click event. It is recommanded for optimization.
        window.addEventListener('beforeunload', () => {
          elem.removeEventListener('click', handleButtonClick);
        });
      })();

    </script>
`;
}
