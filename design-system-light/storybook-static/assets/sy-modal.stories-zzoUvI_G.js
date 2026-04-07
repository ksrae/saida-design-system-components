import{x as h}from"./iframe-nFrKWBxN.js";import{o as a}from"./unsafe-html-13gMdR3O.js";import{c as x}from"./clear-element-Diyka43E.js";var l=Object.freeze,k=Object.defineProperty,C=(e,o)=>l(k(e,"raw",{value:l(e.slice())})),r;const M=({cancelText:e,closable:o,enableModalMaximize:s,hideFooter:i,maskClosable:m,okText:c,open:d,width:u,top:y,left:p,variant:b,slotHeader:f,slotBody:v,slotFooter:g})=>h(r||(r=C([`
  <sy-modal
    cancelText=`,`
    ?closable=`,`
    ?enableModalMaximize=`,`
    ?hideFooter=`,`
    ?maskClosable=`,`
    okText=`,`
    ?open=`,`
    width=`,`
    top=`,`
    left=`,`
    variant=`,`>
    `,`
    `,`
    `,`
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();

  <\/script>
  `])),e,o,s,i,m,c,d,u,y,p,b,a(f),a(v),a(g)),n={title:"Modal/Overview",component:"sy-modal",render:e=>(x(n.title),M(e)),argTypes:{cancelText:{control:"text",name:"cancelText (cancel-text)",description:"Custom value for cancel button. HTML is acceptable as well.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},closable:{control:"boolean",description:"Displays close button on right side of the header",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},enableModalMaximize:{name:"enableModalMaximize (enable-modal-maximize)",control:"boolean",description:"Enables maximize button on the modal header",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},hideFooter:{control:"boolean",name:"hideFooter (hidden-footer)",description:"Hide modal footer",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},maskClosable:{control:"boolean",name:"maskClosable (mask-closable)",description:"Closes the modal when clicking outside the modal",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},okText:{control:"text",name:"okText (ok-text)",description:"Custom value for ok button. HTML is acceptable as well.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},open:{control:"boolean",description:"Opens modal if true",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},top:{control:"number",description:"Sets top position manually",table:{category:"Parameter",defaultValue:{summary:"-1"},type:{summary:"number"}}},left:{control:"number",description:"Sets left position manually",table:{category:"Parameter",defaultValue:{summary:"-1"},type:{summary:"number"}}},width:{control:"number",description:"Sets width manually",table:{category:"Parameter",defaultValue:{summary:0},type:{summary:"number"}}},variant:{control:"radio",options:["modal","dialog"],description:"Sets the variant of the modal",table:{category:"Parameter",defaultValue:{summary:"modal"},type:{summary:"modal | dialog"}}},slotHeader:{control:!1,description:"Custom value for header",table:{category:"Parameter",defaultValue:{summary:""}}},slotBody:{control:!1,description:"Custom value for body",table:{category:"Parameter",defaultValue:{summary:""}}},slotFooter:{control:!1,description:"Custom value for footer",table:{category:"Parameter",defaultValue:{summary:""}}},setMaximum:{type:"function",description:"Triggered to maximize the modal. It toggles the maximized state of the modal.",table:{category:"Function",type:{summary:".setMaximum()"}}},setCancel:{type:"function",description:"Triggered to click cancel button the modal. value returns when event triggered",table:{category:"Function",type:{summary:".setCancel(value: any)"}}},setClose:{type:"function",description:"Triggered to close the modal. value returns when event triggered",table:{category:"Function",type:{summary:".setClose(value: any)"}}},setOk:{type:"function",description:"Triggered to click ok button the modal. value returns when event triggered",table:{category:"Function",type:{summary:".setOk(value: any)"}}},setOpen:{type:"function",description:"Triggered to open the modal.",table:{category:"Function",type:{summary:".setOpen()"}}},closed:{type:"function",description:"Emits when close the modal with event type and value if defined.",table:{category:"Callback",type:{summary:".addEventListener('closed', (e) => {})"}}}}},t={args:{cancelText:"cancel",closable:!0,enableModalMaximize:!1,hideFooter:!1,maskClosable:!0,okText:"",open:!1,top:"-1",left:"-1",width:0,variant:"dialog",slotHeader:'<div slot="header">Header</div>',slotBody:`
      <div slot="body">Body Content
      <sy-flex align="start" direction="vertical" columngap="medium" rowgap="medium">
        <div>Click Ok to confirm, click cancel to reject.</div>
        <sy-select>
          <sy-option value="value1" label="option1"></sy-option>
          <sy-option value="value2" label="option2"></sy-option>
          <sy-option value="value3" label="option3"></sy-option>
        </sy-select>
      </sy-flex>
      </div>`,slotFooter:'<div slot="footer">Custom Footer</div>'}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    cancelText: 'cancel',
    closable: true,
    enableModalMaximize: false,
    // draggable: false,
    // maskless: false,
    hideFooter: false,
    maskClosable: true,
    okText: '',
    open: false,
    top: '-1',
    left: '-1',
    width: 0,
    variant: 'dialog',
    slotHeader: \`<div slot="header">Header</div>\`,
    slotBody: \`
      <div slot="body">Body Content
      <sy-flex align="start" direction="vertical" columngap="medium" rowgap="medium">
        <div>Click Ok to confirm, click cancel to reject.</div>
        <sy-select>
          <sy-option value="value1" label="option1"></sy-option>
          <sy-option value="value2" label="option2"></sy-option>
          <sy-option value="value3" label="option3"></sy-option>
        </sy-select>
      </sy-flex>
      </div>\`,
    slotFooter: \`<div slot="footer">Custom Footer</div>\`
  }
}`,...t.parameters?.docs?.source}}};const T=["Default"],F=Object.freeze(Object.defineProperty({__proto__:null,Default:t,__namedExportsOrder:T,default:n},Symbol.toStringTag,{value:"Module"}));export{t as D,F as M};
