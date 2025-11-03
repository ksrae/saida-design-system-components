import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../clear-element';
import { SyColorpickerProps, ColorPicker } from './sy-colorpicker.main';

const colorpickerMeta: Meta<SyColorpickerProps> = {
  title: 'Colorpicker/Overview',
  component: 'sy-colorpicker',
  tags: [],
  render: (args) => {
    clearElements(colorpickerMeta.title);
    return ColorPicker(args);
  },
  argTypes: {
    format: {
      control: 'select',
      options: ['hex', 'hsb', 'rgb'],
      description: 'The format of the color value. The default is hex.',
      table: {
        category: 'Parameter',
        defaultValue : { summary : 'hex'},
        type: { summary: "hex | hsb | rgb" }

      },
    },
    value:{
      control: 'text',
      description: 'The color to be displayed in the colorpicker. The default is #ff0000.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: `#ff0000`},
        type: { summary: 'string' }
      }
    },
    opacity:{
      control: 'number',
      description: 'The opacity of the color to be displayed in the colorpicker. The default is 1.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: `1`},
        type: { summary: 'number' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'The colorpicker will be disabled. The default is false.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'The colorpicker will be readonly. The default is false.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    inline: {
      control: 'boolean',
      description: 'Allows the colorpicker to be displayed inline',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    hideOpacity: {
      name: 'hideOpacity (hide-opacity)',
      control: 'boolean',
      description: 'Hide opacity slider',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    showText: {
      name: 'showText (show-text)',
      control: 'boolean',
      description: 'If true, the color value will be displayed as text next to the color preview. The default is false.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    changed: {
      type: 'function',
      action: 'changed',
      description: 'Triggered when the changed event fires.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
        },
      }
    },
  },
  args: {
    value: '#ff0000',
    opacity: 1,
    showText: false,
    disabled: false,
    readonly: false,
    inline: false,
    hideOpacity: false,
    format: 'hex',
  },
};

export default colorpickerMeta;

type Story = StoryObj<SyColorpickerProps>;

export const Default: Story = {};
