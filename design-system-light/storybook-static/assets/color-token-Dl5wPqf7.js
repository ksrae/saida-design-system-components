import{h as t}from"./index-BdigElPL.js";const i=(r,a)=>{const d={};try{let e=document.querySelector(`.${r}`),o=!1;e||(e=document.createElement("div"),e.className=r,document.body.appendChild(e),o=!0);const l=getComputedStyle(e);a.forEach(c=>{let p=l.getPropertyValue(c);d[c]=p||""}),o&&e.parentNode&&document.body.removeChild(e)}catch(e){console.log("초기 스타일 계산 오류:",e)}const n=(e,o)=>{e.preventDefault(),navigator.clipboard&&navigator.clipboard.writeText(o)};return t("div",null,t("style",null,`
          table {
            border-collapse: collapse;
            width: 100%;
          }

          table thead tr {
            background-color: #ffffff;
            color: #000000;
            text-align: left;
          }

          th, td {
            border: none !important;
            padding: 12px 12px !important;
          }

          tbody tr {
            border-bottom: 1px solid #8686862b;
          }

          sy-icon:hover {
            color: var(--background-brand-bolder);
          }
        `),t("div",{class:`sy-theme ${r}`},t("table",{part:"tb"},t("thead",null,t("tr",{class:"header",part:"htr"},t("th",{part:"hth hth1"},"Token"),t("th",{part:"hth hth2"},"Preview"),t("th",{part:"hth hth3"},"Value"))),t("tbody",{id:"main-area"},a.map(e=>{const o=d[e]||"";return t("tr",{part:"btr","data-token":e},t("td",{part:"btd"},e,t("sy-icon",{selectable:!0,class:"copy-icon",onClick:l=>n(l,e)},t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640"},t("path",{fill:"currentColor",d:"M352 112L352 184C352 223.8 384.2 256 424 256L496 256L496 448C496 456.8 488.8 464 480 464L256 464C247.2 464 240 456.8 240 448L240 128C240 119.2 247.2 112 256 112L352 112zM400 115.9L492.1 208L424 208C410.7 208 400 197.3 400 184L400 115.9zM256 64C220.7 64 192 92.7 192 128L192 448C192 483.3 220.7 512 256 512L480 512C515.3 512 544 483.3 544 448L544 211.9C544 199.2 538.9 187 529.9 178L430.1 78.1C421.1 69.1 408.9 64 396.2 64L256 64zM120 160C106.7 160 96 170.7 96 184L96 544C96 579.3 124.7 608 160 608L424 608C437.3 608 448 597.3 448 584C448 570.7 437.3 560 424 560L160 560C151.2 560 144 552.8 144 544L144 184C144 170.7 133.3 160 120 160z"})),t("sy-tooltip",{content:"copy to clipboard"}))),t("td",{part:"btd",style:{width:"30%"}},t("div",{style:{backgroundColor:`var(${e})`,width:"100%",height:"50px"}})),t("td",{part:"btd",class:"token-value-cell"},o))})))))};export{i as c};
