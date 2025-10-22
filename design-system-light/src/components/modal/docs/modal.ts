import { html } from 'lit';
import '../modal.element';
import '../../button/button.element';
import '../../spinner/spinner.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../select/select-option.element';
import '../../select/select.element'
import '../../radio/radio-group.element';
import '../../radio/radio.element';
import '../../flex/flex.element';
import '../../autocomplete/autocomplete.element';
import '../../autocomplete/autocomplete-option.element';

export interface ModalProps {
  cancelText: string;
  closable: boolean;
  enableModalMaximize: boolean;
  // draggable: boolean;
  hideFooter: boolean;
  // loading: boolean;
  maskClosable: boolean;
  // maskless: boolean;
  okText: string;
  open: boolean;
  width: number;
  top: number;
  left: number;
  variant: 'modal' | 'dialog';
  slotHeader: any;
  slotBody: any;
  slotFooter: any;
  setCancel?: () => any;
  setClose?: () => any;
  setOk?: () => any;
  setOpen?: () => void;
  setMaximum?: () => void;
  closed?: () => any;
}

/**
 * Primary UI component for user interaction
 */
export const Modal = ({ cancelText, closable, enableModalMaximize, hideFooter, maskClosable, okText, open, width, top, left, variant, slotHeader, slotBody, slotFooter }: ModalProps) => {
  return html`
  <sy-modal
  cancelText=${cancelText}
    ?closable=${closable}
    ?enableModalMaximize=${enableModalMaximize}
    ?hideFooter=${hideFooter}
    ?maskClosable=${maskClosable}
    okText=${okText}
    ?open=${open}
    width=${width}
    top=${top}
    left=${left}
    variant=${variant}>
    <div slot="header">Header</div>
    <div slot="body">
      <sy-flex align="start" direction="vertical" columngap="medium" rowgap="medium">
        <div>Click Ok to confirm, click cancel to reject.</div>
        
        <sy-radio-group position="horizontal">
          <sy-radio value="1">Radio 1</sy-radio>
          <sy-radio value="2">Radio 2</sy-radio>
          <sy-radio value="3">Radio 3</sy-radio>
        </sy-radio-group>
        
        <sy-autoComplete id="autocompleteCase" trigger="focus"></sy-autoComplete>
        
        <sy-select>
          <sy-option value="value1" label="option1"></sy-option>
          <sy-option value="value2" label="option2"></sy-option>
          <sy-option value="value3" label="option3"></sy-option>
        </sy-select>
      </sy-flex>
    </div>
    <div slot="footer"></div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');
      const autocomplete = document.querySelector('#autocompleteCase');
      let source = ["ABC", "DEF", "GHI", 'aaa', 'aab', 'aac', 'aad', 'aae', 'aaf', 'aag', 'aah', 'aai', 'aaj', 'aak', 'aal', 'aam', 'aan', 'aao', 'aap', 'aaq', 'aar', 'aas', 'aat', 'aau', 'aav', 'aaw', 'aax', 'aay', 'aaz'];

      autocomplete.source = source;
      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
    
  </script>
  `;
};

