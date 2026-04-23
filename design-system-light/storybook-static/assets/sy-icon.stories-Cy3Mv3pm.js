import{x as s}from"./iframe-nFrKWBxN.js";import{o as n}from"./unsafe-html-13gMdR3O.js";import{c}from"./clear-element-Diyka43E.js";const i=({path:t,selectable:r,size:l,slot:o})=>s`
	<sy-icon
    path=${t}
    ?selectable=${r}
    size=${l}>
    ${n(o)}
  </sy-icon>
  `,a={title:"Icon/Overview",component:"sy-icon",render:t=>(c(a.title),i(t)),argTypes:{path:{control:"text",description:"Sets the path of the icon.",table:{category:"Parameter",defaultValue:{summary:""}}},selectable:{control:"boolean",description:"Able to click and emit selected event.",table:{category:"Parameter",defaultValue:{summary:!1}}},size:{control:"select",options:["xxsmall","xsmall","small","medium","large","xlarge","xxlarge","xxxlarge"],description:"The size of the icon.",table:{category:"Parameter",defaultValue:{summary:"medium"},type:{summary:"xxsmall | xsmall | small | medium | large | xlarge | xxlarge | xxxlarge"}}},slot:{control:"text",description:"The slot for rendering custom SVG content.",table:{category:"Parameter",defaultValue:{summary:""}}},selected:{type:"function",description:"Triggered when click the selectable icon.",table:{category:"Callback",type:{summary:".addEventListener('selected', (e) => {})"}}}}},e={args:{size:"medium",selectable:!1,slot:`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M198.6 368L320 246.6L441.4 368L198.6 368zM130.4 396.2C135.4 408.2 147 416 160 416L480 416C492.9 416 504.6 408.2 509.6 396.2C514.6 384.2 511.8 370.5 502.7 361.3L342.7 201.3C330.2 188.8 309.9 188.8 297.4 201.3L137.4 361.3C128.2 370.5 125.5 384.2 130.5 396.2z"></path></svg>
    `}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    selectable: false,
    slot: \`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M198.6 368L320 246.6L441.4 368L198.6 368zM130.4 396.2C135.4 408.2 147 416 160 416L480 416C492.9 416 504.6 408.2 509.6 396.2C514.6 384.2 511.8 370.5 502.7 361.3L342.7 201.3C330.2 188.8 309.9 188.8 297.4 201.3L137.4 361.3C128.2 370.5 125.5 384.2 130.5 396.2z"></path></svg>
    \`
  }
}`,...e.parameters?.docs?.source}}};const m=["Default"],g=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:m,default:a},Symbol.toStringTag,{value:"Module"}));export{e as D,g as I};
