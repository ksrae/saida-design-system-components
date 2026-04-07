import{h as o}from"./index-BdigElPL.js";const p=(u,l)=>{const i={},a=u==="sy-theme-dark"?"ag-theme-sygrid-dark":"ag-theme-sygrid";try{let r=document.querySelector(`.${a}`),d=!1;r||(r=document.createElement("div"),r.className=a,document.body.appendChild(r),d=!0);const g=getComputedStyle(r);Object.entries(l).forEach(([e,c])=>{Array.isArray(c)&&c.forEach(n=>{let s=g.getPropertyValue(n);i[n]=s||""})}),d&&r.parentNode&&document.body.removeChild(r)}catch(r){console.log("초기 스타일 계산 오류:",r)}const b=r=>{navigator.clipboard&&navigator.clipboard.writeText(r)};return o("div",null,o("style",null,`
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
        `),o("div",{class:a},o("table",{part:"tb"},o("thead",null,o("tr",{class:"header",part:"htr"},o("th",{part:"hth hth0",style:{width:"30%"}},"Category"),o("th",{part:"hth hth1",style:{width:"30%"}},"Token"),o("th",{part:"hth hth2",style:{width:"20%"}},"Preview"),o("th",{part:"hth hth3",style:{width:"20%"}},"Value"))),o("tbody",{id:"main-area"},Object.entries(l||{}).map(([r,d])=>{const g=d;return g.map((e,c)=>{const n=i[e]||"";return o("tr",{part:"btr"},[c===0?o("td",{part:"btd",rowspan:g.length},r):null,o("td",{part:"btd"},o("div",{},[o("span",{},e),o("sy-icon",{selectable:!0,class:{"copy-icon":!0},onClick:()=>b(e)},[o("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640"},o("path",{fill:"currentColor",d:"M352 112L352 184C352 223.8 384.2 256 424 256L496 256L496 448C496 456.8 488.8 464 480 464L256 464C247.2 464 240 456.8 240 448L240 128C240 119.2 247.2 112 256 112L352 112zM400 115.9L492.1 208L424 208C410.7 208 400 197.3 400 184L400 115.9zM256 64C220.7 64 192 92.7 192 128L192 448C192 483.3 220.7 512 256 512L480 512C515.3 512 544 483.3 544 448L544 211.9C544 199.2 538.9 187 529.9 178L430.1 78.1C421.1 69.1 408.9 64 396.2 64L256 64zM120 160C106.7 160 96 170.7 96 184L96 544C96 579.3 124.7 608 160 608L424 608C437.3 608 448 597.3 448 584C448 570.7 437.3 560 424 560L160 560C151.2 560 144 552.8 144 544L144 184C144 170.7 133.3 160 120 160z"})),o("sy-tooltip",{arrow:!0,content:"copy to clipboard"})])])),o("td",{part:"btd"},o("div",{style:{backgroundColor:`var(${e})`,width:"100%",height:"50px",border:"1px solid #eee"}})),o("td",{part:"btd"},n)].filter(Boolean))})})))))},h={title:"StyleGuide/AgGrid/ColorGuide",tags:["false"]},t={render:(u,l)=>{const a=l.globals.theme==="dark"?"sy-theme-dark":"sy-theme-light";return p(a,{"Column-header":["--ag-secondary-border-color","--ag-border-color","--ag-icon-default","--ag-data-color","--ag-header-background-color"],"Grouping-panel":["--ag-data-color","--ag-foreground-color","--ag-border-color","--ag-subheader-background-color"],"Menu-trigger":["--ag-icon-default"],Filter:["--ag-foreground-color","--ag-filter-input-border","--ag-foreground-color","--ag-filter-input-background"],"Resize-handle":["--ag-secondary-border-color","--ag-icon-default"],"Cell-edit":["--ag-gridcell-input-text","--ag-secondary-border-color","--ag-gridcell-input-border-focus","--ag-gridcell-input-background","--ag-background-color"],"Filter-menu-action-button":["--ag-foreground-color","--ag-filter-input-border","--ag-border-color","--ag-header-background-color","--ag-filter-input-background"],"Scrollbar-slug":["--ag-scrollbar-slug-default"],"Pivot-mode-select":["--ag-toggle-inactive-background","--ag-toggle-foreground"],"Input-filter":["--ag-foreground-color","--ag-filter-input-border","--ag-filter-input-background"],"Grid-cell":["--ag-header-background-color","--ag-data-color","--ag-foreground-color","--ag-secondary-border-color","--ag-toggle-inactive-background"],"Right-click-menu":["--ag-data-color","--ag-foreground-color","--ag-header-background-color","--ag-icon-default","--ag-border-color","--ag-background-color"],Tab:["--ag-data-color","--ag-icon-default","--ag-selected-tab-underline-color","--ag-side-button-selected-background-color","--ag-tab-border-default","--ag-side-buttons-background-color"],"Filter-list-item":["--ag-icon-default","--ag-data-color","--ag-control-inactive-background","--ag-background-color"],"Tab-panel":["--ag-side-button-panel-background-color"],"Tool-panel":["--ag-control-panel-background-color","--ag-secondary-border-color","--ag-border-color","--ag-data-color","--ag-foreground-color","--ag-icon-default","--ag-control-inactive-background","--ag-background-color"],"Panel-category-title":["--ag-data-color","--ag-icon-default"],"Drag-drop-panel":["--ag-data-color","--ag-border-color","--ag-control-panel-background-color"],Pagination:["--ag-foreground-color","--ag-border-color","--ag-background-color"],"Scrolbar-slug":["--ag-scrollbar-slug-default"],"Scrolbar-track":["--ag-border-color","--ag-header-background-color"],"Status-bar":["--ag-foreground-color","--ag-border-color","--ag-background-color"]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: (args: any, context: any) => {
    const selectedTheme = context.globals.theme;
    const themeClass = selectedTheme === 'dark' ? 'sy-theme-dark' : 'sy-theme-light';
    const tokenLists = {
      "Column-header": ["--ag-secondary-border-color", "--ag-border-color", "--ag-icon-default", "--ag-data-color", "--ag-header-background-color"],
      "Grouping-panel": ["--ag-data-color", "--ag-foreground-color", "--ag-border-color", "--ag-subheader-background-color"],
      "Menu-trigger": ["--ag-icon-default"],
      "Filter": ["--ag-foreground-color", "--ag-filter-input-border", "--ag-foreground-color", "--ag-filter-input-background"],
      "Resize-handle": ["--ag-secondary-border-color", "--ag-icon-default"],
      "Cell-edit": ["--ag-gridcell-input-text", "--ag-secondary-border-color", "--ag-gridcell-input-border-focus", "--ag-gridcell-input-background", "--ag-background-color"],
      "Filter-menu-action-button": ["--ag-foreground-color", "--ag-filter-input-border", "--ag-border-color", "--ag-header-background-color", "--ag-filter-input-background"],
      "Scrollbar-slug": ["--ag-scrollbar-slug-default"],
      "Pivot-mode-select": ["--ag-toggle-inactive-background", "--ag-toggle-foreground"],
      "Input-filter": ["--ag-foreground-color", "--ag-filter-input-border", "--ag-filter-input-background"],
      "Grid-cell": ["--ag-header-background-color", "--ag-data-color", "--ag-foreground-color", "--ag-secondary-border-color", "--ag-toggle-inactive-background"],
      "Right-click-menu": ["--ag-data-color", "--ag-foreground-color", "--ag-header-background-color", "--ag-icon-default", "--ag-border-color", "--ag-background-color"],
      "Tab": ["--ag-data-color", "--ag-icon-default", "--ag-selected-tab-underline-color", "--ag-side-button-selected-background-color", "--ag-tab-border-default", "--ag-side-buttons-background-color"],
      "Filter-list-item": ["--ag-icon-default", "--ag-data-color", "--ag-control-inactive-background", "--ag-background-color"],
      "Tab-panel": ["--ag-side-button-panel-background-color"],
      "Tool-panel": ["--ag-control-panel-background-color", "--ag-secondary-border-color", "--ag-border-color", "--ag-data-color", "--ag-foreground-color", "--ag-icon-default", "--ag-control-inactive-background", "--ag-background-color"],
      "Panel-category-title": ["--ag-data-color", "--ag-icon-default"],
      "Drag-drop-panel": ["--ag-data-color", "--ag-border-color", "--ag-control-panel-background-color"],
      "Pagination": ["--ag-foreground-color", "--ag-border-color", "--ag-background-color"],
      "Scrolbar-slug": ["--ag-scrollbar-slug-default"],
      "Scrolbar-track": ["--ag-border-color", "--ag-header-background-color"],
      "Status-bar": ["--ag-foreground-color", "--ag-border-color", "--ag-background-color"]
    };
    return agGridColorTokenTable(themeClass, tokenLists);
  }
}`,...t.parameters?.docs?.source}}};const f=["Grid"],m=Object.freeze(Object.defineProperty({__proto__:null,Grid:t,__namedExportsOrder:f,default:h},Symbol.toStringTag,{value:"Module"}));export{m as A,t as G};
