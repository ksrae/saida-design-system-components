import{h as m}from"./index-BdigElPL.js";const i=e=>m("div",null,e.typename.map(d=>m("div",{"sy-typography":!0,syType:d},d))),y=e=>m("div",null,e.typenames.map((d,p)=>{const c=`h${p+1}`;return m(c,{"sy-typography":!0},d)})),g={title:"Foundation/Typography",tags:["false"],render:e=>e.type==="heading"?y({typenames:e.typenames}):i({typename:e.typenames})},t={args:{type:"fontfaces",typenames:["roboto-regular","roboto-medium","roboto-bold"]}},a={args:{type:"heading",typenames:["typo-heading1","typo-heading2","typo-heading3","typo-heading4","typo-heading5","typo-heading6"]}},s={args:{type:"tectstyles",typenames:["base-regular","base-medium","base-bold","base-italic","base-underline","base-strikethrough"]}},r={args:{type:"tectstyles",typenames:["large-regular","large-medium","large-bold","large-italic","large-underline","large-strikethrough","large-code"]}},o={args:{type:"tectstyles",typenames:["small-regular","small-medium","small-bold","small-italic","small-underline","small-strikethrough","small-code"]}},l={args:{type:"tectstyles",typenames:["xsmall-regular","xsmall-medium","xsmall-bold","xsmall-code"]}},n={args:{type:"textcolors",typenames:["text-bold","text-default","text-subtle","text-subtlest","text-disabled","text-brand-default","text-brand-subtitle","text-subtlest","text-error","text-warning","text-success","text-information","text-new","text-extended"]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'fontfaces',
    typenames: ['roboto-regular', 'roboto-medium', 'roboto-bold']
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'heading',
    typenames: ['typo-heading1', 'typo-heading2', 'typo-heading3', 'typo-heading4', 'typo-heading5', 'typo-heading6']
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'tectstyles',
    typenames: ['base-regular', 'base-medium', 'base-bold', 'base-italic', 'base-underline', 'base-strikethrough']
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'tectstyles',
    typenames: ['large-regular', 'large-medium', 'large-bold', 'large-italic', 'large-underline', 'large-strikethrough', 'large-code']
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'tectstyles',
    typenames: ['small-regular', 'small-medium', 'small-bold', 'small-italic', 'small-underline', 'small-strikethrough', 'small-code']
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'tectstyles',
    typenames: ['xsmall-regular', 'xsmall-medium', 'xsmall-bold', 'xsmall-code']
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'textcolors',
    typenames: ['text-bold', 'text-default', 'text-subtle', 'text-subtlest', 'text-disabled', 'text-brand-default', 'text-brand-subtitle', 'text-subtlest', 'text-error', 'text-warning', 'text-success', 'text-information', 'text-new', 'text-extended']
  }
}`,...n.parameters?.docs?.source}}};const u=["typoFontfaces","typoHeading","textStylesRegular","textStylesLarge","textStylesSmall","textStylesXSmall","textColor"],b=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:u,default:g,textColor:n,textStylesLarge:r,textStylesRegular:s,textStylesSmall:o,textStylesXSmall:l,typoFontfaces:t,typoHeading:a},Symbol.toStringTag,{value:"Module"}));export{b as T,a,s as b,r as c,o as d,l as e,n as f,t};
