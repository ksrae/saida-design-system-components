import { Component, h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { SyTab } from '../tabs/sy-tab';
import { SyTabGroup } from '../tabs/sy-tab-group';

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

@Component({
  tag: 'sy-global-header',
  shadow: false,
})
class SyGlobalHeaderStub {
  updateOverflowTabs = jest.fn();

  render() {
    return h('slot', null);
  }
}

describe('sy-tab', () => {
  beforeAll(() => {
    (globalThis as any).ResizeObserver = ResizeObserverMock;
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('reads alias props from kebab-case attributes during load', async () => {
    const page = await newSpecPage({
      components: [SyTab],
      html: '<sy-tab parent-disabled current-disabled-status in-header></sy-tab>',
    });

    expect(page.rootInstance.parentDisabled).toBe(true);
    expect(page.rootInstance.currentDisabledStatus).toBe(true);
    expect(page.rootInstance.inHeader).toBe(true);
  });

  it('clears active state when the parent becomes disabled', async () => {
    const page = await newSpecPage({
      components: [SyTab],
      html: '<sy-tab active></sy-tab>',
    });

    page.rootInstance.parentDisabled = true;
    await page.waitForChanges();

    expect(page.rootInstance.active).toBe(false);
    expect(page.rootInstance.currentDisabledStatus).toBe(true);
    expect(page.root.hasAttribute('active')).toBe(false);
  });
});

describe('sy-tab-group', () => {
  beforeAll(() => {
    (globalThis as any).ResizeObserver = ResizeObserverMock;
    (globalThis as any).MutationObserver = MutationObserverMock;
  });

  it('wraps the header area in the standard container outside a global header', async () => {
    const page = await newSpecPage({
      components: [SyTabGroup],
      html: '<sy-tab-group></sy-tab-group>',
    });

    expect(page.root.querySelector('.tab-group-container')).not.toBeNull();
    expect(page.root.querySelector('.extra-area')).not.toBeNull();
  });

  it('avoids rendering the extra tab-group container inside a global header', async () => {
    const page = await newSpecPage({
      components: [SyTabGroup, SyGlobalHeaderStub],
      html: '<sy-global-header><sy-tab-group></sy-tab-group></sy-global-header>',
    });

    const group = page.root.querySelector('sy-tab-group') as HTMLSyTabGroupElement;

    expect(group.querySelector('.tab-group-container')).toBeNull();
    expect(group.querySelector('.extra-area')).not.toBeNull();
  });

  it('applies centered alignment to the rendered tabs container', async () => {
    const page = await newSpecPage({
      components: [SyTabGroup],
      html: `
        <sy-tab-group align="center">
          <sy-tab tabkey="one">One</sy-tab>
          <sy-tab tabkey="two">Two</sy-tab>
          <sy-tab-content name="one">Content 1</sy-tab-content>
          <sy-tab-content name="two">Content 2</sy-tab-content>
        </sy-tab-group>
      `,
    });

    const tabs = page.root.querySelector('.tabs') as HTMLElement;

    expect(tabs.style.justifyContent).toBe('center');
  });
});
