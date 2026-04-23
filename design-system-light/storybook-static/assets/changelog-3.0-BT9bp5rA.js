import{j as e,M as o}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as t}from"./index-DejdW_EF.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";function s(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Log/3.0"}),`
`,e.jsx(n.h1,{id:"v305",children:"v3.0.5"}),`
`,e.jsx(n.h3,{id:"input-number",children:"Input number"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"fixed a bug where updating the value of the input number component did not update the UI and the user's previous input remained."}),`
`]}),`
`,e.jsx(n.h3,{id:"layout",children:"Layout"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"fixed a bug where the width of the sider was not being set in the layout component."}),`
`]}),`
`,e.jsx(n.h3,{id:"pagination",children:"Pagination"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Change color of selected text when disabled"}),`
`]}),`
`,e.jsx(n.h3,{id:"radio",children:"Radio"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Added radio vertical type"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`<sy-radio-group position="vertical">
...
</sy-radio-group>
`})}),`
`,e.jsx(n.h3,{id:"steps",children:"Steps"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fixed the bug of wrong alignment in the vertical type in case the space is inserted in the title of the step item"}),`
`]}),`
`,e.jsx(n.h3,{id:"nav-item",children:"Nav item"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fixed nav item disabled not working when nav is not disabled"}),`
`]}),`
`,e.jsx(n.h3,{id:"theme",children:"Theme"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Token overrides due to the use of the wrong theme without following the guide"}),`
`,e.jsx(n.li,{children:`Synergy components can only be used when declaring sy-theme in body tag.
(In the token file, delete :root & :host and only apply sy-theme)`}),`
`]}),`
`,e.jsx(n.h1,{id:"v304",children:"v3.0.4"}),`
`,e.jsx(n.h3,{id:"input",children:"Input"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"width size doesn't change bug fix."}),`
`]}),`
`,e.jsx(n.h1,{id:"v303",children:"v3.0.3"}),`
`,e.jsx(n.h3,{id:"tree",children:"Tree"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Fix alignment among tree items which has children and others which are leaves."}),`
`]}),`
`,e.jsx(n.h1,{id:"v302",children:"v3.0.2"}),`
`,e.jsx(n.h3,{id:"icon---new-icons-added",children:"Icon - new Icons added"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"duotone_Run monitor"}),`
`,e.jsx(n.li,{children:"duotone_Visualization"}),`
`,e.jsx(n.li,{children:"duotone_FC shell"}),`
`,e.jsx(n.li,{children:"duotone_Code editor"}),`
`]}),`
`,e.jsx(n.h1,{id:"v301",children:"v3.0.1"}),`
`,e.jsx(n.h3,{id:"textarea",children:"Textarea"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Placeholder - color of the placeholder text has been changed from black color to gray color."}),`
`]}),`
`,e.jsx(n.h1,{id:"v30",children:"v3.0"}),`
`,e.jsx(n.h2,{id:"breaking-changes",children:"Breaking Changes"}),`
`,e.jsx(n.h3,{id:"theme-1",children:"Theme"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"/docs/theme-guide--docs",children:"default light/dark theme - refer to the storybook"})}),`
`,e.jsx(n.h3,{id:"style-guide",children:"Style Guide"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"/docs/styleguide-highchart-overview--high-chart-main",children:"HighCharts Style guide - refer to the storybook"})}),`
`,e.jsx(n.h2,{id:"new-components",children:"New components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/card-overview--docs",children:"Card"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/flex-overview--docs",children:"Flex"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/layout-overview--docs",children:"Layout"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/buttongroup-overview--docs",children:"Button Group"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/skeleton-overview--docs",children:"Skeleton"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/foundation-typography--docs",children:"Typography"})}),`
`]}),`
`,e.jsx(n.h2,{id:"compatibility",children:"Compatibility"}),`
`,e.jsx(n.h3,{id:"tab",children:"Tab"}),`
`,e.jsxs(n.p,{children:["There is a significant change to the tab component of the Version 3.0.0.",e.jsx("br",{}),`
This change was for improving functionality for easier use of tabs and to enhance extensibility for various tab applications.`,e.jsx("br",{}),`
Please note that versions after 3.0.0 are not compatible with the structure of previous 2.x.x versions.`,e.jsx("br",{})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Each sy-tab no longer applies slot=title. Instead, you should set slot=tabs on the parent container that holds the sy-tabs."}),`
`,e.jsx(n.li,{children:'To use sy-tab-content, it is requried to define a parent container and set "slot=contents"'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"ASIS"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`<sy-tab-group>
    <sy-tab slot="title" key="t1" ?closable=\${args.closable}>tab1</sy-tab>
    <sy-tab slot="title" key="t2" ?closable=\${args.closable}>tab2</sy-tab>

    <sy-tab-content name="t1">This is tab1</sy-tab-content>
    <sy-tab-content name="t2">This is tab2</sy-tab-content>
</sy-tab-group>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"TOBE"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`<sy-tab-group>
  <div slot="tabs">
    <sy-tab key="t1" ?closable=\${args.closable}>tab1</sy-tab>
    <sy-tab key="t2" ?closable=\${args.closable}>tab2</sy-tab>
  </div>
  <div slot="contents">
    <sy-tab-content name="t1">This is tab1</sy-tab-content>
    <sy-tab-content name="t2">This is tab2</sy-tab-content>
  </div>
</sy-tab-group>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),': type="navigation" in tab group is deprecated. (It will be delivered as a global header in MVP4)']}),`
`,e.jsx(n.h3,{id:"theme-2",children:"Theme"}),`
`,e.jsx(n.p,{children:"This version introduced the default light/dark theme, and you must add some style classes according to the below guidelines."}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"/docs/theme-guide--docs",children:"Theme Guide - Docs ⋅ Storybook"})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"ASIS"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`<body>
</body>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"TOBE"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`<body class="sy-theme sy-theme-light sy-appname">
</body>
`})})]})}function c(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{c as default};
