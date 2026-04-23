import{j as n,M as c,C as r,a,h as l}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as t}from"./index-DejdW_EF.js";import{I as h,D as o}from"./sy-icon.stories-Cy3Mv3pm.js";import{Default as d}from"./sy-all-icons.stories-BtO4E2rN.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";import"./unsafe-html-13gMdR3O.js";import"./clear-element-Diyka43E.js";const p=""+new URL("syicon-kit-BJKDMRQM.png",import.meta.url).href,x=""+new URL("syicon-use-CD1Jlaiz.png",import.meta.url).href,u=""+new URL("syicon-use01-C0fDCHJx.png",import.meta.url).href,j=""+new URL("syicon-use02-CEw72cQO.png",import.meta.url).href;function i(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...t(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(c,{of:h}),`
`,n.jsx(e.h1,{id:"icon",children:"Icon"}),`
`,n.jsx(e.h2,{id:"definition",children:"Definition"}),`
`,n.jsxs(e.p,{children:["Icons are symbols that can be usd to represent various options within an application. ",n.jsx("br",{}),n.jsx("br",{}),`
We basically recommend using the size properties provided by the sy-icon component.`,n.jsx("br",{}),`
Icons are also able to be modified its color & size with style.`,n.jsx("br",{}),n.jsx("br",{}),`
You can apply icons in two ways on the web.`,n.jsx("br",{}),`
And you can use all the SVG icons you want.`,n.jsx("br",{}),n.jsx("br",{}),`
Synergy uses font-awesome icons as its base.`,n.jsx("br",{}),`
FontAwsome Classic (Regular, Solid)`,n.jsx("br",{})]}),`
`,n.jsx("img",{src:p,alt:"sy-icon-kit"}),`
`,n.jsx("br",{}),`
`,n.jsx("a",{href:"https://fontawesome.com/icons?t=packs",target:"_blank",children:n.jsx("u",{children:"FontAwsome Icons"})}),`
`,n.jsx(e.h3,{id:"how-to-use-icons",children:"How to use icons"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"First :"})," Please insert SVG code directly using slotContent from Sy-Icon.",n.jsx("br",{}),`
1.Copy the fontawesome svg icon or other SVG icon code you want.`,n.jsx("br",{}),`
2.Paste SVG code inside sy-icon as below image.`,n.jsx("br",{})]}),`
`,n.jsx("img",{src:x,alt:"sy-icon-use",width:"70%"}),`
`,n.jsx("br",{}),`
`,n.jsx("img",{src:u,alt:"sy-icon-use-slot",width:"70%"}),`
`,n.jsx("br",{}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Second :"})," Put the svg icon in your application development folder",n.jsx("br",{}),`
You can use the icon by entering the SVG path in the path of Sy-Icon.`,n.jsx("br",{}),n.jsx("br",{}),`
1.Put the icon you want to use in the folder you want.`,n.jsx("br",{}),`
2.Specify the icon path in sy-icon path="url" as shown in the image below.`,n.jsx("br",{})]}),`
`,n.jsx("img",{src:j,alt:"sy-icon-use-path",width:"70%"}),`
`,n.jsx("br",{}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"legacy-icons",children:"Legacy Icons"}),`
`,n.jsxs(e.p,{children:["For the Legacy application, please download the font-awesome icon and use the SVG icon.",n.jsx("br",{}),`
Sy-icon is not available on non-Web Legacy products.`]}),`
`,n.jsx(e.h3,{id:"custom-icons-guide",children:"Custom icons guide"}),`
`,n.jsxs(e.p,{children:["If you would you like make custom icons.",n.jsx("br",{}),`
Please check out the font-awesome custom icon guide.`,n.jsx("br",{}),`
`,n.jsx("a",{href:"https://docs.fontawesome.com/web/add-icons/upload-icons/icon-design",target:"_blank",children:n.jsx("u",{children:"Custom icons guide of FontAwesome"})})]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-style",children:`<!-- Size example (Please make the icon size square) -->
<sy-icon size="medium">
<sy-icon style="width:100px; height:100px;>

<!-- Color example -->
<sy-icon style="color:purple">
<sy-icon style="color:#800080">

`})}),`
`,n.jsx(e.h2,{id:"example",children:"Example"}),`
`,n.jsx(r,{of:o}),`
`,n.jsx(a,{of:o}),`
`,n.jsx(e.h1,{id:"available-icons",children:"Available Icons"}),`
`,n.jsxs(e.p,{children:["All available icons from the library are shown below.",n.jsx("br",{}),`
These icons are resized to the right size when used in conjunction with `,n.jsx(e.code,{children:"<sy-icon>"}),".",n.jsx("br",{}),n.jsx("br",{})]}),`
`,n.jsxs(e.p,{children:["Click or tap on any icon to copy its raw SVG code to your clipboard. To use the icon, paste the copied code ",n.jsxs(e.strong,{children:["directly inside an ",n.jsx(e.code,{children:"<sy-icon>"})," component"]}),".",n.jsx("br",{}),`
Developers can use more diverse icons by using 'path' or by input other SVG. However, such icons cannot guarantee the appropriate type of icon when used in conjunction with `,n.jsx(e.code,{children:"<sy-icon>"}),"."]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Example:"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<sy-icon size="large">
  <!-- attach svg code here -->
  <svg xmlns="http://www.w.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="..."></path></svg>
</sy-icon>
`})}),`
`,n.jsx(l,{of:d})]})}function S(s={}){const{wrapper:e}={...t(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{S as default};
