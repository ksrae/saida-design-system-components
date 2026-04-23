import { newSpecPage } from '@stencil/core/testing';
import { SyMenuGroup } from '../menu/sy-menu-group';
import { SyMenuSub } from '../menu/sy-menu-sub';
import { SyNavGroup } from '../nav/sy-nav-group';
import { SyNavSub } from '../nav/sy-nav-sub';

describe('sy-menu-group', () => {
  it('renders group titles as sanitized text instead of raw html', async () => {
    const page = await newSpecPage({
      components: [SyMenuGroup],
      html: '<sy-menu-group title="<img src=x onerror=alert(1)>Menu group"></sy-menu-group>',
    });

    const title = page.root.querySelector('.group-title') as HTMLElement;

    expect(title.querySelector('img')).toBeNull();
    expect(title.innerHTML).not.toContain('<img');
  });
});

describe('sy-menu-sub', () => {
  it('renders submenu titles as sanitized text instead of raw html', async () => {
    const page = await newSpecPage({
      components: [SyMenuSub],
      html: '<sy-menu-sub title="<img src=x onerror=alert(1)>Menu sub"></sy-menu-sub>',
    });

    const title = page.root.querySelector('.title') as HTMLElement;

    expect(title.querySelector('img')).toBeNull();
    expect(title.innerHTML).not.toContain('<img');
  });
});

describe('sy-nav-group', () => {
  it('renders nav group titles as sanitized text instead of raw html', async () => {
    const page = await newSpecPage({
      components: [SyNavGroup],
      html: '<sy-nav-group title="<img src=x onerror=alert(1)>Nav group"></sy-nav-group>',
    });

    const title = page.root.querySelector('.group-title') as HTMLElement;

    expect(title.querySelector('img')).toBeNull();
    expect(title.innerHTML).not.toContain('<img');
  });
});

describe('sy-nav-sub', () => {
  it('renders nav submenu titles as sanitized text instead of raw html', async () => {
    const page = await newSpecPage({
      components: [SyNavSub],
      html: '<sy-nav-sub title="<img src=x onerror=alert(1)>Nav sub"></sy-nav-sub>',
    });

    const title = page.root.querySelector('.title') as HTMLElement;

    expect(title.querySelector('img')).toBeNull();
    expect(title.innerHTML).not.toContain('<img');
  });
});
