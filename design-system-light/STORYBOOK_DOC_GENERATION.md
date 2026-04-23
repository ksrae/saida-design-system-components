# Storybook Documentation Generation Guide

이 문서는 이 design-system 프로젝트의 각 Stencil component에 대해 Storybook 하위 문서(각 prop, method, event별 독립 스토리)를 생성하는 작업 지침입니다.

**타겟 모델**: 이 문서는 AI (Claude, ChatGPT 등)에게 전달되어 남은 component들을 패턴대로 완성하게 하는 프롬프트입니다.

---

## 0. Mental Model

각 component는 Storybook 사이드바에 다음과 같은 구조로 노출됩니다:

```
ComponentName/
├── Overview                    ← 이미 존재 (또는 새로 생성)
├── Attributes/
│   ├── Prop1
│   ├── Prop2
│   └── ...
├── Methods/
│   ├── Method1
│   └── ...
└── Events/
    ├── Event1
    └── ...
```

각 하위 항목(`Attributes/Prop1` 등)은 아래 파일 쌍으로 구성됩니다:
- `sy-<component>-<kebab-prop>.stories.tsx` — Story 정의
- `sy-<component>-<kebab-prop>.mdx` — 문서 페이지

이 파일들은 **`design-system-light/src/components/<component>/docs/{attributes|methods|events}/<kebab-name>/`** 폴더에 위치합니다.

---

## 1. 작업이 이미 완료된 레퍼런스 Component

다음 component들은 완전한 예시이므로 참고하세요:

| Component | 경로 | 구조 |
|-----------|-----|------|
| **autocomplete** | `src/components/autocomplete/docs/` | attributes(8) + methods(1) + events(2) |
| **avatar** | `src/components/avatar/docs/` | attributes(9) + events(2) |
| **avatar-group** | `src/components/avatar/docs/attributes/group-*/` | attributes(4) — `group-` 접두사 사용 |
| **badge** | `src/components/badge/docs/` | attributes(8) |
| **banner** | `src/components/banner/docs/` | attributes(6) |
| **breadcrumb** | `src/components/breadcrumb/docs/` | attributes(1) + events(1) |
| **button** | `src/components/button/docs/` | attributes(7) + method(2) + events(1) (기존 유지) |
| **button-group** | `src/components/button-group/docs/` | attributes(1) |
| **checkbox** | `src/components/checkbox/docs/` | attributes(5) + methods(1) + events(1) |
| **collapse** | `src/components/collapse/docs/` | attributes(5) + methods(1) |
| **divider** | `src/components/divider/docs/` | attributes(1) |
| **empty** | `src/components/empty/docs/` | attributes(1) |
| **icon** | `src/components/icon/docs/` | attributes(3) + events(1) |
| **label** | `src/components/label/docs/` | attributes(5) |

각 component의 `docs/sy-<component>.stories.tsx`에서 `argTypes`를 재사용합니다.

---

## 2. 파일 템플릿

### 2-1. Story 파일 템플릿 (attribute/prop용)

파일: `<dir>/sy-<comp>-<kebab-prop>.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { <DemoFunctionName> } from '../../sy-<comp>.main';
import <compMeta> from '../../sy-<comp>.stories';

const meta: Meta = {
  title: '<ComponentName>/Attributes/<Display Name>',
  component: 'sy-<comp>',
  tags: [],
  render: (args) => <DemoFunctionName>(args as { <propName>: <propType> }),
  argTypes: {
    <propName>: <compMeta>?.argTypes?.<propName>,
  },
  args: {
    <propName>: <defaultValue>,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
```

**주의사항:**
- `import type` 은 `@storybook/web-components-vite` 에서
- 기존 stories.tsx/.ts 파일의 default export (meta object)를 `<compMeta>` 로 가져와 `argTypes` 를 재사용
- `import` 경로 레벨: attributes 폴더는 `../../sy-<comp>.main` (2 단계 위)
- **boolean prop**: Lit 템플릿에서 `?propName=${value}` 사용 (단, camelCase 속성명이 Stencil에서 kebab-case로 매핑될 경우 `.propName=${value}` 프로퍼티 바인딩 사용 필요)
- **caseSensitive 같은 camelCase 속성**: `.propName=${value}` (property binding) 권장 — attribute binding은 브라우저가 소문자로 정규화하면서 Stencil이 못 알아듣음

### 2-2. MDX 파일 템플릿

