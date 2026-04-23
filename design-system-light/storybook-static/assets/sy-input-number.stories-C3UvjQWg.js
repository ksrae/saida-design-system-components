import{c as E}from"./clear-element-Diyka43E.js";import{x as P}from"./iframe-nFrKWBxN.js";import{o as v}from"./if-defined-DexkZSA1.js";import{o as a}from"./unsafe-html-13gMdR3O.js";const x=({autofocus:t,borderless:s,decimalPlaces:l,disabled:n,max:u,min:o,label:m,slotPrefix:i,readonly:c,required:d,rounding:y,status:p,size:b,step:f,slotSuffix:g,value:h})=>P`
    <sy-input-number
      ?autofocus=${t}
      ?borderless=${s}
      decimalPlaces=${v(l)}
      ?disabled=${n}
      label=${m}
      max=${u}
      min=${o}
      ?readonly=${c}
      ?required=${d}
      rounding=${y}
      status=${p}
      size=${b}
      step=${f}
      value=${h}
    >
      ${a(i)}
      ${a(g)}
      </sy-input-number>
  `,r={title:"InputNumber/Overview",component:"sy-input-number",render:t=>(E(r.title),x(t)),argTypes:{autofocus:{control:"boolean",description:"Sets focus automatically.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},borderless:{control:"boolean",description:"The input is displayed without a visible border.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},decimalPlaces:{control:"number",name:"decimalPlaces (decimal-places)",description:"Sets decimal places. The additional digits more than decimal places, will be automatically truncated. This may resolve floating-point errors",table:{category:"Parameter",defaultValue:{summary:void 0},type:{summary:"number"}}},disabled:{control:"boolean",description:"Disables the input number.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},label:{control:"text",description:"Sets the label of the input number.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},max:{control:"number",description:"Sets maximum value.",table:{category:"Parameter",defaultValue:{summary:Number.MAX_SAFE_INTEGER},type:{summary:"number"}}},min:{control:"number",description:"Sets minimum value.",table:{category:"Parameter",defaultValue:{summary:Number.MIN_SAFE_INTEGER},type:{summary:"number"}}},slotPrefix:{control:"text",description:"Sets prefix text.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},readonly:{control:"boolean",description:"Determines whether the input number has readonly.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},required:{control:"boolean",description:"Sets input number field required.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},rounding:{control:"select",options:["round","ceil","floor",""],description:"The type of the rounding.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"round | ceil | floor"}}},size:{control:"select",options:["small","medium","large"],description:"The size of input number.",table:{category:"Parameter",defaultValue:{summary:"medium"},type:{summary:"small | medium | large"}}},status:{control:"select",options:["default","warning","error","success"],description:"Thes status of input number",table:{category:"Parameter",defaultValue:{summary:"default"},type:{summary:"default | warning | error | success"}}},step:{control:"number",description:"The number to which the current value is increased or decreased.",table:{category:"Parameter",defaultValue:{summary:1},type:{summary:"number"}}},slotSuffix:{control:"text",description:"Sets suffix text.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},value:{control:"text",description:"Sets the value to the input number. Only related to number representation are available.",table:{category:"Parameter",defaultValue:{summary:"0"},type:{summary:"string"}}},setFocus:{type:"function",description:"Trigger focus event manually.",table:{category:"Function",type:{summary:"setFocus()"}}},setBlur:{type:"function",description:"Trigger blur event manually.",table:{category:"Function",type:{summary:"setBlur()"}}},setClear:{type:"function",description:"Trigger clear event manually.",table:{category:"Function",type:{summary:"setClear()"}}},changed:{type:"function",description:"Emitted when the value changes.",table:{category:"Callback",type:{summary:".addEventListener('changed', (e) => {})"}}},blured:{type:"function",description:"Emitted when the input number loses focus.",table:{category:"Callback",type:{summary:".addEventListener('blured', (e) => {})"}}},focused:{type:"function",description:"Emitted when the input number is focused.",table:{category:"Callback",type:{summary:".addEventListener('focused', (e) => {})"}}}}},e={args:{autofocus:!1,borderless:!1,decimalPlaces:void 0,disabled:!1,label:"Input number label",max:Number.MAX_SAFE_INTEGER,min:Number.MIN_SAFE_INTEGER,slotPrefix:"<span>e</span>",readonly:!1,required:!1,rounding:"round",status:"default",size:"medium",step:1,slotSuffix:"<span>$</span>",value:"0"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    autofocus: false,
    borderless: false,
    decimalPlaces: undefined,
    disabled: false,
    label: "Input number label",
    max: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER,
    slotPrefix: \`<span>e</span>\`,
    readonly: false,
    required: false,
    rounding: "round",
    status: "default",
    size: "medium",
    step: 1,
    slotSuffix: \`<span>$</span>\`,
    value: '0'
  }
}`,...e.parameters?.docs?.source}}};const S=["Default"],V=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:S,default:r},Symbol.toStringTag,{value:"Module"}));export{e as D,V as I};
