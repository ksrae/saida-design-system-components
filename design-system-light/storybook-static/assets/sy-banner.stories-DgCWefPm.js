import{x as m}from"./iframe-nFrKWBxN.js";import{o as u}from"./unsafe-html-13gMdR3O.js";import{c as i}from"./clear-element-Diyka43E.js";const y=({closable:t,neutralIcon:r,showIcon:o,message:n,header:s,variant:l,slotFooter:c})=>m`<sy-banner-messsage
      closable=${t}
      neutralIcon=${r}
      showIcon=${o}
      message=${n}
      header=${s}
      variant=${l}
    >
      ${u(c)}
    </sy-banner-messsage>`,a={title:"BannerMessage/Overview",component:"sy-banner-messsage",tags:[],render:t=>(i(a.title),y(t)),argTypes:{closable:{control:"boolean",description:"Display a close button to close banner on the screen.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},neutralIcon:{control:"text",name:"neutralIcon (neutral-icon)",description:"This icon only can be applicable when the banner type is neutral. Icon must be true",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},showIcon:{control:"boolean",description:"Determines whether display icon.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},message:{control:"text",description:"The main content of the banner.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},header:{control:"text",description:"A header of the banner.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},variant:{control:"select",options:["info","success","warning","error","neutral"],description:"The color of the badge.",table:{category:"Parameter",defaultValue:{summary:"info"},type:{summary:"info | success | warning | error | neutral"}}},slotFooter:{control:!1,description:"Custom footer slot in banner. If not set, the footer will not be displayed.",table:{category:"Parameter",defaultValue:{summary:""}}}},args:{closable:!1,showIcon:!0,neutralIcon:"",message:"Banners are typically used for global alerts (e.g., system outages, updates, cookie consent).",header:"Banner Header",variant:"info",slotFooter:`
       <div slot="footer">
        <sy-button size="small" id="btn1">Button1</sy-button>
        <sy-button size="small" id="btn2" variant="primary">Button2</sy-button>
      </div>
    `}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const b=["Default"],g=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:b,default:a},Symbol.toStringTag,{value:"Module"}));export{g as B,e as D};
