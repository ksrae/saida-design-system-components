# sy-textarea



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute          | Description | Type                                             | Default                   |
| ------------------ | ------------------ | ----------- | ------------------------------------------------ | ------------------------- |
| `autofocus`        | `autofocus`        |             | `boolean`                                        | `false`                   |
| `borderless`       | `borderless`       |             | `boolean`                                        | `false`                   |
| `clearable`        | `clearable`        |             | `boolean`                                        | `false`                   |
| `counter`          | `counter`          |             | `boolean`                                        | `false`                   |
| `disabled`         | `disabled`         |             | `boolean`                                        | `false`                   |
| `label`            | `label`            |             | `string`                                         | `""`                      |
| `max`              | `max`              |             | `number`                                         | `Number.MAX_SAFE_INTEGER` |
| `min`              | `min`              |             | `number`                                         | `0`                       |
| `name`             | `name`             |             | `string`                                         | `""`                      |
| `noNativeValidity` | `nonativevalidity` |             | `boolean`                                        | `false`                   |
| `placeholder`      | `placeholder`      |             | `string`                                         | `""`                      |
| `readonly`         | `readonly`         |             | `boolean`                                        | `false`                   |
| `required`         | `required`         |             | `boolean`                                        | `false`                   |
| `resize`           | `resize`           |             | `"both" \| "horizontal" \| "none" \| "vertical"` | `"none"`                  |
| `rows`             | `rows`             |             | `number`                                         | `4`                       |
| `size`             | `size`             |             | `"large" \| "medium" \| "small"`                 | `"medium"`                |
| `status`           | `status`           |             | `"default" \| "error" \| "success" \| "warning"` | `'default'`               |
| `value`            | `value`            |             | `string`                                         | `""`                      |


## Events

| Event     | Description | Type                                                                                |
| --------- | ----------- | ----------------------------------------------------------------------------------- |
| `blured`  |             | `CustomEvent<{ value: string; isValid: boolean; status: string; }>`                 |
| `changed` |             | `CustomEvent<{ value: string; length: number; isValid: boolean; status: string; }>` |
| `focused` |             | `CustomEvent<{ value: string; isValid: boolean; status: string; }>`                 |


## Methods

### `checkValidity() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `clearCustomError() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getStatus() => Promise<"" | "valueMissing" | "custom" | "tooShort" | "tooLong">`



#### Returns

Type: `Promise<"" | "valueMissing" | "custom" | "tooShort" | "tooLong">`



### `reportValidity() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `setBlur() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setCustomError() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [sy-icon](../icon)

### Graph
```mermaid
graph TD;
  sy-textarea --> sy-icon
  style sy-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
