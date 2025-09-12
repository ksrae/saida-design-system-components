# sy-split-panel



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                         | Default        |
| ------------- | ------------- | ----------- | ---------------------------- | -------------- |
| `disabled`    | `disabled`    |             | `boolean`                    | `false`        |
| `hideDivider` | `hidedivider` |             | `boolean`                    | `false`        |
| `minRatio`    | `minratio`    |             | `number`                     | `0`            |
| `ratio`       | `ratio`       |             | `number`                     | `50`           |
| `type`        | `type`        |             | `"horizontal" \| "vertical"` | `'horizontal'` |


## Events

| Event               | Description | Type                                                      |
| ------------------- | ----------- | --------------------------------------------------------- |
| `horizontalChanged` |             | `CustomEvent<{ leftRatio: number; rightRatio: number; }>` |
| `verticalChanged`   |             | `CustomEvent<{ topRatio: number; bottomRatio: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
