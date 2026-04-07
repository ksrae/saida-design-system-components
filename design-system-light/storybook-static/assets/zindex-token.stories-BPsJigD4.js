import{h as e}from"./index-BdigElPL.js";const l=r=>{const n=getComputedStyle(document.documentElement),a=["Used for the z-index that should be the highest.","Toast notification","Popover, Popconfirm, Tooltip, Dropdown, Inline-Message, Select Menu","Modal, Popconfirm","Drawer, Notification center","Modeless","Layer of open source(Ignite UI)","Layer of open source(Ag-grid, Charts)","Condition Layer of Fab.DA or App","Application page","Default"],i=t=>{navigator.clipboard&&navigator.clipboard.writeText(t)};return e("div",null,e("style",null,`
          table {
            border-collapse: collapse;
            width: 100%;
          }

          table thead tr {
            background-color: #ffffff;
            color: #000000;
            text-align: left;
          }

          th,td {
            border: none !important;
            padding: 12px 12px !important;
          }

          tbody tr {
            border-bottom: 1px solid #8686862b;
          }

          sy-icon:hover {
            color: var(--background-brand-bolder);
          }
        `),e("table",{part:"tb"},e("thead",null,e("tr",{class:"header",part:"htr"},e("th",{part:"hth"},"Token"),e("th",{part:"hth"},"Description"),e("th",{part:"hth"},"Value"))),e("tbody",{id:"main-area"},r.map((t,d)=>{const s=n.getPropertyValue(t);return e("tr",{part:"btr"},[e("td",{part:"btd"},e("div",{},[e("span",{},t),e("sy-icon",{selectable:!0,class:{"copy-icon":!0},onClick:()=>i(t)},[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640"},e("path",{fill:"currentColor",d:"M352 112L352 184C352 223.8 384.2 256 424 256L496 256L496 448C496 456.8 488.8 464 480 464L256 464C247.2 464 240 456.8 240 448L240 128C240 119.2 247.2 112 256 112L352 112zM400 115.9L492.1 208L424 208C410.7 208 400 197.3 400 184L400 115.9zM256 64C220.7 64 192 92.7 192 128L192 448C192 483.3 220.7 512 256 512L480 512C515.3 512 544 483.3 544 448L544 211.9C544 199.2 538.9 187 529.9 178L430.1 78.1C421.1 69.1 408.9 64 396.2 64L256 64zM120 160C106.7 160 96 170.7 96 184L96 544C96 579.3 124.7 608 160 608L424 608C437.3 608 448 597.3 448 584C448 570.7 437.3 560 424 560L160 560C151.2 560 144 552.8 144 544L144 184C144 170.7 133.3 160 120 160z"})),e("sy-tooltip",{content:"copy to clipboard"})])])),e("td",{part:"btd"},a[d]),e("td",{part:"btd"},s)])}))))},c=["--z-index-1000","--z-index-900","--z-index-800","--z-index-700","--z-index-600","--z-index-500","--z-index-400","--z-index-300","--z-index-200","--z-index-100","--z-index-none"],p={title:"Foundation/Z-Index",tags:["false"],render:r=>l(r.tokenLists)},o={args:{tokenLists:c}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tokenLists: zIndexTokens
  }
}`,...o.parameters?.docs?.source}}};const u=["Default"],h=Object.freeze(Object.defineProperty({__proto__:null,Default:o,__namedExportsOrder:u,default:p},Symbol.toStringTag,{value:"Module"}));export{o as D,h as Z};
