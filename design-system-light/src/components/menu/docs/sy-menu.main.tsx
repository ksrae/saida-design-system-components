import { html } from "lit";
import { Components } from '../../../components';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface SyMenuProps extends Components.SyMenu {
  slot?: any;
  opened?: (event: CustomEvent<boolean>) => void;
  itemSelected?: (event: CustomEvent<any>) => void;
  itemChecked?: (event: CustomEvent<any>) => void;
}

export interface SyMenuItemProps extends Components.SyMenuItem {
  slot?: any;
}

export interface SyMenuSubProps extends Components.SyMenuSub {
  slot?: any;
}

export interface SyMenuGroupProps extends Components.SyMenuGroup {
  slot?: any;
}

export const Menu = ({ checkable, open, position, trigger, slot }: SyMenuProps) => {
  return html`
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
        ?checkable=${checkable}
        ?open=${open}
        position=${position}
        trigger=${trigger}>
       ${unsafeHTML(slot)}
    </sy-menu>
    </div>
  `;
};


export const MenuSub = ({ disabled, open, menuSubTitle, slot }: SyMenuSubProps) => {
  return html`
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
        <sy-menu-sub ?disabled=${disabled} menuSubTitle=${menuSubTitle} ?open=${open}>
          ${unsafeHTML(slot)}
        </sy-menu-sub>
      </sy-menu>
  </div>
  `;
};

export const MenuGroup = ({menuGroupTitle, slot}: SyMenuGroupProps) => {
  return html`
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
        <sy-menu-group menuGroupTitle=${menuGroupTitle}>
          ${unsafeHTML(slot)}
        </sy-menu-group>
      </sy-menu>
    </div>
  `;
};

export const MenuItem = ({ disabled, value, select, slot }: SyMenuItemProps) => {
  return html`
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
        <sy-menu-item ?disabled=${disabled} value="${value}" ?select=${select}>
          ${unsafeHTML(slot)}
        </sy-menu-item>
      </sy-menu>
    </div>
  `;
};

export const MenuCheckable = (args: {checkable: boolean}) => {
  return html`
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
      <sy-menu trigger="click" ?checkable=${args.checkable}>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>
  `;
};

export const MenuOpen = (args: {open: boolean}) => {
  return html`
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
      <sy-menu ?open=${args.open}>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>
  `;
};


export const MenuOpened = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('menuOpenedResult');
    if (out) out.textContent = (e as CustomEvent).detail ? 'Menu is opened' : 'Menu is closed';
  };
  return html`
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
      <sy-menu @opened=${handle}>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>
    <p id="menuOpenedResult">(idle)</p>
  `;
};

