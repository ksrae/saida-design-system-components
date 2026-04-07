import{j as r,M as e,C as n}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as s}from"./index-DejdW_EF.js";import{C as i,S as c,a as h,N as l,H as u,A as g}from"./chart-color-guide.stories-BMLLgkwd.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";import"./color-token-Dl5wPqf7.js";import"./index-BdigElPL.js";const d=""+new URL("chart-overview-light-D9pUuSNs.svg",import.meta.url).href,v=""+new URL("chart-overview-dark-CdRdx48P.svg",import.meta.url).href;function o(t){const a={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...s(),...t.components};return r.jsxs(r.Fragment,{children:[r.jsx(e,{of:i}),`
`,r.jsx(a.h1,{id:"high-chart-color-guide",children:"High Chart Color Guide"}),`
`,r.jsxs(a.p,{children:["The color token below will be automatically filled according to the high chart rule.",r.jsx("br",{}),`
(Status color should be applied directly if necessary.)`,r.jsx("br",{}),`
You can add below tokens non-highchart.`]}),`
`,r.jsx("b",{children:"Color Token (_highchart-token.scss)"}),`
`,r.jsx(a.pre,{children:r.jsx(a.code,{children:`@use './foundation/color-primitives';

/* charts */
:root,
:host,
.highcharts-light {
    /* Light */
    /* color */
    --charts-annotation-0: #3d99f566;
    --charts-annotation-1: #72b5f866;
    --charts-annotation-2: #9eccfa66;
    --charts-annotation-3: #92e3e366;
    --charts-annotation-4: #96e0b466;
    --charts-annotation-5: #cbe1a666;

    /* Background */
    --charts-background-color: var(--white);

    /* Highlight */
    --charts-highlight-10: var(--color-blue-50);
    --charts-highlight-20: var(--color-blue-200);
    --charts-highlight-60: var(--color-blue-400);
    --charts-highlight-80: var(--color-blue-600);
    --charts-highlight-100: var(--color-blue-800);    

    /* Neutral */
    --charts-neutral-3: var(--color-lightgray-50);
    --charts-neutral-5: var(--color-lightgray-100);
    --charts-neutral-10: var(--color-lightgray-200);
    --charts-neutral-20: var(--color-lightgray-400);
    --charts-neutral-40: var(--color-lightgray-600);    
    --charts-neutral-60: var(--color-lightgray-700);    
    --charts-neutral-80: var(--color-lightgray-900);    
    --charts-neutral-100: var(--black);

    /* series */
    --charts-series-0: var(--color-blue-400);
    --charts-series-1: var(--color-purple-400);
    --charts-series-2: var(--color-green-300);
    --charts-series-3: var(--color-orange-500);
    --charts-series-4: var(--color-darkgray-400);
    --charts-series-5: var(--color-magenta-400);
    --charts-series-6: var(--color-teal-300);
    --charts-series-7: var(--color-red-400);
    --charts-series-8: var(--color-orange-300);
    --charts-series-9: var(--color-teal-200);

    /* Status */
    --charts-status-information: var(--color-blue-500);
    --charts-status-warning: var(--color-yellow-500);
    --charts-status-danger: var(--color-red-500);
    --charts-status-discovery: var(--color-purple-400);
    --charts-status-neutral: var(--color-lightgray-400);
    --charts-status-success: var(--color-green-500);    
  }

:root,
:host,
.highcharts-dark{
    /* Dark */
    /* color */

    /* Background Dark*/
    --charts-background-color: var(--color-lightgray-900);

    /* Neutral Dark*/
    --charts-neutral-3: var(--color-lightgray-800);
    --charts-neutral-5: var(--color-lightgray-700);    
    --charts-neutral-10: var(--color-lightgray-600);
    --charts-neutral-20: var(--color-lightgray-500);    
    --charts-neutral-40: var(--color-lightgray-400);    
    --charts-neutral-60: var(--color-lightgray-300);    
    --charts-neutral-80: var(--color-lightgray-200);    
    --charts-neutral-100: var(--white);

    /* Highlight Dark*/
    --charts-highlight-10: var(--color-blue-800);  
    --charts-highlight-20: var(--color-blue-600);
    --charts-highlight-60: var(--color-blue-400);
    --charts-highlight-80: var(--color-blue-200);
    --charts-highlight-100: var(--color-blue-50);
}
`})}),`
`,r.jsxs(a.p,{children:[r.jsx("b",{children:"Font Size (highchart.scss)"}),r.jsx("br",{}),`
Font aleady added in highchart.`]}),`
`,r.jsx(a.pre,{children:r.jsx(a.code,{children:`@use './global/font-heading';
@use './global/font';

/* (6) Title */
.highcharts-title text{
@include font-heading.text-style-heading-1();
}

/* (7) Sub Title */
.highcharts-subtitle text{
@include font.text-style-base-regular();
}

/* (2) Axix Labels */
.highcharts-axis-labels text{
@include font.text-style-base-regular();
}

/* (10) Legends */
.highcharts-a11y-proxy-element{
@include font.text-style-base-regular();
}

/* (11) Tooltip Text */
.highcharts-tooltip text{
@include font.text-style-base-regular();
}

`})}),`
`,r.jsx(a.h2,{id:"overview",children:"Overview"}),`
`,r.jsxs(a.p,{children:["Data visualization is the representation of information in pictorial or graphical format, such as charts, graphs, maps, and diagrams. ",r.jsx("br",{}),`
These visuals aid in the communication of complex data so that insights can be more easily drawn.
Because color can affect our perception of information, the appropriate use of color is critical in making a data visualization successful.`,r.jsx("br",{})]}),`
`,r.jsx("br",{}),`
`,r.jsx("img",{src:d,alt:"Chart overview light",width:"100%"}),`
`,r.jsx("br",{}),`
`,r.jsx("br",{}),`
`,r.jsx("br",{}),`
`,r.jsx("img",{src:v,alt:"Chart overview dark",width:"100%"}),`
`,r.jsx(a.h2,{id:"series",children:"Series"}),`
`,r.jsxs(a.p,{children:["You can add more color tokens in _highchart-token.scss.",r.jsx("br",{})]}),`
`,r.jsx(n,{of:c,sourceState:"none"}),`
`,r.jsx(a.h2,{id:"status",children:"Status"}),`
`,r.jsxs(a.p,{children:[r.jsx("b",{children:"--charts-status-information :"})," For data visualization communicating low priority or in-progress statuses. ",r.jsx("br",{}),`
`,r.jsx("b",{children:"--charts-status-warning :"})," For data visualization communicating caution, such as 'at risk' or 'medium priority'.",r.jsx("br",{}),`
`,r.jsx("b",{children:"--charts-status-danger :"})," For data visualization communicating negative or critical information, such as 'off track' or 'high priority'.",r.jsx("br",{}),`
`,r.jsx("b",{children:"--charts-status-discovery :"})," For data visualization communicating 'new' statuses.",r.jsx("br",{}),`
`,r.jsx("b",{children:"--charts-status-neutral :"})," For data visualization communicating 'to-do' statuses.",r.jsx("br",{}),`
`,r.jsx("b",{children:"--charts-status-success :"})," For data visualization communicating positive information, such as 'on track' or done."]}),`
`,r.jsx(n,{of:h,sourceState:"none"}),`
`,r.jsx(a.h2,{id:"neutral",children:"Neutral"}),`
`,r.jsx(n,{of:l,sourceState:"none"}),`
`,r.jsx(a.h2,{id:"highlight",children:"HighLight"}),`
`,r.jsx(n,{of:u,sourceState:"none"}),`
`,r.jsx(a.h2,{id:"annotation",children:"Annotation"}),`
`,r.jsx(n,{of:g,sourceState:"none"})]})}function k(t={}){const{wrapper:a}={...s(),...t.components};return a?r.jsx(a,{...t,children:r.jsx(o,{...t})}):o(t)}export{k as default};
