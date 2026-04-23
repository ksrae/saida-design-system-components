import{j as e,M as l}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as d}from"./index-DejdW_EF.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";function s(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...d(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Log/2.0"}),`
`,e.jsx(n.h1,{id:"v209",children:"v2.0.9"}),`
`,e.jsx(n.h2,{id:"updates",children:"Updates"}),`
`,e.jsx(n.h3,{id:"tree",children:"Tree"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Icon and label alignment"}),`
`,e.jsx(n.li,{children:"item expanded not working"}),`
`,e.jsx(n.li,{children:"Specific tree node doesn't expand bug fix"}),`
`]}),`
`,e.jsx(n.h3,{id:"modal",children:"Modal"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"radio-group component does not work in the modal body bug fix"}),`
`,e.jsx(n.li,{children:"type text to input field in modeless component bug fix"}),`
`,e.jsx(n.li,{children:"autocomplete option not displaying bug fix"}),`
`]}),`
`,e.jsx(n.h3,{id:"tab",children:"Tab"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"specific height and give rest height to tab-content"}),`
`]}),`
`,e.jsx(n.h1,{id:"v207",children:"v2.0.7"}),`
`,e.jsx(n.h2,{id:"updates-1",children:"Updates"}),`
`,e.jsx(n.h3,{id:"tree-1",children:"Tree"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"updated data reset when click outside the input"}),`
`,e.jsx(n.li,{children:"In edit mode, input and nodes are getting greyed out."}),`
`,e.jsx(n.li,{children:"input clicking not expand tree."}),`
`,e.jsx(n.li,{children:"enables switching with a disabled node."}),`
`]}),`
`,e.jsx(n.h3,{id:"textarea",children:"Textarea"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"change font family of sy-textArea"}),`
`]}),`
`,e.jsx(n.h1,{id:"v206",children:"v2.0.6"}),`
`,e.jsx(n.h2,{id:"updates-2",children:"Updates"}),`
`,e.jsx(n.h3,{id:"tooltip",children:"Tooltip"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Tooltip does not disappear in the modal"}),`
`,e.jsx(n.li,{children:"remove when parent is removed"}),`
`]}),`
`,e.jsx(n.h3,{id:"tree-2",children:"Tree"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"updated data reset when click outside the input"}),`
`]}),`
`,e.jsx(n.h3,{id:"textarea-1",children:"Textarea"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Clear icon overlaps with scrollbar"}),`
`]}),`
`,e.jsx(n.h1,{id:"v205",children:"v2.0.5"}),`
`,e.jsx(n.h2,{id:"updates-3",children:"Updates"}),`
`,e.jsx(n.h3,{id:"tree-3",children:"Tree"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Remove tooltip remains after removing node"}),`
`,e.jsx(n.li,{children:"Set different placeholder on each level"}),`
`,e.jsx(n.li,{children:"On click of action icons like remove and add seems to trigger node click and gets highlighted."}),`
`,e.jsx(n.li,{children:"Expand tree by clicking node label"}),`
`]}),`
`,e.jsx(n.h3,{id:"select",children:"Select"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Selected option is coming on top of the dropdown twice"}),`
`,e.jsx(n.li,{children:"Provide a way to add tooltip on the select options"}),`
`]}),`
`,e.jsx(n.h1,{id:"v203",children:"v2.0.3"}),`
`,e.jsx(n.h2,{id:"updates-4",children:"Updates"}),`
`,e.jsx(n.h3,{id:"input",children:"Input"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"changed event is fired when clear icon is clicked."}),`
`]}),`
`,e.jsx(n.h3,{id:"tree-4",children:"Tree"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"manualRemove Attribute has been added."}),`
`,e.jsxs(n.li,{children:["removeNode function has been added.",e.jsx("br",{}),`
If manualRemove is set, when itemRemoved event is fired, the event returns node value but it does not remove the node.`,e.jsx("br",{}),`
A developer can add modal or any notification at this moment.`,e.jsx("br",{}),`
If user select to remove, remove the node manually, using removeNode function.`]}),`
`]}),`
`,e.jsx(n.h3,{id:"inline-message",children:"Inline message"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"fix bug when using focusout trigger in the inline message."}),`
`]}),`
`,e.jsx(n.h1,{id:"v202",children:"v2.0.2"}),`
`,e.jsx(n.h2,{id:"updates-5",children:"Updates"}),`
`,e.jsx(n.h3,{id:"tab-1",children:"Tab"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Max- width of ",e.jsx(n.code,{children:"<sy-tab>"})," has been removed which means length of the tab can be expanded as much as length of its slot.",e.jsx("br",{})]}),`
`,e.jsx(n.li,{children:"Developers can also control its size with adding style. But changing any other style may affacts its feature or style."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`<sy-tab style="width:100px;">tab 1</sy-tab>
`})}),`
`,e.jsx(n.h3,{id:"tree-5",children:"Tree"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"itemRemoved" event will be fired, when a tree node is removed by user clicking remove-icon.'}),`
`]}),`
`,e.jsx(n.h3,{id:"tooltip-1",children:"Tooltip"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"itemSelected event files once only at clicking an item."}),`
`,e.jsx(n.li,{children:"linefeed is necessary Fixed"}),`
`,e.jsx(n.li,{children:"content allows special characters such as \\n for newline, \\t for tab."}),`
`,e.jsx(n.li,{children:"HTML are not allowed. It will be shown as plain text."}),`
`,e.jsx(n.li,{children:"text is not wrapped Fixed"}),`
`,e.jsx(n.li,{children:"content will be wrapped by tooltip size."}),`
`,e.jsx(n.li,{children:"Default width of the tooltip is 200px."}),`
`]}),`
`,e.jsx(n.h3,{id:"step",children:"Step"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Enhance style: Distinguish enable/disable clearly"}),`
`]}),`
`,e.jsx(n.h3,{id:"button",children:"Button"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Resolve the issue of the text line in the button."}),`
`]}),`
`,e.jsx(n.h3,{id:"icons---new-icons-added",children:"Icons - New icons added"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"share-nodes"}),`
`,e.jsx(n.li,{children:"circle"}),`
`,e.jsx(n.li,{children:"clock"}),`
`,e.jsx(n.li,{children:"rotate-right"}),`
`,e.jsx(n.li,{children:"rotate"}),`
`]}),`
`,e.jsx(n.h1,{id:"v201",children:"v2.0.1"}),`
`,e.jsx(n.h2,{id:"updates-6",children:"Updates"}),`
`,e.jsx(n.h3,{id:"step-1",children:"Step"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Fixed an issue where only the number of steps specified by 'step' stayed active when a startindex was set, preventing any steps beyond that from activating. ",e.jsx("br",{}),`
Modified so the defined 'step' count remains active even with a startindex set.`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["sy-steps and sy-step must be composed as 1-depth and should not be placed in a 2-depth hierarchy.",e.jsx("br",{}),`
However, if composed within Angulars invisible DOM (e.g., `,e.jsx(n.code,{children:"<ng-container>"}),"), it was actually 1-depth but not displayed correctly."]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"dropdown",children:"Dropdown"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["does not show on the modal fixed",e.jsx("br",{}),`
zIndex has been reorganized.`]}),`
`]}),`
`,e.jsx(n.h3,{id:"tab-2",children:"Tab"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"tab scroll overflow error"}),`
`]}),`
`,e.jsx(n.h3,{id:"font",children:"Font"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Limit the scope of root font style to Synergy components only"}),`
`]}),`
`,e.jsx(n.h1,{id:"v20",children:"v2.0"}),`
`,e.jsx(n.h2,{id:"new-features",children:"New Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/avatar-overview--docs",children:"Avatar"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/badge-overview--docs",children:"Badge"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/bannermessage-overview--docs",children:"Banner message"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/drawer-overview--docs",children:"Drawer"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/inlinemessage-overview--docs",children:"Inline message"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/modeless-overview--docs",children:"Modeless"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/navigationmenu-overview--docs",children:"Navigation menu"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/splitpanel-overview--docs",children:"Split Panel"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/toastmessage-overview--docs",children:"Toast message"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/tooltip-overview--docs",children:"Tooltip"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/treeselect-overview--docs",children:"TreeSelect"})}),`
`]})]})}function o(i={}){const{wrapper:n}={...d(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{o as default};
