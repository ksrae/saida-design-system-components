import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$6 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$5 } from './p-BTJnmsnM.js';
import { d as defineCustomElement$4 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$3 } from './p-BYla455P.js';
import { d as defineCustomElement$2 } from './p-Bd6oegtc.js';
import { d as defineCustomElement$1 } from './p-C0DM0GPD.js';

const syTreeItemCss = ".sc-sy-tree-item:root,.sc-sy-tree-item-h{display:block}.sc-sy-tree-item:root .tree-item-list.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-list.sc-sy-tree-item{display:flex;align-items:center;height:calc(var(--component-small) + 2px);border:1px solid transparent;box-sizing:fit-content;width:fit-content;box-sizing:border-box;height:var(--component-small)}.sc-sy-tree-item:root .tree-item-list.disabled.sc-sy-tree-item .tree-item-group.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-list.disabled.sc-sy-tree-item .tree-item-group.sc-sy-tree-item{color:var(--tree-item-text-disabled)}.sc-sy-tree-item:root .tree-item-list.disabled.sc-sy-tree-item:hover .tree-item.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-list.disabled.sc-sy-tree-item:hover .tree-item.sc-sy-tree-item{color:var(--tree-item-text-disabled);background:none !important}.sc-sy-tree-item:root .tree-item-list.fixed.sc-sy-tree-item .tree-item.sc-sy-tree-item:hover,.sc-sy-tree-item-h .tree-item-list.fixed.sc-sy-tree-item .tree-item.sc-sy-tree-item:hover{background:none}.sc-sy-tree-item:root .tree-item-group.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-group.sc-sy-tree-item{display:flex;flex-direction:row;justify-content:space-between;cursor:auto;color:var(--tree-item-text-enabled);box-sizing:border-box;gap:var(--spacing-3xsmall);white-space:nowrap;line-height:var(--spacing-medium)}.sc-sy-tree-item:root .tree-item-group.sc-sy-tree-item .add-item.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-group.sc-sy-tree-item .add-item.sc-sy-tree-item{width:-webkit-fill-available}.sc-sy-tree-item:root .tree-item-group.sc-sy-tree-item .tree-item.sc-sy-tree-item sy-icon.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-group.sc-sy-tree-item .tree-item.sc-sy-tree-item sy-icon.sc-sy-tree-item{margin:var(--spacing-4xsmall)}.sc-sy-tree-item:root .tree-item-group.sc-sy-tree-item .tree-item.sc-sy-tree-item sy-tag.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-group.sc-sy-tree-item .tree-item.sc-sy-tree-item sy-tag.sc-sy-tree-item{padding-left:var(--spacing-4xsmall);padding-right:var(--spacing-4xsmall)}.sc-sy-tree-item:root .tree-item-group.sc-sy-tree-item .tree-item.sc-sy-tree-item:overflow,.sc-sy-tree-item-h .tree-item-group.sc-sy-tree-item .tree-item.sc-sy-tree-item:overflow{overflow:hidden;text-overflow:ellipsis}.sc-sy-tree-item:root .tree-item-group.sc-sy-tree-item .item-content.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item-group.sc-sy-tree-item .item-content.sc-sy-tree-item{display:inline-flex;overflow:hidden;text-overflow:ellipsis;align-self:center;align-items:center;line-height:normal;min-width:0;padding-left:var(--spacing-4xsmall);padding-right:var(--spacing-4xsmall)}.sc-sy-tree-item:root .space.sc-sy-tree-item,.sc-sy-tree-item-h .space.sc-sy-tree-item{white-space:pre}.sc-sy-tree-item:root .highlight.sc-sy-tree-item,.sc-sy-tree-item-h .highlight.sc-sy-tree-item{color:red}.sc-sy-tree-item:root .tree-item.sc-sy-tree-item,.sc-sy-tree-item-h .tree-item.sc-sy-tree-item{display:flex;align-items:center;height:var(--component-small);box-sizing:border-box}.sc-sy-tree-item:root .tree-item.sc-sy-tree-item:hover,.sc-sy-tree-item-h .tree-item.sc-sy-tree-item:hover{color:var(--tree-item-text-hover)}.sc-sy-tree-item:root .expand-icon.sc-sy-tree-item,.sc-sy-tree-item-h .expand-icon.sc-sy-tree-item{height:24px;color:var(--tree-caret-icon-enabled);display:flex;align-items:center;justify-content:center}.sc-sy-tree-item:root .tree-check.sc-sy-tree-item,.sc-sy-tree-item-h .tree-check.sc-sy-tree-item{height:24px;flex:1;display:inline-block}.sc-sy-tree-item:root .tree-check.sc-sy-tree-item .checkbox-wrapper.sc-sy-tree-item,.sc-sy-tree-item-h .tree-check.sc-sy-tree-item .checkbox-wrapper.sc-sy-tree-item{flex:1}.sc-sy-tree-item:root .tree-check.sc-sy-tree-item sy-checkbox.sc-sy-tree-item,.sc-sy-tree-item-h .tree-check.sc-sy-tree-item sy-checkbox.sc-sy-tree-item{width:100%}.sc-sy-tree-item:root .tree-check.sc-sy-tree-item sy-checkbox.sc-sy-tree-item .checkbox.sc-sy-tree-item,.sc-sy-tree-item-h .tree-check.sc-sy-tree-item sy-checkbox.sc-sy-tree-item .checkbox.sc-sy-tree-item{gap:0px}.sc-sy-tree-item:root .tree-editable.sc-sy-tree-item,.sc-sy-tree-item-h .tree-editable.sc-sy-tree-item{flex:none;height:-webkit-fill-available;width:72px;display:none}.sc-sy-tree-item:root .tree-editable.sc-sy-tree-item sy-button.sc-sy-tree-item,.sc-sy-tree-item-h .tree-editable.sc-sy-tree-item sy-button.sc-sy-tree-item{width:var(--component-small);height:24px;align-items:center;display:flex;justify-content:center;margin:0px;gap:0px}.sc-sy-tree-item:root .tree-editable.edit-on.sc-sy-tree-item,.sc-sy-tree-item-h .tree-editable.edit-on.sc-sy-tree-item{display:inline-flex}.sc-sy-tree-item:root .dragging.sc-sy-tree-item,.sc-sy-tree-item-h .dragging.sc-sy-tree-item{opacity:0.5}.sc-sy-tree-item:root .drop-target.sc-sy-tree-item,.sc-sy-tree-item-h .drop-target.sc-sy-tree-item{border:1px dashed var(--tree-line-border-enabled);box-sizing:border-box}.sc-sy-tree-item:root .editable-label.sc-sy-tree-item,.sc-sy-tree-item-h .editable-label.sc-sy-tree-item{box-sizing:border-box}.sc-sy-tree-item:root .action-buttons.sc-sy-tree-item,.sc-sy-tree-item-h .action-buttons.sc-sy-tree-item{margin-left:auto}.sc-sy-tree-item:root button.sc-sy-tree-item,.sc-sy-tree-item-h button.sc-sy-tree-item{margin-left:var(--spacing-3xsmall)}.sc-sy-tree-item:root .input-container.sc-sy-tree-item,.sc-sy-tree-item-h .input-container.sc-sy-tree-item{display:flex;align-items:center;width:fit-content}.sc-sy-tree-item:root .input-container.sc-sy-tree-item .add-item.sc-sy-tree-item,.sc-sy-tree-item-h .input-container.sc-sy-tree-item .add-item.sc-sy-tree-item{margin-left:var(--spacing-3xsmall);flex:none}sy-tree-item[clickable].sc-sy-tree-item-h .tree-item-group.sc-sy-tree-item{cursor:pointer}sy-tree-item[clickable].sc-sy-tree-item-h .tree-item-selected.sc-sy-tree-item .tree-item.sc-sy-tree-item{color:var(--tree-item-text-selected);background-color:var(--tree-item-background-selected);border-radius:var(--border-radius-small)}sy-tree-item[clickable].sc-sy-tree-item-h .tree-item.sc-sy-tree-item:hover{color:var(--tree-item-text-hover);background:var(--tree-item-background-hover)}sy-tree-item.sc-sy-tree-item-h .children.sc-sy-tree-item{padding-left:var(--spacing-large)}sy-tree-item[expandable].level-1.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-1.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-1.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-1.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-1.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-1.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-1.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-1.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-1.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-2.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-2.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-2.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-2.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-2.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-2.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-2.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-2.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-2.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-3.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-3.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-3.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-3.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-3.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-3.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-3.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-3.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-3.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-4.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-4.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-4.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-4.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-4.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-4.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-4.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-4.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-4.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-5.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-5.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-5.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-5.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-5.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-5.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-5.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-5.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-5.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-6.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-6.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-6.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-6.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-6.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-6.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-6.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-6.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-6.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-7.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-7.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-7.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-7.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-7.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-7.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-7.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-7.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-7.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-8.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-8.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-8.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-8.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-8.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-8.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-8.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-8.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-8.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-9.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-9.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-9.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-9.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-9.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-9.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-9.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-9.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-9.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-10.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-10.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-10.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-10.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-10.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-10.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-10.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-10.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-10.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-11.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-11.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-11.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-11.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-11.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-11.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-11.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-11.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-11.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-12.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-12.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-12.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-12.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-12.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-12.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-12.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-12.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-12.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-13.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-13.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-13.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-13.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-13.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-13.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-13.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-13.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-13.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-14.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-14.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-14.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-14.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-14.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-14.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-14.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-14.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-14.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-15.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-15.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-15.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-15.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-15.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-15.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-15.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-15.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-15.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-16.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-16.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-16.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-16.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-16.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-16.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-16.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-16.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-16.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-17.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-17.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-17.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-17.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-17.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-17.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-17.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-17.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-17.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-18.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-18.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-18.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-18.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-18.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-18.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-18.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-18.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-18.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-19.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-19.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-19.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-19.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-19.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-19.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-19.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-19.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-19.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-20.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-20.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-20.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-20.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-20.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-20.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-20.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-20.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-20.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-21.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-21.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-21.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-21.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-21.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-21.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-21.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-21.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-21.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-22.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-22.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-22.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-22.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-22.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-22.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-22.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-22.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-22.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-23.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-23.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-23.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-23.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-23.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-23.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-23.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-23.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-23.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-24.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-24.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-24.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-24.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-24.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-24.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-24.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-24.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-24.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-25.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-25.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-25.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-25.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-25.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-25.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-25.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-25.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-25.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-26.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-26.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-26.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-26.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-26.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-26.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-26.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-26.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-26.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-27.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-27.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-27.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-27.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-27.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-27.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-27.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-27.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-27.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-28.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-28.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-28.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-28.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-28.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-28.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-28.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-28.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-28.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-29.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-29.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-29.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-29.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-29.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-29.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-29.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-29.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-29.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-30.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-30.sc-sy-tree-item-h,sy-tree-item[expandable][checkable][line].level-30.sc-sy-tree-item-h{position:relative}sy-tree-item[expandable][line].level-30.sc-sy-tree-item-h:before,sy-tree-item[expandable][checkable][line].level-30.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[line].level-30.sc-sy-tree-item-h,sy-tree-item[checkable][line].level-30.sc-sy-tree-item-h{position:relative}sy-tree-item[line].level-30.sc-sy-tree-item-h:before,sy-tree-item[checkable][line].level-30.sc-sy-tree-item-h:before{content:\"\";position:absolute;border-left:1px solid var(--tree-line-border-enabled);display:inline-block;left:-10px;top:-1px;width:1px;height:calc(100% + 3px)}sy-tree-item[expandable].level-1.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-1.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-1.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-1.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-1.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-1.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-2.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-2.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-2.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-2.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-2.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-2.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-3.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-3.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-3.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-3.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-3.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-3.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-4.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-4.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-4.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-4.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-4.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-4.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-5.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-5.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-5.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-5.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-5.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-5.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-6.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-6.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-6.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-6.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-6.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-6.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-7.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-7.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-7.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-7.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-7.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-7.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-8.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-8.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-8.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-8.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-8.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-8.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-9.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-9.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-9.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-9.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-9.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-9.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-10.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-10.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-10.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-10.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-10.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-10.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-11.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-11.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-11.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-11.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-11.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-11.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-12.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-12.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-12.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-12.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-12.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-12.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-13.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-13.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-13.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-13.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-13.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-13.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-14.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-14.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-14.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-14.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-14.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-14.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-15.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-15.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-15.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-15.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-15.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-15.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-16.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-16.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-16.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-16.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-16.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-16.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-17.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-17.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-17.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-17.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-17.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-17.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-18.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-18.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-18.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-18.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-18.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-18.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-19.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-19.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-19.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-19.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-19.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-19.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-20.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-20.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-20.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-20.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-20.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-20.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-21.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-21.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-21.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-21.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-21.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-21.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-22.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-22.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-22.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-22.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-22.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-22.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-23.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-23.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-23.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-23.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-23.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-23.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-24.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-24.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-24.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-24.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-24.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-24.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-25.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-25.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-25.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-25.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-25.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-25.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-26.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-26.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-26.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-26.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-26.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-26.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-27.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-27.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-27.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-27.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-27.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-27.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-28.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-28.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-28.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-28.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-28.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-28.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-29.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-29.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-29.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-29.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-29.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-29.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable].level-30.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][checkable].level-30.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][line].level-30.sc-sy-tree-item-h{padding-left:var(--spacing-large)}sy-tree-item[expandable][haschild].level-30.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][checkable][haschild].level-30.sc-sy-tree-item-h{padding-left:0px}sy-tree-item[expandable][line][haschild].level-30.sc-sy-tree-item-h{padding-left:0px}.tree-item-list.disabled[draggable=true].sc-sy-tree-item{cursor:auto}";