파일: `<dir>/sy-<comp>-<kebab-prop>.mdx`

```mdx
import { Canvas, Meta, Controls } from '@storybook/addon-docs/blocks';
import * as <Name>Stories from './sy-<comp>-<kebab-prop>.stories';

<Meta of={<Name>Stories} />

# <Display Name>

<짧은 설명 1~2 문장>

<Canvas of={<Name>Stories.Default} />
<Controls of={<Name>Stories.Default} />
```

**Events/Methods 경우** (controls가 없으면):
```mdx
import { Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as <Name>Stories from './...';

<Meta of={<Name>Stories} />

# <Display Name>

<설명 + 필요하면 코드 스니펫>

<Canvas of={<Name>Stories.Default} />
```

### 2-3. Story for Method/Event (args 없음)

```typescript
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { <DemoFunctionName> } from '../../sy-<comp>.main';

const meta: Meta = {
  title: '<ComponentName>/Methods/<Name>',
  component: 'sy-<comp>',
  tags: [],
  render: () => <DemoFunctionName>(),
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
```

---

## 3. 작업 절차 (component별)

### Step 1: Stencil component 분석
Stencil source file을 읽고 다음을 추출:
- `@Prop()` 데코레이터가 붙은 모든 public property (reflect 여부 관계없이)
- `@Method()` 데코레이터가 붙은 모든 public async method
- `@Event()` 데코레이터가 붙은 모든 EventEmitter

예시 정규식 (grep): `@(Prop|Method|Event)\(`

### Step 2: 기존 `docs/sy-<comp>.main.tsx` 분석
이미 개별 demo 함수가 있는지 확인합니다. 예:
- `AutocompleteCaseSensitive(args: {caseSensitive: boolean})`
- `AvatarDisabled(args: {disabled: boolean})`

### Step 3: 누락된 demo 함수 추가
각 prop/method/event에 대해 demo 함수가 없으면 **`docs/sy-<comp>.main.tsx`에 추가**.

**Prop demo 템플릿** (간단한 attribute):
```typescript
export const <Comp><Prop> = (args: {<prop>: <type>}) => html`
  <sy-<comp> <attrBinding>=${args.<prop>}>...</sy-<comp>>
`;
```

**Event demo 템플릿** (args 없음, event listener 포함):
```typescript
export const <Comp><Event> = () => html`
  <sy-<comp> id="demoId">...</sy-<comp>>
  <p id="demoIdResult"></p>
  <script>
    (() => {
      const elem = document.getElementById('demoId');
      const result = document.getElementById('demoIdResult');
      elem.addEventListener('<eventName>', (e) => {
        result.textContent = JSON.stringify(e.detail);
      });
    })();
  </script>
`;
```

**Method demo 템플릿**:
```typescript
export const <Comp>Methods = () => html`
  <sy-<comp> id="demoId">...</sy-<comp>>
  <sy-button id="btnAction">doAction()</sy-button>
  <script>
    (() => {
      const elem = document.getElementById('demoId');
      document.getElementById('btnAction').addEventListener('click', () => elem.doAction());
    })();
  </script>
`;
```

### Step 4: 기존 `docs/sy-<comp>.stories.tsx` 분석
`argTypes` 에 각 prop이 정의되어 있는지 확인. 없으면 추가:

```typescript
<propName>: {
  control: '<boolean|text|number|select|radio>',
  description: '...',
  table: {
    category: 'Parameter',
    defaultValue: { summary: <default> as any },
    type: { summary: '<typeString>' },
  },
},
```

### Step 5: 폴더 생성 + 파일 생성
```bash
cd design-system-light/src/components/<comp>/docs
mkdir -p attributes/<kebab1> attributes/<kebab2> ... methods/<m1> ... events/<e1> ...
```

### Step 6: 각 폴더에 2 파일 생성
Template 2-1 (또는 2-3) 기반 `.stories.tsx` + Template 2-2 기반 `.mdx`.

---

## 4. 일반 주의사항

### 4-1. `sy-` prefix + kebab-case 파일명
폴더명도 kebab-case (예: `tooltip-content`, `max-count`, `show-icon`)

### 4-2. Attribute binding vs Property binding (중요!)
**Stencil의 prop 속성 매핑:**
- `@Prop() caseSensitive` → HTML attribute `case-sensitive` (camel → kebab)
- `@Prop() maxCount` → HTML attribute `max-count`

