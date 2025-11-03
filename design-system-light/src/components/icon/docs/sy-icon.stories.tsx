import { Icon, SyIconProps } from './sy-icon.main';
import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../clear-element';

const iconMeta: Meta<SyIconProps> = {
  title: 'Icon/Overview',
  component: 'sy-icon',
  render: (args) => {
    clearElements(iconMeta.title);
    return Icon(args);
  },
  argTypes: {
  path: {
      control: 'text',
      description: 'Sets the path of the icon.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    selectable: {
      control: 'boolean',
      description: 'Able to click and emit selected event.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
      }
    },
    size: {
      control: 'select',
      options: ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
      description: 'The size of the icon.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'medium'},
        type: {
          summary: 'xxsmall | xsmall | small | medium | large | xlarge | xxlarge | xxxlarge',

        },
      }
    },
    slot: {
      control: 'text',
      description: 'The slot for rendering custom SVG content.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
      }
    },
    selected: {
      type: 'function',
      description: 'Triggered when click the selectable icon.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      }
    },
  },
};

export default iconMeta;
type Story = StoryObj<SyIconProps>;

export const Default: Story = {
  args: {
    size: 'medium',
    selectable: false,
    slot: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M198.6 368L320 246.6L441.4 368L198.6 368zM130.4 396.2C135.4 408.2 147 416 160 416L480 416C492.9 416 504.6 408.2 509.6 396.2C514.6 384.2 511.8 370.5 502.7 361.3L342.7 201.3C330.2 188.8 309.9 188.8 297.4 201.3L137.4 361.3C128.2 370.5 125.5 384.2 130.5 396.2z"></path></svg>
    `,
  },
};

