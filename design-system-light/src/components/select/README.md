# SySelect & SySelectOption Components

Lit3로 작성된 select와 select-option 컴포넌트를 Stencil로 변환한 컴포넌트입니다.

## 개요

이 컴포넌트는 다양한 모드의 셀렉트(select) 기능을 제공합니다:
- **Default Mode**: 기본 단일 선택 모드
- **Searchable Mode**: 검색 가능한 셀렉트
- **Multiple Mode**: 다중 선택 모드
- **Tag Mode**: 태그 입력이 가능한 모드

## 설치 및 사용

### 1. 컴포넌트 등록

```typescript
import { SySelect } from './components/select/sy-select';
import { SySelectOption } from './components/select/sy-select-option';
```

### 2. HTML에서 사용

```html
<!-- 기본 셀렉트 -->
<sy-select placeholder="옵션을 선택하세요">
  <sy-select-option value="option1" label="옵션 1"></sy-select-option>
  <sy-select-option value="option2" label="옵션 2"></sy-select-option>
  <sy-select-option value="option3" label="옵션 3"></sy-select-option>
</sy-select>

<!-- 검색 가능한 셀렉트 -->
<sy-select mode="searchable" placeholder="검색하여 선택하세요">
  <sy-select-option value="apple" label="사과"></sy-select-option>
  <sy-select-option value="banana" label="바나나"></sy-select-option>
</sy-select>

<!-- 다중 선택 셀렉트 -->
<sy-select mode="multiple" placeholder="여러 옵션을 선택하세요">
  <sy-select-option value="red" label="빨강"></sy-select-option>
  <sy-select-option value="green" label="초록"></sy-select-option>
</sy-select>

<!-- 태그 모드 셀렉트 -->
<sy-select mode="tag" placeholder="태그를 입력하세요">
  <sy-select-option value="javascript" label="JavaScript"></sy-select-option>
  <sy-select-option value="typescript" label="TypeScript"></sy-select-option>
</sy-select>
```

## Props

### SySelect Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `mode` | `'default' \| 'searchable' \| 'multiple' \| 'tag'` | `'default'` | 셀렉트 모드 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 셀렉트 크기 |
| `placeholder` | `string` | `''` | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `readonly` | `boolean` | `false` | 읽기 전용 상태 |
| `required` | `boolean` | `false` | 필수 입력 표시 |
| `clearable` | `boolean` | `false` | 선택값 초기화 버튼 표시 |
| `maxTagCount` | `number` | `0` | 최대 태그 개수 (다중 선택 시) |
| `defaultValue` | `string` | `''` | 기본 선택값 |
| `name` | `string` | `''` | 폼 요소 이름 |
| `error` | `boolean` | `false` | 에러 상태 |
| `hide` | `boolean` | `false` | 숨김 상태 |
| `loading` | `boolean` | `false` | 로딩 상태 |
| `empty` | `boolean` | `false` | 빈 상태 |
| `noNativeValidity` | `boolean` | `false` | 네이티브 유효성 검사 사용 안함 |

### SySelectOption Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string` | `''` | 옵션 값 |
| `label` | `string` | `''` | 옵션 표시 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `readonly` | `boolean` | `false` | 읽기 전용 상태 |
| `showTooltip` | `boolean` | `false` | 툴팁 표시 |

## Events

### SySelect Events

| 이벤트 | 설명 | 발송 데이터 |
|--------|------|-------------|
| `selected` | 옵션이 선택될 때 | `{ selectedOptions, isValid, status }` |
| `removed` | 옵션이 제거될 때 | `{ item, selectedOptions, isValid, status }` |
| `cleared` | 모든 선택이 초기화될 때 | - |
| `focused` | 셀렉트에 포커스될 때 | `{ value, isValid, status }` |
| `blured` | 셀렉트에서 포커스가 벗어날 때 | `{ value, isValid, status }` |
| `inputChanged` | 입력값이 변경될 때 | `value` |
| `opened` | 셀렉트가 열릴 때 | - |

### SySelectOption Events

| 이벤트 | 설명 | 발송 데이터 |
|--------|------|-------------|
| `selected` | 옵션이 클릭될 때 | `{ value, label }` |

## Methods

### SySelect Methods

| 메서드 | 설명 |
|--------|------|
| `setValue(values: string[] \| string)` | 선택값 설정 |
| `clearValue()` | 선택값 초기화 |
| `checkValidity()` | 유효성 검사 |
| `reportValidity()` | 유효성 검사 및 메시지 표시 |

## 사용 예제

### 기본 사용법

```html
<sy-select placeholder="과일을 선택하세요">
  <sy-select-option value="apple" label="사과"></sy-select-option>
  <sy-select-option value="banana" label="바나나"></sy-select-option>
  <sy-select-option value="cherry" label="체리"></sy-select-option>
</sy-select>
```

### 검색 가능한 셀렉트

```html
<sy-select mode="searchable" placeholder="검색하여 선택하세요">
  <sy-select-option value="korea" label="한국"></sy-select-option>
  <sy-select-option value="japan" label="일본"></sy-select-option>
  <sy-select-option value="china" label="중국"></sy-select-option>
</sy-select>
```

### 다중 선택

```html
<sy-select mode="multiple" placeholder="여러 언어를 선택하세요">
  <sy-select-option value="javascript" label="JavaScript"></sy-select-option>
  <sy-select-option value="typescript" label="TypeScript"></sy-select-option>
  <sy-select-option value="python" label="Python"></sy-select-option>
</sy-select>
```

### 태그 모드

```html
<sy-select mode="tag" placeholder="기술 스택을 입력하세요">
  <sy-select-option value="react" label="React"></sy-select-option>
  <sy-select-option value="vue" label="Vue"></sy-select-option>
</sy-select>
```

### 이벤트 처리

```javascript
const select = document.querySelector('sy-select');

select.addEventListener('selected', (e) => {
  console.log('선택된 옵션들:', e.detail.selectedOptions);
  console.log('유효성:', e.detail.isValid);
});

select.addEventListener('removed', (e) => {
  console.log('제거된 항목:', e.detail.item);
});
```

## 폼 연동

컴포넌트는 `formAssociated: true`로 설정되어 있으므로 표준 폼과 함께 사용할 수 있습니다:

```html
<form>
  <sy-select name="country" required>
    <sy-select-option value="kr" label="한국"></sy-select-option>
    <sy-select-option value="us" label="미국"></sy-select-option>
  </sy-select>

  <button type="submit">제출</button>
</form>
```

## 스타일링

컴포넌트는 `shadow: false`로 설정되어 있어 CSS 변수를 통해 쉽게 스타일을 커스터마이징할 수 있습니다:

```css
:root {
  --select-form-border-enabled: #ddd;
  --select-form-background-enabled: #fff;
  --select-form-text-enabled: #333;
  /* 기타 CSS 변수들... */
}
```

## 테스트

테스트 파일이 포함되어 있습니다:

```bash
npm test sy-select.spec.tsx
npm test sy-select-option.spec.tsx
```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 제공됩니다.
