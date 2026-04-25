import { p as proxyCustomElement, H, h } from './index.js';
import { d as defineCustomElement$3 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$2 } from './p-C0kAmQv-.js';

const syModelessCss = ".sc-sy-modeless-group-h{display:none;position:absolute;border:var(--border-small) var(--modeless-container-border-enabled);background:var(--modeless-content-background-enabled);min-width:180px;min-height:44px;box-shadow:var(--box-shadow);resize:none;overflow:hidden;z-index:var(--z-index-modeless)}[open].sc-sy-modeless-group-h{display:flex;flex-direction:column}.header.sc-sy-modeless-group{display:flex;height:var(--header-medium);min-height:var(--header-medium);justify-content:space-between;align-items:center;box-sizing:border-box;background-color:var(--modeless-header-background-enabled);padding:var(--spacing-xsmall) var(--spacing-small);color:var(--modeless-header-text-enabled)}.header.sc-sy-modeless-group .title.sc-sy-modeless-group{min-width:70px;overflow:hidden;text-overflow:ellipsis}.header.sc-sy-modeless-group sy-icon.sc-sy-modeless-group{justify-content:center;align-items:center}[draggable].sc-sy-modeless-group-h .header.sc-sy-modeless-group{cursor:move}.title.sc-sy-modeless-group{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-items:center;font-family:\"Roboto\";font-size:16px;font-weight:500;line-height:24px;letter-spacing:0.15px}.title.sc-sy-modeless-group slot.sc-sy-modeless-group{overflow:hidden;text-overflow:ellipsis}.header-icons.sc-sy-modeless-group{display:flex;gap:var(--spacing-xsmall)}.header-icons.sc-sy-modeless-group sy-icon.sc-sy-modeless-group{color:var(--modeless-header-icon-enabled);fill:var(--modeless-header-icon-enabled)}.header-icons.sc-sy-modeless-group sy-icon.sc-sy-modeless-group:hover{color:var(--modeless-header-icon-hover);fill:var(--modeless-header-icon-hover)}.header-icons.sc-sy-modeless-group sy-icon.sc-sy-modeless-group:active{color:var(--modeless-header-icon-active);fill:var(--modeless-header-icon-active)}.body.sc-sy-modeless-group{background:var(--modeless-content-background-enabled);color:var(--modeless-content-text-enabled);padding:var(--spacing-small);border-top:var(--border-small) var(--modeless-content-border-enabled);height:-webkit-fill-available;overflow:auto;display:block}.body.minimum.sc-sy-modeless-group{display:none}.resize-handle.sc-sy-modeless-group{position:absolute;background:transparent}.resize-handle.bottom-right.sc-sy-modeless-group{width:10px;height:10px;right:0;bottom:0;cursor:se-resize}.resize-handle.bottom-left.sc-sy-modeless-group{width:var(--spacing-xsmall);height:var(--spacing-xsmall);left:0;bottom:0;cursor:sw-resize}.resize-handle.top-right.sc-sy-modeless-group{width:var(--spacing-xsmall);height:var(--spacing-xsmall);right:0;top:0;cursor:ne-resize}.resize-handle.top-left.sc-sy-modeless-group{width:var(--spacing-xsmall);height:var(--spacing-xsmall);left:0;top:0;cursor:nw-resize}.resize-handle.top.sc-sy-modeless-group{height:var(--spacing-xsmall);left:0;right:0;top:0;cursor:n-resize}.resize-handle.bottom.sc-sy-modeless-group{height:var(--spacing-xsmall);left:0;right:0;bottom:0;cursor:s-resize}.resize-handle.left.sc-sy-modeless-group{width:var(--spacing-xsmall);top:0;bottom:0;left:0;cursor:w-resize}.resize-handle.right.sc-sy-modeless-group{width:var(--spacing-xsmall);top:0;bottom:0;right:0;cursor:e-resize}sy-modeless[maximum][maximizable].sc-sy-modeless-group-h{top:0px !important;left:0px !important;width:100% !important;height:100% !important;box-sizing:border-box}[minimum].sc-sy-modeless-group-h{position:fixed !important}sy-modeless[minimum].sc-sy-modeless-group{position:fixed !important}sy-modeless.sc-sy-modeless-group-h{opacity:1}@keyframes animation{0%{opacity:0}100%{opacity:1}}";

