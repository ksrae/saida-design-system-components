import { html } from 'lit';
import '../modeless.element';
import "./modeless.docs.scss";
import '../../button/button.element';
import '../../avatar/index';
import '../../checkbox/index';
import '../../dropdown/index';
import '../../menu/index';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface ModelessProps {
  open: boolean;
  draggable: boolean;
  resizable: boolean;
  maximum: boolean;
  minimum: boolean;
  closable: boolean;
  minimizable: boolean;
  maximizable: boolean;
  edge: boolean;
  top: number;
  left: number;
  width: number;
  height: number;
  slotTitle: any;
  slotContent: any;
  slotHeader: any;
  setClose?: () => any;
  setOpen?: () => void;
  setMaximum?: () => any;
  setMinimum?: () => any;
  setRestore?: () => any;
  position?: () => any;
  status?: () => any;
  closed?: () => any;
}

/**
 * Primary UI component for user interaction
 */
export const Modeless = ({ open, draggable, resizable, closable, minimizable, maximizable, maximum, minimum, edge, top, left, width, height, slotTitle, slotContent, slotHeader }: ModelessProps) => {
  return html`
  <sy-modeless
    ?open=${open}
    ?draggable=${draggable}
    ?resizable=${resizable}
    ?maximum=${maximum}
    ?minimum=${minimum}
    ?edge=${edge}
    ?closable=${closable}
    ?minimizable=${minimizable}
    ?maximizable=${maximizable}
    top=${ifDefined(top)}
    left=${ifDefined(left)}
    width=${ifDefined(width)}
    height=${ifDefined(height)}
  >
    <div slot="title">Modeless</div>
    <div slot="header"></div>
    <div slot="content">
      <div>This is modeless content.</div>
      <sy-checkbox id="chk">Checkbox 1</sy-checkbox>
      <sy-dropdown id="DropdownSelected">
        <span slot="title">Dropdown</span>
        <sy-menu>
          <sy-menu-item value="1">Item1</sy-menu-item>      
          <sy-menu-item value="2">Item2</sy-menu-item>
        </sy-menu>
      </sy-dropdown>
      <sy-button id="btn">BUTTON</sy-button>
    </div>
  </sy-modeless>

  <sy-button id="btnOpenModeless">Click to Open</sy-button>

  <script>
    (() => {
      const modeless = document.querySelector('sy-modeless');
      const btn = document.querySelector('#btnOpenModeless');
      const chk = document.querySelector('#chk');
      const btn2 = document.querySelector('#btn');
      let elem = document.querySelector('#DropdownSelected');  
      

      let handleSelected = (e) => {
        console.log(e.detail);
      };

      elem.addEventListener('selected', handleSelected);

      btn.addEventListener('click', () => {
        modeless.setOpen();
      });

      btn2.addEventListener('click', () => {
        console.log('btn2');
      });

      chk.addEventListener('changed', (event) => {
        console.log('Checkbox changed:', event.detail);
      });

    })();
  </script>
  `;
};

export const ModelessOpen = (args: {open: boolean}) => {
  return html`
  <sy-modeless ?open=${args.open}>
    <div slot="title">Modeless</div>
    <div slot="content">
      Modeless Content
      <sy-avatar-group 
        id="avatar-list"
        clickable
        maxCount="1">
        <sy-avatar image="avatar_default.png" tooltipContent="John Doe"></sy-avatar>
        <sy-avatar icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'><path fill='currentColor' d='M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z'/></svg>" tooltipContent="Home"></sy-avatar>
        <sy-avatar text="star" variant="red"></sy-avatar>
        <sy-avatar letter="AB" variant="purple"></sy-avatar>
      </sy-avatar-group>
    </div>
  </sy-modeless>
  `;
};

export const ModelessDraggable = (args: {draggable: boolean}) => {
  return html`
  <sy-modeless open ?draggable=${args.draggable}>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessResizable = (args: {resizable: boolean}) => {
  return html`
  <sy-modeless open ?resizable=${args.resizable}>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessMaximum = (args: {maximum: boolean}) => {
  return html`
  <sy-modeless open ?maximum=${args.maximum} maximizable>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessMinimum = (args: {minimum: boolean}) => {
  return html`
  <sy-modeless open ?minimum=${args.minimum} minimizable>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessEdge = (args: {edge: boolean}) => {
  return html`
  <sy-modeless open draggable resizable ?edge=${args.edge}>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessClosable = (args: {closable: boolean}) => {
  return html`
  <sy-modeless open ?closable=${args.closable}>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessMaximizable = (args: {maximizable: boolean}) => {
  return html`
  <sy-modeless open ?maximizable=${args.maximizable}>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessMinimizable = (args: {minimizable: boolean}) => {
  return html`
  <sy-modeless open ?minimizable=${args.minimizable}>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessPosition = (args: {top: number, left: number}) => {
  return html`
  <sy-modeless open top=${args.top} left=${args.left}>
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessSize = (args: {height: number, width: number}) => {
  return html`
  <sy-modeless open height=${args.height} width=${args.width} resizable top="0" left="0">
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  `;
};

export const ModelessCustomButtons = () => {
  return html`
  <sy-modeless open minimizable maximizable closable width="400">
    <div slot="title">Modeless</div>
    <div slot="header">
      <button id="btnCustom">Custom Button</button>
    </div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>
  <p id="customButtonResult"></p>

  <script>
    (() => {
      const modeless = document.querySelector('sy-modeless');
      const btnCustom = document.querySelector('#btnCustom');

      const customButtonResult = document.querySelector('#customButtonResult');
      btnCustom.addEventListener('click', () => {
        customButtonResult.innerHTML = 'Custom button clicked';

      });
    })();
  </script>
  `;
}

export const ModelessPositionEvent = () => {
  return html`
  <sy-modeless id="modelessPosition" open draggable resizable top="0" left="0">
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>

  <p id="modelessPositionResult"></p>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const modeless = document.getElementById('modelessPosition');
      const result = document.getElementById('modelessPositionResult');

      if (modeless) {
        modeless.addEventListener('position', (event) => {
          result.textContent = 'Top: ' + event.detail.position.top + ', Left: ' + event.detail.position.left + ', Width: ' + event.detail.position.width + ', Height: ' + event.detail.position.height;
        });
      }
    });
  </script>
  `;
};


export const ModelessStatusEvent = () => {
  return html`
  <sy-modeless id="modelessStatus" open minimizable maximizable top="0" left="0">
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>

  <p id="modelessStatusResult"></p>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const modeless = document.getElementById('modelessStatus');
      const result = document.getElementById('modelessStatusResult');

      if (modeless) {
        modeless.addEventListener('status', (event) => {
          result.textContent = 'Status: ' + event.detail.status;
        });
      }
    });
    </script>
  `;
};

export const ModelessClosed = () => {
  return html`
  <sy-modeless id="modelessClosed" open closable top="0" left="0">
    <div slot="title">Modeless</div>
    <div slot="content">Modeless Content</div>
  </sy-modeless>

  <p id="modelessClosedResult"></p>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const modeless = document.getElementById('modelessClosed');
      const result = document.getElementById('modelessClosedResult');

      if (modeless) {
        modeless.addEventListener('closed', () => {
          result.textContent = 'Modeless closed';
        });
      }
    });
  </script>
  `;
};