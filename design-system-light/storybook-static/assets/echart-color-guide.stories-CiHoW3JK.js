import{h as r}from"./index-BdigElPL.js";const l=(h,e)=>{const t={},a=h==="sy-theme-light"?"echarts-light":"echarts-dark";try{let o=document.querySelector(`.${a}`),n=!1;o||(o=document.createElement("div"),o.className=a,document.body.appendChild(o),n=!0);const i=getComputedStyle(o);Object.entries(e).forEach(([c,s])=>{Array.isArray(s)&&s.forEach(x=>{let T=i.getPropertyValue(x);t[x]=T||""})}),n&&o.parentNode&&document.body.removeChild(o)}catch(o){console.log("초기 스타일 계산 오류:",o)}return setTimeout(()=>{document.querySelectorAll(".copy-icon").forEach(n=>{n.addEventListener("click",()=>{const i=n.parentElement;if(!i)return;let c="";for(const s of Array.from(i.childNodes))if(s.nodeType===Node.TEXT_NODE&&s.textContent&&s.textContent.trim()){c=s.textContent.trim();break}if(c)if(navigator.clipboard)navigator.clipboard.writeText(c);else{const s=document.createElement("textarea");s.value=c,document.body.appendChild(s),s.select(),document.execCommand("copy"),document.body.removeChild(s)}})})},100),r("div",null,r("style",null,`
        table {
          border-collapse: collapse;
          margin: 25px 0;
          font-size: 1em;
          width: 100%;
        }

        table thead tr {
          background-color: #ffffff;
          color: #000000;
          text-align: left;
        }

        th,td {
          border: none !important;
          border-bottom: 1px solid #ddd !important;
          padding: 12px 15px !important;
        }

        tbody tr {
          border-bottom: 1px solid #dddddd;
        }

        sy-icon:hover {
          color: var(--background-brand-bolder);
        }
      `),r("div",{class:a,style:{boxShadow:"none"}},r("table",{part:"tb"},r("thead",null,r("tr",{class:"header",part:"htr"},r("th",{part:"hth hth0",style:{width:"30%"}},"Category"),r("th",{part:"hth hth1",style:{width:"30%"}},"Token"),r("th",{part:"hth hth2",style:{width:"20%"}},"Preview"),r("th",{part:"hth hth3",style:{width:"20%"}},"Value"))),r("tbody",{id:"main-area"},Object.entries(e||{}).map(([o,n])=>{const i=n;return i.map((c,s)=>{let x=t[c]||"";return r("tr",{part:"btr",key:`${o}-${s}`},s===0&&r("td",{part:"btd",rowSpan:i.length},o),r("td",{part:"btd"},c,r("sy-icon",{selectable:!0,class:"copy-icon"},r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640"},r("path",{fill:"currentColor",d:"M352 112L352 184C352 223.8 384.2 256 424 256L496 256L496 448C496 456.8 488.8 464 480 464L256 464C247.2 464 240 456.8 240 448L240 128C240 119.2 247.2 112 256 112L352 112zM400 115.9L492.1 208L424 208C410.7 208 400 197.3 400 184L400 115.9zM256 64C220.7 64 192 92.7 192 128L192 448C192 483.3 220.7 512 256 512L480 512C515.3 512 544 483.3 544 448L544 211.9C544 199.2 538.9 187 529.9 178L430.1 78.1C421.1 69.1 408.9 64 396.2 64L256 64zM120 160C106.7 160 96 170.7 96 184L96 544C96 579.3 124.7 608 160 608L424 608C437.3 608 448 597.3 448 584C448 570.7 437.3 560 424 560L160 560C151.2 560 144 552.8 144 544L144 184C144 170.7 133.3 160 120 160z"})),r("sy-tooltip",{content:"copy to clipboard"}))),r("td",{part:"btd"},r("div",{style:{backgroundColor:`var(${c})`,width:"100%",height:"50px",border:"1px solid #eee"}})),r("td",{part:"btd"},x))})})))))},f={title:"StyleGuide/ECharts/ColorGuide",tags:["false"]},d={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{Background:["--charts-background-color"],Title:["--charts-neutral-80"],Subtitle:["--charts-neutral-60"],Theme:["--charts-series-0","--charts-series-1","--charts-series-2","--charts-series-3","--charts-series-4","--charts-series-5","--charts-series-6","--charts-series-7","--charts-series-8","--charts-series-9"],"Labe Text":["--charts-neutral-5"]})}},m={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{"Visual Mapping":["--charts-highlight-60","--charts-highlight-20","--charts-highlight-10"]})}},g={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{Line:["--charts-highlight-80"],Tick:["--charts-neutral-80"],Grid:["--charts-neutral-10"],Label:["--charts-neutral-80"]})}},u={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{Text:["--charts-highlight-80"]})}},p={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{Item:["--charts-neutral-40"],Emphasis:["--charts-neutral-60"]})}},k={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{"Axis Color":["--charts-neutral-20"]})}},C={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{Item:["--charts-highlight-20"],Emphasis:["--charts-background-color"],Check:["--charts-highlight-80"],"Check Border Color":["--charts-highlight-80"],Axis:["--charts-highlight-10"],"Control Color":["--charts-highlight-20"],"Control Border Color":["--charts-highlight-20"],"Text Color":["--charts-highlight-20"]})}},b={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{"Bullish Color":["--charts-status-danger"],"Bearish Color":["--charts-status-success"],"Bullish Border Color":["--charts-status-danger"],"Bearish Border Color":["--charts-status-success"]})}},y={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{"Line Color":["--charts-neutral-20"]})}},L={render:(h,e)=>{let t=e.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return l(t,{"Area Color":["--charts-status-warning"],"Label Color":["--charts-series-3"]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: (_args: any, context: any) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Background": ["--charts-background-color"],
      "Title": ["--charts-neutral-80"],
      "Subtitle": ["--charts-neutral-60"],
      "Theme": [/* 여기 아래래부터 테마 10개*/
      "--charts-series-0", "--charts-series-1", "--charts-series-2", "--charts-series-3", "--charts-series-4", "--charts-series-5", "--charts-series-6", "--charts-series-7", "--charts-series-8", "--charts-series-9"],
      "Labe Text": ["--charts-neutral-5"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Visual Mapping": ["--charts-highlight-60", "--charts-highlight-20", "--charts-highlight-10"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Line": ["--charts-highlight-80"],
      "Tick": ["--charts-neutral-80"],
      "Grid": ["--charts-neutral-10"],
      // "Area" : [
      //  /* Area 2colors */
      //  "#ffffff33;",
      //  "#D2DBEE33;"
      // ],
      "Label": ["--charts-neutral-80"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Text": ["--charts-highlight-80"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Item": ["--charts-neutral-40"],
      "Emphasis": ["--charts-neutral-60"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...p.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Axis Color": ["--charts-neutral-20"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...k.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Item": ["--charts-highlight-20"],
      "Emphasis": ["--charts-background-color"],
      "Check": ["--charts-highlight-80"],
      "Check Border Color": ["--charts-highlight-80"],
      "Axis": ["--charts-highlight-10"],
      "Control Color": ["--charts-highlight-20"],
      "Control Border Color": ["--charts-highlight-20"],
      "Text Color": ["--charts-highlight-20"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...C.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Bullish Color": ["--charts-status-danger"],
      "Bearish Color": ["--charts-status-success"],
      "Bullish Border Color": ["--charts-status-danger"],
      "Bearish Border Color": ["--charts-status-success"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Line Color": ["--charts-neutral-20"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...y.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: (_args, context) => {
    let theme = context.globals.theme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Area Color": ["--charts-status-warning"],
      "Label Color": ["--charts-series-3"]
    };
    return eChartColorTokenTable(theme, tokenLists);
  }
}`,...L.parameters?.docs?.source}}};const _=["BasicConfig","VisualMapping","Axis","Legend","Toolbox","Tooltip","Timeline","Candlestick","ForceDirected","MapGeo"],S=Object.freeze(Object.defineProperty({__proto__:null,Axis:g,BasicConfig:d,Candlestick:b,ForceDirected:y,Legend:u,MapGeo:L,Timeline:C,Toolbox:p,Tooltip:k,VisualMapping:m,__namedExportsOrder:_,default:f},Symbol.toStringTag,{value:"Module"}));export{g as A,d as B,S as C,y as F,u as L,L as M,p as T,m as V,k as a,C as b,b as c};
