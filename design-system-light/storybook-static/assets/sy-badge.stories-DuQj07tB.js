import{x as d}from"./iframe-nFrKWBxN.js";import{c as u}from"./clear-element-Diyka43E.js";const g=({dot:e,hidden:t,overflowCount:o,position:r,size:n,standalone:s,value:l,variant:i})=>d`
  <div class="badgeContainer">
      <sy-badge
      ?dot="${e}"
      ?hidden="${t}"
      overflowCount="${o}"
      position="${r}"
      size="${n}"
      ?standalone="${s}"
      value="${l}"
      variant=${i}>
      <sy-avatar image=${"avatar_default.png"}></sy-avatar>
    </sy-badge>

    <sy-badge
      ?dot="${e}"
      ?hidden="${t}"
      overflowCount="${o}"
      position="${r}"
      size="${n}"
      ?standalone="${s}"
      value="${l}"
      variant=${i}>
      <sy-avatar letter="JK"></sy-avatar>
    </sy-badge>

    <sy-badge
      ?dot="${e}"
      ?hidden="${t}"
      overflowCount="${o}"
      position="${r}"
      size="${n}"
      ?standalone="${s}"
      value="${l}"
      variant=${i}>
      <sy-icon size="xxxlarge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>
      </sy-icon>
    </sy-badge>
  </div>
  `,m={title:"Badge/Overview",component:"sy-badge",tags:[],render:e=>(u(m.title),g(e)),argTypes:{dot:{control:"boolean",description:"Show badge as a dot",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},hidden:{control:"boolean",description:"Hides the badge",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},overflowCount:{control:"number",name:"overflowCount (overflow-count)",description:"The limit of overflow.",table:{category:"Parameter",type:{summary:"number"},defaultValue:{summary:1/0}}},position:{control:"select",options:["topLeft","topRight","bottomLeft","bottomRight"],description:"Position of the badge. It is ignored when in standalone mode.",table:{category:"Parameter",defaultValue:{summary:"topRight"},type:{summary:"topLeft | topRight | bottomLeft | bottomRight"}}},size:{control:"radio",options:["small","medium"],description:"Size of the badge.",table:{category:"Parameter",defaultValue:{summary:"medium"},type:{summary:"small | medium"}}},standalone:{control:"boolean",description:"Whether in standalone mode.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},value:{control:"number",description:"The value of the badge.",table:{category:"Parameter",type:{summary:"number"},defaultValue:{summary:0}}},variant:{control:"select",options:["red","yellow","green","blue","gray"],description:"The color of the badge.",table:{category:"Parameter",defaultValue:{summary:"red"},type:{summary:"red | yellow | green | blue | gray"}}}}},a={args:{hidden:!1,standalone:!1,overflowCount:99,value:5,position:"topRight",size:"medium",variant:"red"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    hidden: false,
    standalone: false,
    overflowCount: 99,
    value: 5,
    position: 'topRight',
    size: 'medium',
    variant: 'red'
  }
}`,...a.parameters?.docs?.source}}};const y=["Default"],f=Object.freeze(Object.defineProperty({__proto__:null,Default:a,__namedExportsOrder:y,default:m},Symbol.toStringTag,{value:"Module"}));export{f as B,a as D};
