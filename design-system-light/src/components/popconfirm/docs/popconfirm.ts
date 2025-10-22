import { html } from 'lit';
import '../popconfirm.element';
import '../../button/button.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface PopconfirmProps {
  arrow: boolean;
  closable: boolean;
  // focuson: 'ok' | 'cancel' | 'none';
  position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  trigger: 'click' | 'none';
  opendelay: number;
  closedelay: number;
  slotContent: any;
  setOpen?: () => any;
  setClose?: () => any;
  selected?: () => any;
  visibleChanged?: () => any;
}
/**
 * Primary UI component for user interaction
 */
export const Popconfirm = ({arrow, closable, position, trigger, opendelay, closedelay, slotContent}: PopconfirmProps) => {
  
  return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }

</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
  Click to Open
    <sy-popconfirm
      position=${position}
      ?arrow=${arrow}
      trigger=${trigger}
      opendelay=${opendelay}
      closedelay=${closedelay}
      ?closable=${closable}>
      Popconfirm
    </sy-popconfirm>
  </div>
</div>
  `;
};

export const PopconfirmArrow = (args: {arrow: boolean}) => {
  return html`
  <style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }

</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
    Click here
    <sy-popconfirm ?arrow=${args.arrow} position='top'>Popconfirm</sy-popconfirm>
  </div>
</div>
  `;
};

export const PopconfirmClosable = (args: {closable: boolean}) => {
  return html`
  <style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }

</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
  Click here
    <sy-popconfirm ?closable=${args.closable}>Popconfirm</sy-popconfirm>
  </div>
</div>
  `;
};

// export const PopconfirmFocuson = () => {
//   return html`
// <h3>Focus on Ok (Default)</h3>
// <div class="sandbox">
// Click here
//   <sy-popconfirm focuson="ok">Popconfirm</sy-popconfirm>
// </div>
// <br/>
// <h3>Focus on Cancel</h3>
// <div class="sandbox">
// Click here
//   <sy-popconfirm focuson="cancel">Popconfirm</sy-popconfirm>
// </div>
// <br/>
// <h3>No Focus</h3>
// <div class="sandbox">
// Click here
//   <sy-popconfirm focuson="none">Popconfirm</sy-popconfirm>
// </div>
// <br/>
//   `;
// };

export const PopconfirmPosition = () => {
  return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }
</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
    Click here
    <sy-popconfirm position="top">Top</sy-popconfirm>
    <sy-popconfirm position="topLeft">TopLeft</sy-popconfirm>
    <sy-popconfirm position="topRight">TopRight</sy-popconfirm>
    <sy-popconfirm position="bottom">Bottom</sy-popconfirm>
    <sy-popconfirm position="bottomLeft">BottomLeft</sy-popconfirm>
    <sy-popconfirm position="bottomRight">BottomRight</sy-popconfirm>
    <sy-popconfirm position="left">Left</sy-popconfirm>
    <sy-popconfirm position="leftTop">LeftTop</sy-popconfirm>
    <sy-popconfirm position="leftBottom">LeftBottom</sy-popconfirm>
    <sy-popconfirm position="right">Right</sy-popconfirm>
    <sy-popconfirm position="rightTop">RightTop</sy-popconfirm>
    <sy-popconfirm position="rightBottom">RightBottom</sy-popconfirm>  
  </div>
</div>
  `;
};

export const PopconfirmTrigger = (args: {trigger: 'click' | 'none'}) => {
  return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 200px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }
</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
    Click if trigger is click
    <sy-popconfirm trigger=${args.trigger}>Popconfirm</sy-popconfirm>
  </div>
</div>
<sy-button id="popconfirmTrigger">Click to open by force</sy-button>

<script>
  (() => {
    let elem = document.querySelector('sy-popconfirm');  
    let btn = document.querySelector('#popconfirmTrigger');    

    btn.addEventListener('click', () => {
      elem.setOpen();
    });
  })();
</script>
  `;
};

export const PopconfirmSlot = ({slotContent}: PopconfirmProps) => {
  return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }
</style>
<div class="sandbox-wrapper">
<div class="sandbox">
  <sy-popconfirm>
    ${unsafeHTML(slotContent)}
  </sy-popconfirm>
