import{x as a}from"./iframe-nFrKWBxN.js";import{o as n}from"./unsafe-html-13gMdR3O.js";import{c as u}from"./clear-element-Diyka43E.js";const s=({vertical:o,slot:r})=>a`
	<sy-button-group
    ?vertical=${o}>
    ${n(r)}
</sy-button-group>
  `,e={title:"ButtonGroup/Overview",render:o=>(u(e.title),s(o)),argTypes:{vertical:{control:"boolean",description:"Set the buttons to align vertically.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},slot:{control:"text",description:"The value of the button-group.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"any"}}}}},t={args:{slot:`
      <sy-button variant="default">Button 1</sy-button>
      <sy-button variant="primary">Button 2</sy-button>
      <sy-button variant="secondary">Button 3</sy-button>
    `,vertical:!1}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    slot: \`
      <sy-button variant="default">Button 1</sy-button>
      <sy-button variant="primary">Button 2</sy-button>
      <sy-button variant="secondary">Button 3</sy-button>
    \`,
    vertical: false
  }
}`,...t.parameters?.docs?.source}}};const l=["Default"],m=Object.freeze(Object.defineProperty({__proto__:null,Default:t,__namedExportsOrder:l,default:e},Symbol.toStringTag,{value:"Module"}));export{m as B,t as D};
