import type { Preview } from '@stencil/storybook-plugin';
import { withThemeByClassName } from '@storybook/addon-themes';
import { defineCustomElements } from '../loader/index.js';
import '../src/assets/style/global.scss';
import './preview.css';

/**
 * Registers all custom elements in the Storybook preview.
 * This is useful if your components rely on other nested Stencil components.
 */
defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disabled: true },
     options : {
      storySort: {
        order: [
          'Welcome',
          'Usage',
          'Theme Guide',
          'Foundation', [
            'Colors',
            'Typography',
          ],
          'Flex', [
            'Overview',
            'Attributes', [
              'Type',
              'Align',
              'Justify'
            ],
          ],
          'Layout',
          'Form',
           'StyleGuide', [
            'AgGrid',
            'HighChart', [
              'Overview',
              'ColorGuide'
            ],
            'ECharts',
          ],
          'Log',
          'Autocomplete', ['Overview', '*'],
          'Avatar', ['Overview', 'Group Overview', '*'],
          'Badge', ['Overview', '*'],
          'BannerMessage', ['Overview', '*'],
          'Breadcrumb', ['Overview', '*'],
          'ButtonGroup', ['Overview', '*'],
          'Button', ['Overview', '*'],
          'Card', ['Overview', '*'],
          'Checkbox', ['Overview', 'Attributes', 'Events', 'Methods', '*'],
          'Collapse', ['Overview', '*'],
          'Colorpicker', ['Overview', 'Attributes', 'Events', '*'],
          'Datepicker', ['Overview', 'Attributes', 'Events', '*'],
          'Divider', ['Overview', '*'],
          'Drawer', ['Overview', 'Attributes', 'Events', '*'],
          'Dropdown', ['Overview', 'Attributes', 'Events', '*'],
          'Empty', ['Overview', '*'],
          'GlobalHeader', ['Overview', 'Attributes', 'Events', 'Methods', '*'],
          'Header', ['Overview', '*'],
          'Icon', ['Overview', '*'],
          'InlineMessage', ['Overview', '*'],
          'InputNumber', ['Overview', '*'],
          'Input', ['Overview', '*'],
          'Label', ['Overview', '*'],
          'Menu', ['Overview', '*'],
          'Modal', ['Overview', 'Attributes', 'Events', 'Methods', '*'],
          'Modeless', ['Overview', 'Group Overview', '*'],
          'Nav', ['Overview', 'Group Overview', 'Item Overview', 'Sub Overview', '*'],
          'Pagination', ['Overview', '*'],
          'Popconfirm', ['Overview', '*'],
          'Popover', ['Overview', '*'],
          'ProgressBar', ['Overview', '*'],
          'ProgressCircular', ['Overview', '*'],
          'Radio', ['Overview', '*'],
          'RadioButton', ['Overview', '*'],
          'Select', ['Overview', 'Option Overview', '*'],
          'Skeleton', ['Overview', '*'],
          'Slider', ['Overview', '*'],
          'Spinner', ['Overview', '*'],
          'SplitPanel', ['Overview', '*'],
          'Steps', ['Overview', 'Item Overview', '*'],
          'Switch', ['Overview', '*'],
          'Tab', ['Overview', 'Item Overview', 'Content Overview', '*'],
          'Tag', ['Overview', '*'],
          'Textarea', ['Overview', '*'],
          'Toast', ['Overview', 'Item Overview', '*'],
          'Tooltip', ['Overview', '*'],
          'TreeSelect', ['Overview', '*'],
          'Tree', ['Overview', 'Item Overview', '*']
        ],
      }
    }
  },

  decorators: [
    withThemeByClassName({
      defaultTheme: 'light',
      themes: {
        light: 'sy-theme-light',
        dark: 'sy-theme-dark',
      },
      parentSelector: 'body',
    }),
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  },
};

export default preview;
