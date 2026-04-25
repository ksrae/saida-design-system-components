import { newSpecPage } from '@stencil/core/testing';
import { SyMenu } from '../menu/sy-menu';
import { SyPopover } from '../popover/sy-popover';
import { SyTooltip } from '../tooltip/sy-tooltip';

class MutationObserverMock {
  observe = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

describe('sy-menu', () => {
  beforeAll(() => {
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('cleans up document, window, and dropdown listeners on disconnect', async () => {
    const page = await newSpecPage({
      components: [SyMenu],
      html: '<sy-menu></sy-menu>',
    });

    const dropdown = page.doc.createElement('sy-dropdown');
    const parent = page.doc.createElement('div');
    const removeWindowSpy = jest.spyOn(window, 'removeEventListener');
    const removeDocumentSpy = jest.spyOn(page.doc, 'removeEventListener');
    const dropdownRemoveSpy = jest.spyOn(dropdown, 'removeEventListener');
    const parentRemoveSpy = jest.spyOn(parent, 'removeEventListener');
    const hostRemoveSpy = jest.spyOn(page.root, 'removeEventListener');

    (page.rootInstance as any).dropdownElement = dropdown;
    (page.rootInstance as any).parentDom = parent;
    (page.rootInstance as any).disconnectedCallback();

    expect(removeWindowSpy).toHaveBeenCalledWith('scroll', (page.rootInstance as any).updateMenuPosition, true);
    expect(removeDocumentSpy).toHaveBeenCalledWith('click', (page.rootInstance as any).handleDocumentClick, true);
    expect(dropdownRemoveSpy).toHaveBeenCalledWith('keydown', (page.rootInstance as any).handleDropdownKeydown);
    expect(parentRemoveSpy).toHaveBeenCalledWith('mouseenter', (page.rootInstance as any).parentMouseEnter);
    expect(parentRemoveSpy).toHaveBeenCalledWith('mouseleave', (page.rootInstance as any).parentMouseLeave);
    expect(parentRemoveSpy).toHaveBeenCalledWith('click', (page.rootInstance as any).parentClick);
    expect(parentRemoveSpy).toHaveBeenCalledWith('contextmenu', (page.rootInstance as any).parentContextMenu);
    expect(hostRemoveSpy).toHaveBeenCalledWith('click', (page.rootInstance as any).handleMenuItemClick, true);

    removeWindowSpy.mockRestore();
    removeDocumentSpy.mockRestore();
    dropdownRemoveSpy.mockRestore();
    parentRemoveSpy.mockRestore();
    hostRemoveSpy.mockRestore();
  });
});

describe('sy-tooltip', () => {
  beforeAll(() => {
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('registers hover listeners without adding a click listener for hover trigger', async () => {
    const page = await newSpecPage({
      components: [SyTooltip],
      html: '<sy-tooltip content="Tooltip text"></sy-tooltip>',
    });

    const addSpy = jest.spyOn(page.doc.body, 'addEventListener');
    (page.rootInstance as any).parentDom = page.doc.body;
    (page.rootInstance as any).open = false;
    (page.rootInstance as any).addEvent();

    expect(addSpy.mock.calls.some(([type]) => type === 'mouseenter')).toBe(true);
    expect(addSpy.mock.calls.some(([type]) => type === 'click')).toBe(false);

    addSpy.mockRestore();
  });
});

describe('sy-popover', () => {
  beforeAll(() => {
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('adds option pointer detection only once across repeated setup calls', async () => {
    const page = await newSpecPage({
      components: [SyPopover],
      html: '<sy-popover></sy-popover>',
    });

    const addSpy = jest.spyOn(page.doc, 'addEventListener');

    (page.rootInstance as any).setupOptionDetection();
    (page.rootInstance as any).setupOptionDetection();

    const pointerListeners = addSpy.mock.calls.filter(([type]) => type === 'mousedown');
    expect(pointerListeners).toHaveLength(1);

    addSpy.mockRestore();
  });

  it('removes the option pointer detection listener on disconnect', async () => {
    const page = await newSpecPage({
      components: [SyPopover],
      html: '<sy-popover></sy-popover>',
    });

    const removeSpy = jest.spyOn(page.doc, 'removeEventListener');

    (page.rootInstance as any).disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('mousedown', (page.rootInstance as any).handleOptionPointerDown, true);

    removeSpy.mockRestore();
  });
});