</div>
</div>
  `;
};

export const PopconfirmDelay = (args: {opendelay: number, closedelay: number}) => {
return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }
</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
  Click here
    <sy-popconfirm opendelay=${args.opendelay} closedelay=${args.closedelay}>Popconfirm</sy-popconfirm>
  </div>
</div>
  `;
};

export const PopconfirmKeyControl = () => {
  return html`
  <style>
    div.sandbox-wrapper{
      display:flex;
      align-items:center;
      justify-content: center;
    }
    div.sandbox {
      position: relative;
      display:flex;
      align-items:center;
      padding:20px;
      width: 150px;
      height:80px;
      border: 1px solid #d0d0d0;
      border-radius: 3px;
      justify-content: center;
    }
    sy-popconfirm {
      z-index:200;
    }
</style>
<h3>To control event by key, Parent Dom must have focus.</h3>
<h3>Add tabindex to set focus; if parent dom is a button, key control works without tabindex.</h3>
<div class="sandbox-wrapper">
<div class="sandbox" tabindex="0" id="nofocusPopconfirmParent">
  Click to Open
  <sy-popconfirm id="nofocusPopconfirm">Popconfirm</sy-popconfirm>
</div>
</div>

<script>
  (() => {
    const sandbox = document.querySelector('#nofocusPopconfirmParent');
    const popconfirm = document.querySelector('#nofocusPopconfirm');
    sandbox.addEventListener('click', () => {
      sandbox.focus();
    });
    
    sandbox.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        popconfirm.setClose();
      }
    });
  })();
</script>
  `;
};
export const PopconfirmMaunalControl = () => {
  return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }
  .sandbox-footer{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content: center;
    gap:8px;
    padding-top: 12px;
}
</style>

  <div class="sandbox-wrapper">
  <div class="sandbox">
    Click to Open
    <sy-popconfirm trigger="none" id="PopconfirmManualControl">Popconfirm</sy-popconfirm>
  </div>
  </div>
  <div class="sandbox-footer">
  <sy-button id="popconfirmOpen">Click to Open</sy-button>
  <sy-button id="popconfirmClose" variant="secondary">Click to Close</sy-button>
  </div>



<script>
  (() => {
    let elem = document.querySelector('#PopconfirmManualControl');  
    let btnOpen = document.querySelector('#popconfirmOpen');    
    let btnClose = document.querySelector('#popconfirmClose');    

    btnOpen.addEventListener('click', () => {
      elem.setOpen();
    });
    btnClose.addEventListener('click', () => {
      elem.setClose();
    })
  })();

</script>` 
};

export const PopconfirmSelected = () => {
  return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }
</style>
  <div class="sandbox-wrapper">
    <div class="sandbox">
      Click to Open
      <sy-popconfirm id="PopconfirmSelected">Popconfirm</sy-popconfirm>
    </div>
  </div>

<p id="PopconfirmSelectedResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#PopconfirmSelected');  
    let result = document.querySelector('#PopconfirmSelectedResult');    

    let handleSelected = (e) => {
      result.textContent = e.detail + ' is selected';
    };

    elem.addEventListener('selected', handleSelected);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('selected', handleSelected);
    });
  })();

</script>` 
};

export const PopconfirmVisibitChanged = () => {
  return html`
<style>
  div.sandbox-wrapper{
    display:flex;
    align-items:center;
    justify-content: center;
  }
  div.sandbox {
    position: relative;
    display:flex;
    align-items:center;
    padding:20px;
    width: 150px;
    height:80px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
  }
  sy-popconfirm {
    z-index:200;
  }
</style>
  <div class="sandbox-wrapper">
    <div class="sandbox">
      Click to Open
      <sy-popconfirm id="PopconfirmVisibility">Popconfirm</sy-popconfirm>
    </div>
  </div>

<p id="PopconfirmVisibilityResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#PopconfirmVisibility');  
    let result = document.querySelector('#PopconfirmVisibilityResult');    

    let handlePopconfirmVisibility = (e) => {
      result.textContent = 'visility: ' + e.detail;
    };

    elem.addEventListener('visibleChanged', handlePopconfirmVisibility);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('visibleChanged', handlePopconfirmVisibility);
    });
  })();

</script>` 
};