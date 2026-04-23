import{c as m}from"./clear-element-Diyka43E.js";import{x as c}from"./iframe-nFrKWBxN.js";const u=({btnLabel:t,open:s,showIcon:n,message:o,position:r,trigger:i,variant:l})=>c`
    <sy-button>
      Open inline message
        <sy-inline-message
          variant=${l}
          message=${o}
          ?showIcon=${n}
          btnLabel=${t}
          ?open=${s}
          position=${r}
          trigger=${i}>
        </sy-inline-message>
    </sy-button>
    `,a={title:"InlineMessage/Overview",component:"sy-inline-message",render:t=>(m(a.title),u(t)),argTypes:{btnLabel:{control:"text",name:"btnLabel (btn-label)",description:"The action button label in inline message. If not set, action button will not be displayed.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},open:{control:"boolean",description:"Open state of the inline message",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},showIcon:{control:"boolean",description:"Allow to visible icons to the inline message",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},message:{control:"text",description:"Text displayed as an inline message. Keep the message under two lines.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},position:{control:"select",options:["top","bottom","left","right"],description:"The position of the inline message.",table:{category:"Parameter",defaultValue:{summary:"bottom"},type:{summary:"top | bottom | left | right"}}},trigger:{control:"radio",options:["click","focusout"],description:"The types of events that cause a inline message to show.",table:{category:"Parameter",defaultValue:{summary:"click"},type:{summary:"click | focusout"}}},variant:{control:"select",options:["info","error","success","warning"],description:"The variant of the inline message.",table:{category:"Parameter",defaultValue:{summary:"info"},type:{summary:"info | error | success | warning"}}},btnClick:{type:"function",description:"Emitted when the action button in inline message is clicked",table:{category:"Callback",type:{summary:".addEventListener('btnClick', (e) => {})"}}}}},e={args:{btnLabel:"btnLabel",open:!1,showIcon:!1,message:"The message is displayed here.",position:"bottom",trigger:"click",variant:"info"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    btnLabel: 'btnLabel',
    open: false,
    showIcon: false,
    message: 'The message is displayed here.',
    position: 'bottom',
    trigger: 'click',
    variant: 'info'
  }
}`,...e.parameters?.docs?.source}}};const g=["Default"],y=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:g,default:a},Symbol.toStringTag,{value:"Module"}));export{e as D,y as I};
