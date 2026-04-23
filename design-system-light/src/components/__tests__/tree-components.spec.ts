import { newSpecPage } from '@stencil/core/testing';
import { SyTreeItem } from '../tree/sy-tree-item';
import { SyTreeSelect } from '../tree-select/sy-tree-select';

class MutationObserverMock {
  observe = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

const createElementInternalsMock = () => ({
  form: null,
  setFormValue: jest.fn(),
  setValidity: jest.fn(),
  checkValidity: jest.fn(() => true),
  reportValidity: jest.fn(() => true),
  validity: {},
  validationMessage: '',
  willValidate: true,
});

const patchElementInternals = () => {
  const elementInternalsPrototype = (globalThis as any).ElementInternals?.prototype;

  if (elementInternalsPrototype) {
    elementInternalsPrototype.setFormValue = jest.fn();
    elementInternalsPrototype.setValidity = jest.fn();
    elementInternalsPrototype.checkValidity = jest.fn(() => true);
    elementInternalsPrototype.reportValidity = jest.fn(() => true);
  }

  (HTMLElement.prototype as any).attachInternals = jest.fn(() => createElementInternalsMock());
};

describe('sy-tree-item', () => {
  beforeAll(() => {
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('escapes raw html before applying highlight markup', async () => {
    const page = await newSpecPage({
      components: [SyTreeItem],
      html: '<sy-tree-item label="<img src=x onerror=alert(1)> Alpha" search-term="Alpha"></sy-tree-item>',
    });

    expect((page.rootInstance as any).textTerm).toContain('&lt;img');
    expect((page.rootInstance as any).textTerm).toContain('<mark class="highlight">Alpha</mark>');
    expect(page.root.querySelector('img')).toBeNull();
  });

  it('preserves unrelated classes when refreshing the level class', async () => {
    const page = await newSpecPage({
      components: [SyTreeItem],
      html: '<sy-tree-item label="Node"></sy-tree-item>',
    });

    page.root.classList.add('existing-class');
    Object.defineProperty(page.rootInstance, 'level', {
      configurable: true,
      value: 3,
    });
    (page.rootInstance as any).handleLevelChange();
    await page.waitForChanges();

    expect(page.root.classList.contains('existing-class')).toBe(true);
    expect(page.root.classList.contains('level-3')).toBe(true);
  });
});

describe('sy-tree-select', () => {
  beforeAll(() => {
    (globalThis as any).MutationObserver = MutationObserverMock;
    patchElementInternals();
    (SyTreeSelect.prototype as any).updateFormValue = jest.fn();
    (SyTreeSelect.prototype as any).updateValidityState = jest.fn();
  });

  it('replaces the loading state with tree content when results become available', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const page = await newSpecPage({
      components: [SyTreeSelect],
      html: '<sy-tree-select></sy-tree-select>',
    });

    const instance = page.rootInstance as any;
    Object.defineProperty(instance, 'loading', {
      configurable: true,
      value: true,
      writable: true,
    });
    instance.renderTreeSelectPopup();

    expect(instance.popupContainer.querySelector('sy-spinner')).not.toBeNull();

    Object.defineProperty(instance, 'loading', {
      configurable: true,
      value: false,
      writable: true,
    });
    instance.hasSearchResults = true;
    Object.defineProperty(instance, 'nodes', {
      configurable: true,
      value: [{ label: 'Root', value: 'root' }],
      writable: true,
    });
    instance.updateTreeSelectPopup();

    expect(instance.popupContainer.querySelector('sy-tree')).not.toBeNull();
    expect(instance.popupContainer.style.zIndex).toBe('var(--z-index-select, 800)');

    consoleErrorSpy.mockRestore();
  });

  it('renders the empty state when the search result set is empty', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const page = await newSpecPage({
      components: [SyTreeSelect],
      html: '<sy-tree-select></sy-tree-select>',
    });

    const instance = page.rootInstance as any;
    Object.defineProperty(instance, 'loading', {
      configurable: true,
      value: false,
      writable: true,
    });
    instance.hasSearchResults = false;
    instance.renderTreeSelectPopup();

    expect(instance.popupContainer.querySelector('sy-empty')).not.toBeNull();
    expect(instance.popupContainer.classList.contains('empty')).toBe(true);

    consoleErrorSpy.mockRestore();
  });
});
