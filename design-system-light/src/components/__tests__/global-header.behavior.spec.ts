import { newSpecPage } from '@stencil/core/testing';
import { SyGlobalHeader } from '../global-header/sy-global-header';

class ResizeObserverMock {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

describe('sy-global-header', () => {
  beforeAll(() => {
    (globalThis as any).ResizeObserver = ResizeObserverMock;
  });

  it('maps the title attribute to the internal app title prop', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation(((callback: TimerHandler) => {
      if (typeof callback === 'function') {
        callback();
      }
      return 0 as unknown as ReturnType<typeof setTimeout>;
    }) as typeof setTimeout);

    const page = await newSpecPage({
      components: [SyGlobalHeader],
      html: '<sy-global-header title="App Title"></sy-global-header>',
    });

    expect((page.rootInstance as any).appTitle).toBe('App Title');
    expect(page.root.querySelector('.appname')?.textContent).toContain('App Title');

    setTimeoutSpy.mockRestore();
  });

  it('emits actionClick instead of using the native click event name', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation(((callback: TimerHandler) => {
      if (typeof callback === 'function') {
        callback();
      }
      return 0 as unknown as ReturnType<typeof setTimeout>;
    }) as typeof setTimeout);

    const page = await newSpecPage({
      components: [SyGlobalHeader],
      html: '<sy-global-header information notification></sy-global-header>',
    });

    const handler = jest.fn();
    page.root.addEventListener('actionClick', handler as EventListener);

    const buttons = page.root.querySelectorAll('sy-button');
    buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    buttons[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledTimes(2);
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ type: 'information' });
    expect((handler.mock.calls[1][0] as CustomEvent).detail).toEqual({ type: 'notification' });

    setTimeoutSpy.mockRestore();
  });
});
