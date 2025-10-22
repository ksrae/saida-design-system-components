import { html } from 'lit';
import '../tab-content.element';
import '../tab-group.element';
import '../tab.element';
import '../../modal/modal.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface TabProps {
  closable: boolean;
  disabled: boolean;
  manualClose: boolean;
  tabkey: string;
  slotContent: any;
  setClose?: (isForce: boolean) => void;
}

export const Tab = ({ closable, disabled, manualClose, tabkey, slotContent }: TabProps) => {
  return html`
  <div class="tab-wrapper">
    <sy-tab-group type="line">
      <div slot="tabs">
        <sy-tab 
          ?closable=${closable}
          ?disabled=${disabled}
          ?manualClose=${manualClose}
          tabkey=${tabkey}>
          <span><sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M352 88C352 101.3 362.7 112 376 112L494.1 112L263.1 343C253.7 352.4 253.7 367.6 263.1 376.9C272.5 386.2 287.7 386.3 297 376.9L528 145.9L528 264C528 277.3 538.7 288 552 288C565.3 288 576 277.3 576 264L576 88C576 74.7 565.3 64 552 64L376 64C362.7 64 352 74.7 352 88zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 408C480 394.7 469.3 384 456 384C442.7 384 432 394.7 432 408L432 496C432 513.7 417.7 528 400 528L144 528C126.3 528 112 513.7 112 496L112 240C112 222.3 126.3 208 144 208L232 208C245.3 208 256 197.3 256 184C256 170.7 245.3 160 232 160L144 160z"/></svg></sy-icon> tab1</span>
        </sy-tab>
      </div>
      <div slot="contents">
        <sy-tab-content name="${tabkey}">This is content of ${tabkey}</sy-tab-content>
      </div>
    </sy-tab-group>
    <br/>
    <br/>
    <sy-tab-group type="card">
    <div slot="tabs">
      <sy-tab 
        ?closable=${closable}
        ?disabled=${disabled}
        ?manualClose=${manualClose}
        tabkey=${tabkey}>
        <span>tab1</span>
      </sy-tab>
    </div>
    <div slot="contents">
      <sy-tab-content name="${tabkey}">This is content of ${tabkey}</sy-tab-content>
    </div>
    </sy-tab-group>
  </div>
  `;
};

export const TabClosable = (args: {closable: boolean}) => {
  return html`
<sy-tab-group>
  <div slot="tabs">
    <sy-tab tabkey="t1" ?closable=${args.closable}>tab1</sy-tab>
    <sy-tab tabkey="t2" ?closable=${args.closable}>tab2</sy-tab>
  </div>
  <div slot="contents">
    <sy-tab-content name="t1">This is tab1</sy-tab-content>
    <sy-tab-content name="t2">This is tab2</sy-tab-content>
  </div>
</sy-tab-group>
`;
}

export const TabDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-tab-group>
  <div slot="tabs">
    <sy-tab tabkey="t1" ?disabled=${args.disabled}>tab1</sy-tab>
  </div>
  <div slot="contents">
    <sy-tab-content name="t1">This is tab1</sy-tab-content>
  </div>
</sy-tab-group>
`;
}

export const TabManualClose = (args: {manualClose: boolean}) => {
  return html`
  <sy-tab-group>
    <div slot="tabs">
      <sy-tab ?manualClose=${args.manualClose} tabkey="t1" closable>tab1</sy-tab>
    </div>
    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
    </div>
  </sy-tab-group>
  <sy-modal>
    <div slot="header">Close Tab</div>
    <div slot="body">Are you sure to close this tab?</div>
  </sy-modal>

  <script>
    (() => {
      const tab = document.querySelector('sy-tab');
      const modal = document.querySelector('sy-modal');  
      tab.addEventListener('closed', (e) => {
        if(e.detail.isManualClose) {
          modal.setOpen();
          modal.addEventListener('closed', (event) => {
            if(event.detail.event === 'ok') {
              tab.setClose(true);
            }
          });
        }
      });
    })();
  </script>
`;
}

export const TabKey = (args: {tabkey: string}) => {
  return html`
<sy-tab-group>
  <div slot="tabs">
    <sy-tab tabkey=${args.tabkey}>tab1</sy-tab>
  </div>

  <div slot="contents">
    <sy-tab-content name=${args.tabkey}>This is tab1</sy-tab-content>
  </div>
</sy-tab-group>
`;
}

export const TabClosed = () => {
  return html`
  <sy-tab-group id="tabClosed">
    <div slot="tabs">
      <sy-tab tabkey="t1" closable>tab1</sy-tab>
      <sy-tab tabkey="t2" closable>tab2</sy-tab>
    </div>

    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
      <sy-tab-content name="t2">This is tab2</sy-tab-content>
    </div>
  </sy-tab-group>
  <p id="tabClosedResult"></p>
<script>
  (() => {
    const elem = document.querySelector('#tabClosed');  
    const result = document.querySelector('#tabClosedResult');
    
    const handleClosed = (e) => {
      result.textContent = 'Tab (tabkey: ' + e.detail.tabkey + ' index: ' + e.detail.index + ') is closed.';
    };

    elem.addEventListener('closed', handleClosed);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('closed', handleClosed);
    });
  })();
</script>
`;
}


export const TabManualClosed = () => {
  return html`
  <sy-tab-group id="tabManualClosed">
    <div slot="tabs">
      <sy-tab tabkey="t1" closable manualClose>tab1</sy-tab>
    </div>
    <div slot="contents">
      <sy-tab-content name="t1">This is tab1</sy-tab-content>
    </div>
  </sy-tab-group>
  <p id="tabManualClosedResult"></p>
  <sy-modal>
    <div slot="body">Click the close button on the right of the header to close.</div>
  </sy-modal>

<script>
  (() => {
    const elem = document.querySelector('#tabManualClosed');  
    const result = document.querySelector('#tabManualClosedResult');
    const modal = document.querySelector('sy-modal');  
    
    const handleClosed = (e) => {
      if(e.detail.isManualClose) {
        modal.setOpen();
      }
      modal.addEventListener('closed', (event) => {
        if(event.detail.event === 'ok') {
          
          elem.closeTab(e.detail.tabkey);
          result.textContent = 'Tab (tabkey: ' + e.detail.tabkey + ' index: ' + e.detail.index + ') is closed.';
        }
      });
      // result.textContent = Number(e.detail.length) > 0 ? e.detail.value + ' ' + e.detail.length + ' ' + e.detail.valid: '';
    };

    elem.addEventListener('closed', handleClosed);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('closed', handleClosed);
    });
  })();
</script>
`;
}

