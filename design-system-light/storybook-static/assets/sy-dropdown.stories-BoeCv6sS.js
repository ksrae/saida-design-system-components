import{x as d}from"./iframe-nFrKWBxN.js";import{o}from"./unsafe-html-13gMdR3O.js";import{c as u}from"./clear-element-Diyka43E.js";const p=({position:t,trigger:s,size:n,borderless:a,disabled:m,slotContent:l,slotTitle:i})=>d`
	<sy-dropdown
    style="z-index: 100;"
    position=${t}
    ?disabled=${m}
    size=${n}
    trigger=${s}
    ?borderless=${a}>
    ${o(i)}
    ${o(l)}
</sy-dropdown>
  `,r={title:"Dropdown/Overview",component:"sy-dropdown",render:t=>(u(r.title),p(t)),argTypes:{borderless:{control:"boolean",description:"Sets borderless for the dropdown.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},disabled:{control:"boolean",description:"Disables the dropdown.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},position:{control:"select",options:["topLeft","topRight","bottomLeft","bottomRight"],description:"Visible position of the dropdown menu",table:{category:"Parameter",defaultValue:{summary:"bottomLeft"},type:{summary:"topLeft | topRight | bottomLeft | bottomRight"}}},size:{control:"select",options:["small","medium","large"],description:"Size of the dropdown",table:{category:"Parameter",defaultValue:{summary:"medium"},type:{summary:"small | medium | large"}}},trigger:{control:"radio",options:["hover","click"],description:"Event to open the dropdown",table:{category:"Parameter",defaultValue:{summary:"click"},type:{summary:"hover | click"}}},selected:{type:"function",description:"Triggers when any item is selected.",table:{category:"Callback",type:{summary:".addEventListener('selected', (e) => {})"}}},slotContent:{control:"text",description:"Menu content for the dropdown.",table:{category:"Parameter",defaultValue:{summary:""}}},slotTitle:{control:"text",description:"Title for the dropdown",table:{category:"Parameter",defaultValue:{summary:""}}}}},e={args:{borderless:!1,disabled:!1,position:"bottomLeft",size:"medium",trigger:"click",slotTitle:'<span slot="title">Dropdown</span>',slotContent:`
      <sy-menu>
        <sy-menu-item>Menu Item 1</sy-menu-item>
        <sy-menu-item>Menu Item 2</sy-menu-item>
        <sy-menu-item>Menu Item 3</sy-menu-item>
      </sy-menu>
    `}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    borderless: false,
    disabled: false,
    position: 'bottomLeft',
    size: 'medium',
    trigger: 'click',
    slotTitle: \`<span slot="title">Dropdown</span>\`,
    slotContent: \`
      <sy-menu>
        <sy-menu-item>Menu Item 1</sy-menu-item>
        <sy-menu-item>Menu Item 2</sy-menu-item>
        <sy-menu-item>Menu Item 3</sy-menu-item>
      </sy-menu>
    \`
  }
}`,...e.parameters?.docs?.source}}};const c=["Default"],g=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:c,default:r},Symbol.toStringTag,{value:"Module"}));export{g as D,e as a};
