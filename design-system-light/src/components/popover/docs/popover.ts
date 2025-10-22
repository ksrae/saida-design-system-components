import { html } from 'lit';
import '../popover.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../select';
import '../../menu';
import '../../dropdown';
import '../../autocomplete';
import '../../tree-select';

export interface PopoverProps {
  arrow: boolean;
  open: boolean;
  position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  trigger: 'hover' | 'click' | 'focus' | 'null';
  opendelay: number;
  closedelay: number;
  slotContent: any;
  setOpen?: () => void;
  setClose?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export const Popover = ({arrow, open, position, trigger, opendelay, closedelay, slotContent}: PopoverProps) => {
  
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
</style>
<div class="sandbox-wrapper">
  <div class="sandbox" tabindex="0">
  Popover
    <sy-popover
      position=${position}
      ?arrow=${arrow}
      trigger=${trigger}
      ?open=${open}
      opendelay=${opendelay}
      closedelay=${closedelay}>
      Popover
    </sy-popover>
  </div>
</div>
  `;
};

export const PopoverArrow = (args: {arrow: boolean}) => {
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
</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
    Popover
    
    <sy-popover ?arrow=${args.arrow} position='top' trigger="hover">Top
    <sy-autoComplete></sy-autoComplete>
    <sy-dropdown style="z-index: 100;" position="bottomLeft" size="medium" trigger="click">
      <span slot="title">Dropdown</span>
      <sy-menu>    
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="2">Item2</sy-menu-item>
      </sy-menu>
  </sy-dropdown>
    <sy-select>
        <sy-option label="test1" value="1"></sy-option>
        <sy-option label="test2" value="2"></sy-option>
        <sy-option label="test3" value="3"></sy-option>
        <sy-option label="test4" value="4"></sy-option>
        <sy-option label="test5" value="5"></sy-option>
      </sy-select>

      <sy-tree-select id="treeSelectCheckable"></sy-tree-select>


    </sy-popover>
  </div>
</div>
<script>
    (() => {
      let source = ["ABC", "DEF", "GHI"];
      document.querySelector('sy-autoComplete').source = source;

      const nodes = [
        { label: 'grandparent 1', value: '100', children: [
            { label: 'parent 1-0', value: '1001', checked: true, children: [
                { label: 'leaf1', value: '10010' }, 
                { label: 'leaf2', value: '10011' }, 
                { label: 'leaf3', value: '10012' }  
              ]
            },
            { label: 'parent 1-1', value: '1002', children: [
                { label: 'leaf4', value: '10020' }
              ] 
            },
          ]
        }
      ];

    const tree = document.querySelector('sy-tree-select#treeSelectCheckable');
    tree.nodes = nodes;   
    })();
  </script>



  `;
};

export const PopoverOpen = (args: {open: boolean }) => {
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
</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
    <sy-popover arrow ?open=${args.open}>Bottom</sy-popover>
  </div>
</div>
  `;
};

export const PopoverPosition = (args: {position: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'}) => {
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
</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
    Popover
    <sy-popover arrow position="${args.position}">${args.position ?? 'bottom'}</sy-popover>
  </div>
</div>
  `;
};

export const PopoverTrigger = (args: {trigger: 'hover' | 'click' | 'focus' | 'null'}) => {
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
</style>
<div class="sandbox-wrapper">
  <div class="sandbox" tabindex="0">
    Popover
    <sy-popover arrow trigger=${args.trigger}>Bottom</sy-popover>
  </div>
</div>
  `;
};

export const PopoverDelay = (args: {opendelay: number, closedelay: number}) => {
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
</style>
<div class="sandbox-wrapper">
  <div class="sandbox">
    Popover
    <sy-popover opendelay=${args.opendelay} closedelay=${args.closedelay}>Bottom</sy-popover>
  </div>
</div>
  `;
};
export const PopoverSlot = ({slotContent}: PopoverProps) => {
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
</style>
<div class="sandbox-wrapper">
<div class="sandbox">
  <sy-popover>
    ${unsafeHTML(slotContent)}
  </sy-popover>
  </div>
</div>
  `;
};

export const PopoverKeyControl = () => {
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
</style>
<h3>ESC to shut</h3>
<div class="sandbox-wrapper">
<div class="sandbox" tabindex="0">
  Popover
  <sy-popover arrow position='bottom' trigger="click">Bottom</sy-popover>
</div>
</div>
<script>
  (() => {
    const sandbox = document.querySelector('.sandbox');
    const popover = document.querySelector('sy-popover');
    sandbox.focus();
    sandbox.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        popover.setClose();
      }
    });
  })();

</script>
  `;
};

export const PopoverManualControl = () => {
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
</style>
<div class="sandbox-wrapper">
  <div class="sandbox" tabindex="0">
    Popover
    <sy-popover arrow position='bottom' trigger="null">Bottom</sy-popover>
  </div>
</div>

<sy-button id="btnOpen">Open</sy-button>
<sy-button id="btnClose" variant="secondary">Close</sy-button>

<script>
  (() => {
    const popover = document.querySelector('sy-popover');
    const btnOpen = document.querySelector('#btnOpen');
    const btnClose = document.querySelector('#btnClose');

    btnOpen.addEventListener('click', () => {
      popover.setOpen();
    });

    btnClose.addEventListener('click', () => {
      popover.setClose();
    });

  })();

</script>
  `;
};
