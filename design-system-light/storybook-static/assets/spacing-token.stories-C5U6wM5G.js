import{h as t}from"./index-BdigElPL.js";const p=(r,o)=>{const n=document.getElementsByClassName(r)[0],s=getComputedStyle(n),c=(e,l)=>{e.preventDefault(),navigator.clipboard&&navigator.clipboard.writeText(l)};return t("div",null,t("style",null,`
          table {
            border-collapse: collapse;
            width: 100%;
          }

          table thead tr {
            background-color: #ffffff;
            color: #000000;
            text-align: left;
          }

          th, td {
            border: none !important;
            padding: 12px 12px !important;
          }

          tbody tr {
            border-bottom: 1px solid #8686862b;
          }

          sy-icon:hover {
            color: var(--background-brand-bolder);
          }
        `),t("table",{part:"tb"},t("thead",null,t("tr",{class:"header",part:"htr"},t("th",{part:"hth"},"Token"),t("th",{part:"hth"},"Preview"),t("th",{part:"hth"},"Value"))),t("tbody",{id:"main-area"},o.map(e=>{const l=s.getPropertyValue(e);return t("tr",{part:"btr"},t("td",{part:"btd"},e,t("sy-icon",{selectable:!0,class:"copy-icon",onClick:i=>c(i,e)},t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640"},t("path",{fill:"currentColor",d:"M352 112L352 184C352 223.8 384.2 256 424 256L496 256L496 448C496 456.8 488.8 464 480 464L256 464C247.2 464 240 456.8 240 448L240 128C240 119.2 247.2 112 256 112L352 112zM400 115.9L492.1 208L424 208C410.7 208 400 197.3 400 184L400 115.9zM256 64C220.7 64 192 92.7 192 128L192 448C192 483.3 220.7 512 256 512L480 512C515.3 512 544 483.3 544 448L544 211.9C544 199.2 538.9 187 529.9 178L430.1 78.1C421.1 69.1 408.9 64 396.2 64L256 64zM120 160C106.7 160 96 170.7 96 184L96 544C96 579.3 124.7 608 160 608L424 608C437.3 608 448 597.3 448 584C448 570.7 437.3 560 424 560L160 560C151.2 560 144 552.8 144 544L144 184C144 170.7 133.3 160 120 160z"})),t("sy-tooltip",{content:"copy to clipboard"}))),t("td",{part:"btd",style:{width:"30%"}},t("div",{style:{backgroundColor:"var(--background-brand-bolder)",width:`var(${e})`,height:"50px"}})),t("td",{part:"btd"},l))}))))},d=["--spacing-4xsmall","--spacing-3xsmall","--spacing-2xsmall","--spacing-xsmall","--spacing-small","--spacing-medium","--spacing-large","--spacing-xlarge","--spacing-2xlarge","--spacing-3xlarge","--spacing-4xlarge"],g={title:"Foundation/Spacing",tags:["false"],render:(r,o)=>{const s=o.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return p(s,r.tokenLists)}},a={args:{tokenLists:d}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tokenLists: spacingTokens
  }
}`,...a.parameters?.docs?.source}}};const b=["Default"],m=Object.freeze(Object.defineProperty({__proto__:null,Default:a,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{a as D,m as S};
