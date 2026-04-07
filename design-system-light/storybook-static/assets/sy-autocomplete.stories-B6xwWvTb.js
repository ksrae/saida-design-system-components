import{x as m}from"./iframe-nFrKWBxN.js";import{c as p}from"./clear-element-Diyka43E.js";const d=({caseSensitive:t,debounceTime:r,loading:o,min:s,placeholder:n,required:l,size:i,source:c,trigger:u})=>m`
    <sy-autocomplete
      ?caseSensitive=${t}
      debounceTime=${r}
      ?loading=${o}
      min=${s}
      placeholder=${n}
      ?required=${l}
      size=${i}
      .source=${c}
      trigger=${u}>
    </sy-autocomplete>
    `,a={title:"Autocomplete/Overview",component:"sy-autocomplete",tags:[],render:t=>(p(a.title),d(t)),argTypes:{slot:{control:!1,description:"Slot for autocomplete-option component",table:{disable:!0}},caseSensitive:{control:"boolean",name:"caseSensitive (case-sensitive)",description:"Ensures that the matching of user input to suggestions is case-insensitive.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},debounceTime:{control:"number",name:"debounceTime (debounce-time)",description:"Debounce delay for fetching suggestions.(unit:millisecond)",table:{category:"Parameter",defaultValue:{summary:0},type:{summary:"number"}}},loading:{control:"boolean",description:"Put spinner and remove all items.",table:{category:"Parameter",defaultValue:{summary:!1},type:{summary:"boolean"}}},min:{control:"number",description:"The minimum length of search to begin.",table:{category:"Parameter",type:{summary:"number"},defaultValue:{summary:0}}},placeholder:{control:"text",description:"Placeholder text for the input field.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"string"}}},size:{control:"select",options:["small","medium","large"],description:"The autocomplete size.",table:{category:"Parameter",defaultValue:{summary:"medium"},type:{summary:"small | medium | large"}}},source:{control:"object",description:"The data list of the autocomplete.",table:{category:"Parameter",defaultValue:{summary:""},type:{summary:"array"}}},trigger:{control:"radio",options:["focus","input"],description:"Opens Autocomplete when focus or any inputs.",table:{category:"Parameter",defaultValue:{summary:"focus"},type:{summary:"focus | input"}}},setFocus:{type:"function",description:"Triggers focus event manually.",table:{category:"Function",type:{summary:"setFocus()"}}},setBlur:{type:"function",description:"Triggers blur event manually.",table:{category:"Function",type:{summary:"setBlur()"}}},selected:{type:"function",description:"Emitted when an item is selected from the autocomplete suggestions.",table:{category:"Callback",type:{summary:".addEventListener('selected', (e) => {})"}}},changed:{type:"function",description:"Emitted when the input value changes.",table:{category:"Callback",type:{summary:".addEventListener('changed', (e) => {})"}}}}},e={args:{caseSensitive:!1,debounceTime:0,loading:!1,min:0,placeholder:"Type to search...",size:"medium",source:["Apple","Banana","Cherry","Date","Elderberry","Fig","Grape","Honeydew"],trigger:"focus"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    caseSensitive: false,
    debounceTime: 0,
    loading: false,
    min: 0,
    placeholder: 'Type to search...',
    size: 'medium',
    source: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'],
    trigger: 'focus'
  }
}`,...e.parameters?.docs?.source}}};const y=["Default"],b=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:y,default:a},Symbol.toStringTag,{value:"Module"}));export{b as A,e as D};
