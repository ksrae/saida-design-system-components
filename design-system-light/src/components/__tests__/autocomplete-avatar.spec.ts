import { newSpecPage } from '@stencil/core/testing';
import { SyAutocomplete } from '../autocomplete/sy-autocomplete';
import { SyAutocompleteOption } from '../autocomplete/sy-autocomplete-option';
import { SyAvatarGroup } from '../avatar/sy-avatar-group';

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

describe('sy-autocomplete', () => {
  beforeAll(() => {
    patchElementInternals();
    (SyAutocomplete.prototype as any).updateValidityState = jest.fn();
  });

  it('creates a body-appended option clone without reusing a fixed id', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const page = await newSpecPage({
      components: [SyAutocomplete, SyAutocompleteOption],
      html: '<sy-autocomplete><sy-autocomplete-option></sy-autocomplete-option></sy-autocomplete>',
    });

    const appended = (page.rootInstance as any).appendOptionClone();
    const optionClone = (page.rootInstance as any).optionElementClone as HTMLElement;

    expect(appended).toBe(true);
    expect(optionClone).not.toBeNull();
    expect(optionClone.id).toBe('');
    expect(optionClone.style.zIndex).toBe('var(--z-index-autocomplete, 800)');

    (page.rootInstance as any).removeOptionClone();
    consoleErrorSpy.mockRestore();
  });

  it('removes the cloned option element from the document body on cleanup', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const page = await newSpecPage({
      components: [SyAutocomplete, SyAutocompleteOption],
      html: '<sy-autocomplete><sy-autocomplete-option></sy-autocomplete-option></sy-autocomplete>',
    });

    (page.rootInstance as any).appendOptionClone();
    const optionClone = (page.rootInstance as any).optionElementClone as HTMLElement;
    expect(page.doc.body.contains(optionClone)).toBe(true);

    (page.rootInstance as any).removeOptionClone();

    expect(page.doc.body.contains(optionClone)).toBe(false);
    expect((page.rootInstance as any).optionElementClone).toBeNull();
    consoleErrorSpy.mockRestore();
  });
});

describe('sy-avatar-group', () => {
  it('moves its own overflow container to body and restores it on leave', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation(((callback: TimerHandler) => {
      if (typeof callback === 'function') {
        callback();
      }
      return 0 as any;
    }) as typeof setTimeout);

    const page = await newSpecPage({
      components: [SyAvatarGroup],
      html: '<sy-avatar-group></sy-avatar-group>',
    });

    (page.rootInstance as any).originalAvatarData = [{ text: 'A' }, { text: 'B' }];
    Object.defineProperty(page.rootInstance, 'maxCount', {
      configurable: true,
      value: 1,
    });
    (page.rootInstance as any).hoverItemIndex = 0;
    await page.waitForChanges();

    const more = page.root.querySelector('.more-avatars') as HTMLElement;
    jest.spyOn(more, 'getBoundingClientRect').mockReturnValue({
      top: 10,
      right: 40,
      bottom: 30,
      left: 20,
      width: 20,
      height: 20,
      x: 20,
      y: 10,
      toJSON: () => ({}),
    } as DOMRect);

    (page.rootInstance as any).handleEnterMoreAvatar();

    const overflowContainer = (page.rootInstance as any).overflowContainer as HTMLElement;
    expect(overflowContainer.parentElement).toBe(page.doc.body);

    (page.rootInstance as any).isHovering = false;
    (page.rootInstance as any).handleLeaveMoreAvatar();

    expect(overflowContainer.parentElement).toBe(page.root);
    expect(overflowContainer.style.display).toBe('none');

    setTimeoutSpy.mockRestore();
  });
});
