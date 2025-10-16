# sy-colorpicker-content



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                      | Default     |
| ------------- | ------------- | ----------- | ------------------------- | ----------- |
| `disabled`    | `disabled`    |             | `boolean`                 | `false`     |
| `format`      | `format`      |             | `"hex" \| "hsb" \| "rgb"` | `'hex'`     |
| `hideOpacity` | `hodeopacity` |             | `boolean`                 | `false`     |
| `opacity`     | `opacity`     |             | `number`                  | `1`         |
| `readonly`    | `readonly`    |             | `boolean`                 | `false`     |
| `value`       | `value`       |             | `string`                  | `'#ff0000'` |


## Events

| Event         | Description | Type                                                               |
| ------------- | ----------- | ------------------------------------------------------------------ |
| `colorChange` |             | `CustomEvent<{ value: string; opacity: number; format: string; }>` |


## Dependencies

### Used by

 - [sy-colorpicker](.)

### Depends on

- [sy-select](../select)
- [sy-option](../select)
- [sy-input](../input)
- [sy-input-number](../input-number)

### Graph
```mermaid
graph TD;
  sy-colorpicker-content --> sy-select
  sy-colorpicker-content --> sy-option
  sy-colorpicker-content --> sy-input
  sy-colorpicker-content --> sy-input-number
  sy-select --> sy-option
  sy-select --> sy-tag
  sy-select --> sy-icon
  sy-option --> sy-tooltip
  sy-option --> sy-empty
  sy-option --> sy-spinner
  sy-empty --> sy-icon
  sy-tag --> sy-icon
  sy-input --> sy-icon
  sy-input-number --> sy-icon
  sy-colorpicker --> sy-colorpicker-content
  style sy-colorpicker-content fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
