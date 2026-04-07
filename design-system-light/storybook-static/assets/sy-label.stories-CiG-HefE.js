import{x as u}from"./iframe-nFrKWBxN.js";import{c as d}from"./clear-element-Diyka43E.js";const m=({disabled:t,htmlFor:a,required:l,requiredPosition:o="right",value:i,valuePosition:s="left",width:n,slot:f})=>u`
    <sy-flex align="center" columngap="small" rowgap="medium" padding="none" justify="start" direction="horizontal" width="100%">
      <sy-label
        ?disabled=${t}
        htmlFor=${a}
        ?required=${l}
        requiredPosition=${o}
        value=${i}
        valuePosition=${s}
        width=${n}>
      </sy-label>
      <sy-flex align="center" style="flex:1">
        <sy-input id="${a}" placeholder="Input"></sy-input>
      </sy-flex>
    </sy-flex>
    `,r={title:"Label/Overview",component:"sy-label",render:t=>(d(r.title),m(t)),argTypes:{disabled:{control:"boolean",description:"Determines whether the label is disabled. It is effective with related elements.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},htmlFor:{control:"text",description:"Sets the id of the element that the label is bound to.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},required:{control:"boolean",description:"Determines whether the label is required. It is effective with related elements.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},requiredPosition:{name:"requiredPosition (required-position)",control:"radio",options:["left","right"],description:"Sets the position of the required mark.",table:{category:"Parameter",defaultValue:{summary:"right"},type:{summary:"left | right"}}},value:{control:"text",description:"Sets the label text.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},valuePosition:{name:"valuePosition (value-position)",control:"select",options:["left","right","center"],description:"Sets the position of the label.",table:{category:"Parameter",defaultValue:{summary:"left"},type:{summary:"left | right | center"}}},width:{control:"text",description:"Sets the width of the label. This can be a CSS value like '100px' or '50%'.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},slot:{control:!1,description:"The content of the label slot. This can be used to add custom HTML or elements inside the label.",table:{category:"Parameter",defaultValue:{summary:""},disabled:!0}}}},e={args:{disabled:!1,htmlFor:"input-id",required:!1,requiredPosition:"right",value:"Label",valuePosition:"left",width:"",slot:""}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    htmlFor: "input-id",
    required: false,
    requiredPosition: 'right',
    value: "Label",
    valuePosition: "left",
    width: '',
    slot: \`\`
  }
}`,...e.parameters?.docs?.source}}};const c=["Default"],p=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:c,default:r},Symbol.toStringTag,{value:"Module"}));export{e as D,p as L};
