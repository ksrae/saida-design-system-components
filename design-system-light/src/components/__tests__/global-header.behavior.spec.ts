import { newSpecPage } from '@stencil/core/testing';
import { SyGlobalHeader } from '../global-header/sy-global-header';

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

describe('sy-global-header', () => {
  beforeAll(() => {
    (globalThis as any).ResizeObserver = ResizeObserverMock;
    (globalThis as any).MutationObserver = MutationObserverMock;
    (globalThis as any).requestAnimationFrame = ((callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    }) as typeof requestAnimationFrame;
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

  it('uses the remaining header width for tabs and moves all tabs into overflow when no tab fits', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation(((() => {
      return 0 as unknown as ReturnType<typeof setTimeout>;
    }) as unknown) as typeof setTimeout);

    const page = await newSpecPage({
      components: [SyGlobalHeader],
      html: `
        <sy-global-header title="App" search information notification>
          <div slot="tabs">
            <sy-tab tabkey="t1">Tab 1</sy-tab>
            <sy-tab tabkey="t2">Tab 2</sy-tab>
            <sy-tab tabkey="t3">Tab 3</sy-tab>
          </div>
        </sy-global-header>
      `,
    });

    const headerWrapper = page.root.querySelector('.header-wrapper') as HTMLElement;
    const headerTitle = page.root.querySelector('.header-title') as HTMLElement;
    const headerEnd = page.root.querySelector('.header-end') as HTMLElement;
    const tabs = Array.from(page.root.querySelectorAll('sy-tab')) as any[];

    Object.defineProperty(headerWrapper, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 320 }),
    });
    Object.defineProperty(headerTitle, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 120 }),
    });
    Object.defineProperty(headerEnd, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 180 }),
    });
    tabs.forEach((tab) => {
      Object.defineProperty(tab, 'getBoundingClientRect', {
        configurable: true,
        value: () => ({ width: 72 }),
      });
    });

    await (page.rootInstance as any).updateOverflowTabs();
    await page.waitForChanges();

    expect((page.rootInstance as any).overflowTabs).toHaveLength(3);
    expect(tabs.every((tab) => tab.style.display === 'none')).toBe(true);

    setTimeoutSpy.mockRestore();
  });

});
