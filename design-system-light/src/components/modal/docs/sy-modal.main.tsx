import { html } from "lit";
import { Components } from '../../../components';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface SyModalProps extends Components.SyModal {
  slotHeader?: any;
  slotBody?: any;
  slotFooter?: any;
  closed?: (event: CustomEvent<any>) => void;
}

export const Modal = ({ cancelText, closable, enableModalMaximize, hideFooter, maskClosable, okText, open, width, top, left, variant, slotHeader, slotBody, slotFooter }: SyModalProps) => {
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
    ${unsafeHTML(slotHeader)}
    ${unsafeHTML(slotBody)}
    ${unsafeHTML(slotFooter)}
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
