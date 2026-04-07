import{c as s}from"./clear-element-Diyka43E.js";import{x as l}from"./iframe-nFrKWBxN.js";import{o as i}from"./unsafe-html-13gMdR3O.js";const d=({checked:t,disabled:r,indeterminate:o,readonly:c,slot:n})=>l`
	<sy-checkbox
    ?checked=${t}
    ?indeterminate=${o}
    ?disabled=${r}
    ?readonly=${c}
  >
    ${i(n)}
</sy-checkbox>
  `,a={title:"Checkbox/Overview",component:"sy-checkbox",tags:[],render:t=>(s(a.title),d(t)),argTypes:{checked:{control:"boolean",description:"The state of the checkbox. Checked or unchecked.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},disabled:{control:"boolean",description:"Disables the checkbox.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},indeterminate:{control:"boolean",description:"The checkbox in an indeterminate state.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},readonly:{control:"boolean",description:"The checkbox in the readonly state.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},required:{control:"boolean",description:"Sets the checkbox required for form validation.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},slot:{control:"text",description:"The label of the checkbox.",table:{category:"Parameter",defaultValue:{summary:"checkbox"},type:{summary:"string"}}},setFocus:{type:"function",description:"Triggers focus event manually.",table:{category:"Function",type:{summary:"setFocus()"}}},setBlur:{type:"function",description:"Triggers blur event manually.",table:{category:"Function",type:{summary:"setBlur()"}}},changed:{type:"function",action:"click",description:"Triggered when the checked state changes",table:{category:"Callback",type:{summary:".addEventListener('changed', (e) => {})"}}},focused:{type:"function",action:"click",description:"Triggered when the checkbox receives focus",table:{category:"Callback",type:{summary:".addEventListener('focused', (e) => {})"}}},blured:{type:"function",action:"click",description:"Triggered when the checkbox loses focus",table:{category:"Callback",type:{summary:".addEventListener('blured', (e) => {})"}}}}},e={args:{checked:!1,disabled:!1,indeterminate:!1,readonly:!1,required:!1,slot:"checkbox"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    readonly: false,
    required: false,
    slot: 'checkbox'
  }
}`,...e.parameters?.docs?.source}}};const u=["Default"],f=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:u,default:a},Symbol.toStringTag,{value:"Module"}));export{f as C,e as D};
