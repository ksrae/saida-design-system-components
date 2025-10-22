import { html } from "lit";
import "../menu.element";
import "../menu-sub.element";
import "../menu-group.element";
import "../menu-item.element";
import '../../input/index';

export interface MenuProps {
  // mode: 'inline' | 'vertical';
  checkable: boolean;
  open: boolean;
  // opendelay: number;
  // closedelay: number;
  position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  // position: 'right' | 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
  trigger: "hover" | "click" | "contextmenu";
  slotContent: any;
  itemSelected?: () => any;
  itemChecked?: () => any;
  opened?: () => any;
}

export interface MenuSubProps {
  title: string;
  open: boolean;
  disabled: boolean;
  slotContent: any;
}

export interface MenuGroupProps {
  title: string;
  slotContent: any;
}

export interface MenuItemProps {
  value: string;
  disabled: boolean;
  select: boolean;
  slotContent: any;
}

/**
 * Primary UI component for user interaction
 */
export const Menu = ({ checkable, open, position, trigger, slotContent }: MenuProps) => {
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
        <sy-menu-sub title="sub menu">
          <sy-menu-group title="Group">
            <sy-menu-item value="2">Item2</sy-menu-item>
            <sy-menu-item value="3">Item3</sy-menu-item>
          </sy-menu-group>
          <sy-menu-item value="4">Item4</sy-menu-item>
        </sy-menu-sub>
        <sy-menu-sub title='sub menu with icon <sy-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"></path></svg></sy-icon>'>
          <sy-menu-item value="6">Item6</sy-menu-item>
          <sy-menu-item value="7">Item7</sy-menu-item>
        </sy-menu-sub>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="5">Item5</sy-menu-item>
    </sy-menu>
    </div>
  `;
};

export const MenuSub = ({ disabled, open, title, slotContent }: MenuSubProps) => {
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
        <sy-menu-sub ?disabled=${disabled} title=${title} ?open=${open}>
          <sy-menu-item value="1">Item1</sy-menu-item>
          <sy-menu-item value="2">Item2</sy-menu-item>
        </sy-menu-sub>
      </sy-menu>
  </div>
  `;
};

