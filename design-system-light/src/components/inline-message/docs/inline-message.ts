import { html } from 'lit';
import '../inline-message.element';
import '../docs/inline-message.docs.scss';
import '../../button/button.element';
import '../../input/input.element';

export interface InlineMessageProps {
  btnLabel: string;
  open: boolean;
  showIcon: boolean;
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  trigger: 'click' | 'focusout';
  variant: 'info' | 'success' | 'warning' | 'error';
  btnClick?: () => void;
}


export const InlineMessage = ({btnLabel, open, showIcon, message, position, trigger, variant}: InlineMessageProps) => {
  return html`
    <sy-button>
      Open inline message
        <sy-inline-message
          variant=${variant}
          message=${message}
          ?showIcon=${showIcon}
          btnLabel=${btnLabel}
          ?open=${open}
          position=${position}
          trigger=${trigger}>
        </sy-inline-message>
    </sy-button>
    `;
};

export const InlineMessageBtnLabel = (args: {btnLabel: string}) => {
  return html`
    <sy-button>
        Open inline message
      <sy-inline-message
        message="Sets button label to visible the button."
        trigger="click"
        btnLabel="${args.btnLabel}">
      </sy-inline-message>
    </sy-button>

  `;
};

export const InlineMessageOpen = (args: {open: boolean}) => {
  return html`
    <sy-button>
        Open inline message
      <sy-inline-message
        ?open=${args.open}
        message="Only one action button can be included. Limit action button labels to two words or less."
        trigger="click">
      </sy-inline-message>
    </sy-button>
  `;
};

export const InlineMessageShowIcon = (args: {showIcon: boolean, variant: 'info' | 'success' | 'warning' | 'error'}) => {
  return html`
    <sy-button>
      Open inline message
      <sy-inline-message
        ?showIcon="${args.showIcon}"
        variant="${args.variant}"
        message="The icon is determined by the variant of the inline message."
        trigger="click">
      </sy-inline-message>
    </sy-button>
  `;
};

export const InlineMessageMsg = (args: {message: string}) => {
  return html`
    <sy-button>
      Open inline message
      <sy-inline-message
        showIcon
        variant="info"
        message="${args.message}"
        trigger="click">
      </sy-inline-message>
    </sy-button>
  `;
};

export const InlineMessagePoisition = (args: {position: 'top' | 'bottom' | 'left' | 'right'}) => {
  return html`
    <sy-button>
      Open inline msg
      <sy-inline-message
        position="${args.position}"
        message="The inline message."
        trigger="click">
      </sy-inline-message>
    </sy-button>
  `;
};

export const InlineMessageTrigger = (args: {trigger: 'click' | 'focusout'}) => {
  return html`
    <sy-input placeholder="Input text" size="medium" variant="text">
      Open inline message
      <sy-inline-message 
        message="This is the inline message."
        trigger="${args.trigger}">
      </sy-inline-message>
    </sy-input>

    <sy-button>   
      Open inline msg
      <sy-inline-message 
        message="This is the inline message."
        trigger="${args.trigger}">
      </sy-inline-message>
    </sy-button>
    
    `;
};

export const InlineMessageVariant = (args: {variant: 'info' | 'success' | 'warning' | 'error'}) => {
  return html`
    <sy-button>   
      Open inline msg
        <sy-inline-message
          showIcon
          variant="${args.variant}"
          message="inline message.">
        </sy-inline-message>
    </sy-button>
    `;
 };

 export const InlineMessageBtnClick = () => {
   return html`
    <sy-button>
      Open inline message
      <sy-inline-message
        id="inlineAction"
        message="Only one action button can be included."
        btnLabel="click"
        trigger="click">
      </sy-inline-message>
    </sy-button>
    <p id="resultAction"></p>

    <script>
    (() => {   
      let inlineMessage = document.querySelector('#inlineAction');
      let result = document.querySelector('#resultAction');

      const handleClicked = (e) => {
        result.textContent = 'click event has been fired.';
      };
      inlineMessage.addEventListener("btnClick", handleClicked);
    
    })();
   </script>`;
 }