**Lit 템플릿 작성 시:**
- **boolean prop (single word, 소문자)**: `?disabled=${value}` ✅
- **boolean prop (camelCase)**: `.caseSensitive=${value}` ✅ (property binding 권장)
  - 또는 `?case-sensitive=${value}` (kebab-case attribute)
- **string/number prop**: `propName=${value}` ✅ (Lit이 자동으로 속성 설정)
- **object/array prop**: `.source=${value}` (property binding 필수)

잘못된 예:
```typescript
// ❌ 브라우저가 casesensitive(소문자)로 정규화 → Stencil이 case-sensitive를 못 찾음
<sy-autocomplete ?caseSensitive=${value}>
```

올바른 예:
```typescript
// ✅
<sy-autocomplete .caseSensitive=${value}>
```

### 4-3. `docs/sy-<comp>.stories.tsx` 파일이 `.ts`인 경우
checkbox는 `.ts` 확장자를 씁니다. 이 경우 import 경로는 그대로 `'../../sy-checkbox.stories'` — TypeScript가 자동으로 찾습니다.

### 4-3-1. 같은 폴더 내 서브 컴포넌트 처리 (avatar + avatar-group 패턴)
하나의 `docs/` 폴더에 메인 컴포넌트와 서브 컴포넌트가 공존하는 경우 **서브 컴포넌트는 폴더명에 `group-` (또는 해당되는) 접두사**를 붙여 같은 `attributes/`, `methods/`, `events/` 폴더에 나란히 둡니다.

예: avatar + avatar-group
```
avatar/docs/
├── sy-avatar.main.tsx             ← 두 컴포넌트의 demo 함수 전부 여기
├── sy-avatar.stories.tsx          ← Avatar Overview
├── sy-avatar-group.stories.tsx    ← title: 'Avatar/Group Overview'
└── attributes/
    ├── clickable/                 ← title: 'Avatar/Attributes/Clickable'
    ├── disabled/                  ← title: 'Avatar/Attributes/Disabled'
    ├── variant/                   ← title: 'Avatar/Attributes/Variant'
    ├── group-clickable/           ← title: 'Avatar/Attributes/Group Clickable'
    ├── group-max-count/           ← title: 'Avatar/Attributes/Group Max Count'
    ├── group-size/                ← title: 'Avatar/Attributes/Group Size'
    └── group-variant/             ← title: 'Avatar/Attributes/Group Variant'
```

**핵심 규칙:**
- **폴더명**은 서브 컴포넌트에 `group-` 접두사 사용 (`group-clickable/`).
- **Storybook title**은 **메인 컴포넌트 이름 아래**에 `Group <Display Name>` 형태로 작성 (`Avatar/Attributes/Group Clickable`). **별도 top-level 메뉴를 만들지 않습니다.**
- 서브 컴포넌트의 Overview도 같은 메인 메뉴에 편입 (`Avatar/Group Overview`).
- **별도 서브폴더(`group/`) 를 만들지 않습니다.**

### 4-4. `clearElements` import
기존 stories 파일 상단의 다음 import가 정상이어야 함:
```typescript
import { clearElements } from '../../clear-element';
```
타입 선언은 이미 `src/components/clear-element.d.ts`에 생성되어 있음.

### 4-5. 타이틀 패턴
- Overview: `<Name>/Overview`
- Attributes: `<Name>/Attributes/<PropDisplayName>`
- Methods: `<Name>/Methods/<MethodDisplayName>`
- Events: `<Name>/Events/<EventDisplayName>`

`<Name>`은 **기존 `sy-<comp>.stories.tsx`의 title 첫 세그먼트와 반드시 일치**해야 합니다 (예: button-group의 기존 title은 `ButtonGroup/Overview` → 하위 stories도 `ButtonGroup/Attributes/...`, **절대 `Button-Group/...` 아님**).

`<PropDisplayName>`은 공백 포함 가능 (예: `Tooltip Content`, `Full Height`, `Group Clickable`).

### 4-6. Storybook 정렬: Overview 최상단 고정
기본 정렬은 알파벳 순이므로 Overview(O)가 Attributes(A)/Events(E) 뒤에 위치합니다. `.storybook/preview.ts` 의 `storySort.order` 배열에 다음 패턴을 추가하면 Overview가 항상 최상단에 고정됩니다:

