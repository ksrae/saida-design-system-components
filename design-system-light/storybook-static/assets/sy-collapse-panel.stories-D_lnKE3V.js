import{x as s}from"./iframe-nFrKWBxN.js";import{o as n}from"./unsafe-html-13gMdR3O.js";import{c}from"./clear-element-Diyka43E.js";import"./preload-helper-PPVm8Dsz.js";const i=({active:a,arrow:t,disabled:l,ghost:r,slot:o})=>s`
  <div>
    <sy-collapse-panel
      ?active=${a}
      ?arrow=${t}
      ?disabled=${l}
      ?ghost=${r}>
      ${n(o)}
    </sy-collapse-panel>
  </div>
  `,p={title:"Collapse-Panel/Overview",component:"sy-collapse-panel",tags:[],render:a=>(c(p.title),i(a)),argTypes:{active:{control:"boolean",description:"If true, active the panel.",table:{category:"Parameter",defaultValue:{summary:!1}}},arrow:{control:"boolean",description:"If true, arrow is visible.",table:{category:"Parameter",defaultValue:{summary:!1}}},disabled:{control:"boolean",description:"Disables the collapse panel.",table:{category:"Parameter",defaultValue:{summary:!1}}},ghost:{control:"boolean",description:"If true, collapse has no background.",table:{category:"Parameter",defaultValue:{summary:!1}}},slot:{control:"text",description:"The contents of the collapse panel",table:{category:"Parameter",defaultValue:{summary:"Collapse panel contents"}}},changed:{type:"function",action:"click",description:"Triggered when the collapse state changes",table:{category:"Callback",type:{summary:".addEventListener('changed', (e) => {})"}}}},args:{slot:`
      <div slot="header">This is panel header 1</div>
      <div>This is panel content 1</div>
    `,active:!1,arrow:!1,disabled:!1,ghost:!1}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,p as default};