export const MenuPosition = (args: {position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"}) => {
  return html`
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
    <sy-menu position=${args.position}>
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
      <sy-menu-item value="3">Item3</sy-menu-item>
    </sy-menu>
  </div>
  `;
};

export const MenuTrigger = (args: {trigger: "hover" | "click" | "contextmenu"}) => {
  return html`
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
        <sy-menu trigger=${args.trigger}>
          <sy-menu-sub title="MenuSub">
            <sy-menu-item value="3">Item3</sy-menu-item>
            <sy-menu-item value="4">Item4</sy-menu-item>
          </sy-menu-sub>
          <sy-menu-item value="1">Item1</sy-menu-item>
          <sy-menu-item value="2">Item2</sy-menu-item>
        </sy-menu>
    </div>
  `;
};

export const SubMenu = () => {
  return html`
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
        <sy-menu-sub title="MenuSub1">
          <sy-menu-item value="1">Item1</sy-menu-item>
          <sy-menu-item value="2">Item2</sy-menu-item>
        </sy-menu-sub>
        <sy-menu-sub title="MenuSub2">
          <sy-menu-item value="3">Item3</sy-menu-item>
          <sy-menu-item value="4">Item4</sy-menu-item>
        </sy-menu-sub>
      </sy-menu>
    </div>
  `;
};

export const GroupMenu = (args: {title: string}) => {
  return html`
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
        <sy-menu-group title=${args.title}>
          <sy-menu-item value="1">Item1</sy-menu-item>
          <sy-menu-item value="2">Item2</sy-menu-item>
        </sy-menu-group>
      </sy-menu>
    </div>
  `;
};

export const MenuSubDisabled = (args: {disabled: boolean}) => {
  return html`
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
        <sy-menu-sub ?disabled=${args.disabled} title="MenuSub">
          <sy-menu-item value="1">Item1</sy-menu-item>
          <sy-menu-item value="2">Item2</sy-menu-item>
        </sy-menu-sub>
      </sy-menu>
    </div>
  `;
};

export const MenuSubOpen = (args: {open: boolean}) => {
  return html`
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
      <sy-menu ?open=${args.open}>
        <sy-menu-sub open title="Navigation Submenu">
          <sy-menu-group title="Group actions">
            <sy-menu-item value="1">Item1</sy-menu-item>
            <sy-menu-item value="2">Item2</sy-menu-item>
          </sy-menu-group>
        </sy-menu-sub>
      </sy-menu>
    </div>
  `;
};

export const MenuItemDisabled = (args: {disabled: boolean}) => {
  return html`
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
        <sy-menu-item ?disabled=${args.disabled} value="1">Item1</sy-menu-item>
      </sy-menu>
    </div>
  `;
};

// export const MenuItemSelect = (args: {select: boolean}) => {
//   return html`
//   <style>
//     .container {
//       position: relative;
//       padding: 4px 8px;
//       width: fit-content;
//       height: 32px;
//       border: 1px solid rgba(0 0 0 / 0.24);
//       display: flex;
//       align-items: center;
//       text-align: center;
//       justify-content: center;
//       border-radius: 3px;
//       box-sizing: border-box;
//       cursor: pointer;
//     }
//   </style>
//     <div class="container">
//       <span>Menu</span>
//       <sy-menu>
//         <sy-menu-item ?select=${args.select} value="1">Item1</sy-menu-item>
//       </sy-menu>
//     </div>
//   `;
// };

export const MenuItemChecked = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('menuItemCheckedResult');
    const detail = (e as CustomEvent).detail ?? {};
    if (out) out.textContent = `Item: ${JSON.stringify(detail)} is ${detail.checked ? 'checked' : 'unchecked'}`;
  };
  return html`
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
      <sy-menu checkable @itemChecked=${handle}>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>
    <p id="menuItemCheckedResult">(idle)</p>
  `;
};


export const MenuItemSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('menuItemSelectedResult');
    if (out) out.textContent = `Item: ${JSON.stringify((e as CustomEvent).detail)} is selected`;
  };
  return html`
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
      <sy-menu @itemSelected=${handle}>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>
    <p id="menuItemSelectedResult">(idle)</p>
  `;
};

const wrapperStyle = `
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
`;

export const MenuDisabled = (args: { disabled: boolean }) => html`
  ${unsafeHTML(wrapperStyle)}
  <div class="container">
    <span>Menu</span>
    <sy-menu ?disabled=${args.disabled} trigger="click">
      <sy-menu-item value="1">Item1</sy-menu-item>
      <sy-menu-item value="2">Item2</sy-menu-item>
    </sy-menu>
  </div>
`;

export const MenuDirection = (args: { direction: 'left' | 'right' }) => html`
  ${unsafeHTML(wrapperStyle)}
  <div class="container">
    <span>Menu</span>
    <sy-menu trigger="click" direction=${args.direction}>
      <sy-menu-sub menuSubTitle="Submenu">
        <sy-menu-item value="1">Item 1</sy-menu-item>
        <sy-menu-item value="2">Item 2</sy-menu-item>
      </sy-menu-sub>
      <sy-menu-item value="3">Item 3</sy-menu-item>
    </sy-menu>
  </div>
`;

export const MenuLoading = (args: { loading: boolean }) => html`
  ${unsafeHTML(wrapperStyle)}
  <div class="container">
    <span>Menu</span>
    <sy-menu trigger="click" open ?loading=${args.loading}>
      <sy-menu-item value="1">Item 1</sy-menu-item>
      <sy-menu-item value="2">Item 2</sy-menu-item>
    </sy-menu>
  </div>
`;