```typescript
storySort: {
  order: [
    // ...
    'Autocomplete', ['Overview', '*'],
    'Avatar',       ['Overview', 'Group Overview', '*'],
    'Badge',        ['Overview', '*'],
    // ...
  ],
}
```

**`['Overview', '*']`** 패턴:
- `'Overview'` 가 먼저
- `'*'` = 나머지 전부 (기본 알파벳 순)

서브 컴포넌트 Overview가 있으면 명시적으로 나열 (예: `['Overview', 'Group Overview', '*']`).

**새 component의 attributes/methods/events 생성 후 반드시 `preview.ts`에도 항목을 추가하세요.**

### 4-6. Component 메타 import & 재사용
Stories 파일은 `../../sy-<comp>.stories`에서 default export된 meta를 import하여 argType을 공유:
```typescript
import compMeta from '../../sy-<comp>.stories';
// ...
argTypes: { <prop>: compMeta?.argTypes?.<prop> },
```

### 4-7. Storybook config는 자동 picks up
`.storybook/main.ts` 가 `'../src/**/*.mdx'` 와 `'../src/**/*.stories.@(js|jsx|ts|tsx)'` 로 설정되어 있어 새 파일을 추가만 하면 자동 인식됨. 별도 등록 불필요.

---

## 5. docs 폴더가 없는 Tier-2 Component 처리법

다음 component들은 **`docs/` 폴더 자체가 없습니다.** 이 경우 전체 기반을 새로 생성해야 합니다.

**대상 component (26개):**
card, flex, global-header, inline-message, modeless, nav, pagination, popconfirm, popover, progress-bar, progress-circular, radio, select, skeleton, slider, spinner, split-panel, steps, switch, tabs, tag, textarea, toast, tooltip, tree-select, tree

### Step A: docs 폴더 + base 파일 3개 생성

```
<comp>/
└── docs/
    ├── sy-<comp>.main.tsx        ← Lit 템플릿 demo 함수들
    ├── sy-<comp>.stories.tsx     ← Storybook meta (Overview)
    └── sy-<comp>.main.mdx        ← Overview 문서 페이지
```

### Step B: `docs/sy-<comp>.main.tsx`

참고 예시: `src/components/badge/docs/sy-badge.main.tsx`

```typescript
import { html } from 'lit';
import { Components } from '../../../components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js'; // slot이 있으면

export interface Sy<Comp>Props extends Components.Sy<Comp> {
  slot?: any;
  // event callback 타입도 여기 추가
  <event>?: (event: CustomEvent<any>) => void;
}

// Overview render 함수
export const <Comp> = ({ <allProps> }: Sy<Comp>Props) => html`
  <sy-<comp> <모든prop 바인딩>>
    ${unsafeHTML(slot)}
  </sy-<comp>>
`;

// 각 prop별 demo 함수 (반드시 모든 prop 커버)
export const <Comp><Prop1> = (args: {<prop1>: <type>}) => html`...`;
export const <Comp><Prop2> = (args: {<prop2>: <type>}) => html`...`;
// ...

// 각 event별 demo 함수
export const <Comp><Event1> = () => html`...`;

// 각 method별 demo 함수
export const <Comp>Methods = () => html`...`;
```

### Step C: `docs/sy-<comp>.stories.tsx`

참고 예시: `src/components/badge/docs/sy-badge.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { Sy<Comp>Props, <Comp> } from './sy-<comp>.main';
import { clearElements } from '../../clear-element';

const <comp>Meta: Meta<Sy<Comp>Props> = {
  title: '<Name>/Overview',
  component: 'sy-<comp>',
  tags: [],
  render: (args) => {
    clearElements(<comp>Meta.title);
    return <Comp>(args);
  },
  argTypes: {
    // 각 prop마다 정의 (control, description, table 포함)
    <prop1>: {
      control: '<boolean|text|number|select|radio>',
      description: '<...>',
      table: {
        category: 'Parameter',
        defaultValue: { summary: <default> as any },
        type: { summary: '<typeString>' },
      },
    },
    // event, method도 function 타입으로 정의
    <event1>: {
      type: 'function',
      description: '<...>',
      table: {
        category: 'Callback',
        type: { summary: `.addEventListener('<event>', (e) => {})` },
      },
    },
    <method1>: {
      type: 'function',
      description: '<...>',
      table: {
        category: 'Function',
        type: { summary: `<method>()` },
      },
    },
  },
};

export default <comp>Meta;

type Story = StoryObj<Sy<Comp>Props>;

export const Default: Story = {
  args: {
    // 기본값 세팅
    <prop1>: <default>,
    <prop2>: <default>,
  },
};
```

