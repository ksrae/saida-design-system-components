import{c as m}from"./clear-element-Diyka43E.js";import{x as y}from"./iframe-nFrKWBxN.js";const u=({format:a,value:o,opacity:r,disabled:l,readonly:s,inline:i,hideOpacity:c,showText:n,changed:d})=>y`
		<sy-colorpicker
			format=${a}
			value="${o}"
			opacity="${r}"
			?disabled="${l}"
			?readonly="${s}"
			?inline="${i}"
			?hideOpacity="${c}"
			?showText="${n}"
			@changed=${d}
		>
		</sy-colorpicker>
  `,t={title:"Colorpicker/Overview",component:"sy-colorpicker",tags:[],render:a=>(m(t.title),u(a)),argTypes:{format:{control:"select",options:["hex","hsb","rgb"],description:"The format of the color value. The default is hex.",table:{category:"Parameter",defaultValue:{summary:"hex"},type:{summary:"hex | hsb | rgb"}}},value:{control:"text",description:"The color to be displayed in the colorpicker. The default is #ff0000.",table:{category:"Parameter",defaultValue:{summary:"#ff0000"},type:{summary:"string"}}},opacity:{control:"number",description:"The opacity of the color to be displayed in the colorpicker. The default is 1.",table:{category:"Parameter",defaultValue:{summary:"1"},type:{summary:"number"}}},disabled:{control:"boolean",description:"The colorpicker will be disabled. The default is false.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},readonly:{control:"boolean",description:"The colorpicker will be readonly. The default is false.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},inline:{control:"boolean",description:"Allows the colorpicker to be displayed inline",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},hideOpacity:{name:"hideOpacity (hide-opacity)",control:"boolean",description:"Hide opacity slider",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},showText:{name:"showText (show-text)",control:"boolean",description:"If true, the color value will be displayed as text next to the color preview. The default is false.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},changed:{type:"function",action:"changed",description:"Triggered when the changed event fires.",table:{category:"Callback",type:{summary:".addEventListener('changed', (e) => {})"}}}},args:{value:"#ff0000",opacity:1,showText:!1,disabled:!1,readonly:!1,inline:!1,hideOpacity:!1,format:"hex"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Default"],b=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:p,default:t},Symbol.toStringTag,{value:"Module"}));export{b as C,e as D};