const SyTreeItem = /*@__PURE__*/ proxyCustomElement(class SyTreeItem extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.expandChanged = createEvent(this, "expandChanged");
        this.checkChanged = createEvent(this, "checkChanged");
        this.itemAdded = createEvent(this, "itemAdded");
        this.itemRemoved = createEvent(this, "itemRemoved");
        this.itemEdited = createEvent(this, "itemEdited");
        this.itemUpdating = createEvent(this, "itemUpdating");
        this.itemUpdatingReset = createEvent(this, "itemUpdatingReset");
        this.itemDrop = createEvent(this, "itemDrop");
        this.itemSelected = createEvent(this, "itemSelected");
        this.draggingEvent = createEvent(this, "draggingEvent");
    }
    get host() { return this; }
    // --- Props ---
    appendable = false;
    checkable = false;
    checked = false;
    clickable = false;
    disabled = false;
    treeitemDraggable = false;
    dragging = false;
    editable = false;
    expandable = false;
    expanded = false;
    fixed = false;
    hasChild = false;
    appendPlaceholder = 'New item';
    icon = '';
    indeterminate = false;
    isDescendant = false;
    isEditable = false;
    label = '';
    level = 0;
    removable = false;
    treeChildren = [];
    tagMessage = '';
    tagVariant = undefined;
    value = '';
    searchTerm = '';
    selectedValue = '';
    nodeWidth = null;
    line = false;
    // --- State ---
    hovered = false;
    isEditing = false;
    isAdding = false;
    newChildLabel = '';
    hasDropTarget = false;
    editingLabel = this.label;
    textTerm = '';
    active = false;
    tooltipOpen = false;
    overflow = false;
    originalHtmlParts = [];
    // --- Events ---
    expandChanged;
    checkChanged;
    itemAdded;
    itemRemoved;
    itemEdited;
    itemUpdating;
    itemUpdatingReset;
    itemDrop;
    itemSelected;
    draggingEvent;
    // --- Lifecycle Methods ---
    componentWillLoad() {
        this.hasChild = fnAssignPropFromAlias(this.host, 'has-child') ?? this.hasChild;
        this.appendPlaceholder = fnAssignPropFromAlias(this.host, 'append-placeholder') ?? this.appendPlaceholder;
        this.isDescendant = fnAssignPropFromAlias(this.host, 'is-descendant') ?? this.isDescendant;
        this.isEditable = fnAssignPropFromAlias(this.host, 'is-editable') ?? this.isEditable;
        this.tagMessage = fnAssignPropFromAlias(this.host, 'tag-message') ?? this.tagMessage;
        this.tagVariant = fnAssignPropFromAlias(this.host, 'tag-variant') ?? this.tagVariant;
        this.searchTerm = fnAssignPropFromAlias(this.host, 'searchTerm') ?? this.searchTerm;
        this.selectedValue = fnAssignPropFromAlias(this.host, 'selected-value') ?? this.selectedValue;
        this.nodeWidth = fnAssignPropFromAlias(this.host, 'node-width') ?? this.nodeWidth;
        this.active = (this.value?.toString() === this.selectedValue?.toString());
        this.updateLevelClass();
        // Initialize textTerm with label so it displays on first render
        this.renderLabelWithHighlight(this.label, this.searchTerm);
    }
    componentDidLoad() {
        this.setTreetoCheckbox();
    }
    disconnectedCallback() {
        document.removeEventListener("keydown", this.handleNewChildDocumentKeydown);
    }
    // --- Watchers ---
    handleLevelChange() {
        this.updateLevelClass();
    }
    handleLabelOrSearchChange() {
        this.renderLabelWithHighlight(this.label, this.searchTerm);
    }
    handleSelectedValueChange() {
        this.active = (this.value?.toString() === this.selectedValue?.toString());
    }
    handleNodeWidthChange() {
        this.renderLabelWithHighlight(this.label, this.searchTerm);
    }
    handleCheckableChange() {
        this.setTreetoCheckbox();
    }
    // --- Public Methods ---
    async setOverflow() {
        let effectiveNodeWidth = this.nodeWidth;
        if (!effectiveNodeWidth) {
            const parentTree = this.host.closest('sy-tree');
            if (parentTree && parentTree.nodeWidth) {
                effectiveNodeWidth = parentTree.nodeWidth;
            }
        }
        if (!effectiveNodeWidth)
            return;
        requestAnimationFrame(() => {
            this.renderLabelWithHighlight(this.label, this.searchTerm);
            const treeItem = this.host.querySelector('.tree-item');
            if (treeItem) {
                const actualWidth = treeItem.getBoundingClientRect().width;
                if (actualWidth >= effectiveNodeWidth) {
                    this.overflow = true;
                }
                else {
                    this.overflow = false;
                }
            }
        });
    }
    // --- Render ---
    render() {
        const isEditableActive = this.isEditable && !this.disabled && this.hovered;
        const treeItemListClasses = {
            'tree-item-list': true,
            'line': this.line,
            'dragging': this.dragging && !this.disabled,
            'drop-target': this.hasDropTarget && !this.isDescendant,
            'tree-item-selected': this.active,
            [`level-${this.level}`]: true,
            'isLeaf': !this.hasChild,
            'disabled': this.disabled,
            'fixed': this.fixed
        };
        const treeItemListStyle = {
            '--level': this.level.toString(),
            ...(this.nodeWidth ? { maxWidth: `${this.nodeWidth}px` } : {})
        };
        return (h("div", { key: '17280d18d6378681873a4e3ada6fd3c27570f407', class: "tree-item-wrapper" }, h("div", { key: '341e21109589991a29668e571ac39196424484ae', class: treeItemListClasses, style: treeItemListStyle, draggable: this.treeitemDraggable && !this.isEditing, onDragStart: this.handleDragStart.bind(this), onDragEnd: this.handleDragEnd.bind(this), onDragOver: this.handleDragOver.bind(this), onDrop: this.handleDrop.bind(this), onDragLeave: this.handleDragLeave.bind(this), onClick: this.handleItemClick.bind(this), onMouseEnter: this.handleMouseEnter.bind(this), onMouseLeave: this.handleMouseLeave.bind(this) }, this.expandable && this.hasChild ? (h("span", { class: "expand-icon", onClick: this.handleExpandClick.bind(this) }, this.expanded ? (h("sy-icon", { size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M480 224C492.9 224 504.6 231.8 509.6 243.8C514.6 255.8 511.8 269.5 502.7 278.7L342.7 438.7C330.2 451.2 309.9 451.2 297.4 438.7L137.4 278.7C128.2 269.5 125.5 255.8 130.5 243.8C135.5 231.8 147.1 224 160 224L480 224z" })))) : (h("sy-icon", { size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M224.5 160C224.5 147.1 232.3 135.4 244.3 130.4C256.3 125.4 270 128.2 279.1 137.4L439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C269.9 511.9 256.2 514.6 244.2 509.6C232.2 504.6 224.5 492.9 224.5 480L224.5 160z" })))))) : null, this.checkable ? (h("div", { class: "tree-check" }, h("sy-checkbox", { readonly: this.fixed || this.disabled, checked: this.checked, indeterminate: this.indeterminate, onChanged: this.handleCheckChange.bind(this) }, this.renderNode()))) : this.renderNode(), h("span", { key: '0ea9327e609599dbc6a5377855bd52fc5ae4f747', class: {
                "tree-editable": true,
                "edit-on": isEditableActive
            } }, isEditableActive && this.editable ? (h("sy-button", { size: "small", variant: "borderless", onClick: this.startEditing.bind(this) }, h("sy-icon", { size: "small" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z" }))), h("sy-tooltip", { position: "top", content: "Edit", id: "editTooltip" }))) : null, isEditableActive && this.appendable ? (h("sy-button", { size: "small", variant: "borderless", onClick: this.startAdding.bind(this) }, h("sy-icon", { size: "small" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M344 120C344 106.7 333.3 96 320 96C306.7 96 296 106.7 296 120L296 296L120 296C106.7 296 96 306.7 96 320C96 333.3 106.7 344 120 344L296 344L296 520C296 533.3 306.7 544 320 544C333.3 544 344 533.3 344 520L344 344L520 344C533.3 344 544 333.3 544 320C544 306.7 533.3 296 520 296L344 296L344 120z" }))), h("sy-tooltip", { position: "top", content: "Add", id: "addTooltip" }))) : null, isEditableActive && this.removable ? (h("sy-button", { size: "small", variant: "borderless", onClick: this.removeItem.bind(this) }, h("sy-icon", { size: "small" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M96 320C96 306.7 106.7 296 120 296L520 296C533.3 296 544 306.7 544 320C544 333.3 533.3 344 520 344L120 344C106.7 344 96 333.3 96 320z" }))), h("sy-tooltip", { position: "top", content: "Remove", id: "removeTooltip" }))) : null)), this.expanded && this.hasChild ? (h("div", { class: "children" }, this.treeChildren, this.renderAddingChild())) : (h("div", { class: "children" }, this.renderAddingChild()))));
    }
    renderNode() {
        return (h("div", { class: "tree-item-group" }, this.isEditing ? ([
            h("sy-input", { class: "editable-label", value: this.editingLabel, size: "small", onChanged: this.handleEditChange.bind(this), onKeyDown: this.handleEditKeydown.bind(this), onClick: this.handleEditClick.bind(this), onMouseDown: this.handleEditMousedown.bind(this), autofocus: true }),
            h("div", { class: "add-item" }, h("sy-button", { size: "small", onClick: this.handleEditNode.bind(this) }, "Save"), h("sy-button", { size: "small", onClick: this.handleCancelEditNode.bind(this) }, "Cancel"))
        ]) : (h("span", { class: {
                "tree-item": true,
                'overflow': this.overflow
            }, style: this.nodeWidth ? { maxWidth: `${this.nodeWidth}px` } : {}, onMouseEnter: this.handleTreeItemMouseEnter.bind(this), onMouseLeave: this.handleTreeItemMouseLeave.bind(this), onClick: this.handleItemClick.bind(this) }, h("sy-tooltip", { position: "top", content: this.label, trigger: "none", open: this.tooltipOpen }), this.icon?.length ? (h("sy-icon", { size: "medium", svgMarkup: this.icon })) : null, h("span", { class: "item-content", innerHTML: this.textTerm }), this.tagMessage?.length ? (h("sy-tag", { variant: this.tagVariant ?? 'gray', disabled: this.disabled, rounded: true, size: "medium" }, this.tagMessage)) : null))));
    }
    renderAddingChild() {
        return this.isAdding ? (h("div", { class: "input-container" }, h("sy-input", { size: "small", value: this.newChildLabel, onKeyDown: this.handleNewChildKeydown.bind(this), onChanged: this.handleNewChildInputChange.bind(this), placeholder: this.appendPlaceholder, autofocus: true }), h("div", { class: "add-item" }, h("sy-button", { size: "small", onClick: this.addNewChild.bind(this) }, "Add"), h("sy-button", { size: "small", onClick: this.cancelAdding.bind(this) }, "Cancel")))) : null;
    }
    // --- Private Methods ---
    setTreetoCheckbox() {
        if (this.checkable) {
            const checkbox = this.host.querySelector('sy-checkbox');
            if (checkbox) {
                checkbox.isTree = true;
            }
        }
    }
    updateLevelClass() {
        Array.from(this.host.classList)
            .filter(className => /^level-\d+$/.test(className))
            .forEach(className => this.host.classList.remove(className));
        this.host.classList.add(`level-${this.level}`);
    }
    escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    renderLabelWithHighlight(label, searchTerm) {
        if (!searchTerm) {
            this.textTerm = this.escapeHtml(label).replace(/ /g, '&nbsp;');
            return;
        }
        const safeLabel = this.escapeHtml(label);
        const escapedSearchTerm = this.escapeHtml(searchTerm).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
        let result = '';
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(safeLabel)) !== null) {
            const beforeMatch = safeLabel.substring(lastIndex, match.index);
            const preservedSpace = beforeMatch.replace(/ /g, '&nbsp;');
            const matchedText = match[0].replace(/ /g, '&nbsp;');
            const highlightedText = `<mark class="highlight">${matchedText}</mark>`;
            result += preservedSpace + highlightedText;
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < safeLabel.length) {
            const remainingText = safeLabel.substring(lastIndex);
            const preservedSpace = remainingText.replace(/ /g, '&nbsp;');
            result += preservedSpace;
        }
        this.textTerm = result;
    }
    extractHtmlAndText(htmlString) {
        const htmlParts = [];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        let pureText = '';
        let currentTextIndex = 0;
        const walkNodes = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const textContent = node.textContent || '';
                pureText += textContent;
                currentTextIndex += textContent.length;
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                const tag = element.outerHTML;
                const beforeText = pureText;
                let afterText = '';
                let nextSibling = node.nextSibling;
                while (nextSibling) {
                    if (nextSibling.nodeType === Node.TEXT_NODE) {
                        afterText += nextSibling.textContent || '';
                    }
                    nextSibling = nextSibling.nextSibling;
                }
                let position;
                if (beforeText.length === 0) {
                    position = 'start';
                }
                else if (afterText.trim().length === 0) {
                    position = 'end';
                }
                else {
                    position = 'middle';
                }
                htmlParts.push({
                    tag,
                    position,
                    textIndex: currentTextIndex,
                    beforeText,
                    afterText: afterText.trim()
                });
                return;
            }
            for (const child of Array.from(node.childNodes)) {
                walkNodes(child);
            }
        };
        for (const child of Array.from(tempDiv.childNodes)) {
            walkNodes(child);
        }
        return { htmlParts, pureText: pureText.trim() };
    }
    reconstructHtmlLabel(editedText, htmlParts) {
        if (htmlParts.length === 0) {
            return editedText;
        }
        let result = editedText;
        const startTags = htmlParts.filter(p => p.position === 'start');
        const endTags = htmlParts.filter(p => p.position === 'end');
        const middleTags = htmlParts.filter(p => p.position === 'middle');
        startTags.forEach(part => {
            result = part.tag + result;
        });
        endTags.forEach(part => {
            result = result + part.tag;
        });
        middleTags
            .sort((a, b) => b.textIndex - a.textIndex)
            .forEach(part => {
            let insertIndex = -1;
            if (part.beforeText && part.afterText) {
                const pattern = part.beforeText + part.afterText;
                const patternIndex = result.indexOf(pattern);
                if (patternIndex !== -1) {
                    insertIndex = patternIndex + part.beforeText.length;
                }
            }
            if (insertIndex === -1 && part.beforeText) {
                const beforeIndex = result.lastIndexOf(part.beforeText);
                if (beforeIndex !== -1) {
                    insertIndex = beforeIndex + part.beforeText.length;
                }
            }
            if (insertIndex === -1 && part.afterText) {
                const afterIndex = result.indexOf(part.afterText);
                if (afterIndex !== -1) {
                    insertIndex = afterIndex;
                }
            }
            if (insertIndex === -1) {
                insertIndex = Math.min(part.textIndex, result.length);
            }
            result = result.slice(0, insertIndex) + part.tag + result.slice(insertIndex);
        });
        return result;
    }
    startEditing(e) {
        e.preventDefault();
        e.stopPropagation();
        const { htmlParts, pureText } = this.extractHtmlAndText(this.label);
        this.originalHtmlParts = htmlParts;
        this.editingLabel = pureText;
        this.isEditing = true;
        this.addingDocumentKeydownEvent();
        this.updatingEmit();
    }
    handleEditMousedown(e) {
        e.stopPropagation();
    }
    handleEditChange(e) {
        e.stopPropagation();
        this.editingLabel = e.detail.value;
    }
    handleEditClick(e) {
        e.stopPropagation();
    }
    handleEditInputLabel() {
        if (this.editingLabel && this.editingLabel.trim() !== '') {
            const reconstructedLabel = this.reconstructHtmlLabel(this.editingLabel, this.originalHtmlParts);
            this.label = reconstructedLabel;
            this.itemEdited.emit({ value: this.value, label: this.label });
        }
    }
    handleEditKeydown(e) {
        if (e.key === 'Enter') {
            e.stopPropagation();
            this.handleEditInputLabel();
            this.isEditing = false;
        }
        else if (e.key === 'Escape') {
            e.stopPropagation();
            this.isEditing = false;
            this.editingLabel = this.label;
            this.originalHtmlParts = [];
            this.updatingResetEmit();
        }
    }
    handleEditNode(e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleEditInputLabel();
        this.isEditing = false;
    }
    handleCancelEditNode(e) {
        e.preventDefault();
        e.stopPropagation();
        this.isEditing = false;
        this.editingLabel = this.label;
        this.originalHtmlParts = [];
        this.updatingResetEmit();
    }
    startAdding(e) {
        e.stopPropagation();
        this.isAdding = true;
        this.newChildLabel = '';
        this.updatingEmit();
        this.addingDocumentKeydownEvent();
    }
    handleNewChildDocumentKeydown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            if (this.isAdding) {
                this.cancelAdding(e);
            }
            else if (this.isEditing) {
                this.cancelEditing();
            }
        }
    };
    handleNewChildKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.addNewChild(e);
        }
    }
    handleNewChildInputChange(e) {
        this.newChildLabel = e.detail.value;
    }
    addNewChild(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.newChildLabel.trim()) {
            this.isAdding = false;
            const childLabel = this.newChildLabel;
            const childValue = `${this.value?.toString()}-${Date.now()}`;
            const childLevel = this.level + 1;
            this.itemAdded.emit({ parentValue: this.value, childLabel, childValue, childLevel });
            document.removeEventListener("keydown", this.handleNewChildDocumentKeydown);
        }
        else {
            this.cancelAdding(e);
        }
    }
    cancelAdding(e) {
        e.stopPropagation();
        this.isAdding = false;
        this.newChildLabel = '';
        this.updatingResetEmit();
        this.removeDocumentKeydownEvent();
    }
    cancelEditing() {
        this.isEditing = false;
        this.editingLabel = this.label;
        this.originalHtmlParts = [];
        this.updatingResetEmit();
    }
    addingDocumentKeydownEvent() {
        document.addEventListener("keydown", this.handleNewChildDocumentKeydown);
    }
    removeDocumentKeydownEvent() {
        document.removeEventListener("keydown", this.handleNewChildDocumentKeydown);
    }
    removeItem(e) {
        e.stopPropagation();
        this.itemRemoved.emit({ value: this.value, label: this.label });
    }
    handleItemClick(e) {
        e.preventDefault();
        if (!this.clickable) {
            e.stopPropagation();
        }
        else {
            if (this.isAdding || this.isEditing) {
                return;
            }
            this.emitItemSelectedEvent();
        }
        if (this.expandable) {
            this.handleExpandClick(e);
        }
    }
    handleMouseEnter(e) {
        e.preventDefault();
        this.hovered = true;
    }
    handleMouseLeave(e) {
        e.preventDefault();
        this.hovered = false;
    }
    emitItemSelectedEvent() {
        if (!this.disabled && !this.active && (this.clickable || this.isEditable)) {
            this.itemSelected.emit({ value: this.value, label: this.label, checked: this.checked ?? false });
        }
    }
    handleExpandClick(e) {
        e.stopPropagation();
        this.expanded = !this.expanded;
        this.expandChanged.emit({ value: this.value, label: this.label, expanded: this.expanded });
    }
    handleCheckChange(e) {
        if (this.checkable && !this.fixed && !this.disabled && this.checked !== e.detail.checked) {
            this.checked = e.detail.checked;
            this.checkChanged.emit({ value: this.value, label: this.label, checked: this.checked });
        }
    }
    handleDragStart(e) {
        if (this.disabled || !this.treeitemDraggable || this.isEditing || this.isAdding) {
            e.preventDefault();
            return;
        }
        const dragData = JSON.stringify({ value: this.value, subtree: this.getSubtree() });
        e.dataTransfer?.setData('application/json', dragData);
        e.dataTransfer.effectAllowed = 'move';
        this.isDescendant = true;
        this.draggingEvent.emit(this.value);
        this.setDraggingState(true);
    }
    handleDragEnd() {
        if (this.dragging) {
            this.setDraggingState(false);
        }
    }
    handleDragOver(e) {
        e.preventDefault();
        if (this.disabled || !this.dragging) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        e.dataTransfer.dropEffect = 'move';
        this.hasDropTarget = true;
    }
    handleDrop(e) {
        e.preventDefault();
        if (this.disabled || !this.dragging) {
            return;
        }
        this.hasDropTarget = false;
        const dragData = e.dataTransfer?.getData('application/json');
        if (dragData) {
            const { value: draggedKey } = JSON.parse(dragData);
            if (draggedKey && draggedKey?.toString() !== this.value?.toString()) {
                this.itemDrop.emit({ targetKey: this.value, draggedKey, dropPosition: 'on', targetLevel: this.level });
            }
        }
    }
    handleDragLeave() {
        this.hasDropTarget = false;
    }
    getSubtree() {
        const getNodeSubtree = (node) => {
            const children = Array.from(node.querySelectorAll(':scope > sy-tree-item'));
            return {
                value: node.getAttribute('value'),
                children: children.map((child) => getNodeSubtree(child))
            };
        };
        return getNodeSubtree(this.host);
    }
    setDraggingState(isDragging) {
        this.dragging = isDragging;
        const children = this.host.querySelectorAll('sy-tree-item');
        children?.forEach(child => {
            child.dragging = isDragging;
        });
    }
    updatingEmit() {
        this.itemUpdating.emit(this);
    }
    updatingResetEmit() {
        this.itemUpdatingReset.emit(this);
    }
    handleTreeItemMouseEnter(_e) {
        if (this.overflow) {
            this.tooltipOpen = true;
        }
    }
    handleTreeItemMouseLeave(_e) {
        if (this.overflow) {
            this.tooltipOpen = false;
        }
    }
    static get watchers() { return {
        "level": ["handleLevelChange"],
        "searchTerm": ["handleLabelOrSearchChange"],
        "label": ["handleLabelOrSearchChange"],
        "selectedValue": ["handleSelectedValueChange"],
        "nodeWidth": ["handleNodeWidthChange"],
        "checkable": ["handleCheckableChange"]
    }; }
    static get style() { return syTreeItemCss; }
}, [258, "sy-tree-item", {
        "appendable": [4],
        "checkable": [4],
        "checked": [4],
        "clickable": [516],
        "disabled": [4],
        "treeitemDraggable": [4, "draggable"],
        "dragging": [4],
        "editable": [4],
        "expandable": [516],
        "expanded": [4],
        "fixed": [4],
        "hasChild": [1028, "haschild"],
        "appendPlaceholder": [1025, "appendplaceholder"],
        "icon": [1],
        "indeterminate": [4],
        "isDescendant": [1540, "isdesendant"],
        "isEditable": [1028, "iseditable"],
        "label": [1],
        "level": [2],
        "removable": [4],
        "treeChildren": [16],
        "tagMessage": [1025, "tagmessage"],
        "tagVariant": [1025, "tagvariant"],
        "value": [1],
        "searchTerm": [1025, "searchterm"],
        "selectedValue": [1025, "selectedvalue"],
        "nodeWidth": [1026, "nodewidth"],
        "line": [516],
        "hovered": [32],
        "isEditing": [32],
        "isAdding": [32],
        "newChildLabel": [32],
        "hasDropTarget": [32],
        "editingLabel": [32],
        "textTerm": [32],
        "active": [32],
        "tooltipOpen": [32],
        "overflow": [32],
        "originalHtmlParts": [32],
        "setOverflow": [64]
    }, undefined, {
        "level": ["handleLevelChange"],
        "searchTerm": ["handleLabelOrSearchChange"],
        "label": ["handleLabelOrSearchChange"],
        "selectedValue": ["handleSelectedValueChange"],
        "nodeWidth": ["handleNodeWidthChange"],
        "checkable": ["handleCheckableChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tree-item", "sy-button", "sy-checkbox", "sy-icon", "sy-input", "sy-tag", "sy-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tree-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTreeItem);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-tag":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyTreeItem as S, defineCustomElement as d };