### Step D: `docs/sy-<comp>.main.mdx`

```mdx
import { Canvas, Meta, Controls } from '@storybook/addon-docs/blocks';
import * as <Comp>Stories from './sy-<comp>.stories';

<Meta of={<Comp>Stories} />

# <Name>

## Definition
<1~2문장 설명>

## Example
<Canvas of={<Comp>Stories.Default} />
<Controls of={<Comp>Stories.Default} />
```

### Step E: Tier-1과 동일하게 하위 폴더 생성
각 prop/method/event에 대해 `attributes/<kebab>/`, `methods/<kebab>/`, `events/<kebab>/` 생성하고 `.stories.tsx` + `.mdx` 쌍 작성 (위 §2 템플릿).

---

## 6. 남은 Tier-1 Component 상세

다음 component들은 docs 폴더 및 base 파일은 이미 있으므로 `attributes/`, `methods/`, `events/` 하위 스토리만 생성하면 됩니다.

### 6-1. colorpicker
- 파일: `src/components/colorpicker/sy-color-picker.tsx`
- Stencil 분석 후 모든 @Prop, @Method, @Event 에 대해 하위 폴더/파일 생성
- 명령: `grep -nE '@(Prop|Method|Event)\(' src/components/colorpicker/sy-color-picker.tsx`

### 6-2. datepicker
- 파일: `src/components/datepicker/sy-date-picker.tsx`
- 동일

### 6-3. drawer
- 파일: `src/components/drawer/sy-drawer.tsx`
- `setOpen`, `setClose` 같은 method가 많을 가능성 있음

### 6-4. dropdown
- 파일: `src/components/dropdown/sy-dropdown.tsx`

### 6-5. input
- 파일: `src/components/input/sy-input.tsx`
- Props 많음 (type, value, required, disabled, placeholder, readonly 등)
- Events: changed, focused, blured
- Methods: setFocus, setBlur, checkValidity, reportValidity 등

### 6-6. input-number
- 파일: `src/components/input-number/sy-input-number.tsx`

### 6-7. menu
- 파일: `src/components/menu/sy-menu.tsx`
- 하위 component: `sy-menu-item`, `sy-menu-group`, `sy-menu-sub` 있음 (별도 처리)

### 6-8. modal
- 파일: `src/components/modal/sy-modal.tsx`
- `setOpen`, `setClose`, ... method들

각 component에 대해 §3 절차(Step 1~6)를 따르세요.

---

## 7. Tier-2 Component 상세 (docs 폴더 없음)

### 처리 체크리스트 (각 component마다)

- [ ] `docs/` 폴더 생성
- [ ] `docs/sy-<comp>.main.tsx` 생성 (§5 Step B)
- [ ] `docs/sy-<comp>.stories.tsx` 생성 (§5 Step C)
- [ ] `docs/sy-<comp>.main.mdx` 생성 (§5 Step D)
- [ ] Stencil source에서 @Prop/@Method/@Event 추출
- [ ] 각 prop마다 `attributes/<kebab>/` 생성 + 파일 2개
- [ ] 각 method마다 `methods/<kebab>/` 생성 + 파일 2개
- [ ] 각 event마다 `events/<kebab>/` 생성 + 파일 2개

### 대상 component 전체 리스트 (Stencil source 경로 포함)

