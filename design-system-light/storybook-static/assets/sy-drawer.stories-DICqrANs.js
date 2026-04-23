import{c as b}from"./clear-element-Diyka43E.js";import{x as f}from"./iframe-nFrKWBxN.js";import{o as r}from"./unsafe-html-13gMdR3O.js";var a=Object.freeze,v=Object.defineProperty,g=(e,o)=>a(v(e,"raw",{value:a(e.slice())})),s;const w=({closable:e,customSize:o,maskless:l,preventClose:i,open:c,position:d,size:m,slotHeader:u,slotBody:p,slotFooter:y})=>f(s||(s=g([`
	<sy-drawer
    ?closable=`,`
    customSize=`,`
    ?maskless=`,`
    ?preventClose=`,`
    ?open=`,`
    position=`,`
    size=`,`>
    `,`
    `,`
    `,`
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  <\/script>
  `])),e,o,l,i,c,d,m,r(u),r(p),r(y)),n={title:"Drawer/Overview",component:"sy-drawer",render:e=>(b(n.title),w(e)),argTypes:{closable:{control:"boolean",description:"Shows a close button in the header.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},customSize:{control:"number",name:"customSize (custom-size)",description:"When the size attribute is set to custom, the size can be customized.",table:{category:"Parameter",defaultValue:{summary:void 0},type:{summary:"number"}}},maskless:{control:"boolean",description:"Removes mask of the drawer",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},preventClose:{control:"boolean",name:"preventClose (prevent-close)",description:"Prevents the drawer from closing when clicking outside",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},open:{control:"boolean",description:"Open the drawer manually",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},position:{control:"select",options:["top","left","right","bottom"],description:"Visible position of the drawer",table:{category:"Parameter",defaultValue:{summary:"right"},type:{summary:"top | left | right | bottom"}}},size:{control:"select",options:["small","medium","large","custom"],description:"Size of the drawer",table:{category:"Parameter",defaultValue:{summary:"medium"},type:{summary:"small | medium | large | custom"}}},opened:{type:"function",name:"opened",description:"Triggered when any item is selected.",table:{category:"Callback",type:{summary:".addEventListener('opened', (e) => {})"}}},closed:{type:"function",name:"closed",description:"Triggered when any item is selected.",table:{category:"Callback",type:{summary:".addEventListener('closed', (e) => {})"}}},slotHeader:{control:!1,description:"Header slot content for the drawer",table:{category:"Parameter",defaultValue:{summary:""}}},slotBody:{control:!1,description:"Body slot content for the drawer",table:{category:"Parameter",defaultValue:{summary:""}}},slotFooter:{control:!1,description:"Footer slot content for the drawer",table:{category:"Parameter",defaultValue:{summary:""}}}}},t={args:{position:"right",size:"medium",closable:!0,maskless:!1,preventClose:!1,open:!1,slotHeader:'<div slot="header">Drawer Header</div>',slotBody:`<div slot="body">
        <p>This is the drawer content.</p>
        <p>You can put any content here.</p>
      </div>`,slotFooter:'<div slot="footer"><sy-button>Action</sy-button></div>'}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'right',
    size: 'medium',
    closable: true,
    maskless: false,
    preventClose: false,
    open: false,
    slotHeader: \`<div slot="header">Drawer Header</div>\`,
    slotBody: \`<div slot="body">
        <p>This is the drawer content.</p>
        <p>You can put any content here.</p>
      </div>\`,
    slotFooter: \`<div slot="footer"><sy-button>Action</sy-button></div>\`
  }
}`,...t.parameters?.docs?.source}}};const h=["Default"],S=Object.freeze(Object.defineProperty({__proto__:null,Default:t,__namedExportsOrder:h,default:n},Symbol.toStringTag,{value:"Module"}));export{S as D,t as a};
