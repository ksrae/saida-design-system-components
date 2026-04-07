import{j as e,M as d}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as i}from"./index-DejdW_EF.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";function r(s){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Log/4.0"}),`
`,e.jsx(n.h1,{id:"v40",children:"v4.0"}),`
`,e.jsx(n.h2,{id:"braking-changes",children:"Braking Changes"}),`
`,e.jsx(n.h3,{id:"common",children:"Common"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["To apply similar Naming rules to all Components, some Component's Property Naming has been modified. It may not apply to the rule, such as ",e.jsx(n.code,{children:"disabled"})," that is traditionally used."]}),`
`,e.jsxs(n.li,{children:["To apply similar Naming rules to all Components, some Component's Event Naming has been modified . It may not apply to the rule, such as ",e.jsx(n.code,{children:"click"})," that is traditionally used."]}),`
`,e.jsx(n.li,{children:"The overall capacity is reduced by 50%, providing faster loading speed and more optimized performance."}),`
`]}),`
`,e.jsx(n.h3,{id:"tree-shaking",children:"Tree shaking"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"All components can now be tree shaking. Unused components are not included in the bundle unless they are imported."}),`
`,e.jsxs(n.li,{children:["All components can now be imported individually. For example, you can use it like ",e.jsx(n.code,{children:"import { inputComponent } from '@dc/design-system-core/input';"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"form",children:"Form"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Some components have been improved those features to support ",e.jsx(n.code,{children:"Form"}),"."]}),`
`,e.jsx(n.li,{children:"For more detailed information, refer to [Form Component Documentation] (/docs/form-overview--docs)."}),`
`]}),`
`,e.jsx(n.h3,{id:"icon",children:"Icon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Icon can now apply SVG. These are applied tat using the SVG tags directly or using the 'path' property to load external SVG files."}),`
`,e.jsx(n.li,{children:"It is required to set CORS, to load an external SVG file. If CORS is not set, the icon may not appear."}),`
`]}),`
`,e.jsx(n.h2,{id:"new-features",children:"New Features"}),`
`,e.jsx(n.p,{children:"A new component has been added."}),`
`,e.jsx(n.h3,{id:"datepicker",children:e.jsx(n.a,{href:"/docs/datepicker-overview--docs",children:"datepicker"})}),`
`,e.jsx(n.p,{children:`This is a component that can choose a date. You can choose a date in the form of a calendar.
Depending on the variant, it can be used as TimePicker, RangePicker.`}),`
`,e.jsx(n.h3,{id:"colorpicker",children:e.jsx(n.a,{href:"/docs/colorpicker-overview--docs",children:"colorpicker"})}),`
`,e.jsx(n.p,{children:"It is a component that can choose a color. A color palette is provided so that the user can choose a color."}),`
`,e.jsx(n.h3,{id:"globalheader",children:e.jsx(n.a,{href:"/docs/globalheader-overview--docs",children:"globalheader"})}),`
`,e.jsx(n.p,{children:"The global header component is used to display a consistent header across the application."}),`
`,e.jsx(n.h3,{id:"label",children:e.jsx(n.a,{href:"/docs/label-overview--docs",children:"label"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"Label"}),` component provides the ability to display text labels in Form elements.
`,e.jsx(n.code,{children:"Label"})," component that can be used with ",e.jsx(n.code,{children:"INPUT, TEXTAREA, SELECT, and more"}),"."]}),`
`,e.jsx(n.h3,{id:"progress-circular",children:e.jsx(n.a,{href:"/docs/progresscircular-overview--docs",children:"progress circular"})}),`
`,e.jsx(n.p,{children:"The progress circular component is used to indicate the progress of a task in a circular format."}),`
`,e.jsx(n.h3,{id:"slider",children:e.jsx(n.a,{href:"/docs/slider-overview--docs",children:"slider"})}),`
`,e.jsx(n.p,{children:`The slider component allows users to select a value from a range by sliding a handle along a track.
It is useful for selecting values such as volume, brightness, or any other continuous value.`}),`
`,e.jsx(n.h2,{id:"updates",children:"Updates"}),`
`,e.jsx(n.h3,{id:"banner",children:e.jsx(n.a,{href:"/docs/banner-overview--docs",children:"banner"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"title"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"header"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"icon"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"showIcon"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Example:"}),e.jsx(n.br,{}),`
`,e.jsx(n.code,{children:'<sy-banner-messsage header="Banner Title" showIcon></sy-banner-messsage>'})]}),`
`]}),`
`,e.jsx(n.h3,{id:"drawer",children:e.jsx(n.a,{href:"/docs/drawer-overview--docs",children:"drawer"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opened"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"open"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"onOpened"})," event has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"opened"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"onClosed"})," event has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"closed"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"inline-message",children:e.jsx(n.a,{href:"/docs/inline-message-overview--docs",children:"inline-message"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opened"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"open"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"showIcon"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"input",children:e.jsx(n.a,{href:"/docs/input-overview--docs",children:"input"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"focused"})," event has been added."]}),`
`,e.jsxs(n.li,{children:["The existing ",e.jsx(n.code,{children:"blurred"})," event has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"blured"}),"."]}),`
`,e.jsx(n.li,{children:"The validation of the input is affected by the validation of the form."}),`
`,e.jsx(n.li,{children:"The validation of the input is applied after the user enters any value or Form Submit."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"status"})," sets the state of the input in the UI, regardless of the validation of the input. However, if the validation of the input fails, ",e.jsx(n.code,{children:"status"})," is set to 'error'."]}),`
`]}),`
`,e.jsx(n.h3,{id:"input-number",children:e.jsx(n.a,{href:"/docs/input-number-overview--docs",children:"input-number"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"focused"})," event has been added."]}),`
`,e.jsxs(n.li,{children:["The existing ",e.jsx(n.code,{children:"blurred"})," event has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"blured"}),"."]}),`
`,e.jsx(n.li,{children:"The validation of the input-number is affected by the validation of the form."}),`
`,e.jsx(n.li,{children:"The validation of the input-number is applied after the user enters any value or Form Submit."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"status"})," sets the state of the input-number in the UI, regardless of the validation of the input. However, if the validation of the input fails, ",e.jsx(n.code,{children:"status"})," is set to 'error'."]}),`
`]}),`
`,e.jsx(n.h3,{id:"icon-1",children:e.jsx(n.a,{href:"/docs/icon-overview--docs",children:"icon"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"filled"})," and ",e.jsx(n.code,{children:"type"})," property has been ",e.jsx(n.strong,{children:"deprecated"}),". All icons must be used with SVG or ",e.jsx(n.code,{children:"path"})," property."]}),`
`,e.jsxs(n.li,{children:["It is possible to load external SVG through the ",e.jsx(n.code,{children:"path"})," property. For example, ",e.jsx(n.code,{children:'<sy-icon path="path/to/icon.svg"></sy-icon>'})," is available. The ",e.jsx(n.code,{children:"path"}),` allows urls only; not a local file path.
Icons can now directly use SVG code. For example, `,e.jsx(n.code,{children:"<sy-icon><svg>...</svg>></sy-icon>"})," is available."]}),`
`]}),`
`,e.jsx(n.h3,{id:"menu",children:e.jsx(n.a,{href:"/docs/menu-overview--docs",children:"menu"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opened"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"open"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"selected"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"select"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," property has been ",e.jsx(n.strong,{children:"deprecated"})," from ",e.jsx(n.code,{children:"<sy-menu-group>"}),". User can attach icon directly in the ",e.jsx(n.code,{children:"title"})," property with ",e.jsx(n.code,{children:"<sy-icon>"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," property has been ",e.jsx(n.strong,{children:"deprecated"})," from ",e.jsx(n.code,{children:"<sy-menu-sub>"}),". User can attach icon directly in the ",e.jsx(n.code,{children:"title"})," property with ",e.jsx(n.code,{children:"<sy-icon>"}),"."]}),`
`,e.jsx(n.li,{children:"menu-item does not closed while controlling the HTML elements on the menu-item."}),`
`]}),`
`,e.jsx(n.h3,{id:"modal",children:e.jsx(n.a,{href:"/docs/modal-overview--docs",children:"modal"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opened"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"open"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerOpened()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setOpen()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerClosed()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setClose()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerCalceled()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setCancel()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerOk()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setOk()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerMaximized()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setMaximum()"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"modeless",children:e.jsx(n.a,{href:"/docs/modeless-overview--docs",children:"modeless"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opened"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"open"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"maximized"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"maximum"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"minimized"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"minimum"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerOpened()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setOpen()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerClosed()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setClose()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerMaximized()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setMaximum()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerMinimized()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setMinimum()"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerRestored()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setRestore()"}),"."]}),`
`,e.jsxs(n.li,{children:["The Emit value of the ",e.jsx(n.code,{children:"status"})," event has changed. ",e.jsx(n.code,{children:"detail: {id?: string, status: string}"})]}),`
`,e.jsxs(n.li,{children:["The Emit value of the ",e.jsx(n.code,{children:"position"})," event has changed. ",e.jsx(n.code,{children:"detail: {id?: string, position: {left, top, width, height}}"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"navigationmenu",children:e.jsx(n.a,{href:"/docs/navigationmenu-overview--docs",children:"navigationMenu"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," property has been ",e.jsx(n.strong,{children:"deprecated"})," from ",e.jsx(n.code,{children:"<sy-nav-group>"}),". A User can attach icon directly in the ",e.jsx(n.code,{children:"title"})," property with ",e.jsx(n.code,{children:"<sy-icon>"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," property has been ",e.jsx(n.strong,{children:"deprecated"})," from ",e.jsx(n.code,{children:"<sy-nav-sub>"}),". A User can attach icon directly in the ",e.jsx(n.code,{children:"title"})," property with ",e.jsx(n.code,{children:"<sy-icon>"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"progresscircular",children:e.jsx(n.a,{href:"/docs/progresscircular-overview--docs",children:"progressCircular"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"indeterminate"})," attribute has been ",e.jsx(n.strong,{children:"added"}),". It allows the progress circular indicating that the progress is ongoing."]}),`
`]}),`
`,e.jsx(n.h3,{id:"select",children:e.jsx(n.a,{href:"/docs/select-overview--docs",children:"select"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"focused"})," event has been added."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"readonly"})," property has been ",e.jsx(n.strong,{children:"added"}),"."]}),`
`,e.jsxs(n.li,{children:["The existing ",e.jsx(n.code,{children:"blurred"})," event has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"blured"}),"."]}),`
`,e.jsx(n.li,{children:"The validation of the select is affected by the validation of the form."}),`
`,e.jsx(n.li,{children:"The validation of the select is applied after the user select any option or Form Submit."}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"detail"})," value of the ",e.jsx(n.code,{children:"selected"})," event has changed. ",e.jsx(n.code,{children:"detail: {selectedOptions: {value: string, label?: string}, isValid: boolean, status: '' | 'valueMissing' | 'custom'}"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"slider-1",children:e.jsx(n.a,{href:"/docs/slider-overview--docs",children:"slider"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"change"})," event has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"changed"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"tab",children:e.jsx(n.a,{href:"/docs/tab-overview--docs",children:"tab"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"key"})," attribute of ",e.jsx(n.code,{children:"sy-tab"})," has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"tabkey"})," as shown below:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<sy-tab-group active="0" align="left" position="top" type="line" size="medium" padding="medium">
  <div slot="tabs">
    <sy-tab tabkey="a1">Tab1</sy-tab>
    <sy-tab tabkey="a2">Tab2</sy-tab>
    <sy-tab tabkey="a3">Tab3</sy-tab>
  </div>
  <div slot="contents">
    <sy-tab-content name="a1">Content for Tab 1</sy-tab-content>
    <sy-tab-content name="a2">Content for Tab 2</sy-tab-content>
    <sy-tab-content name="a3">Content for Tab 3</sy-tab-content>
  </div>
</sy-tab-group>
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"triggerClosed()"})," function has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"setClose()"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"tag",children:e.jsx(n.a,{href:"/docs/tag-overview--docs",children:"tag"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"readonly"})," property has been ",e.jsx(n.strong,{children:"added"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"textarea",children:e.jsx(n.a,{href:"/docs/textarea-overview--docs",children:"textarea"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The existing ",e.jsx(n.code,{children:"blurred"})," event has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"blured"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"tooltip",children:e.jsx(n.a,{href:"/docs/tooltip-overview--docs",children:"tooltip"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opened"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"open"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"arrow"})," property has been ",e.jsx(n.strong,{children:"removed"}),". Arrow is visible as default."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"hideArrow"})," property has been ",e.jsx(n.strong,{children:"added"})," to control visbility of the arrow."]}),`
`]}),`
`,e.jsx(n.h3,{id:"tree",children:e.jsx(n.a,{href:"/docs/tree-overview--docs",children:"tree"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"iconFilled"})," has been ",e.jsx(n.strong,{children:"deprecated"})," from ",e.jsx(n.code,{children:"<sy-tree-item>"}),". A User can attach icon directly in the ",e.jsx(n.code,{children:"label"})," property with ",e.jsx(n.code,{children:"<sy-icon>"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," has been ",e.jsx(n.strong,{children:"deprecated"})," from ",e.jsx(n.code,{children:"<sy-tree-item>"}),". A User can attach icon directly in the ",e.jsx(n.code,{children:"label"})," property with ",e.jsx(n.code,{children:"<sy-icon>"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"tree-select",children:e.jsx(n.a,{href:"/docs/treeselect-overview--docs",children:"tree-select"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"error"})," property has been ",e.jsx(n.strong,{children:"renamed"})," to ",e.jsx(n.code,{children:"status"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"readonly"})," property has been ",e.jsx(n.strong,{children:"added"}),"."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"status"})," property can be set to 'error' or 'default'."]}),`
`]})]})}function h(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{h as default};
