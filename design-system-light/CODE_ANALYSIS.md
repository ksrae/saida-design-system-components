# 컴포넌트 코드 분석 보고서

> 분석 대상: `src/components` 하위 전체 TSX 파일  
> 분석 일자: 2026-04-23

---

## 목차

- [✅ 현재 반영 상태](#-현재-반영-상태)
- [🔴 치명적 버그 (Critical)](#-치명적-버그-critical)
- [🟡 중간 심각도 버그 (Medium)](#-중간-심각도-버그-medium)
- [🔐 보안 이슈 (Security)](#-보안-이슈-security)
- [⚙️ z-index / 레이어링 분석](#️-z-index--레이어링-분석)
- [🟢 코드 품질 개선점 (Improvement)](#-코드-품질-개선점-improvement)
- [🔎 추가 재분석 결과](#-추가-재분석-결과)
- [📊 요약](#-요약)

---

## ✅ 현재 반영 상태

> 아래 본문은 최초 분석 기록입니다. 현재 코드 반영 상태와 실행 검증 결과는 이 섹션 기준으로 업데이트합니다.

### 반영 완료

- `sy-tab.tsx`: `componentWillLoad` 오타 수정, alias 기반 disabled 초기화 보정
- `sy-modal.tsx` / `sy-modal.scss`: `keydown` 리스너 참조 안정화, body append 조건 수정, 측면 resize handle 추가
- `sy-select.tsx`: 전역 리스너 cleanup 안정화, `closeDropdown()` 공개 메서드 추가, popup option 배열 오염 제거, 전역 `sy-option` clear 제거, popup z-index inline 제거
- `sy-pagination.tsx`: `sy-select` 내부 state 직접 접근 제거, `closeDropdown()` 호출로 변경
- `sy-tab-group.tsx`: overflow menu id 충돌 제거, global-header 판별 수정, drag/drop 리스너 cleanup 안정화
- `sy-tree-item.tsx`: alias 오타 수정, 불필요한 document click 리스너 제거, level class 갱신 안정화, label highlight XSS 차단
- `sy-tree-select.tsx`: loading/empty/tree 상태 전환 시 popup content 재렌더링 수정, z-index 토큰 사용으로 정리
- `sy-tooltip.tsx`: hover trigger에서 click 리스너 제거, resize handler 참조 안정화, scroll/resize cleanup 보강
- `sy-popover.tsx`: option detection document listener 중복 등록 제거 및 cleanup 보강
- `sy-menu.tsx`: capture flag 일치, dropdown 부모 keydown listener cleanup 보강
- `sy-avatar-group.tsx`: body로 이동한 overflow container를 인스턴스별로 관리하도록 수정
- `sy-menu-group.tsx`, `sy-menu-sub.tsx`, `sy-nav-group.tsx`, `sy-nav-sub.tsx`: title 렌더링에서 raw `innerHTML` 제거, text 기반 sanitize 적용
- `sy-autocomplete.tsx`: body append option clone의 고정 id 제거, z-index fallback을 select/menu 레이어와 정렬
- `sy-global-header.tsx`: reserved prop/native event 충돌 제거 (`title` → 내부 `appTitle`, `click` → `actionClick`), 데모 이벤트명도 함께 정리
- `sy-tab-group.tsx`: 탭 DOM 조회 결과를 메서드 단위로 refresh/cached 재사용하도록 정리해 반복 `querySelectorAll` 비용 축소

### 테스트 및 검증

- 단위 테스트 추가: `src/components/__tests__` 아래 7개 spec 파일 + `src/utils/utils.spec.ts`
- `npx stencil test --spec --runInBand`: **29 passed**
- `npm run build`: **성공**
- `npm test` (`stencil test --spec --e2e`): **29 passed**

### Storybook / Docs 반영

- `autocomplete` docs: 잘못된 태그명(`sy-autoComplete`) 정리, 전역 `querySelector` 대신 id 기반 바인딩으로 정리
- `modal` docs/stories: modal open script를 인스턴스 기준으로 안전하게 수정, modal 위 select overlay 회귀를 확인할 수 있는 예제로 개선
- `menu` / `menu-group` stories: sanitize 이후 동작과 맞지 않는 HTML title 예시를 plain text 예시로 정리
- `avatar-group` story: 기본 예제가 overflow dropdown 경로를 실제로 보여주도록 `maxCount` 조정
- `src/index.html`: `sy-global-header` 데모가 새 `actionClick` 이벤트명을 사용하도록 샘플 이벤트 바인딩/디스패치 정리

### 현재 남은 항목

- 현재 작업 범위 기준으로 재현되는 실패 항목은 없음
- `sy-tree-item.tsx`의 `extractHtmlAndText` / `reconstructHtmlLabel` / `originalHtmlParts`는 재검토 결과 label 편집 경로에서 실제 사용 중이므로 dead code로 제거하지 않음

---

## 🔴 치명적 버그 (Critical)

---

### 1. `sy-tab.tsx` — `componentwWillLoad` 오타로 lifecycle 미실행

**파일:** `src/components/tabs/sy-tab.tsx` (line 38)

```ts
// ❌ 잘못된 코드 — Stencil이 인식하지 못함
componentwWillLoad() {
  this.parentDisabled = fnAssignPropFromAlias(this.host, 'parent-disabled') ?? this.parentDisabled;
  this.currentDisabledStatus = fnAssignPropFromAlias(this.host, 'current-disabled-status') ?? this.currentDisabledStatus;
  this.inHeader = fnAssignPropFromAlias(this.host, 'in-header') ?? this.inHeader;
}
```

**문제:**  
Stencil의 lifecycle hook은 `componentWillLoad`입니다. `componentwWillLoad`(소문자 w)는 일반 메서드로 취급되어 **절대 호출되지 않습니다.**  
HTML에서 케밥케이스 속성(`parent-disabled`, `current-disabled-status`, `in-header`)으로 값을 전달해도 초기화가 완전히 무시됩니다.  
모달 위에 탭을 올렸을 때 `parentDisabled` 초기화가 실패하여 탭이 비정상적으로 비활성화될 수 있습니다.

**수정:**
```ts
// ✅ 올바른 코드
componentWillLoad() {
  this.parentDisabled = fnAssignPropFromAlias(this.host, 'parent-disabled') ?? this.parentDisabled;
  this.currentDisabledStatus = fnAssignPropFromAlias(this.host, 'current-disabled-status') ?? this.currentDisabledStatus;
  this.inHeader = fnAssignPropFromAlias(this.host, 'in-header') ?? this.inHeader;
}
```

---

### 2. `sy-modal.tsx` — `handleKeydown` 이벤트 리스너 메모리 누수

**파일:** `src/components/modal/sy-modal.tsx` (line 49, 120)

```ts
// ❌ 잘못된 코드
connectedCallback() {
  document.addEventListener('keydown', this.handleKeydown.bind(this)); // 새 함수 참조 생성
}
disconnectedCallback() {
  document.removeEventListener('keydown', this.handleKeydown.bind(this)); // 또 다른 새 참조 → 제거 실패
}
```

**문제:**  
`.bind(this)`는 호출할 때마다 **새로운 함수 참조**를 반환합니다.  
`addEventListener`에 등록한 함수와 `removeEventListener`에 전달한 함수는 서로 다른 객체이므로 리스너가 절대 제거되지 않습니다.  
모달이 반복 생성/제거될 때마다 `document`에 `keydown` 리스너가 누적됩니다.

**수정:**
```ts
// ✅ 올바른 코드 — 클래스 필드에 한 번만 바인딩
private boundHandleKeydown = this.handleKeydown.bind(this);

connectedCallback() {
  document.addEventListener('keydown', this.boundHandleKeydown);
}
disconnectedCallback() {
  document.removeEventListener('keydown', this.boundHandleKeydown);
}
```

---

### 3. `sy-select.tsx` — `keydown` / `resize` / `scroll` 이벤트 리스너 메모리 누수

**파일:** `src/components/select/sy-select.tsx` (line 73, 80, 81, 105, 106)

```ts
// ❌ 잘못된 코드
connectedCallback() {
  document.addEventListener('keydown', this.handleDocumentKeydown.bind(this));    // 등록
}
disconnectedCallback() {
  document.removeEventListener('keydown', this.handleDocumentKeydown.bind(this)); // ❌ 다른 참조
  window.removeEventListener('resize', this.updatePopupPosition.bind(this));      // ❌ 다른 참조
  window.removeEventListener('scroll', this.updatePopupPosition.bind(this), true);// ❌ 다른 참조
}
componentWillLoad() {
  window.addEventListener('resize', this.updatePopupPosition.bind(this));         // 등록
  window.addEventListener('scroll', this.updatePopupPosition.bind(this), true);   // 등록
}
```

**문제:**  
`handleOutsideClick`은 `private handleOutsideClick = this.handleOutsideClickEvent.bind(this);`로 올바르게 처리되어 있으나, 나머지 3개 리스너는 동일한 `.bind(this)` 패턴 문제를 가집니다.  
컴포넌트 제거 후에도 `keydown`, `resize`, `scroll` 리스너가 전역에 영구적으로 남습니다.

**수정:**
```ts
// ✅ 올바른 코드
private boundKeydown = this.handleDocumentKeydown.bind(this);
private boundResize  = this.updatePopupPosition.bind(this);
private boundScroll  = this.updatePopupPosition.bind(this);

connectedCallback() {
  document.addEventListener('keydown', this.boundKeydown);
}
componentDidLoad() {
  window.addEventListener('resize', this.boundResize);
  window.addEventListener('scroll', this.boundScroll, true);
}
disconnectedCallback() {
  document.removeEventListener('keydown', this.boundKeydown);
  window.removeEventListener('resize', this.boundResize);
  window.removeEventListener('scroll', this.boundScroll, true);
}
```

---

### 4. `sy-tab-group.tsx` — 드래그앤드롭 이벤트 리스너 영구 누적

**파일:** `src/components/tabs/sy-tab-group.tsx` (line 551~564)

```ts
// ❌ 잘못된 코드
private enableDragAndDrop() {
  this.tabs.forEach((tab) => {
    tab.draggable = true;
    tab.addEventListener("dragstart", this.handleDragStart.bind(this)); // 새 참조 생성
    tab.addEventListener("dragover",  this.handleDragOver.bind(this));  // 새 참조 생성
    tab.addEventListener("drop",      this.handleDrop.bind(this));      // 새 참조 생성
    tab.addEventListener("dragend",   this.handleDragEnd.bind(this));   // 새 참조 생성
  });
}
private disableDragAndDrop() {
  this.tabs.forEach((tab) => {
    tab.removeEventListener("dragstart", this.handleDragStart); // ❌ 바인딩 없는 원본 참조 → 제거 실패
    tab.removeEventListener("dragover",  this.handleDragOver);
    tab.removeEventListener("drop",      this.handleDrop);
    tab.removeEventListener("dragend",   this.handleDragEnd);
  });
}
```

**문제:**  
`enableDragAndDrop`이 `.bind(this)`로 등록한 리스너를 `disableDragAndDrop`에서는 바인딩하지 않은 원본 메서드로 제거를 시도합니다.  
등록된 참조를 찾을 수 없어 제거가 실패하며, `isdraggable` prop이 `true → false → true`로 토글될 때마다 리스너가 누적됩니다.

**수정:**
```ts
// ✅ 올바른 코드 — arrow function으로 클래스 필드에 정의
private handleDragStart = (e: DragEvent) => { ... };
private handleDragOver  = (e: DragEvent) => { ... };
private handleDrop      = (e: DragEvent) => { ... };
private handleDragEnd   = (e: DragEvent) => { ... };

// 이후 addEventListener / removeEventListener 모두 동일 참조 사용
tab.addEventListener("dragstart", this.handleDragStart);
tab.removeEventListener("dragstart", this.handleDragStart);
```

---

### 5. `sy-select.tsx` — `renderOptionsPopup`에서 `this.options` 배열 오염

**파일:** `src/components/select/sy-select.tsx` (line ~1100~1130)

```ts
// ❌ 잘못된 코드
const allOptions: HTMLSyOptionElement[] = [...existingCustomTags, ...newCustomTags, ...slotOptions];
this.options = allOptions; // options = [A, B, C]

allOptions.forEach((option, index) => {
  const optionClone = option.cloneNode(true) as HTMLSyOptionElement;
  // ...
  this.options.push(optionClone); // ❌ options = [A, B, C, A', B', C'] — 원본+복제본 혼재
  this.optionsContainer?.appendChild(optionClone);
});
```

**문제:**  
`this.options`를 원본 배열로 초기화한 직후, 동일 배열에 복제본을 `push`합니다.  
`this.options`에 원본 3개와 복제본 3개가 함께 존재하게 되어 선택 상태 동기화 로직이 중복 항목을 처리하면서 예상치 못한 동작이 발생합니다.

**수정:**
```ts
// ✅ 올바른 코드 — options 배열에 복제본을 추가하지 않음
this.options = allOptions;

allOptions.forEach((option, index) => {
  const optionClone = option.cloneNode(true) as HTMLSyOptionElement;
  // ...
  // this.options.push(optionClone); ← 이 줄 삭제
  this.optionsContainer?.appendChild(optionClone);
});
```

---

### 6. `sy-select.tsx` — `handleClear`에서 페이지 전체 `sy-option` 초기화

**파일:** `src/components/select/sy-select.tsx` (line ~1280)

```ts
// ❌ 잘못된 코드
private handleClear = (e: any) => {
  const optionList = Array.from(document.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
  // ...
  optionList.forEach(opt => {
    opt.selected = false; // ❌ 페이지 내 모든 sy-select의 옵션이 초기화됨
    opt.hide = false;
  });
};
```

**문제:**  
`document.querySelectorAll('sy-option')`은 페이지에 있는 **모든** `sy-option` 요소를 반환합니다.  
여러 `sy-select` 컴포넌트가 같은 페이지에 있을 경우, 하나의 셀렉트를 clear할 때 **다른 셀렉트의 선택 상태까지 초기화**됩니다.

**수정:**
```ts
// ✅ 올바른 코드 — 현재 컴포넌트 범위로 제한
private handleClear = (e: any) => {
  const optionList = Array.from(this.host.querySelectorAll('sy-option')) as unknown as HTMLSyOptionElement[];
  // ...
};
```

---

### 7. `sy-select.tsx` — `componentWillLoad`에서 ResizeObserver DOM 접근 실패

**파일:** `src/components/select/sy-select.tsx` (line 108~116)

```ts
// ❌ 잘못된 코드
componentWillLoad() {
  // ...
  const selectContainer = this.host.querySelector('.select-container'); // 항상 null 반환
  if (selectContainer) { // 이 블록은 절대 실행되지 않음
    this.resizeObserver = new ResizeObserver(...);
    this.resizeObserver.observe(selectContainer);
  }
}
```

**문제:**  
`componentWillLoad`는 컴포넌트의 첫 렌더링 **이전**에 실행됩니다.  
이 시점에 `.select-container` 엘리먼트는 아직 DOM에 존재하지 않으므로 `querySelector`가 항상 `null`을 반환합니다.  
ResizeObserver가 설정되지 않아 셀렉트 컨테이너 크기 변경 시 드롭다운 위치가 갱신되지 않습니다.

**수정:**
```ts
// ✅ 올바른 코드 — componentDidLoad로 이동
componentDidLoad() {
  const selectContainer = this.host.querySelector('.select-container');
  if (selectContainer) {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.isOpen) this.updatePopupPosition();
    });
    this.resizeObserver.observe(selectContainer);
  }
}
```

---

## 🟡 중간 심각도 버그 (Medium)

---

### 8. `sy-tab-group.tsx` — `#tab-overflow-menu` ID 중복 충돌

**파일:** `src/components/tabs/sy-tab-group.tsx`

```ts
// ❌ 문제 코드 — 여러 곳에서 전역 ID로 조회
const menu = document.querySelector("sy-menu#tab-overflow-menu") as HTMLSyMenuElement;
```

```tsx
// render에서 고정 ID 할당
<sy-menu id="tab-overflow-menu" ...>
```

**문제:**  
같은 페이지에 `sy-tab-group`이 2개 이상 있으면 `id="tab-overflow-menu"`가 중복됩니다.  
`document.querySelector`는 항상 **첫 번째 요소**를 반환하므로, 두 번째 이후 tab-group의 오버플로우 메뉴가 전혀 동작하지 않습니다.

**수정:**
```ts
// ✅ 인스턴스별 내부 참조 사용
private overflowMenuEl: HTMLSyMenuElement | null = null;

// render에서 ref 콜백으로 참조 저장
<sy-menu ref={(el) => this.overflowMenuEl = el as HTMLSyMenuElement} ...>

// 이후 this.overflowMenuEl로 직접 접근
this.overflowMenuEl?.clearSelectedItem();
```

---

### 9. `sy-tab-group.tsx` — `isInsideGlobalHeader` 판별 로직 방향 오류

**파일:** `src/components/tabs/sy-tab-group.tsx` (render 함수)

```ts
// ❌ 잘못된 코드 — 하위 탐색
const isInsideGlobalHeader = this.host.querySelector('sy-global-header [slot="tabs"]') !== null;
```

**문제:**  
`this.host.querySelector`는 **자신의 하위 요소**를 탐색합니다.  
이 코드는 "tab-group 안에 sy-global-header가 있는지"를 검사하는 것으로, 실제 의도인 "tab-group이 sy-global-header 안에 있는지"와 **반대 방향**입니다.  
`updateOverflowTabs`에서도 동일한 패턴이 반복됩니다.

**수정:**
```ts
// ✅ 올바른 코드 — 상위 탐색
const isInsideGlobalHeader = !!this.host.closest('sy-global-header');
```

---

### 10. `sy-tree-item.tsx` — 불필요한 전역 click 이벤트 리스너

**파일:** `src/components/tree/sy-tree-item.tsx`

```ts
// ❌ 문제 코드
connectedCallback() {
  document.addEventListener("click", this.handleOutsideClick, true);
}

private handleOutsideClick = (_event: any) => {
  // Can be used for cleanup if needed  ← 아무 동작 없는 빈 함수
};
```

**문제:**  
모든 `sy-tree-item` 인스턴스가 `document`에 빈 클릭 핸들러를 등록합니다.  
100개 노드의 트리라면 **100개의 빈 리스너**가 전역에 등록되며, 페이지 내 모든 클릭 이벤트마다 100번의 불필요한 함수 호출이 발생합니다.

**수정:**  
실제 동작이 없으므로 이벤트 리스너 등록/해제 코드 전체를 제거합니다.

```ts
// ✅ 삭제
// connectedCallback() { document.addEventListener(...); }
// disconnectedCallback() { document.removeEventListener(...); }
// private handleOutsideClick = () => {};
```

---

### 11. `sy-tree-item.tsx` — `host.className` 직접 교체로 Stencil CSS 클래스 손실

**파일:** `src/components/tree/sy-tree-item.tsx` (line ~77, 100)

```ts
// ❌ 잘못된 코드
componentWillLoad() {
  this.host.className = ` level-${this.level} `; // 기존 모든 클래스 제거
}

@Watch('level')
handleLevelChange() {
  this.host.className = ` level-${this.level} `; // 기존 모든 클래스 제거
}
```

**문제:**  
`className`을 직접 덮어쓰면 Stencil이 scoped CSS를 위해 자동 부여한 `sc-sy-tree-item` 등의 클래스가 **모두 제거**됩니다.  
컴포넌트 스타일이 적용되지 않거나 렌더링 사이클 후 Stencil이 클래스를 재추가할 때까지 스타일이 깜빡일 수 있습니다.

**수정:**
```ts
// ✅ 올바른 코드 — level 클래스만 교체
private updateLevelClass() {
  this.host.classList.forEach(cls => {
    if (/^level-\d+$/.test(cls)) this.host.classList.remove(cls);
  });
  this.host.classList.add(`level-${this.level}`);
}
```

---

### 12. `sy-tree-item.tsx` — `fnAssignPropFromAlias` 별칭 오타

**파일:** `src/components/tree/sy-tree-item.tsx` (line 82)

```ts
// ❌ 잘못된 코드
this.isDescendant = fnAssignPropFromAlias(this.host, 'is-isDescendant') ?? this.isDescendant;
//                                                    ^^^^^^^^^^^^^^^^^ camelCase 섞임
```

**문제:**  
HTML 속성은 대소문자 구분이 없고 일반적으로 케밥케이스를 사용합니다.  
`'is-isDescendant'` 별칭은 실제 HTML 속성 `is-descendant`와 매칭되지 않아 외부에서 이 속성으로 값을 전달해도 항상 기본값이 사용됩니다.

**수정:**
```ts
// ✅ 올바른 코드
this.isDescendant = fnAssignPropFromAlias(this.host, 'is-descendant') ?? this.isDescendant;
```

---

### 13. `sy-pagination.tsx` — `sy-select` 내부 State 직접 변경

**파일:** `src/components/pagination/sy-pagination.tsx`

```ts
// ❌ 잘못된 코드
@Listen('click', { target: 'document' })
handleOutsideClick(e: Event) {
  const selectElement = this.host.querySelector('sy-select');
  if (selectElement && !this.host.contains(target)) {
    (selectElement as any).isOpen = false; // 내부 private state 직접 접근
  }
}
```

**문제:**  
`isOpen`은 `sy-select`의 `@State()` 변수로, 외부에서 직접 변경하면 `@Watch('isOpen')` → `closeSelectOption()`으로 이어지는 내부 cleanup 로직이 실행되지 않을 수 있습니다.  
옵션 컨테이너가 DOM에서 제거되지 않는 등의 부작용이 발생할 수 있습니다.

**수정:**  
`sy-select`에 `closeDropdown()` 같은 `@Method()`를 추가하여 공개 API를 통해 닫도록 수정합니다.

---

### 14. `sy-tooltip.tsx` — `updateTooltipPosition` `this` 바인딩 손실

**파일:** `src/components/tooltip/sy-tooltip.tsx` (line ~144)

```ts
// ❌ 잘못된 코드
private setupGlobalClickListener() {
  window.addEventListener("resize", this.updateTooltipPosition, true); // 일반 메서드 참조 전달
}

private updateTooltipPosition() { // arrow function이 아닌 일반 메서드
  if (!this.open || ...) { ... } // 이벤트 핸들러로 호출 시 this가 undefined
}
```

**문제:**  
`updateTooltipPosition`은 arrow function이 아닌 일반 메서드입니다.  
이벤트 핸들러로 직접 전달하면 `this`가 컴포넌트 인스턴스가 아닌 이벤트 타겟(또는 strict mode에서 `undefined`)이 됩니다.  
resize 시 툴팁 위치 갱신이 실패합니다.

**수정:**
```ts
// ✅ 올바른 코드
private boundUpdateTooltipPosition = this.updateTooltipPosition.bind(this);

private setupGlobalClickListener() {
  window.addEventListener("resize", this.boundUpdateTooltipPosition, true);
}
disconnectedCallback() {
  window.removeEventListener("resize", this.boundUpdateTooltipPosition, true);
}
```

---

### 15. `sy-menu.tsx` — scroll `removeEventListener` capture flag 불일치

**파일:** `src/components/menu/sy-menu.tsx` (line ~62, ~90)

```ts
// ❌ 잘못된 코드
connectedCallback() {
  window.addEventListener('scroll', this.updateMenuPosition, true);  // capture = true
  window.addEventListener('resize', this.updateMenuPosition, true);
}
disconnectedCallback() {
  window.removeEventListener('resize', this.updateMenuPosition);     // capture = false (기본값) ← resize는 우연히 동작
  window.removeEventListener('scroll', this.updateMenuPosition);     // ❌ capture 불일치 → 제거 실패
}
```

**문제:**  
`removeEventListener`는 `addEventListener` 시 사용한 것과 **동일한 capture/useCapture 옵션**을 전달해야 합니다.  
`scroll`은 `true`(capture)로 등록했지만 옵션 없이(기본값 `false`) 제거를 시도해 리스너가 제거되지 않습니다.

**수정:**
```ts
// ✅ 올바른 코드
disconnectedCallback() {
  window.removeEventListener('resize', this.updateMenuPosition, true);
  window.removeEventListener('scroll', this.updateMenuPosition, true);
}
```

---

### 16. `sy-modal.tsx` — `appendToRoot` 조건문 논리 오류

**파일:** `src/components/modal/sy-modal.tsx` (line ~175)

```ts
// ❌ 잘못된 코드
private appendToRoot = () => {
  if (!this.host.isConnected || !this.addedToBody) {
    // host가 DOM에서 분리된 상태(!isConnected)에서도 appendChild 시도
    document.body.appendChild(this.host);
    this.addedToBody = true;
    // ...
  }
}
```

**문제:**  
`!this.host.isConnected`는 host가 DOM에서 분리된 경우 `true`가 됩니다.  
분리된 상태에서도 `document.body.appendChild`를 호출하면 예상치 못한 동작이 발생할 수 있습니다.  
올바른 로직은 "연결되어 있고, 아직 body에 추가되지 않은 경우"에만 추가해야 합니다.

**수정:**
```ts
// ✅ 올바른 코드
private appendToRoot = () => {
  if (this.host.isConnected && !this.addedToBody) {
    document.body.appendChild(this.host);
    this.addedToBody = true;
    // ...
  }
}
```

---

## 🔐 보안 이슈 (Security)

---

### 17. `sy-tree-item.tsx` — `innerHTML` XSS 취약점

**파일:** `src/components/tree/sy-tree-item.tsx` (line ~350, renderNode)

```tsx
// ❌ 취약한 코드
<span class="item-content" innerHTML={this.textTerm}></span>
```

```ts
private renderLabelWithHighlight(label: string, searchTerm: string) {
  if (!searchTerm) {
    this.textTerm = label; // ❌ HTML 이스케이핑 없이 직접 할당
    return;
  }
  // searchTerm 있을 때도 label을 이스케이핑 없이 HTML 문자열로 조합
  result += preservedSpace + highlightedText;
}
```

**문제:**  
`label` prop에 `<img src=x onerror=alert(1)>` 같은 악성 HTML이 포함된 경우, `innerHTML`을 통해 **브라우저에서 스크립트가 실행**됩니다.  
외부 API에서 트리 데이터를 받아 렌더링하는 환경에서는 XSS 공격에 직접 노출됩니다.

**수정:**
```ts
// ✅ 올바른 코드 — label을 이스케이핑 후 사용
private escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

private renderLabelWithHighlight(label: string, searchTerm: string) {
  const safeLabel = this.escapeHtml(label);
  if (!searchTerm) {
    this.textTerm = safeLabel;
    return;
  }
  const safeTerm = this.escapeHtml(searchTerm);
  const escapedSearchTerm = safeTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  // 이후 로직은 이스케이프된 문자열 기반으로 처리
}
```

---

## ⚙️ z-index / 레이어링 분석

---

### 현재 z-index 설정 (`src/assets/style/global.scss`)

| 컴포넌트 | CSS 변수 | 실제 값 |
|---------|---------|--------|
| Toast | `--z-index-toast` | **900** |
| Tooltip, Popover, Select, Menu, Autocomplete | `--z-index-800` | **800** |
| **Modal, Popconfirm** | `--z-index-modal` | **700** |
| Drawer | `--z-index-drawer` | 600 |
| Modeless | `--z-index-modeless` | 500 |

### 결론

Select 드롭다운(800), Tooltip(800), Popover(800)는 Modal(700)보다 z-index가 높습니다.  
`sy-select`의 옵션 컨테이너는 `document.body`에 append되고 CSS에서  
`.sy-select-options-container { z-index: var(--z-index-select) !important; }`가 적용되므로,  
**모달 위에서 select 옵션이 올바르게 표시됩니다.**

추가 확인 결과, `sy-tree-select`와 `sy-autocomplete`는 실제 렌더링 시 `1000` 계열 값을 직접 사용합니다.  
따라서 이 둘은 Modal 위에 표시되는 수준을 넘어, 설계상 최상단이어야 하는 Toast(900)보다도 위로 올라갈 수 있습니다.

### ⚠️ 주의: `initializePopup()`의 혼란스러운 inline z-index

**파일:** `src/components/select/sy-select.tsx`

```ts
// ❌ 혼란을 유발하는 코드
private initializePopup() {
  this.optionsContainer.style.zIndex = '500'; // CSS 값(800)과 불일치
}
```

**문제:**  
CSS `!important` 규칙이 이 inline 값을 덮어쓰므로 실제 동작은 800으로 올바릅니다.  
그러나 `.sy-theme` 클래스가 없는 환경(단독 컴포넌트 테스트 등)에서는 CSS 변수가 적용되지 않아 실제로 `z-index: 500`이 되어 모달(700) 아래로 숨어버릴 수 있습니다.

**수정:** `initializePopup()`의 `zIndex` 설정 라인을 제거하고 CSS 클래스만 의존합니다.

```ts
private initializePopup() {
  this.optionsContainer.style.display = 'none';
  this.optionsContainer.style.position = 'absolute';
  this.optionsContainer.style.overflow = 'hidden';
  this.optionsContainer.style.boxShadow = '0px 4px 8px rgba(0 0 0 / 0.24)';
  this.optionsContainer.style.borderRadius = '3px';
  // zIndex 라인 제거 — CSS 클래스(.sy-select-options-container)에서 관리
}
```

---

## 🟢 코드 품질 개선점 (Improvement)

---

### 19. `sy-select.tsx` — 빈 `@Watch` 핸들러

**파일:** `src/components/select/sy-select.tsx`

```ts
// 불필요한 코드
@Watch('inputValue')
watchInputValue(_newValue: string, _oldValue: string) {
  // inputValue 변경 감지
}
```

아무 동작도 없는 Watch 핸들러입니다. 매 `inputValue` 변경마다 불필요하게 호출됩니다. 실제 동작이 필요 없다면 제거해야 합니다.

---

### 20. `sy-modal.tsx` — resize handle 측면 방향 미구현

**파일:** `src/components/modal/sy-modal.tsx`

```tsx
// 코너 4개만 render
<div class="resize-handle bottom-right" ...></div>
<div class="resize-handle bottom-left" ...></div>
<div class="resize-handle top-right" ...></div>
<div class="resize-handle top-left" ...></div>
// top, bottom, left, right 측면 handle 없음
```

CSS에는 측면 방향 handle 스타일이 정의되어 있고 `onResize` 로직도 이를 처리하지만, render에는 코너 4개만 있습니다. 측면 드래그로 resize가 불가능합니다.

---

### 21. `sy-tree-item.tsx` — Dead Code 제거 필요

**파일:** `src/components/tree/sy-tree-item.tsx`

`extractHtmlAndText`, `reconstructHtmlLabel` 메서드와 `@State() private originalHtmlParts`는 현재 컴포넌트 내 **어디서도 호출/참조되지 않는 dead code**입니다. 불필요하게 번들 크기를 증가시킵니다.

---

### 22. `sy-select.tsx` — `allSelectClose`에서 다른 컴포넌트 내부 state 직접 접근

**파일:** `src/components/select/sy-select.tsx`

```ts
// 개선 가능한 코드
private allSelectClose() {
  const allSelects = Array.from(document.querySelectorAll('sy-select'));
  allSelects.forEach(select => {
    if (select !== this.host) {
      (select as any).isOpen = false; // private state 직접 수정
    }
  });
}
```

`@Watch('isOpen')` → `closeSelectOption()` 체인을 통해 어느 정도 동작하나, 이는 캡슐화 위반입니다. `sy-select`에 `@Method() async closeDropdown()`을 추가하고 이를 통해 닫는 것이 바람직합니다.

---

### 23. `sy-tab-group.tsx` — `tabs` getter의 반복 DOM 쿼리 성능 문제

**파일:** `src/components/tabs/sy-tab-group.tsx`

```ts
private get tabs(): HTMLSyTabElement[] {
  const tabContainer = this.host.querySelector('[slot="tabs"]') as HTMLElement;
  if (tabContainer) {
    return Array.from(tabContainer.querySelectorAll('sy-tab'))...;
  }
  return [];
}
```

이 getter는 `setTabs`, `updateOverflowTabs`, `enableDragAndDrop`, `removeTab` 등에서 매번 호출될 때 `querySelectorAll` + `Array.from`을 수행합니다. 단일 render 사이클에서 수십 번 호출될 수 있습니다. 결과를 멤버 변수에 캐싱하고 탭이 추가/제거될 때만 갱신하는 방식이 효율적입니다.

---

## 🔎 추가 재분석 결과

---

### 24. `sy-tree-select.tsx` — 로딩/빈 결과 후 실제 트리로 전환 시 팝업이 비어버림

**파일:** `src/components/tree-select/sy-tree-select.tsx`

```ts
// ❌ 현재 코드
private updateTreeSelectPopup() {
  if (this.popupContainer) {
    // ...
    } else {
      const exist = this.popupContainer.querySelector('sy-tree');
      if (!exist) {
        this.popupContainer.innerHTML = '';
        this.renderTreeSelectPopup();
      }
    }
  }
}

private renderTreeSelectPopup() {
  if (!this.popupContainer) {
    this.popupContainer = document.createElement('div');
    // 실제 렌더링 로직
  }
}
```

**문제:**  
`updateTreeSelectPopup()`은 로딩/빈 상태에서 실제 트리 상태로 바뀔 때 `innerHTML`만 비우고 `renderTreeSelectPopup()`을 다시 호출합니다. 그런데 `renderTreeSelectPopup()`은 `this.popupContainer`가 `null`일 때만 동작하므로, 이미 컨테이너가 존재하는 현재 구조에서는 아무 것도 다시 렌더링되지 않습니다.  
결과적으로 비동기 로딩이 끝난 뒤에도 팝업이 빈 박스로 남아 `tree-select`가 선택 불가능한 상태가 됩니다.

**수정:**  
컨테이너 생성과 내부 콘텐츠 렌더링을 분리하거나, 기존 `popupContainer`가 있어도 `sy-tree`를 다시 생성하도록 분기 구조를 바꿔야 합니다.

---

### 25. `sy-popover.tsx` — hover 오픈마다 `document.mousedown` 리스너가 누적됨

**파일:** `src/components/popover/sy-popover.tsx`

```ts
// ❌ 현재 코드
private appendToRoot = () => {
  // ...
  if (this.trigger === 'hover') {
    this.host.addEventListener('mouseenter', this.popoverMouseEnter);
    this.host.addEventListener('mouseleave', this.popoverMouseLeave);
    this.setupOptionDetection();
  }
}

private setupOptionDetection() {
  document.addEventListener('mousedown', (e) => {
    // ...
  }, true);
}
```

**문제:**  
`setupOptionDetection()`은 hover 기반 popover가 열릴 때마다 실행되는데, 내부에서 `document.addEventListener('mousedown', ...)`를 익명 함수로 등록합니다. 이 리스너는 어떤 lifecycle에서도 제거되지 않습니다.  
popover를 반복해서 열고 닫을수록 문서 전체에 `mousedown` 핸들러가 누적되어 성능 저하와 예측 불가능한 상호작용이 발생할 수 있습니다.

**수정:**  
문서 리스너를 클래스 필드에 고정 참조로 보관하고 `connected/disconnected` 또는 open/close watcher에서 명시적으로 등록/해제해야 합니다.

---

### 26. `sy-tooltip.tsx` — `trigger="hover"`인데 클릭 시에도 토글됨

**파일:** `src/components/tooltip/sy-tooltip.tsx`

```ts
// ❌ 현재 코드
if (this.trigger === 'hover') {
  parent.removeEventListener('focus', this.setFocus);
  parent.removeEventListener('blur', this.setBlur);
  parent.addEventListener('click', this.parentClick);
  parent.addEventListener('mouseenter', this.parentMouseEnter);
  parent.addEventListener('mouseleave', this.parentMouseLeave);
}
```

**문제:**  
hover 전용 툴팁이어야 하는데 부모 요소에 `click` 핸들러를 함께 등록하고 있습니다. `parentClick()`은 `event.preventDefault()` 후 `this.open = !this.open`을 수행하므로, 링크나 버튼 위의 hover tooltip이 클릭으로도 열리고 닫히며 원래 클릭 동작까지 방해할 수 있습니다.

**수정:**  
`trigger === 'hover'` 분기에서는 `click` 리스너를 제거만 하고 등록하지 않아야 합니다.

---

### 27. `sy-avatar-group.tsx` — 다중 인스턴스에서 오버플로우 컨테이너가 서로 충돌함

**파일:** `src/components/avatar/sy-avatar-group.tsx`

```ts
// ❌ 현재 코드
disconnectedCallback() {
  const existing = document.body.querySelector('.more-avatars-container');
  if (existing && existing.parentElement === document.body) {
    document.body.removeChild(existing);
  }
}

private handleLeaveMoreAvatar() {
  const container = document.body.querySelector('.more-avatars-container') as HTMLElement | null;
  if (container) {
    container.style.display = 'none';
    document.body.removeChild(container);
    this.host.appendChild(container);
  }
}
```

**문제:**  
body 쪽 컨테이너를 `.more-avatars-container`라는 공용 클래스 하나로 조회합니다. 페이지에 `sy-avatar-group`이 여러 개 있으면 첫 번째로 매칭된 컨테이너를 다른 인스턴스가 제거하거나 되돌릴 수 있습니다.  
또한 `handleEnterMoreAvatar()`는 hover 때마다 `mouseenter`/`mouseleave` 리스너를 익명 함수로 계속 추가하므로 동일 컨테이너에 이벤트가 누적됩니다.

**수정:**  
컨테이너를 인스턴스 필드로 직접 보관하고, 전역 `querySelector` 대신 해당 인스턴스의 컨테이너만 이동/정리해야 합니다. hover 리스너도 한 번만 등록되는 고정 참조로 바꾸는 편이 안전합니다.

---

### 28. `sy-menu.tsx` — dropdown 부모에 등록한 `keydown` 리스너가 제거되지 않음

**파일:** `src/components/menu/sy-menu.tsx`

```ts
// ❌ 현재 코드
private setDropdown() {
  const dropdownElement = this.host.closest('sy-dropdown') as HTMLSyDropdownElement;
  if (this.isDropdown && dropdownElement) {
    dropdownElement.addEventListener('keydown', this.handleDropdownKeydown);
  }
}

disconnectedCallback() {
  // dropdownElement.removeEventListener('keydown', this.handleDropdownKeydown) 없음
}
```

**문제:**  
`sy-menu`가 `sy-dropdown` 내부에서 쓰일 때 부모 dropdown에 `keydown` 리스너를 붙이지만, 해제 로직이 없습니다. dropdown이 재생성되거나 메뉴 인스턴스가 교체되면 Enter 키 처리기가 중복 등록되어 열기/닫기 토글이 여러 번 실행될 수 있습니다.

**수정:**  
dropdown 참조를 필드에 저장하고 `disconnectedCallback()`에서 반드시 `removeEventListener('keydown', this.handleDropdownKeydown)`를 호출해야 합니다.

---

### 29. `sy-menu-group.tsx`, `sy-menu-sub.tsx`, `sy-nav-group.tsx`, `sy-nav-sub.tsx` — title prop 기반 XSS 가능성

**파일:** `src/components/menu/sy-menu-group.tsx`, `src/components/menu/sy-menu-sub.tsx`, `src/components/nav/sy-nav-group.tsx`, `src/components/nav/sy-nav-sub.tsx`

```tsx
// ❌ 공통 패턴
<div class="group-title" title={this.sanitizeHtml(this.menuGroupTitle)} innerHTML={this.menuGroupTitle}></div>
<span class="title" innerHTML={this.menuSubTitle}></span>
<span innerHTML={this.navGroupTitle}></span>
<span class="title" innerHTML={this.navSubTitle}></span>
```

**문제:**  
`sanitizeHtml()`은 `title` 속성에만 쓰이고, 실제 DOM 렌더링에는 원본 문자열을 그대로 `innerHTML`로 주입합니다. 외부 데이터가 `title` prop에 들어오는 환경에서는 `<img onerror=...>` 같은 페이로드가 그대로 실행될 수 있습니다.  
즉, 기존 문서에서 지적한 `sy-tree-item` 외에도 메뉴/네비게이션 계열에 동일한 클래스의 XSS 문제가 추가로 존재합니다.

**수정:**  
텍스트만 표시할 목적이라면 `innerHTML` 대신 일반 텍스트 렌더링으로 바꾸고, HTML 허용이 꼭 필요하다면 허용 태그 기반 sanitizer를 거쳐야 합니다.

---

### 30. `sy-autocomplete.tsx` — body에 추가되는 옵션 리스트 ID가 모든 인스턴스에서 중복됨

**파일:** `src/components/autocomplete/sy-autocomplete.tsx`

```ts
// ❌ 현재 코드
newOptionElement.id = 'sy-autocomplete-options-list';
document.body.appendChild(newOptionElement);
```

**문제:**  
각 `sy-autocomplete` 인스턴스가 body에 붙이는 옵션 리스트에 동일한 ID를 사용합니다. 여러 인스턴스가 공존하거나 동시에 열릴 경우 HTML ID 고유성 보장이 깨지고, 이후 DOM 조회나 테스트 코드가 첫 번째 요소만 집어가는 문제가 생깁니다.

**개선:**  
고정 ID를 제거하고 인스턴스 필드 참조만 사용하거나, 필요하면 컴포넌트별 고유 suffix를 붙여야 합니다.

---

### 31. `sy-tree-select.tsx`, `sy-autocomplete.tsx` — z-index 토큰을 우회하는 `1000` 하드코딩

**파일:** `src/components/tree-select/sy-tree-select.tsx`, `src/components/autocomplete/sy-autocomplete.tsx`

```ts
// ❌ 현재 코드
this.popupContainer.style.zIndex = '1000';
newOptionElement.style.zIndex = 'var(--z-index-autocomplete, 1000)';
```

**문제:**  
전역 디자인 토큰상 최상위 레이어는 Toast(900)인데, 이 두 컴포넌트는 `1000`을 직접 사용하거나 fallback으로 둡니다. `.sy-theme`가 없는 환경뿐 아니라 토큰이 정상 적용되는 환경에서도 overlay 계층 규약이 일관되지 않아서, 토스트나 다른 전역 알림을 가릴 수 있습니다.

**개선:**  
`sy-tree-select`도 `--z-index-select` 또는 별도 `--z-index-tree-select` 토큰을 사용하고, `sy-autocomplete`는 fallback `1000` 대신 시스템 토큰만 의존하도록 정리하는 편이 안전합니다.

---

## 📊 요약

> 아래 건수는 최초 분석 기준입니다. 실제 반영 완료 항목과 잔여 항목은 상단의 [현재 반영 상태](#-현재-반영-상태)를 따릅니다.

| 심각도 | 건수 | 주요 파일 |
|--------|:----:|---------|
| 🔴 Critical | **8** | `sy-tab.tsx`, `sy-modal.tsx`, `sy-select.tsx`, `sy-tab-group.tsx`, `sy-tree-select.tsx` |
| 🟡 Medium | **13** | `sy-tab-group.tsx`, `sy-tree-item.tsx`, `sy-pagination.tsx`, `sy-tooltip.tsx`, `sy-menu.tsx`, `sy-modal.tsx`, `sy-popover.tsx`, `sy-avatar-group.tsx` |
| 🔐 Security | **2** | `sy-tree-item.tsx`, `sy-menu-group.tsx`, `sy-menu-sub.tsx`, `sy-nav-group.tsx`, `sy-nav-sub.tsx` |
| 🟢 Improvement | **7** | `sy-select.tsx`, `sy-modal.tsx`, `sy-tree-item.tsx`, `sy-tab-group.tsx`, `sy-autocomplete.tsx`, `sy-tree-select.tsx` |
| **합계** | **30** | |

### 우선 수정 권장 순서

1. **`sy-tab.tsx`** — lifecycle 오타 (`componentwWillLoad` → `componentWillLoad`): 1분 수정, 즉각 효과
2. **보안 이슈 묶음** (`sy-tree-item`, `sy-menu-group`, `sy-menu-sub`, `sy-nav-group`, `sy-nav-sub`): 외부 문자열이 들어오는 환경이면 우선 차단 필요
3. **이벤트 리스너 누수** (`sy-modal`, `sy-select`, `sy-tab-group`, `sy-popover`, `sy-menu`): 장시간 사용 시 메모리 및 성능 저하 직결
4. **`sy-tree-select.tsx` 팝업 공백 버그**: 로딩 이후 실제 선택 UI가 사라져 기능 자체가 깨질 수 있음
5. **`sy-select.tsx` options 배열 오염 및 전역 clear**: 멀티 셀렉트 공존 환경에서 데이터 오염
6. **레이어 토큰 불일치** (`sy-tree-select`, `sy-autocomplete`): 토스트/전역 알림 가림 가능성 있음
