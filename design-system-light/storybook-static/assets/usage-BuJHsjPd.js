import{j as e,M as r,C as l}from"./blocks-Q9nwDdg9.js";import{useMDXComponents as i}from"./index-DejdW_EF.js";import{U as c,P as o}from"./usage.stories-Bceu8Car.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nFrKWBxN.js";import"./index-BdigElPL.js";const d=""+new URL("angular-CLCpOEHj.png",import.meta.url).href,a=""+new URL("react-6Pjw7dvo.png",import.meta.url).href,h=""+new URL("vue-CL0p0rVx.png",import.meta.url).href,p=""+new URL("vanilla-JC0GDbDM.png",import.meta.url).href;function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx("div",{className:"story-control",children:e.jsx(l,{of:o})}),`
`,e.jsx(n.h1,{id:"design-system-usage-guide",children:"Design System Usage Guide"}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:["This guide explains how to use our web components across various frameworks including ",e.jsx("b",{children:"Angular, Vue, React, and Vanilla JS"})," after installing the dc library as node modules."]}),`
`,e.jsx(n.h3,{id:"-frameworks",children:"🚀 Frameworks"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#angular",children:"Angular"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#react",children:"React"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#vue",children:"Vue"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#vanilla-js",children:"Vanilla JS"})}),`
`]}),`
`,e.jsx(n.h3,{id:"-cherry-picking",children:"🍒 Cherry Picking"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#cherry-picking",children:"Cherry Picking Components"})}),`
`]}),`
`,e.jsx(n.h3,{id:"-design-system-tokens",children:"🎨 Design System Tokens"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#use-the-token-of-the-design-system",children:"Using Design System Tokens"})}),`
`]}),`
`,e.jsxs("div",{className:"title",children:[e.jsx("img",{src:d,alt:"angular"}),e.jsx(n.h2,{id:"angular",children:"Angular"})]}),`
`,e.jsx(n.h3,{id:"step-1-script-configuration",children:"Step 1: Script Configuration"}),`
`,e.jsxs(n.p,{children:["Add the following script configuration to your ",e.jsx(n.code,{children:"angular.json"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "scripts": ["@dc/design-system-core/dist/sy-components.es.js"]
}
`})}),`
`,e.jsx(n.h3,{id:"step-2-style-sheet-configuration",children:"Step 2: Style Sheet Configuration"}),`
`,e.jsx(n.p,{children:"To handle SCSS files in your project, first install the SASS package:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install sass
`})}),`
`,e.jsx(n.h4,{id:"current-method-will-be-deprecated",children:"Current Method (will be deprecated)"}),`
`,e.jsxs(n.p,{children:["Import ",e.jsx(n.code,{children:"sy-styles.css"})," files into your style.scss file."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@import '@dc/design-system-core/dist/sy-styles.css';
`})}),`
`,e.jsx(n.p,{children:"If you encounter a warning like the one below, it is recommended to replace the deprecated @import statements with @use"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`▲ [WARNING] Deprecation [plugin angular-sass]

    src/styles.scss:2:8:
      2 │ @import "@dc/design-system-core/dist/style/sy-styles.scss";
        ╵         ^

  Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.

  More info and automated migrator: https://sass-lang.com/d/import

  The plugin "angular-sass" was triggered by this import

    angular:styles/global:styles:1:8:
      1 │ @import 'src/styles.scss';
        ╵         ~~~~~~~~~~~~~~~~~
`})}),`
`,e.jsx(n.h4,{id:"recommended-solution",children:"Recommended Solution"}),`
`,e.jsxs(n.p,{children:["Replace the deprecated ",e.jsx(n.code,{children:"@import"})," statements with ",e.jsx(n.code,{children:"@use"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@use "@dc/design-system-core/dist/sy-styles.css" as systyle;
`})}),`
`,e.jsx(n.h4,{id:"note",children:"Note"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"@use"})," rule is supported in Sass versions 1.23.0 and later"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@import"})," will be deprecated in Dart Sass 3.0.0"]}),`
`]}),`
`,e.jsx(n.h3,{id:"step-3-theme-configuration",children:"Step 3: Theme Configuration"}),`
`,e.jsxs(n.p,{children:["To set the theme, add sy-theme class to the body tag in your ",e.jsx(n.code,{children:"index.html"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body class="sy-theme sy-theme-light">
`})}),`
`,e.jsxs(n.p,{children:["Detailed theme configuration can be found in the ",e.jsx(n.a,{href:"/docs/theme-guide--docs",children:"Theme Guide"})," page."]}),`
`,e.jsx(n.h3,{id:"step-4-schema-configuration",children:"Step 4: Schema Configuration"}),`
`,e.jsxs(n.p,{children:["Import ",e.jsx(n.code,{children:"CUSTOM_ELEMENTS_SCHEMA"})," in your ",e.jsx(n.code,{children:"app.component.ts"})," (for standalone components):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
`})}),`
`,e.jsx(n.h3,{id:"step-5-dataproperty-binding--event-handling",children:"Step 5: Data/Property binding & Event Handling."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// app.component.ts
export class AppComponent {
  autoArray: String[] = ["item1", "item2", "item3"];

  handleClick(e: any) {
    console.log('click', e)
  }

  handleSelect(e: any) {
    console.log('selected', e);
  }
}

// app.component.html
<sy-button (click)="handleClick($event)" variant="secondary"></sy-button>
<sy-autocomplete (selected)="handleSelect($event)" [source]="autoArray"></sy-autocomplete>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// app.component.ts
  autoArray: String[] = ["item1", "item2", "item3"];
 
// app.component.html
<sy-autocomplete (selected)="handleSelect($event)" [source]="autoArray"></sy-autocomplete>
`})}),`
`,e.jsxs("div",{className:"title",children:[e.jsx("img",{src:a,alt:"react"}),e.jsx(n.h2,{id:"react",children:"React"})]}),`
`,e.jsx(n.h3,{id:"step-1-import-library",children:"Step 1: Import Library"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// App.js
import '@dc/design-system-core/dist/sy-components.es.js';
`})}),`
`,e.jsx(n.h3,{id:"step-2-style-sheet-configuration-1",children:"Step 2: Style Sheet Configuration"}),`
`,e.jsx(n.p,{children:"To handle SCSS files in your project, first install the SASS package:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install sass
`})}),`
`,e.jsx(n.h4,{id:"current-method-will-be-deprecated-1",children:"Current Method (will be deprecated)"}),`
`,e.jsxs(n.p,{children:["Import sy-styles.css files into your ",e.jsx(n.code,{children:"App.scss"})," file."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@import '@dc/design-system-core/dist/sy-styles.css';
`})}),`
`,e.jsx(n.h4,{id:"recommended-solution-1",children:"Recommended Solution"}),`
`,e.jsxs(n.p,{children:["Replace the deprecated ",e.jsx(n.code,{children:"@import"})," statements with ",e.jsx(n.code,{children:"@use"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@use "@dc/design-system-core/dist/sy-styles.css" as systyle;
`})}),`
`,e.jsx(n.h4,{id:"note-1",children:"Note"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"@use"})," rule is supported in Sass versions 1.23.0 and later"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@import"})," will be deprecated in Dart Sass 3.0.0"]}),`
`]}),`
`,e.jsx(n.h3,{id:"step-3-theme-configuration-1",children:"Step 3: Theme Configuration"}),`
`,e.jsxs(n.p,{children:["To set the theme, add sy-theme class to the body tag in your ",e.jsx(n.code,{children:"index.html"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body class="sy-theme sy-theme-light">
`})}),`
`,e.jsxs(n.p,{children:["Detailed theme configuration can be found in the ",e.jsx(n.a,{href:"/docs/theme-guide--docs",children:"Theme Guide"})," page."]}),`
`,e.jsx(n.h3,{id:"step-4-dataproperty-binding--event-handling",children:"Step 4: Data/Property binding & Event Handling."}),`
`,e.jsxs(n.p,{children:[`Bind properties as you would bind state in React.
Use curly braces `," to bind variable values to synergy attributes in React."]}),`
`,e.jsx(n.p,{children:"For complex property assignments, it is recommended to use useEffect."}),`
`,e.jsxs(n.p,{children:[`Unlike Vue and Angular, React uses synthetic events.
To handle custom events emitted by web components, you need to use `,e.jsx(n.code,{children:"addEventListener"})," to directly access the DOM elements."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import '@dc/design-system-core/dist/sy-components.es.js';
import { useEffect } from 'react'
function App() {

  const autocompleteRefs = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
  const button = buttonRef.current;
    if (button) {
      const handleButtonClick = (event) => {
        console.log('Button clicked:', event);
      };
      button.addEventListener('click', handleButtonClick);

      return () => {
        button.removeEventListener('click', handleButtonClick);
      };
    }}, []);

  useEffect(() => {
    autocompleteRefs.current.source = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  }, []);

  return (
    <div className="App">
      <sy-button ref={buttonRef}>Button</sy-button>
      <sy-input-number decimalplaces={0} rounding="round" value={10.5}></sy-input-number>
      <sy-autocomplete ref={autocompleteRef}></sy-autocomplete>
    </div>
  )
}

export default App;
`})}),`
`,e.jsxs("div",{className:"title",children:[e.jsx("img",{src:h,alt:"vue"}),e.jsx(n.h2,{id:"vue",children:"Vue"})]}),`
`,e.jsx(n.h3,{id:"step-1-import-library-1",children:"Step 1: Import Library"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`//App.vue
<script setup>
import '@dc/design-system-core/dist/sy-components.es.js';

<\/script>

`})}),`
`,e.jsx(n.h3,{id:"step-2-style-sheet-configuration-2",children:"Step 2: Style Sheet Configuration"}),`
`,e.jsx(n.h4,{id:"current-method-will-be-deprecated-2",children:"Current Method (will be deprecated)"}),`
`,e.jsxs(n.p,{children:["Import sy-styles.css files into your ",e.jsx(n.code,{children:"main.css"})," file."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@import '@dc/design-system-core/dist/sy-styles.css';
`})}),`
`,e.jsx(n.h3,{id:"step-3-theme-configuration-2",children:"Step 3: Theme Configuration"}),`
`,e.jsxs(n.p,{children:["To set the theme, add sy-theme class to the body tag in your ",e.jsx(n.code,{children:"index.html"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body class="sy-theme sy-theme-light">
`})}),`
`,e.jsxs(n.p,{children:["Detailed theme configuration can be found in the ",e.jsx(n.a,{href:"/docs/theme-guide--docs",children:"Theme Guide"})," page."]}),`
`,e.jsx(n.h3,{id:"step-4-dataproperty-binding--event-handling-1",children:"Step 4:. Data/Property binding & Event Handling."}),`
`,e.jsxs(n.p,{children:[`Use v-bind: to handle props binding.
Use v-on:[EventName] to handle events from dc-library. `,e.jsx("br",{}),`
You can receive and handle events from web component, including custom events directly.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`
function handleClick(e) {
  console.log(e,'click'); 
}

function handleSelected(e) {
  console.log(e,'selected');
}

<template>
  <sy-button v-on:click="handleClick" variant="secondary">Vue</sy-button>
  <sy-autocomplete :source="['item1','item2']" v-on:selected="handleSelected"></sy-autocomplete>
  <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg></sy-icon>
</template>

`})}),`
`,e.jsxs("div",{className:"title",children:[e.jsx("img",{src:p,alt:"vanilla"}),e.jsx(n.h2,{id:"vanilla-js",children:"Vanilla Js"})]}),`
`,e.jsx(n.h3,{id:"step-1-html-configuration",children:"Step 1: HTML Configuration"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>My Node.js Server</title>
   <link href="node_modules/@dc/design-system-core/dist/sy-styles.css" rel="stylesheet" />
</head>
<body class="sy-theme sy-theme-light sy-theme-default sy-appname">
    <script type="module" src="node_modules/@dc/design-system-core/dist/sy-components.es.js"><\/script>
</body>
</html>
`})}),`
`,e.jsxs(n.p,{children:[`If the test environment is not a web server and testing on web browser only.
Copy the `,e.jsx(n.code,{children:"sy-components.es.js"})," and ",e.jsx(n.code,{children:"sy-styles.css"})," files from the ",e.jsx(n.code,{children:"node_modules/@dc/design-system-core/dist/"})," directory to ",e.jsx(n.code,{children:"public"}),` directory of the project.
and change the script and link tags in the HTML file to point to the copied files:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link href="./sy-styles.css" rel="stylesheet" />
<script type="module" src="./sy-components.es.js"><\/script>
`})}),`
`,e.jsx(n.p,{children:"It is becasuse the browser does not allow to load modules from local file system."}),`
`,e.jsx(n.h3,{id:"step-2-server-setup",children:"Step 2: Server Setup"}),`
`,e.jsxs(n.p,{children:["Install Express: ",e.jsx(n.code,{children:"npm install express"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; 

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(\`server is running on http://localhost:\${PORT}.\`);
});
`})}),`
`,e.jsx(n.h3,{id:"step-3-dataproperty-binding--event-handling",children:"Step 3: Data/Property binding & Event Handling."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script>
  const btn = document.querySelector('sy-button');
  btn.addEventListener('click', (e) => console.log('click!',e));

  const autoComplete = document.querySelector('sy-autocomplete');
  autoComplete.addEventListener('selected', (e) => console.log('selected', e));
<\/script>
`})}),`
`,e.jsx(n.h2,{id:"cherry-picking",children:"Cherry Picking"}),`
`,e.jsxs(n.p,{children:["We offer both loading all components at once via ",e.jsx(n.code,{children:"@dc/design-system-core/dist/sy-components.es.js"})," ",e.jsx(n.strong,{children:"and"}),` cherry-picking to import only the components you need.
Cherry-picking components reduces bundle size, improves loading speed, optimizes network usage, eliminates unused code, and lowers memory consumption.`]}),`
`,e.jsxs(n.p,{children:["You need to import all required components. For example, ",e.jsx(n.code,{children:"sy-dropdown"})," includes ",e.jsx(n.code,{children:"sy-menu"}),", so to use the dropdown component, you should import them as shown below."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import '@dc/design-system-core/dist/components/dropdown';
import '@dc/design-system-core/dist/components/menu';

`})}),`
`,e.jsx(n.h2,{id:"use-the-token-of-the-design-system",children:"Use the token of the Design System"}),`
`,e.jsxs(n.h3,{id:"step-1-import-globalscss",children:["Step 1: Import ",e.jsx(n.code,{children:"global.scss"})]}),`
`,e.jsxs(n.p,{children:["To import ",e.jsx(n.code,{children:"global.scss"})," file to use the Design System tokens, importing ",e.jsx(n.code,{children:"sy-styles.css"}),` file is required.
Please make sure `,e.jsx(n.code,{children:"sy-styles.css"})," file is imported in the project."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" href="@dc/design-system-core/dist/sy-styles.css">
`})}),`
`,e.jsxs(n.h3,{id:"step-2-import-globalscss-file",children:["Step 2: Import ",e.jsx(n.code,{children:"global.scss"})," file"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@import '@dc/design-system-core/dist/style/global.scss';
`})}),`
`,e.jsx(n.p,{children:"or use @use"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@use '@dc/design-system-core/dist/style/global.scss' as globalstyle;
`})}),`
`,e.jsx(n.h3,{id:"step-3-use-the-token-in-your-styles",children:"Step 3: Use the token in your styles"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@use '@dc/design-system-core/dist/style/global.scss' as globalstyle;
.my-component {
  color: globalstyle.$color-primary;
  background-color: globalstyle.$background-secondary;
}
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
    margin-top: 100px;
  }

  .title h2{
    border-bottom: none !important;
  }

  .title img {
    height: 35px;
    width: auto;
    padding-top: 20px;
  }

  #note, #note-1, #note-2 {
    color: var(--background-error-contrast-bold);
  }

`})]})}function f(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{f as default};
