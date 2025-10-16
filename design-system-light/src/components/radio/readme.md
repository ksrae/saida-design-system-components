# sy-radio-group



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute          | Description | Type                             | Default        |
| ------------------ | ------------------ | ----------- | -------------------------------- | -------------- |
| `defaultValue`     | `defaultvalue`     |             | `string`                         | `''`           |
| `disabled`         | `disabled`         |             | `boolean`                        | `false`        |
| `name`             | `name`             |             | `string`                         | `''`           |
| `noNativeValidity` | `nonativevalidity` |             | `boolean`                        | `false`        |
| `position`         | `position`         |             | `"horizontal" \| "vertical"`     | `'horizontal'` |
| `readonly`         | `readonly`         |             | `boolean`                        | `false`        |
| `required`         | `required`         |             | `boolean`                        | `false`        |
| `size`             | `size`             |             | `"large" \| "medium" \| "small"` | `'medium'`     |
| `variant`          | `variant`          |             | `"outlined" \| "solid"`          | `'outlined'`   |


## Events

| Event     | Description | Type                                                                |
| --------- | ----------- | ------------------------------------------------------------------- |
| `changed` |             | `CustomEvent<{ value: string; isValid: boolean; status: string; }>` |


## Methods

### `checkValidity() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `clearCustomError() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getStatus() => Promise<"" | "valueMissing" | "custom">`



#### Returns

Type: `Promise<"" | "valueMissing" | "custom">`



### `reportValidity() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `setCustomError() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
