import { css, CSSResultGroup, html, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import globalCss from "./styles/modeless.scss?inline";
import { ModelessElement } from './modeless.element';

export interface ModelessGroupModel {
  id: string,
  title?: string,
  content?: string | HTMLElement,
  option?: ModelessOptionModel,
}

export interface ModelessOptionModel {
  draggable?: boolean;
  resizable?: boolean;
  edge?: boolean;
  closable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

@customElement('sy-modeless-group')
export class ModelessGroupElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCss)};`;  
  @state() private modelessList: ModelessElement[] = [];

  public create(
    id: string, 
    title?: string | HTMLElement,
    content?: string | HTMLElement, 
    option?: ModelessOptionModel
  ) {
    if (!id) {
      console.error('ID is required');
      return;
    }
    
    const exist = this.modelessList.find(element => element.id === id);
    if(exist) {
      console.error('ID already exists');
      return;
    }

    // console.log('Creating modeless with ID:', id);
  
    // Ensure the Custom Element definition is available before creating an instance
    const modeless = document.createElement('sy-modeless') as ModelessElement;
    if(!modeless) {
      return;
    }

    modeless.id = id;
    modeless.setAttribute('open', 'true');
  
    if (option) {
      if (option.draggable) modeless.setAttribute('draggable', 'true');
      if (option.resizable) modeless.setAttribute('resizable', 'true');
      if (option.edge) modeless.setAttribute('edge', 'true');
      if (option.closable) modeless.setAttribute('closable', 'true');
      if (option.maximizable) modeless.setAttribute('maximizable', 'true');
      if (option.minimizable) modeless.setAttribute('minimizable', 'true');
      if (option.top !== undefined) modeless.setAttribute('top', option.top.toString());
      if (option.left !== undefined) modeless.setAttribute('left', option.left.toString());
      if (option.width) modeless.setAttribute('width', option.width.toString());
      if (option.height) modeless.setAttribute('height', option.height.toString());
    }
  
    if (content) {
      const contentSlot = this.createSlotElement(content, 'content');
      modeless.appendChild(contentSlot);
    }
    
    if (title) {
      const titleSlot = this.createSlotElement(title, 'title');
      modeless.appendChild(titleSlot);
    }
  

    modeless.addEventListener('closed', (e: any) => {
      if(e.detail?.id) {
        this.modelessList = this.modelessList.filter(element => element.id !== e.detail.id);
      }
    });

    this.modelessList.push(modeless);
    
    // console.log('Appending modeless to body:', modeless);
    document.body.appendChild(modeless);
  }

  public updateContent(id: string, content: string | HTMLElement) {
    const modeless = this.modelessList.find(element => element.id === id);
    if (!modeless) {
      console.error(`Modeless element with id ${id} not found`);
      return;
    }
  
    const contentSlot = modeless.querySelector('[slot="content"]');
    if (contentSlot) {
      contentSlot.innerHTML = '';
      if (typeof content === 'string') {
        contentSlot.innerHTML = content;
      } else {
        contentSlot.appendChild(content);
      }
    } else {
      const newContentSlot = this.createSlotElement(content, 'content');
      modeless.appendChild(newContentSlot);
    }
  }

  public updateTitle(id: string, title: string | HTMLElement) {
    const modeless = this.modelessList.find(element => element.id === id);
    if (!modeless) {
      console.error(`Modeless element with id ${id} not found`);
      return;
    }
  
    const titleSlot = modeless.querySelector('[slot="title"]');
    if (titleSlot) {
      titleSlot.innerHTML = '';
      if (typeof title === 'string') {
        titleSlot.innerHTML = title;
      } else {
        titleSlot.appendChild(title);
      }
    } else {
      const newTitleSlot = this.createSlotElement(title, 'title');
      modeless.appendChild(newTitleSlot);
    }
  }

  public updateOption(id: string, option: ModelessOptionModel) {
    const modeless = this.modelessList.find(element => element.id === id);
    if (!modeless) {
      console.error(`Modeless element with id ${id} not found`);
      return;
    }
  
    if (option.draggable !== undefined) {
      modeless.setAttribute('draggable', option.draggable ? 'true' : 'false');
    }
    if (option.resizable !== undefined) {
      modeless.setAttribute('resizable', option.resizable ? 'true' : 'false');
    }
    if (option.edge !== undefined) {
      modeless.setAttribute('edge', option.edge ? 'true' : 'false');
    }
    if (option.closable !== undefined) {
      modeless.setAttribute('closable', option.closable ? 'true' : 'false');
    }
    if (option.maximizable !== undefined) {
      modeless.setAttribute('maximizable', option.maximizable ? 'true' : 'false');
    }
    if (option.minimizable !== undefined) {
      modeless.setAttribute('minimizable', option.minimizable ? 'true' : 'false');
    }
    if (option.top !== undefined) {
      modeless.style.top = `${option.top}px`;
    }
    if (option.left !== undefined) {
      modeless.style.left = `${option.left}px`;
    }
    if (option.width !== undefined) {
      modeless.style.width = `${option.width}px`;
    }
    if (option.height !== undefined) {
      modeless.style.height = `${option.height}px`;
    }
  }

  public close(id: string) {
    const modeless = this.modelessList.find(element => element.id === id);
    if (!modeless) {
      console.error(`Modeless element with id ${id} not found`);
      return;
    }

    modeless.setClose();

    this.modelessList = this.modelessList.filter(element => element.id !== id);
  }
  
  public closeAll() {
    this.modelessList.forEach(modeless => {
      modeless.setClose();
    });

    this.modelessList = [];
  }

  private createSlotElement(content: string | HTMLElement, slotName?: string): HTMLElement {
    const slotElement = document.createElement('div');
    if (slotName) {
      slotElement.setAttribute('slot', slotName);
    }
    
    if (typeof content === 'string') {
      slotElement.innerHTML = content;
    } else {
      slotElement.appendChild(content);
    }
    
    return slotElement;
  }

  render() {
    return html`<slot></slot>`;
  }
}
