# sy-tag



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type                                                                                 | Default    |
| ------------ | ------------ | ----------- | ------------------------------------------------------------------------------------ | ---------- |
| `disabled`   | `disabled`   |             | `boolean`                                                                            | `false`    |
| `readonly`   | `readonly`   |             | `boolean`                                                                            | `false`    |
| `removable`  | `removable`  |             | `boolean`                                                                            | `false`    |
| `rounded`    | `rounded`    |             | `boolean`                                                                            | `false`    |
| `selectable` | `selectable` |             | `boolean`                                                                            | `false`    |
| `size`       | `size`       |             | `"large" \| "medium" \| "small"`                                                     | `'medium'` |
| `variant`    | `variant`    |             | `"blue" \| "cyan" \| "gray" \| "green" \| "orange" \| "purple" \| "red" \| "yellow"` | `'gray'`   |


## Events

| Event      | Description | Type                                      |
| ---------- | ----------- | ----------------------------------------- |
| `removed`  |             | `CustomEvent<{ tag: HTMLSyTagElement; }>` |
| `selected` |             | `CustomEvent<{ tag: HTMLSyTagElement; }>` |


## Dependencies

### Used by

 - [sy-select](../select)

### Depends on

- [sy-icon](../icon)

### Graph
```mermaid
graph TD;
  sy-tag --> sy-icon
  sy-select --> sy-tag
  style sy-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