export const ModalCanceltext = (args: {cancelText: string}) => {
  return html`
  <sy-modal cancelText=${args.cancelText}>
    <div slot="body">Customizing cancel button.</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalClosable = (args: {closable: boolean}) => {
  return html`
  <sy-modal ?closable=${args.closable}>
    <div slot="body">Click the close button on the right of the header to close.</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalEnableModalMaximize = (args: {enableModalMaximize: boolean}) => {
  return html`
  <sy-modal variant="modal" ?enableModalMaximize=${args.enableModalMaximize}>
    <div slot="body">Try to click the maximum button.</div>
  </sy-modal>

  <sy-button id="btnEnableModalMaximize">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnEnableModalMaximize');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};


// export const ModalDraggable = (args: {draggable: boolean}) => {
//   return html`
//   <sy-modal ?draggable=${args.draggable}>
//     <div slot="body">This allows modal can move by dragging its header.</div>
//   </sy-modal>

//   <sy-button id="btnOpenModal">Click to Open</sy-button>

//   <script>
//     (() => {
//       const modal = document.querySelector('sy-modal');
//       const btn = document.querySelector('#btnOpenModal');

//       btn.addEventListener('click', () => {
//         modal.setOpen();
//       });
//     })();
//   </script>
// `;
// };

export const ModalHideFooter = (args: {hideFooter: boolean}) => {
  return html`
  <sy-modal closable ?hideFooter=${args.hideFooter}>
    <div slot="body">This modal does not have footer.</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

// export const ModalLoading = () => {
//   // loading에 sy-spinner를 추가하려고 했는데 sy-spinner가 나타나면 mask가 사라지는 문제가 있음.
//   // loading을 빼고, 유저가 body에 값을 추가할 때 직접 loading 하도록 해야 한다.
//   // sy-spinner hidden 기능이 동작하지 않아 style로 대체하였음. 기능이 적용되면 수정해야 함.
//   return html`
//   <sy-modal>
//     <div slot="body">
//       <sy-spinner></sy-spinner>
//       <div class="modal-content">This modal loads after one second.</div>
//     </div>
//   </sy-modal>

//   <sy-button id="btnOpenModal">Click to Open</sy-button>

//   <script>
//     (() => {
//       const modal = document.querySelector('sy-modal');
//       const spinner = document.querySelector('sy-spinner');
//       const content = document.querySelector('.modal-content');
//       const btn = document.querySelector('#btnOpenModal');

//       btn.addEventListener('click', () => {
//         modal.setOpen();
//         spinner.hidden = false;        
//         content.style.display = 'none';

//         setTimeout(() => {
//           spinner.hidden = true;
//           content.style.display = 'block';
//         }, 1000);
//       });
//     })();
//   </script>
// `;
// };

export const ModalMaskclosable = (args: {maskClosable: boolean}) => {
  return html`
  <sy-modal ?maskClosable=${args.maskClosable}>
    <div slot="body">Allows to click the mask to close modal.</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalMaskless = (args: {maskless: boolean}) => {
  return html`
  <sy-modal ?maskless=${args.maskless}>
  <div slot="body">There no mask. Maskclosable will be ignored.</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalOktext = (args: {okText: string}) => {
  return html`
  <sy-modal okText=${args.okText}>
    <div slot="body">Customizing Ok button.</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalOpen = (args: {open: boolean}) => {
  return html`
  <p>Sets control to true to open a modal, Manually setting control to false is required. to reopen.</p>
  <sy-modal ?open=${args.open}>
    <div slot="body">Set open to display modal.</div>
  </sy-modal>
`;
};

export const ModalPosition = (args: {top: number, left: number}) => {
  return html`
  <sy-modal top=${args.top} left=${args.left}>
    <div slot="body">Sets top, left to set the modal position. Default position is center.</div>
  </sy-modal>

  <sy-button id="btnOpenModalPosition">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModalPosition');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalWidth = (args: {width: number}) => {
  return html`
  <sy-modal width=${args.width}>
    <div slot="body">Set width of modal.</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalVariant = (args: {variant: 'modal' | 'dialog'}) => {
  return html`
  <sy-modal variant=${args.variant}>
    <div slot="body">Modal Variant</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>

  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};

export const ModalSlot = (args: {slotHeader: any, slotBody: any, slotFooter: any}) => {
  return html`
  <sy-modal closable>
    <div slot="header">${args.slotHeader}</div>
    <div slot="body">${args.slotBody}</div>
    <div slot="footer">${args.slotFooter}</div>
  </sy-modal>

  <sy-button id="btnOpenModal">Click to Open</sy-button>
  <script>
    (() => {
      const modal = document.querySelector('sy-modal');
      const btn = document.querySelector('#btnOpenModal');

      btn.addEventListener('click', () => {
        modal.setOpen();
      });
    })();
  </script>
`;
};


export const ModalTriggerButtons = () => {
  return html`
  <sy-modal id="modalTrigger">
    <div slot="body">
    Trigger buttons<br/>
    <sy-button id="btnOk" variant="secondary">Click Ok</sy-button>
    <sy-button id="btnCancel">Click Cancel</sy-button>
    <sy-button id="btnClose" variant="primary">Click Close</sy-button>
  </div>
  </sy-modal>

  <sy-button id="btnOpen">Click Open</sy-button>
 
  <p id="modalTriggerResult"></p>
  <script>
    (() => {
      const modal = document.querySelector('#modalTrigger');
      const result = document.querySelector('#modalTriggerResult');    

      const btnOpen = document.querySelector('#btnOpen');
      const btnOk = document.querySelector('#btnOk');
      const btnCancel = document.querySelector('#btnCancel');
      const btnClose = document.querySelector('#btnClose');

      btnOpen.addEventListener('click', () => {
        modal.setOpen();
      });
      btnOk.addEventListener('click', () => {
        modal.setOk('ok value');
      });
      btnCancel.addEventListener('click', () => {
        modal.setCancel('cancel value');
      });
      btnClose.addEventListener('click', () => {
        modal.setClose('close value');
      });

      let handleClosed = (e) => {
        let text = e.detail.event + ' is selected.' ;
        if(e.detail.value) {
          text += 'value (' + e.detail.value + ') is included.';
        }
      result.textContent = text;
    };

    modal.addEventListener('closed', handleClosed);

    btnOpen.addEventListener('click', () => {
      modal.setOpen();
    });

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      modal.removeEventListener('closed', handleClosed);
    });
    })();
  </script>
`;
};

export const ModalClosed = () => {
  return html`
  <sy-modal id="modalClosed" maskclosable closable>
    <div slot="body">Close Event emits.</div>
  </sy-modal>

<p id="modalClosedResult"></p>
<br/>
<sy-button id="btnOpenModal">Click to Open</sy-button>
<script>
  (() => {
    const modal = document.querySelector('sy-modal');
    const btnOpen = document.querySelector('#btnOpenModal');

    let elem = document.querySelector('#modalClosed');  
    let result = document.querySelector('#modalClosedResult');    

    let handleClosed = (e) => {
      result.textContent = e.detail.event + ' is selected';
    };

    elem.addEventListener('closed', handleClosed);

    btnOpen.addEventListener('click', () => {
      modal.setOpen();
    });

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('closed', handleClosed);
    });
  })();

</script>` 
};

export const NestedModal = () => {
  return html`
  <sy-modal id="baseModal" closable width="500">
    <div slot="body">
      <sy-button id="btnOpenNestedModal">Click to Open Nested modal</sy-button>
    </div>
  </sy-modal>
  <sy-modal id="nestedModal" closable>
    <div slot="body">Nested modal.</div>
  </sy-modal>
<br/>
<sy-button id="btnOpenBaseModal">Click to Open Modal</sy-button>
<script>
  (() => {
    const baseModal = document.querySelector('#baseModal');
    const btnOpenBaseModal = document.querySelector('#btnOpenBaseModal');

    const nestedModal = document.querySelector('#nestedModal');
    const btnOpenNestedModal = document.querySelector('#btnOpenNestedModal');


    btnOpenBaseModal.addEventListener('click', () => {
      baseModal.setOpen();
    });
    btnOpenNestedModal.addEventListener('click', () => {
      nestedModal.setOpen();
    });

  })();

</script>` 
};