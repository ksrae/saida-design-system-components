# sy-pagination



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute         | Description | Type      | Default     |
| ----------------- | ----------------- | ----------- | --------- | ----------- |
| `activePage`      | `activepage`      |             | `number`  | `1`         |
| `disabled`        | `disabled`        |             | `boolean` | `false`     |
| `hideonSingle`    | `hideonsingle`    |             | `boolean` | `false`     |
| `jumper`          | `jumper`          |             | `boolean` | `false`     |
| `pageSize`        | `pagesize`        |             | `number`  | `10`        |
| `pageSizeOptions` | `pagesizeoptions` |             | `string`  | `undefined` |
| `total`           | `total`           |             | `boolean` | `false`     |
| `totalItems`      | `totalitems`      |             | `number`  | `0`         |


## Events

| Event             | Description | Type                  |
| ----------------- | ----------- | --------------------- |
| `pageChanged`     |             | `CustomEvent<number>` |
| `pageSizeChanged` |             | `CustomEvent<number>` |


## Dependencies

### Depends on

- [sy-icon](../icon)
- [sy-select](../select)
- [sy-option](../select)
- [sy-input-number](../input-number)

### Graph
```mermaid
graph TD;
  sy-pagination --> sy-icon
  sy-pagination --> sy-select
  sy-pagination --> sy-option
  sy-pagination --> sy-input-number
  sy-select --> sy-option
  sy-select --> sy-tag
  sy-select --> sy-icon
  sy-option --> sy-tooltip
  sy-option --> sy-empty
  sy-option --> sy-spinner
  sy-empty --> sy-icon
  sy-tag --> sy-icon
  sy-input-number --> sy-icon
  style sy-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
