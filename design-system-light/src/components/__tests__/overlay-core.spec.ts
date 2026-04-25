import { newSpecPage } from '@stencil/core/testing';
import { SyModal } from '../modal/sy-modal';
import { SyPagination } from '../pagination/sy-pagination';
import { SySelect } from '../select/sy-select';
import { SyOption } from '../select/sy-select-option';

class ResizeObserverMock {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

class MutationObserverMock {
  observe = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

describe('sy-modal', () => {
  beforeAll(() => {
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('removes the same document keydown handler on disconnect', async () => {
    const page = await newSpecPage({
      components: [SyModal],
      html: '<sy-modal></sy-modal>',
    });

    const removeSpy = jest.spyOn(page.doc, 'removeEventListener');
    (page.rootInstance as any).disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('keydown', (page.rootInstance as any).handleKeydown);

    removeSpy.mockRestore();
  });

  it('renders corner and side resize handles for modal variant', async () => {
    const page = await newSpecPage({
      components: [SyModal],
      html: '<sy-modal variant="modal"></sy-modal>',
    });

    expect(page.root.querySelectorAll('.resize-handle')).toHaveLength(8);
    expect(page.root.querySelector('.resize-handle.top')).not.toBeNull();
    expect(page.root.querySelector('.resize-handle.right')).not.toBeNull();
  });

  it('keeps a non-closable modal connected so it can reopen after closing', async () => {
    const page = await newSpecPage({
      components: [SyModal],
      html: '<sy-modal><div slot="body">Body</div></sy-modal>',
    });
    const modal = page.root as unknown as HTMLSyModalElement;

    expect(modal.closable).toBe(false);

    await modal.setOpen();
    await page.waitForChanges();
    await modal.setCancel();
    await page.waitForChanges();

    expect(modal.isConnected).toBe(true);

    await modal.setOpen();
    await page.waitForChanges();

    expect(modal.open).toBe(true);
    expect(modal.querySelector('.modal-wrapper')?.classList.contains('modal-wrapper--open')).toBe(true);
  });
});

describe('sy-select', () => {
  beforeAll(() => {
    (globalThis as any).ResizeObserver = ResizeObserverMock;
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('clones slot options into the popup without mutating the source option list size', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const page = await newSpecPage({
      components: [SySelect, SyOption],
      html: '<sy-select><sy-option value="alpha" label="Alpha">Alpha</sy-option></sy-select>',
    });

    (page.rootInstance as any).renderOptionsPopup();

    expect((page.rootInstance as any).options).toHaveLength(1);
    expect((page.rootInstance as any).optionsContainer?.querySelectorAll('sy-option')).toHaveLength(1);

    consoleErrorSpy.mockRestore();
  });

  it('closes through the public closeDropdown method', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const page = await newSpecPage({
      components: [SySelect, SyOption],
      html: '<sy-select><sy-option value="alpha" label="Alpha">Alpha</sy-option></sy-select>',
    });

    (page.rootInstance as any).isOpen = true;
    await page.waitForChanges();
    await page.rootInstance.closeDropdown();
    await page.waitForChanges();

    expect((page.rootInstance as any).isOpen).toBe(false);

    consoleErrorSpy.mockRestore();
  });
});

describe('sy-pagination', () => {
  it('closes the embedded select through closeDropdown instead of mutating internal state', async () => {
    const page = await newSpecPage({
      components: [SyPagination],
      html: '<sy-pagination total-items="50" page-size-options="10,20,50"></sy-pagination>',
    });

    const selectElement = page.root.querySelector('sy-select') as HTMLSySelectElement & { closeDropdown: jest.Mock };
    selectElement.closeDropdown = jest.fn();

    (page.rootInstance as any).handleOutsideClick({ target: page.doc.body } as unknown as Event);

    expect(selectElement.closeDropdown).toHaveBeenCalledTimes(1);
  });
});
