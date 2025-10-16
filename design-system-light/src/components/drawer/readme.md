# sy-drawer



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type                                         | Default    |
| -------------- | -------------- | ----------- | -------------------------------------------- | ---------- |
| `closable`     | `closable`     |             | `boolean`                                    | `false`    |
| `customSize`   | `customsize`   |             | `number`                                     | `100`      |
| `maskless`     | `maskless`     |             | `boolean`                                    | `false`    |
| `open`         | `open`         |             | `boolean`                                    | `false`    |
| `position`     | `position`     |             | `"bottom" \| "left" \| "right" \| "top"`     | `'right'`  |
| `preventClose` | `preventclose` |             | `boolean`                                    | `false`    |
| `size`         | `size`         |             | `"custom" \| "large" \| "medium" \| "small"` | `'medium'` |


## Events

| Event    | Description | Type                |
| -------- | ----------- | ------------------- |
| `closed` |             | `CustomEvent<void>` |
| `opened` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- [sy-icon](../icon)

### Graph
```mermaid
graph TD;
  sy-drawer --> sy-icon
  style sy-drawer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
