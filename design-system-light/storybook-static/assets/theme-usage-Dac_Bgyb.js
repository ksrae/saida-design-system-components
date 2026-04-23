import{j as e,M as o,C as a}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as i}from"./index-DejdW_EF.js";import{T as r,P as d}from"./theme-usage.stories-DuUu2ZUt.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";import"./index-BdigElPL.js";const l=""+new URL("theme-guide-BZhuRNrf.png",import.meta.url).href;function n(t){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:r}),`
`,e.jsx("div",{className:"story-control",children:e.jsx(a,{of:d})}),`
`,e.jsx(s.h1,{id:"theme-guide",children:"Theme Guide"}),`
`,e.jsx(s.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(s.p,{children:["Please use this guide to change the theme of a dc component.",e.jsx("br",{}),e.jsx("br",{}),`
We use flat design to focus more on the state and flow of Data.`,e.jsx("br",{}),`
In the future, it will be easier to understand if the expression of data and status in each widget is included.`,e.jsx("br",{}),`
And we make it as simple as possible to construct disturbances other than the information and state of the data.`,e.jsx("br",{}),e.jsx("br",{}),`
Flat Design refers to a two-dimensional design method that excludes complex graphic effects and configures them to enable intuitive recognition through simple colors and composition. `,e.jsx("br",{}),`
It pursues minimalism, a design technique that expresses the essence of an object by using only the least elements.`,e.jsx("br",{})]}),`
`,e.jsxs(s.p,{children:[e.jsx("b",{children:"Justice and Purpose"}),e.jsx("br",{}),`
Flat design is an interface design style that emphasizes the minimal use of simple elements, typography, and flat colors.`,e.jsx("br",{}),`
We use flat design because it makes interface design simpler and more efficient. It is easier to deliver information quickly while making it look visually attractive and accessible.`,e.jsx("br",{}),e.jsx("br",{}),`
It also makes it easier to design interfaces that are responsive to changes in the size of browsers on different devices.`,e.jsx("br",{}),`
Using minimal design elements, websites can be loaded faster, resized more easily, and appear more clearly on high-resolution screens.`,e.jsx("br",{}),e.jsx("br",{})]}),`
`,e.jsx("img",{src:l,alt:"Theme guide"}),`
`,e.jsx("div",{className:"title",children:e.jsx(s.h2,{id:"how-to-use-theme-class",children:"How to use theme class."})}),`
`,e.jsxs(s.p,{children:["Please apply the sy-them class to the body tag only once. ",e.jsx("br",{}),`
You should never use it in duplicate elsewhere. `,e.jsx("br",{}),`
(Please do not create and use any additional class names that begin with the number 3 "sy-theme-" in the image above.)`]}),`
`,e.jsx(s.h3,{id:"default-theme-light",children:"Default Theme (Light)"}),`
`,e.jsx(s.p,{children:"Add sy-theme-light class on your component"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{children:`<body class="sy-theme sy-theme-light"><body>
`})}),`
`,e.jsx(s.h3,{id:"dark-theme",children:"Dark theme"}),`
`,e.jsx(s.p,{children:"Add sy-theme-dark class on your component"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{children:`<body class="sy-theme sy-theme-dark"><body>
`})}),`
`,e.jsx("style",{children:`
  .story-control {
    display: none !important;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #484848;
  }

  .title h2{
    border-bottom: none !important;
  }

  .title img {
    height: 30px;
    width: auto;
    margin-top: 32px;
  }

  #note, #note-1, #note-2 {
    color: var(--background-error-contrast-bold);
  }

`})]})}function j(t={}){const{wrapper:s}={...i(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(n,{...t})}):n(t)}export{j as default};
