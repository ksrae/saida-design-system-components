import{a}from"./sy-breadcrumb.main-G6qFSENP.js";import{c as s}from"./clear-element-Diyka43E.js";const r={title:"Breadcrumb/Overview",component:"sy-breadcrumb",tags:[],render:t=>(s(r.title),a(t)),argTypes:{separator:{control:"radio",options:["slash","arrow"],description:"Changes the separator type.",table:{category:"Parameter",defaultValue:{summary:"slash"},type:{summary:"slash | arrow"}}},slot:{control:"text",description:"Breadcrumb items as slot elements.",table:{category:"Parameter",defaultValue:{summary:""}}},selected:{type:"function",description:"Triggered when the breadcrumb is selected.",table:{category:"Callback",type:{summary:".addEventListener('selected', (e) => {})"}}}}},e={args:{separator:"slash",slot:`
      <sy-breadcrumb-item>Home</sy-breadcrumb-item>
      <sy-breadcrumb-item>Products</sy-breadcrumb-item>
      <sy-breadcrumb-item active>Current Page</sy-breadcrumb-item>
    `}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    separator: 'slash',
    slot: \`
      <sy-breadcrumb-item>Home</sy-breadcrumb-item>
      <sy-breadcrumb-item>Products</sy-breadcrumb-item>
      <sy-breadcrumb-item active>Current Page</sy-breadcrumb-item>
    \`
  }
}`,...e.parameters?.docs?.source}}};const m=["Default"],d=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:m,default:r},Symbol.toStringTag,{value:"Module"}));export{d as B,e as D};
