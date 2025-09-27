import { Component, Element, h, Method, State, VNode } from '@stencil/core';

export interface HTMLSyModelessGroupElement extends HTMLElement {
  create: (
    id: string, 
    title?: string | HTMLElement | VNode,
    content?: string | HTMLElement | VNode, 
    option?: Partial<Pick<HTMLSyModelessElement, 'draggable' | 'resizable' | 'edge' | 'closable' | 'maximizable' | 'minimizable' | 'top' | 'left' | 'width' | 'height'>>
  ) => Promise<void>;
  updateContent: (id: string, content: string | HTMLElement | VNode) => Promise<void>;
  updateTitle: (id: string, title: string | HTMLElement | VNode) => Promise<void>;
  updateOption: (id: string, option: Partial<Pick<HTMLSyModelessElement, 'draggable' | 'resizable' | 'edge' | 'closable' | 'maximizable' | 'minimizable' | 'top' | 'left' | 'width' | 'height'>>) => Promise<void>;
  close: (id: string) => Promise<void>;
  closeAll: () => Promise<void>;
}

export interface ModelessGroupModel {
  id: string,
  title?: string | HTMLElement | VNode,
  content?: string | HTMLElement | VNode,
  option?: Partial<Pick<HTMLSyModelessElement, 'draggable' | 'resizable' | 'edge' | 'closable' | 'maximizable' | 'minimizable' | 'top' | 'left' | 'width' | 'height'>>,
}


@Component({
  tag: 'sy-modeless-group',
  styleUrl: 'sy-modeless.scss',
  scoped: true,
})
export class SyModelessGroup {
  @Element() host: HTMLSyModelessGroupElement;
  @State() private modelessList: HTMLSyModelessElement[] = [];

  @Method()
  async create(
    id: string, 
    title?: string | HTMLElement | VNode,
    content?: string | HTMLElement | VNode, 
    option?: Partial<Pick<HTMLSyModelessElement, 'draggable' | 'resizable' | 'edge' | 'closable' | 'maximizable' | 'minimizable' | 'top' | 'left' | 'width' | 'height'>>
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

    const modeless = document.createElement('sy-modeless');
    if(!modeless) {
      return;
    }

    modeless.id = id;
    modeless.open = true;
  
    if (option) {
      if (option.draggable) modeless.draggable = true;
      if (option.resizable) modeless.resizable = true;
      if (option.edge) modeless.edge = true;
      if (option.closable) modeless.closable = true;
      if (option.maximizable) modeless.maximizable = true;
      if (option.minimizable) modeless.minimizable = true;
      if (option.top !== undefined) modeless.top = option.top;
      if (option.left !== undefined) modeless.left = option.left;
      if (option.width) modeless.width = option.width;
      if (option.height) modeless.height = option.height;
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

    this.modelessList = [...this.modelessList, modeless];
    document.body.appendChild(modeless);
  }

  @Method()
  async updateContent(id: string, content: string | HTMLElement | VNode) {
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
      } else if (content instanceof HTMLElement) {
        contentSlot.appendChild(content);
      }
    } else {
      const newContentSlot = this.createSlotElement(content, 'content');
      modeless.appendChild(newContentSlot);
    }
  }

  @Method()
  async updateTitle(id: string, title: string | HTMLElement | VNode) {
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
      } else if (title instanceof HTMLElement) {
        titleSlot.appendChild(title);
      }
    } else {
      const newTitleSlot = this.createSlotElement(title, 'title');
      modeless.appendChild(newTitleSlot);
    }
  }

  @Method()
    async updateOption(id: string, option: Partial<Pick<HTMLSyModelessElement, 'draggable' | 'resizable' | 'edge' | 'closable' | 'maximizable' | 'minimizable' | 'top' | 'left' | 'width' | 'height'>>) {
    const modeless = this.modelessList.find(element => element.id === id);
    if (!modeless) {
      console.error(`Modeless element with id ${id} not found`);
      return;
    }
  
    if (option.draggable !== undefined) modeless.draggable = option.draggable;
    if (option.resizable !== undefined) modeless.resizable = option.resizable;
    if (option.edge !== undefined) modeless.edge = option.edge;
    if (option.closable !== undefined) modeless.closable = option.closable;
    if (option.maximizable !== undefined) modeless.maximizable = option.maximizable;
    if (option.minimizable !== undefined) modeless.minimizable = option.minimizable;
    if (option.top !== undefined) modeless.top = option.top;
    if (option.left !== undefined) modeless.left = option.left;
    if (option.width !== undefined) modeless.width = option.width;
    if (option.height !== undefined) modeless.height = option.height;
  }

  @Method()
  async close(id: string) {
    const modeless = this.modelessList.find(element => element.id === id);
    if (!modeless) {
      console.error(`Modeless element with id ${id} not found`);
      return;
    }

    await modeless.setClose();
    this.modelessList = this.modelessList.filter(element => element.id !== id);
  }
  
  @Method()
  async closeAll() {
    this.modelessList.forEach(modeless => {
      modeless.setClose();
    });
    this.modelessList = [];
  }

  private createSlotElement(content: string | HTMLElement | VNode, slotName?: string): HTMLElement {
    const slotElement = document.createElement('div');
    if (slotName) {
      slotElement.setAttribute('slot', slotName);
    }
    
    if (typeof content === 'string') {
      slotElement.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      slotElement.appendChild(content);
    }
    
    return slotElement;
  }

  render() {
    return <slot />;
  }
}
