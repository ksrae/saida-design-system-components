import { html } from 'lit';
import '../modeless-group.element';
import '../modeless.element';
import '../../button/button.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

interface ModelessOptionModel {
  draggable?: boolean;
  resizable?: boolean;
  closable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

interface ModelessGroupModel {
  id: string,
  title?: string,
  content?: string | HTMLElement,
  option?: ModelessOptionModel,
}

export interface ModelessGroupProps {  
  create?: (id: string, content?: string | HTMLElement, title?: string | HTMLElement, option?: ModelessOptionModel) => any;
  updateContent?: (id: string, content: string | HTMLElement) => void;
  updateTitle?: (id: string, title: string | HTMLElement) => any;
  updateOption?: (id: string, option: ModelessOptionModel) => any;
  close?: (id: string) => any;
  closeAll?: () => any;
}

/**
 * Primary UI component for user interaction
 */
export const ModelessGroup = () => {
  return html`
  <sy-modeless-group></sy-modeless-group>
  <sy-button id="btnCreateModeless">create modeless</sy-button>
  <script>
    (() => {
      const modelessGroup = document.querySelector('sy-modeless-group');
      const btnCreateModeless = document.querySelector('#btnCreateModeless');

      const modelessOption = {
        draggable: true, 
        width: 300, 
        height: 300,
        minimizable: true,
        maximizable: true,
        closable: true
      };

      let index = 0;

      btnCreateModeless.addEventListener('click', (e) => {
        const id = 'Modeless' + (index++).toString();
        const title = 'Title ' + index.toString();
        const content = 'Content ' + index.toString();
        modelessGroup.create(id, title, content, modelessOption);
      });

    })();
  </script>

  `;
};

export const ModelessGroupCreate = (args: ModelessGroupModel) => {
  return html`
<sy-modeless-group></sy-modeless-group>
<sy-button id="btnModelessGroupCreate">Click to Create Modeless</sy-button>
<script>
  (() => {
    const modelessGroup = document.querySelector('sy-modeless-group');
    const btnModelessGroupCreate = document.querySelector('#btnModelessGroupCreate');

    const updatedArgs = ${JSON.stringify(args)};

    // 버튼 클릭 시 임시 DOM에서 값 가져오기
    btnModelessGroupCreate.addEventListener('click', (e) => {
      // 임시 DOM에서 현재 상태의 args 정보 가져오기
      const controlContentId = document.querySelector('#control-id')?.value;
      const controlContent = document.querySelector('#control-content')?.value;
      const controlTitle = document.querySelector('#control-title')?.value;
      const controlOption = document.querySelector('#control-option')?.value ;
      
      const option = controlOption ? JSON.parse(controlOption) : updatedArgs.option;

      modelessGroup.create(
        controlContentId, 
        controlTitle, 
        controlContent, 
        option
      );
    });
  })();
</script>
  `;
};

export const ModelessGroupUpdateContent = (args: {content: string}) => {
  return html`
<sy-modeless-group></sy-modeless-group>
<sy-button id="btnModelessGroupUpdateContent">Click to Update Modeless Content</sy-button>
<script>
  (() => {
    const modelessGroup = document.querySelector('sy-modeless-group');
    const btnModelessGroupUpdateContent = document.querySelector('#btnModelessGroupUpdateContent');

    const updatedArgs = ${JSON.stringify(args)};

    modelessGroup.create('modelessContentId', 'Modeless', updatedArgs.content, {
      draggable: true,
      width: 300,
      height:300,
    });
    

    btnModelessGroupUpdateContent.addEventListener('click', (e) => {      
      const controlContent = document.querySelector('#control-content')?.value;
      modelessGroup.updateContent('modelessContentId', controlContent);
    });
    
  })();
</script>
  `;
};

export const ModelessGroupUpdateTitle = (args: {title: string}) => {
  return html`
<sy-modeless-group></sy-modeless-group>
<sy-button id="btnModelessGroupUpdateTitle">Click to update Modeless Title</sy-button>
<script>
  (() => {
    const modelessGroup = document.querySelector('sy-modeless-group');
    const btnModelessGroupUpdateTitle = document.querySelector('#btnModelessGroupUpdateTitle');

    const updatedArgs = ${JSON.stringify(args)};

    modelessGroup.create('modelessTitleId', updatedArgs.title, 'Modeless Content', {
      draggable: true,
      width: 300,
      height:300,
    });
    

    btnModelessGroupUpdateTitle.addEventListener('click', (e) => {      
      const controlTitle = document.querySelector('#control-title')?.value;
      modelessGroup.updateTitle('modelessTitleId', controlTitle);
    });
    
  })();
</script>
  `;
};

export const ModelessGroupUpdateOption = (args: {option: ModelessOptionModel}) => {
  return html`
<sy-modeless-group></sy-modeless-group>
<sy-button id="btnModelessGroupUpdateOption">Click to update Modeless Option</sy-button>
<script>
  (() => {
    const modelessGroup = document.querySelector('sy-modeless-group');
    const btnModelessGroupUpdateOption = document.querySelector('#btnModelessGroupUpdateOption');

    const updatedArgs = ${JSON.stringify(args)};

    modelessGroup.create('modelessOptionId', 'Modeless', 'Modeless Content', updatedArgs.option);
    

    btnModelessGroupUpdateOption.addEventListener('click', (e) => {      
      const controlOption = document.querySelector('#control-option')?.value ;
      const option = controlOption ? JSON.parse(controlOption) : updatedArgs.option;
      // console.log('options', option);
      modelessGroup.updateOption('modelessOptionId', option);
    });
    
  })();
</script>
  `;
};

export const ModelessGroupClose = (args: {id: string}) => {
  return html`
<sy-modeless-group></sy-modeless-group>
<sy-button id="btnModelessGroupClose">Click to Close a modeless</sy-button>
<script>
  (() => {
    const modelessGroup = document.querySelector('sy-modeless-group');
    const btnModelessGroupClose = document.querySelector('#btnModelessGroupClose');

    modelessGroup.create('modelessClose1', 'Modeless1', 'Input modelessClose1 to close this modeless', {
      draggable: true,
      top:100,
      left: 100,
      width: 300,
      height:300,
    });
    
    modelessGroup.create('modelessClose2', 'Modeless2', 'Input modelessClose2 to close this modeless', {
      draggable: true,
      top: 100,
      left: 400,
      width: 300,
      height:300,
    });

    btnModelessGroupClose.addEventListener('click', (e) => {      
      const controlClose = document.querySelector('#control-id')?.value;
      modelessGroup.close(controlClose);
    });
    
  })();
</script>
  `;
};

export const ModelessGroupCloseAll = () => {
  return html`
<sy-modeless-group></sy-modeless-group>
<sy-button id="btnModelessGroupCloseAll">Click to cloas all modeless</sy-button>
<script>
  (() => {
    const modelessGroup = document.querySelector('sy-modeless-group');
    const btnModelessGroupCloseAll = document.querySelector('#btnModelessGroupCloseAll');

    modelessGroup.create('modelessClose1', 'Modeless1', 'Modeless Content', {
      draggable: true,
      minimizable: true,
      top: 0,
      left: 0,
      width: 200,
      height:150,
    });
    modelessGroup.create('modelessClose2', 'Modeless2', 'Modeless Content', {
      draggable: true,
      minimizable: true,
      top: 0,
      left: 300,
      width: 200,
      height:150,
    });
    modelessGroup.create('modelessClose3', 'Modeless3', 'Modeless Content', {
      draggable: true,
      minimizable: true,
      top: 0,
      left: 600,
      width: 200,
      height:150,
    });
    modelessGroup.create('modelessClose4', 'Modeless4', 'Modeless Content', {
      draggable: true,
      minimizable: true,
      top: 200,
      left: 0,
      width: 200,
      height:150,
    });
    modelessGroup.create('modelessClose5', 'Modeless5', 'Modeless Content', {
      draggable: true,
      minimizable: true,
      top: 200,
      left: 300,
      width: 200,
      height:150,
    });
    modelessGroup.create('modelessClose6', 'Modeless6', 'Modeless Content', {
      draggable: true,
      minimizable: true,
      top: 200,
      left: 600,
      width: 200,
      height:150,
    });
    btnModelessGroupCloseAll.addEventListener('click', (e) => {      
      modelessGroup.closeAll();
    });
    
  })();
</script>
  `;
};
