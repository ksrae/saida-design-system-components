import{x as r}from"./iframe-nFrKWBxN.js";import{o as s}from"./unsafe-html-13gMdR3O.js";const u=({checkable:e,open:n,position:t,trigger:i,slot:o})=>r`
  <style>
    .container {
      position: relative;
      padding: 4px 8px;
      width: fit-content;
      height: 32px;
      border: 1px solid rgba(0 0 0 / 0.24);
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      border-radius: 3px;
      box-sizing: border-box;
      cursor: pointer;
    }
  </style>

    <div class="container">
      <span>Menu</span>
      <sy-menu
        ?checkable=${e}
        ?open=${n}
        position=${t}
        trigger=${i}>
       ${s(o)}
    </sy-menu>
    </div>
  `,d=({disabled:e,open:n,menuSubTitle:t,slot:i})=>r`
    <style>
    .container {
      position: relative;
      padding: 4px 8px;
      width: fit-content;
      height: 32px;
      border: 1px solid rgba(0 0 0 / 0.24);
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      border-radius: 3px;
      box-sizing: border-box;
      cursor: pointer;
    }
  </style>
    <div class="container">
      <span>Sub Menu</span>
      <sy-menu>
        <sy-menu-sub ?disabled=${e} menuSubTitle=${t} ?open=${n}>
          ${s(i)}
        </sy-menu-sub>
      </sy-menu>
  </div>
  `,c=({menuGroupTitle:e,slot:n})=>r`
  <style>
    .container {
      position: relative;
      padding: 4px 8px;
      width: fit-content;
      height: 32px;
      border: 1px solid rgba(0 0 0 / 0.24);
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      border-radius: 3px;
      box-sizing: border-box;
      cursor: pointer;
    }
  </style>
    <div class="container">
      <span>Menu Group</span>
      <sy-menu>
        <sy-menu-group menuGroupTitle=${e}>
          ${s(n)}
        </sy-menu-group>
      </sy-menu>
    </div>
  `,l=({disabled:e,value:n,select:t,slot:i})=>r`
  <style>
    .container {
      position: relative;
      padding: 4px 8px;
      width: fit-content;
      height: 32px;
      border: 1px solid rgba(0 0 0 / 0.24);
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      border-radius: 3px;
      box-sizing: border-box;
      cursor: pointer;
    }
  </style>
    <div class="container">
      <span>Menu</span>
      <sy-menu>
        <sy-menu-item ?disabled=${e} value="${n}" ?select=${t}>
          ${s(i)}
        </sy-menu-item>
      </sy-menu>
    </div>
  `;export{c as M,l as a,d as b,u as c};