| # | 컴포넌트 | Stencil source | 추출 명령 |
|---|---------|----------------|----------|
| 1 | card | `src/components/card/sy-card.tsx` | `grep -nE '@(Prop\|Method\|Event)\(' src/components/card/sy-card.tsx` |
| 2 | flex | `src/components/flex/sy-flex.tsx` | 동일 |
| 3 | global-header | `src/components/global-header/sy-global-header.tsx` | 동일 |
| 4 | inline-message | `src/components/inline-message/sy-inline-message.tsx` | 동일 |
| 5 | modeless | `src/components/modeless/sy-modeless.tsx` (+ `sy-modeless-group.tsx`) | 동일 |
| 6 | nav | `src/components/nav/sy-nav.tsx` (+ `sy-nav-group.tsx`, `sy-nav-sub.tsx`, `sy-nav-item.tsx`) | 동일 |
| 7 | pagination | `src/components/pagination/sy-pagination.tsx` | 동일 |
| 8 | popconfirm | `src/components/popconfirm/sy-popconfirm.tsx` | 동일 |
| 9 | popover | `src/components/popover/sy-popover.tsx` | 동일 |
| 10 | progress-bar | `src/components/progress-bar/sy-progress-bar.tsx` | 동일 |
| 11 | progress-circular | `src/components/progress-circular/sy-progress-circular.tsx` | 동일 |
| 12 | radio | `src/components/radio/sy-radio.tsx` (+ `sy-radio-group.tsx`) | 동일 |
| 13 | select | `src/components/select/sy-select.tsx` | 동일 |
| 14 | skeleton | `src/components/skeleton/sy-skeleton.tsx` | 동일 |
| 15 | slider | `src/components/slider/sy-slider.tsx` | 동일 |
| 16 | spinner | `src/components/spinner/sy-spinner.tsx` | 동일 |
| 17 | split-panel | `src/components/split-panel/sy-split-panel.tsx` | 동일 |
| 18 | steps | `src/components/steps/sy-steps.tsx` (+ `sy-step-item.tsx` 있으면) | 동일 |
| 19 | switch | `src/components/switch/sy-switch.tsx` | 동일 |
| 20 | tabs | `src/components/tabs/sy-tab-group.tsx` (+ `sy-tab.tsx`) | 동일 |
| 21 | tag | `src/components/tag/sy-tag.tsx` | 동일 |
| 22 | textarea | `src/components/textarea/sy-textarea.tsx` | 동일 |
| 23 | toast | `src/components/toast/sy-toast.tsx` | 동일 |
| 24 | tooltip | `src/components/tooltip/sy-tooltip.tsx` | 동일 |
| 25 | tree-select | `src/components/tree-select/sy-tree-select.tsx` | 동일 |
| 26 | tree | `src/components/tree/sy-tree.tsx` (+ `sy-tree-item.tsx`) | 동일 |

### 여러 하위 component가 있는 경우 (예: tabs, nav, radio, menu)
- 각 서브 component마다 **별도 stories.tsx** 를 만들고 별도 title (예: `Tabs/Overview`, `Tab/Overview` 또는 `Tabs/Group/Overview`)
- 또는 avatar 패턴처럼 `docs/group/` 같은 서브폴더 사용
- 메인 component 기준으로 `docs/sy-<comp>.main.tsx` 하나에 모든 demo 함수 포함 가능

---

## 8. 구체적 작업 예시 (빈 파일 하나 → 완성까지)

### 예: `sy-tag` component

**Step 1**: Stencil 분석
```bash
grep -nE '@(Prop|Method|Event)\(' src/components/tag/sy-tag.tsx
```
가상 결과:
```
@Prop({ reflect: true }) closable: boolean = false;
@Prop() color: 'red' | 'blue' | 'green' = 'blue';
@Prop() size: 'small' | 'medium' | 'large' = 'medium';
@Event() closed: EventEmitter<void>;
```

**Step 2**: docs 폴더 base 생성
```
src/components/tag/docs/
├── sy-tag.main.tsx
├── sy-tag.stories.tsx
└── sy-tag.main.mdx
```

**Step 3**: `sy-tag.main.tsx` demo 함수 포함
```typescript
import { html } from 'lit';
import { Components } from '../../../components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SyTagProps extends Components.SyTag {
  slot?: any;
  closed?: (event: CustomEvent<any>) => void;
}

export const Tag = ({ closable, color, size, slot }: SyTagProps) => html`
  <sy-tag ?closable=${closable} color=${color} size=${size}>${unsafeHTML(slot)}</sy-tag>
`;

export const TagClosable = (args: { closable: boolean }) => html`
  <sy-tag ?closable=${args.closable}>Closable tag</sy-tag>
`;

export const TagColor = (args: { color: 'red' | 'blue' | 'green' }) => html`
  <sy-tag color=${args.color}>Colored tag</sy-tag>
`;

export const TagSize = (args: { size: 'small' | 'medium' | 'large' }) => html`
  <sy-tag size=${args.size}>Sized tag</sy-tag>
`;

export const TagClosed = () => html`
  <sy-tag id="tagClosed" closable>Close me</sy-tag>
  <p id="tagClosedResult"></p>
  <script>
    (() => {
      const elem = document.getElementById('tagClosed');
      const result = document.getElementById('tagClosedResult');
      elem.addEventListener('closed', () => result.textContent = 'tag closed');
    })();
  </script>