const SyModelessGroup$1 = /*@__PURE__*/ proxyCustomElement(class SyModelessGroup extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    modelessList = [];
    async create(id, title, content, option) {
        if (!id) {
            console.error('ID is required');
            return;
        }
        const exist = this.modelessList.find(element => element.id === id);
        if (exist) {
            console.error('ID already exists');
            return;
        }
        const modeless = document.createElement('sy-modeless');
        if (!modeless) {
            return;
        }
        modeless.id = id;
        modeless.open = true;
        if (option) {
            if (option.draggable)
                modeless.draggable = true;
            if (option.resizable)
                modeless.resizable = true;
            if (option.edge)
                modeless.edge = true;
            if (option.closable)
                modeless.closable = true;
            if (option.maximizable)
                modeless.maximizable = true;
            if (option.minimizable)
                modeless.minimizable = true;
            if (option.top !== undefined)
                modeless.top = option.top;
            if (option.left !== undefined)
                modeless.left = option.left;
            if (option.width)
                modeless.width = option.width;
            if (option.height)
                modeless.height = option.height;
        }
        if (content) {
            const contentSlot = this.createSlotElement(content, 'content');
            modeless.appendChild(contentSlot);
        }
        if (title) {
            const titleSlot = this.createSlotElement(title, 'title');
            modeless.appendChild(titleSlot);
        }
        modeless.addEventListener('closed', (e) => {
            if (e.detail?.id) {
                this.modelessList = this.modelessList.filter(element => element.id !== e.detail.id);
            }
        });
        this.modelessList = [...this.modelessList, modeless];
        document.body.appendChild(modeless);
    }
    async updateContent(id, content) {
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
            }
            else if (content instanceof H) {
                contentSlot.appendChild(content);
            }
        }
        else {
            const newContentSlot = this.createSlotElement(content, 'content');
            modeless.appendChild(newContentSlot);
        }
    }
    async updateTitle(id, title) {
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
            }
            else if (title instanceof H) {
                titleSlot.appendChild(title);
            }
        }
        else {
            const newTitleSlot = this.createSlotElement(title, 'title');
            modeless.appendChild(newTitleSlot);
        }
    }
    async updateOption(id, option) {
        const modeless = this.modelessList.find(element => element.id === id);
        if (!modeless) {
            console.error(`Modeless element with id ${id} not found`);
            return;
        }
        if (option.draggable !== undefined)
            modeless.draggable = option.draggable;
        if (option.resizable !== undefined)
            modeless.resizable = option.resizable;
        if (option.edge !== undefined)
            modeless.edge = option.edge;
        if (option.closable !== undefined)
            modeless.closable = option.closable;
        if (option.maximizable !== undefined)
            modeless.maximizable = option.maximizable;
        if (option.minimizable !== undefined)
            modeless.minimizable = option.minimizable;
        if (option.top !== undefined)
            modeless.top = option.top;
        if (option.left !== undefined)
            modeless.left = option.left;
        if (option.width !== undefined)
            modeless.width = option.width;
        if (option.height !== undefined)
            modeless.height = option.height;
    }
    async close(id) {
        const modeless = this.modelessList.find(element => element.id === id);
        if (!modeless) {
            console.error(`Modeless element with id ${id} not found`);
            return;
        }
        await modeless.setClose();
        this.modelessList = this.modelessList.filter(element => element.id !== id);
    }
    async closeAll() {
        this.modelessList.forEach(modeless => {
            modeless.setClose();
        });
        this.modelessList = [];
    }
    createSlotElement(content, slotName) {
        const slotElement = document.createElement('div');
        if (slotName) {
            slotElement.setAttribute('slot', slotName);
        }
        if (typeof content === 'string') {
            slotElement.innerHTML = content;
        }
        else if (content instanceof H) {
            slotElement.appendChild(content);
        }
        return slotElement;
    }
    render() {
        return h("slot", { key: '7baf36c6dd3347fd46e5bd08af0412ee10117ba4' });
    }
    static get style() { return syModelessCss; }
}, [262, "sy-modeless-group", {
        "modelessList": [32],
        "create": [64],
        "updateContent": [64],
        "updateTitle": [64],
        "updateOption": [64],
        "close": [64],
        "closeAll": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-modeless-group", "sy-icon", "sy-modeless"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-modeless-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyModelessGroup$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-modeless":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyModelessGroup = SyModelessGroup$1;
const defineCustomElement = defineCustomElement$1;

export { SyModelessGroup, defineCustomElement };
