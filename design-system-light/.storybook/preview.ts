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
    backgrounds: { disable: true },
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
          'Autocomplete',
          'Avatar',
          'Badge',
          "BannerMessage",
          'Breadcrumb',
          'ButtonGroup',
          'Button',
          'Card',
          'Checkbox',
          'Collapse',
          'Colorpicker',
          'Datepicker',
          'Divider',
          'Drawer',
          'Dropdown',
          'Empty',
          'GlobalHeader',
          'Header',
          'Icon',
          'InlineMessage',
          'InputNumber',
          'Input',
          "Label",
          'Menu',
          'Modal',
          'Modeless',
          'NavigationMenu',
          'Pagination',
          'Popconfirm',
          'Popover',
          'ProgressBar',
          'ProgressCircular',
          'Radio',
          'RadioButton',
          'Select',
          'Skeleton',
          'Slider',
          'Spinner',
          'SplitPanel',
          'Steps',
          'Switch',
          'Tab',
          'Tag',
          'Textarea',
          'ToastMessage',
          'Tooltip',
          'TreeSelect',
          'Tree'
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