`;
```

**Step 4**: `sy-tag.stories.tsx` overview meta
```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { SyTagProps, Tag } from './sy-tag.main';
import { clearElements } from '../../clear-element';

const tagMeta: Meta<SyTagProps> = {
  title: 'Tag/Overview',
  component: 'sy-tag',
  tags: [],
  render: (args) => {
    clearElements(tagMeta.title);
    return Tag(args);
  },
  argTypes: {
    closable: {
      control: 'boolean',
      description: 'Shows a close button.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    color: {
      control: 'select',
      options: ['red', 'blue', 'green'],
      description: 'Tag color.',
      table: { category: 'Parameter', defaultValue: { summary: 'blue' }, type: { summary: 'red | blue | green' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tag size.',
      table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } },
    },
    slot: {
      control: 'text',
      description: 'Tag label.',
      table: { category: 'Parameter', defaultValue: { summary: '' } },
    },
    closed: {
      type: 'function',
      description: 'Fired when the tag is closed.',
      table: { category: 'Callback', type: { summary: `.addEventListener('closed', (e) => {})` } },
    },
  },
};

export default tagMeta;

type Story = StoryObj<SyTagProps>;

export const Default: Story = {
  args: { closable: true, color: 'blue', size: 'medium', slot: 'Tag' },
};
```

**Step 5**: `sy-tag.main.mdx`
```mdx
import { Canvas, Meta, Controls } from '@storybook/addon-docs/blocks';
import * as TagStories from './sy-tag.stories';

<Meta of={TagStories} />

# Tag

## Definition
A short text label, optionally colored and closable.

## Example
<Canvas of={TagStories.Default} />
<Controls of={TagStories.Default} />
```

**Step 6**: 하위 폴더 & 파일 (stories+mdx) 생성
```bash
cd src/components/tag/docs
mkdir -p attributes/closable attributes/color attributes/size events/closed
```

각 하위 폴더에 `sy-tag-<kebab>.stories.tsx` + `sy-tag-<kebab>.mdx` 생성 (§2 템플릿 사용).

완료!

---

## 9. 주요 Don't / Do

**Don't:**
- ❌ docs/에 있는 기존 파일을 덮어쓰지 마세요 (기존 Overview meta는 그대로 둡니다)
- ❌ 새 파일을 `.ts`로 만들지 마세요 (`.tsx`)
- ❌ `from '@storybook/web-components'` ↔ `'@storybook/web-components-vite'` 혼용 주의 (둘 다 유효하나 새 파일은 후자 권장)
- ❌ `<<something>>` placeholder 남기지 마세요

**Do:**
- ✅ Stencil source의 `@Prop`/`@Method`/`@Event` **전부** 커버
- ✅ Prop 이름이 camelCase이면 폴더명은 kebab-case (`maxCount` → `max-count`)
- ✅ Method/Event 이름도 kebab-case 폴더 (`setFocus` + `setBlur` 조합은 보통 `focus-blur/`)
- ✅ 기존 `docs/sy-<comp>.stories.tsx`의 `argTypes`에서 재사용, 없는 prop만 새로 정의
- ✅ boolean prop은 `?prop=${}` (단 camelCase는 `.prop=${}`)
- ✅ `clearElements` 는 Overview meta의 render에서만 호출, 하위 stories는 불필요

---

## 10. 검증

작업 완료 후 확인:
1. `npx storybook dev` 실행 → 사이드바에 새 메뉴가 올바르게 노출되는지
2. 각 story 페이지 렌더링 OK
3. Controls 탭에서 arg 변경 시 컴포넌트 반영
4. TypeScript 에러 없음

---

## 부록: 반복적 작업 skeleton 명령어

1개의 component 완성까지 필요한 일괄 작업:

```bash
cd src/components/<comp>/docs

# 1. Stencil source 읽기
cat ../sy-<comp>.tsx | grep -E '@(Prop|Method|Event)\('

# 2. 디렉토리 한번에 생성
mkdir -p attributes/<prop1> attributes/<prop2> methods/<m1> events/<e1>

# 3. 각 디렉토리에 stories.tsx + mdx 생성 (template 기반)
```

이 문서를 AI에게 프롬프트와 함께 전달하면 남은 component들을 동일한 품질/패턴으로 완성할 수 있습니다.
