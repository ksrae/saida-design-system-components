import{x as p}from"./iframe-nFrKWBxN.js";import{o as c}from"./unsafe-html-13gMdR3O.js";import{c as d}from"./clear-element-Diyka43E.js";const i=({accordion:a,borderless:o,disabled:s,ghost:t,fullheight:r,slot:n})=>p`
    <div>
      <sy-collapse
        ?accordion=${a}
        ?borderless=${o}
        ?disabled=${s}
        ?ghost=${t}
        ?fullheight=${r}>
        ${c(n)}
      </sy-collapse>
    </div>
    `,l={title:"Collapse/Overview",component:"sy-collapse",tags:[],render:a=>(d(l.title),i(a)),argTypes:{accordion:{control:"boolean",description:"If true, active only one panel.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},borderless:{control:"boolean",description:"If true, collapse has no border.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},disabled:{control:"boolean",description:"Disables all collapse panels.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},fullheight:{control:"boolean",description:"If true, the panel content is stretched corresponding to its parent.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},ghost:{control:"boolean",description:"If true, all collapse panels have no background.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},slot:{control:"text",description:"The list of the all collapse panels",table:{category:"Parameter",defaultValue:{summary:"Collapse panels"}}}},args:{slot:`
      <sy-collapse-panel arrow>
          <span slot="header">Panel 1</span>
          <div>Content of panel 1</div>
        </sy-collapse-panel>
        <sy-collapse-panel arrow>
          <span slot="header">Panel 2</span>
          <div>Content of panel 2</div>
        </sy-collapse-panel>
        <sy-collapse-panel arrow>
          <span slot="header">Panel 3</span>
          <div>Content of panel 3</div>
      </sy-collapse-panel>
    `,accordion:!1,borderless:!1,disabled:!1,fullheight:!1,ghost:!1}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const m=["Default"],b=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:m,default:l},Symbol.toStringTag,{value:"Module"}));export{b as C,e as D};
