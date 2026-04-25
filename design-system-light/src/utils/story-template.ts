import { h } from '@stencil/core';
import type { VNode } from '@stencil/core';

type StoryBindingKind = 'attr' | 'boolean' | 'event' | 'property' | 'ref' | 'child';

type StoryBinding = {
  kind: StoryBindingKind;
  marker: string;
  name?: string;
  value: unknown;
};

type UnsafeHtml = {
  __storyUnsafeHtml: string;
};

type RefDirective<T extends Element = Element> = {
  __storyRef: Ref<T>;
};

export interface Ref<T extends Element = Element> {
  value?: T;
}

export const createRef = <T extends Element = Element>(): Ref<T> => ({});

export const ref = <T extends Element = Element>(target: Ref<T>): RefDirective<T> => ({ __storyRef: target });

export const unsafeHTML = (value: unknown): UnsafeHtml => ({ __storyUnsafeHtml: value == null ? '' : String(value) });

export const ifDefined = <T>(value: T | null | undefined): T | undefined => (value == null ? undefined : value);

const isUnsafeHtml = (value: unknown): value is UnsafeHtml =>
  !!value && typeof value === 'object' && '__storyUnsafeHtml' in value;

const isRefDirective = (value: unknown): value is RefDirective =>
  !!value && typeof value === 'object' && '__storyRef' in value;

const isVNode = (value: unknown): value is VNode =>
  !!value && typeof value === 'object' && '$flags$' in value && '$tag$' in value;

const toEventProp = (name: string) => `on${name.charAt(0).toUpperCase()}${name.slice(1)}`;

const toChildren = (value: unknown): unknown[] => {
  if (value == null || value === false) return [];
  if (Array.isArray(value)) return value.flatMap(toChildren);
  return [value];
};

const toStyleObject = (style: CSSStyleDeclaration): Record<string, string> => {
  const result: Record<string, string> = {};

  for (let index = 0; index < style.length; index += 1) {
    const property = style.item(index);
    const value = style.getPropertyValue(property).trim();

    if (value) {
      const key = property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
      result[key] = value;
    }
  }

  return result;
};

const propsFromElement = (element: Element, bindings: StoryBinding[]) => {
  const props: Record<string, unknown> = {};

  Array.from(element.attributes).forEach((attribute) => {
    const binding = bindings.find((candidate) => candidate.marker === attribute.name);
    if (binding) {
      switch (binding.kind) {
        case 'attr':
          if (binding.value !== undefined && binding.value !== null && binding.value !== false) {
            props[binding.name!] = binding.value;
          }
          break;
        case 'boolean':
          props[binding.name!] = !!binding.value;
          break;
        case 'event':
          if (typeof binding.value === 'function') {
            props[toEventProp(binding.name!)] = binding.value;
          }
          break;
        case 'property':
          props[binding.name!] = binding.value;
          break;
        case 'ref':
          props.ref = (node: Element) => {
            (binding.value as Ref).value = node;
          };
          break;
      }
      return;
    }

    if (attribute.name === 'style') {
      props.style = toStyleObject((element as HTMLElement).style);
      return;
    }

    props[attribute.name] = attribute.value === '' ? true : attribute.value;
  });

  return props;
};

const convertNode = (node: Node, bindings: StoryBinding[]): unknown[] => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || '';
    if (!text) return [];
    // Whitespace-only text nodes that span a line break come from
    // template-literal indentation between sibling elements — they carry no
    // meaning and would otherwise bloat the docs source view with blank
    // lines between every DOM element. Real text content (e.g. a label
    // "Submit" inside a button) has non-whitespace and is preserved.
    if (/^\s+$/.test(text) && /\n/.test(text)) return [];
    return [text];
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return [];
  }

  const element = node as Element;
  const childBinding = bindings.find((binding) => binding.kind === 'child' && element.hasAttribute(binding.marker));
  if (childBinding) {
    return toChildren(childBinding.value);
  }

  const tagName = element.tagName.toLowerCase();
  const props = propsFromElement(element, bindings);
  const children = Array.from(element.childNodes).flatMap((child) => convertNode(child, bindings));

  return [h(tagName, props, children as any)];
};

const renderTemplate = ({ markup, bindings }: { markup: string; bindings: StoryBinding[] }) => {
  const template = document.createElement('template');
  template.innerHTML = markup;
  const children = Array.from(template.content.childNodes).flatMap((node) => convertNode(node, bindings));

  if (children.length === 1 && isVNode(children[0])) {
    return children[0];
  }

  // Multi-child wrapper. We've tried both `style: { display: 'contents' }`
  // (the renderer in @stencil/storybook-plugin's path stringified the
  // object → `style="[object Object]"`) AND `style: 'display: contents'`
  // (Stencil's setAccessor iterated the string as an indexed CSSStyle
  // declaration and threw "Indexed property setter is not supported").
  // A plain CSS class is the only path that works through both renderers
  // unmodified — pair this with `.sb-story-wrapper { display: contents }`
  // in preview.css so the wrapper is layout-transparent and children
  // participate in the parent's layout (e.g. sy-radio-group's flex
  // fieldset) as if no wrapper were there.
  return h('div', { class: { 'sb-story-wrapper': true } }, children as any);
};

export const html = (strings: TemplateStringsArray, ...values: unknown[]): VNode => {
  let markup = '';
  const bindings: StoryBinding[] = [];

  values.forEach((value, index) => {
    const marker = `data-sy-story-bind-${index}`;
    const segment = strings[index];
    const attrMatch = segment.match(/(\s)([.?@]?)([A-Za-z_:$][\w:.-]*)=$/);

    if (attrMatch) {
      const [, whitespace, prefix, name] = attrMatch;
      const kind: StoryBindingKind = prefix === '?' ? 'boolean' : prefix === '@' ? 'event' : prefix === '.' ? 'property' : 'attr';
      markup += segment.slice(0, segment.length - `${whitespace}${prefix}${name}=`.length);
      markup += `${whitespace}${marker}=""`;
      bindings.push({ kind, marker, name, value });
      return;
    }

    if (isRefDirective(value)) {
      markup += `${segment} ${marker}=""`;
      bindings.push({ kind: 'ref', marker, value: value.__storyRef });
      return;
    }

    if (isUnsafeHtml(value)) {
      markup += segment + value.__storyUnsafeHtml;
      return;
    }

    markup += `${segment}<span ${marker}=""></span>`;
    bindings.push({ kind: 'child', marker, value });
  });

  markup += strings[strings.length - 1];

  return h(renderTemplate, { markup, bindings });
};
