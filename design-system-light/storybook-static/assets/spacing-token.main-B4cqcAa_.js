import{j as n,M as t,S as r,C as o}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as i}from"./index-DejdW_EF.js";import{S as c,D as d}from"./spacing-token.stories-C5U6wM5G.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";import"./index-BdigElPL.js";function a(e){const s={h1:"h1",h2:"h2",p:"p",...i(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{of:c}),`
`,n.jsx(s.h1,{id:"spacing",children:"Spacing"}),`
`,n.jsx(s.h2,{id:"definition",children:"Definition"}),`
`,n.jsxs(s.p,{children:["Spacing tokens in a design system provide consistent spacing between elements throughout an interface.",n.jsx("br",{}),n.jsx("br",{}),`
Spacing tokens are used at every interval.`,n.jsx("br",{}),`
Please use it for padding, margin, and gap.`,n.jsx("br",{})]}),`
`,n.jsx(s.h2,{id:"values",children:"Values"}),`
`,n.jsxs(s.p,{children:[n.jsx("b",{children:"--spacing-4xsmall (2px)"})," : Small size component spacing.",n.jsx("br",{}),`
`,n.jsx("b",{children:"--spacing-4xsmall (4px)"})," : Medium size component spacing.",n.jsx("br",{}),`
`,n.jsx("b",{children:"--spacing-4xsmall (6px)"})," : Large size component spacing.Left and right padding values of small size components. (Include checkbox, radio, switch) ",n.jsx("br",{}),`
`,n.jsx("b",{children:"--spacing-4xsmall (8px)"})," : This is default spacing.You can use left and right padding values of medium size components.",n.jsx("br",{}),`
`,n.jsx("b",{children:"--spacing-4xsmall (12px)"})," : Left and right padding values of large size components. (Include popconfirm, modal, drawer, banner message, toast message)",n.jsx("br",{}),`
`,n.jsx("b",{children:"--spacing-4xsmall (16px)"})," : Left and right padding of banner messages, toast messages, and inline messages.",n.jsx("br",{})]}),`
`,n.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,n.jsx(s.p,{children:"The spacing token can be used as a CSS variables:"}),`
`,n.jsx(r,{code:`
.class-name {
  padding: var(--spacing-xsmall);
}
`}),`
`,n.jsx(s.h2,{id:"values-1",children:"Values"}),`
`,n.jsx(o,{of:d,sourceState:"none"})]})}function j(e={}){const{wrapper:s}={...i(),...e.components};return s?n.jsx(s,{...e,children:n.jsx(a,{...e})}):a(e)}export{j as default};
