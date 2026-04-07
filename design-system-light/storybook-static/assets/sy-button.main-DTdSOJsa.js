import{x as e}from"./iframe-nFrKWBxN.js";import{o as i}from"./unsafe-html-13gMdR3O.js";var s=Object.freeze,y=Object.defineProperty,n=(t,o)=>s(y(t,"raw",{value:s(t.slice())})),r,u,l,c;const k=({disabled:t,justified:o,loading:d,size:a,type:m,variant:b,slot:p})=>e`
    <sy-button
      ?disabled=${t}
      ?justified=${o}
      ?loading=${d}
      size=${a}
      type=${m}
      variant=${b}
      >
      ${i(p)}
    </sy-button>`,C=t=>e`
    <sy-button ?disabled=${t.disabled}>Button</sy-button>
  `,B=t=>e(r||(r=n([`
    <form id="sampleForm" style="display:flex;gap:4px;">
      <sy-input type="text" name="testInput" value="test input value" /></sy-input>
      <sy-button type=`,` id="buttonType">Button</sy-button>
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
    <\/script>
  `])),t.type),h=t=>e`
	<sy-button>
    ${i(t.slotContent)}
  </sy-button>
  `,E=()=>e(u||(u=n([`
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

<\/script>`]))),S=()=>e(l||(l=n([`
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

    <\/script>
`]))),L=()=>e(c||(c=n([`
    <sy-button id="btnSetClickElem">Button</sy-button>
    <p id="btnSetClickResult"></p>
    <script>
      (() => {
        const elem = document.querySelector('#btnSetClickElem');
        const result = document.querySelector('#btnSetClickResult');

        const handleButtonClick = (e) => {
          result.textContent = 'clicked via setClick()';
        };

        elem.addEventListener('click', handleButtonClick);

        // trigger setClick programmatically after 1 sec.
        setTimeout(() => {
          elem.setClick();
        }, 1000);

        window.addEventListener('beforeunload', () => {
          elem.removeEventListener('click', handleButtonClick);
        });
      })();
    <\/script>
`])));export{C as B,h as a,B as b,S as c,k as d,E as e,L as f};