export const MenuGroup = ({title, slotContent}: MenuGroupProps) => {
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
        <sy-menu-group title=${title}>
          <sy-menu-item value="1">Item1</sy-menu-item>
          <sy-menu-item value="2">Item2</sy-menu-item>
        </sy-menu-group>
      </sy-menu>
    </div>
  `;
};

export const MenuItem = ({ disabled, value, select, slotContent }: MenuItemProps) => {
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
          <span>Item1</span>
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
      <sy-menu id="menuOpened">
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>

    <p id="menuOpenedResult"></p>

    <script>
      (() => {
        const menu = document.querySelector('#menuOpened');
        const result = document.querySelector('#menuOpenedResult');

        menu.addEventListener('opened', (e) => {
          if(e.detail) {
            result.textContent = 'Menu is opened';
          } else {
            result.textContent = 'Menu is closed';
          }
          
        });
      })();
    </script>
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
        <sy-menu-sub open title='NavSub with icon <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M466.6 114.2C461.2 115.9 455.3 116 450.4 113.3C444.6 110.1 438.6 107.1 432.6 104.4C422.2 99.7 418.9 86.1 428.5 79.8C443.5 69.9 461.5 64.1 480.8 64.1C533.4 64.1 576 106.7 576 159.3C576 172.5 573.3 185.1 568.4 196.6C563.9 207.1 550 206.4 543.5 197C539.7 191.5 535.7 186.2 531.5 181C528 176.6 527 170.8 527.7 165.2C527.9 163.3 528.1 161.3 528.1 159.3C528.1 133.2 506.9 112.1 480.9 112.1C476 112.1 471.2 112.9 466.7 114.3zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C201.3 107.1 195.4 110 189.6 113.2C184.7 115.9 178.7 115.8 173.4 114.1C168.9 112.7 164.2 111.9 159.2 111.9C133.1 111.9 112 133.1 112 159.1C112 161.1 112.1 163.1 112.4 165C113.1 170.6 112.1 176.4 108.6 180.8C104.4 186 100.4 191.3 96.6 196.8zM496 352C496 254.8 417.2 176 320 176C222.8 176 144 254.8 144 352C144 449.2 222.8 528 320 528C417.2 528 496 449.2 496 352zM460.5 526.5C422.1 557.4 373.2 576 320 576C266.8 576 217.9 557.4 179.5 526.5L137 569C127.6 578.4 112.4 578.4 103.1 569C93.8 559.6 93.7 544.4 103.1 535.1L145.6 492.6C114.6 454.1 96 405.2 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 405.2 525.4 454.1 494.5 492.5L537 535C546.4 544.4 546.4 559.6 537 568.9C527.6 578.2 512.4 578.3 503.1 568.9L460.6 526.4zM344 248L344 342.1L385 383.1C394.4 392.5 394.4 407.7 385 417C375.6 426.3 360.4 426.4 351.1 417L303.1 369C298.6 364.5 296.1 358.4 296.1 352L296.1 248C296.1 234.7 306.8 224 320.1 224C333.4 224 344.1 234.7 344.1 248z"></path></svg></sy-icon>'>
          <sy-menu-group title='Group<sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M466.6 114.2C461.2 115.9 455.3 116 450.4 113.3C444.6 110.1 438.6 107.1 432.6 104.4C422.2 99.7 418.9 86.1 428.5 79.8C443.5 69.9 461.5 64.1 480.8 64.1C533.4 64.1 576 106.7 576 159.3C576 172.5 573.3 185.1 568.4 196.6C563.9 207.1 550 206.4 543.5 197C539.7 191.5 535.7 186.2 531.5 181C528 176.6 527 170.8 527.7 165.2C527.9 163.3 528.1 161.3 528.1 159.3C528.1 133.2 506.9 112.1 480.9 112.1C476 112.1 471.2 112.9 466.7 114.3zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C201.3 107.1 195.4 110 189.6 113.2C184.7 115.9 178.7 115.8 173.4 114.1C168.9 112.7 164.2 111.9 159.2 111.9C133.1 111.9 112 133.1 112 159.1C112 161.1 112.1 163.1 112.4 165C113.1 170.6 112.1 176.4 108.6 180.8C104.4 186 100.4 191.3 96.6 196.8zM496 352C496 254.8 417.2 176 320 176C222.8 176 144 254.8 144 352C144 449.2 222.8 528 320 528C417.2 528 496 449.2 496 352zM460.5 526.5C422.1 557.4 373.2 576 320 576C266.8 576 217.9 557.4 179.5 526.5L137 569C127.6 578.4 112.4 578.4 103.1 569C93.8 559.6 93.7 544.4 103.1 535.1L145.6 492.6C114.6 454.1 96 405.2 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 405.2 525.4 454.1 494.5 492.5L537 535C546.4 544.4 546.4 559.6 537 568.9C527.6 578.2 512.4 578.3 503.1 568.9L460.6 526.4zM344 248L344 342.1L385 383.1C394.4 392.5 394.4 407.7 385 417C375.6 426.3 360.4 426.4 351.1 417L303.1 369C298.6 364.5 296.1 358.4 296.1 352L296.1 248C296.1 234.7 306.8 224 320.1 224C333.4 224 344.1 234.7 344.1 248z"></path></svg></sy-icon>'>
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
      <sy-menu id="menuItemChecked" checkable>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>

    <p id="menuItemCheckedResult"></p>

    <script>
      (() => {
        let elem = document.querySelector("#menuItemChecked");
        let result = document.querySelector("#menuItemCheckedResult");

        let handleChecked = (e) => {
          const item = JSON.stringify(e.detail);
          const checked = e.detail.checked ? 'checked' : 'unchecked';
          result.textContent = "Item: " + item + " is " + checked;
        };

        elem.addEventListener("itemChecked", handleChecked);

        // this is for release click event. It is recommanded for optimization.
        window.addEventListener("beforeunload", () => {
          elem.removeEventListener("itemChecked", handleChecked);
        });
      })();
    </script>`;
};


export const MenuItemSelected = () => {
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
      <sy-menu id="menuItemSelected">
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
    </div>
    <p id="menuItemSelectedResult"></p>

    <script>
      (() => {
        let elem = document.querySelector("#menuItemSelected");
        let result = document.querySelector("#menuItemSelectedResult");

        let handleSelected = (e) => {
          const item = JSON.stringify(e.detail);
          result.textContent = "Item: " + item + " is selected";
        };

        elem.addEventListener("itemSelected", handleSelected);

        // this is for release click event. It is recommanded for optimization.
        window.addEventListener("beforeunload", () => {
          elem.removeEventListener("itemSelected", handleSelected);
        });
      })();
    </script>`;
};
