import { h } from '@stencil/core';
import { Components } from '../../../components';

export interface SyButtonProps extends Components.SyButton {
  slot: string;
  click?: (event: MouseEvent) => void;
}

export const Button = (args: SyButtonProps) => {
  const { slot, ...props } = args;
  return <sy-button {...props}>{slot}</sy-button>;
};

// Variant 
export const ButtonAttribute = (args: SyButtonProps) => (
  <sy-button {...args}>Button</sy-button>
);

// Type
export const ButtonType = (args: SyButtonProps) => {
  const handleClick = () => {
    if (args.type === 'submit') {
      alert('Form submitted!');
    } else if (args.type === 'reset') {
      alert('Form reset!');
    } else {
      alert('Button clicked!');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <sy-input variant="text" value="test input value"></sy-input>
      <sy-button {...args} onClick={handleClick} variant="primary">Button</sy-button>
    </div>
  );
};

// Slot 
export const ButtonSlot = (args: SyButtonProps) => {
  const { slot, ...props } = args;
  return <sy-button {...props}>{slot}</sy-button>;
};

// setFocus & setBlur 
export const ButtonFocusBlur = () => {
  let buttonRef: HTMLSyButtonElement;

  const handleFocus = () => {
    if (buttonRef) {
      buttonRef.setFocus();
    }
  };

  const handleBlur = () => {
    if (buttonRef) {
      buttonRef.setBlur();
    }
  };
  
  return (
  <div>
    <sy-button onClick={handleFocus} variant="secondary">setFocus</sy-button>
    <sy-button onClick={handleBlur} variant="primary">setBlur</sy-button>

    <sy-button ref={(el) => {
      buttonRef = el as HTMLSyButtonElement;
    }}
    >Button
    </sy-button>
  </div>
  );
};

export const ButtonSetClick = () => {
  let buttonRef: HTMLSyButtonElement;
  const handleSetClick = () => {
    if (buttonRef) {
      buttonRef.setClick();
    }
  };
  return (
    <div>
      <sy-button onClick={handleSetClick} variant="secondary">setClick</sy-button>
      <sy-button ref={(el) => {
        buttonRef = el as HTMLSyButtonElement;
      }}
      onClick={() => alert('Button clicked!')}
      >Button
      </sy-button>
    </div>
  );
};

// click event
export const ButtonClick = () => {
  const handleClick = (event: MouseEvent) => {
    alert(`Button clicked! event.detail: ${JSON.stringify(event.detail)}`);
  };
  
  return (
    <sy-button onClick={handleClick}>
      Click Me
    </sy-button>
  );
};




