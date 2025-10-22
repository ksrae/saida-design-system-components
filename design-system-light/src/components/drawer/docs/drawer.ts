import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../drawer.element';
import '../../button/button.element';

export interface DrawerProps {
  closable: boolean;
  customSize: number;
  maskless: boolean;
  preventClose: boolean;
  open: boolean;
  position: 'top' | 'left' | 'right' | 'bottom';
  size: 'small' | 'medium' | 'large' | 'custom';
  slotHeaderContent: any;
  slotBodyContent: any;
  slotFooterContent: any;
  opened?: () => any;
  closed?: () => any;
}
/**
 * Primary UI component for user interaction
 */
export const Drawer = ({ closable, customSize, maskless, preventClose, open, position, size, slotHeaderContent, slotBodyContent, slotFooterContent}: DrawerProps) => {
  return html`
	<sy-drawer
    ?closable=${closable}
    customSize=${customSize}
    ?maskless=${maskless}
    ?preventClose=${preventClose}
    ?open=${open}
    position=${position}
    size=${size}>
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
};

export const DrawerClosable = (args: {closable: boolean}) => {
  return html`
  <sy-drawer ?closable=${args.closable} id="drawerClosable">
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerClosable');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
}


export const DrawerCustomSize = (args: {customSize: number}) => {
  return html`
  <sy-drawer customSize=${args.customSize} size="custom" closable id="drawerCustomSize">
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerCustomSize');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
}

export const DrawerMaskless = (args: {maskless: boolean}) => {
  return html`
  <sy-drawer ?maskless=${args.maskless} closable id="drawerMaskless">
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerMaskless');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
}

export const DrawerPreventClose = (args: {preventClose: boolean}) => {
  return html`
  <sy-drawer ?preventClose=${args.preventClose} id="drawerPreventClose">
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerPreventClose');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
}

export const DrawerOpen = (args: {open: boolean}) => {
  return html`
  <sy-drawer ?open=${args.open} closable>
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>
  `;
}

export const DrawerPosition = (args: {position: 'top' | 'left' | 'right' | 'bottom'}) => {
  return html`
  <sy-drawer position=${args.position} closable id="drawerPosition">
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerPosition');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
}

export const DrawerSize = (args: {size: 'small' | 'medium' | 'large' | 'custom', customSize: number}) => {
  return html`
  <sy-drawer size=${args.size} customSize=${args.customSize} closable id="drawerSize">
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>

  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerSize');
      const btn = document.querySelector('#btnOpenDrawer');

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
}


export const DrawerOpened = () => {
  return html`
  <sy-drawer id="drawerOpened">
    <span slot="header">Header</span>
    <span slot="body">Body</span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>
  <p id="drawerOpenedResult"></p>
  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerOpened');
      const btn = document.querySelector('#btnOpenDrawer');
      const result = document.querySelector('#drawerOpenedResult');

      drawer.addEventListener('opened', () => {
        result.innerText = 'Drawer opened';
      });

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
    })();
  </script>
  `;
}

export const DrawerClosed = () => {
  return html`
  <sy-drawer id="drawerClosed">
    <span slot="header">Header</span>
    <span slot="body">
      Body
      <sy-button id="btnDrawerClosed">Close this drawer</sy-button>
    </span>
    <span slot="footer">Footer</span>
  </sy-drawer>

  <sy-button id="btnOpenDrawer">Click to Open</sy-button>
  <p id="drawerClosedResult"></p>
  <script>
    (() => {
      const drawer = document.querySelector('sy-drawer#drawerClosed');
      const btn = document.querySelector('#btnOpenDrawer');
      const btnClose = document.querySelector('#btnDrawerClosed');
      const result = document.querySelector('#drawerClosedResult');

      drawer.addEventListener('opened', () => {
        result.innerText = 'Drawer opened';
      });

      drawer.addEventListener('closed', () => {
        result.innerText = 'Drawer closed';
      });

      btn.addEventListener('click', () => {
        drawer.open = true;
      });
      btnClose.addEventListener('click', () => {
        drawer.open = false;
      });
    })();
  </script>
  `;
}