import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyAvatarProps, Avatar } from './sy-avatar.main';
import { clearElements } from '../../clear-element';

const avatarMeta: Meta<SyAvatarProps> = {
  title: 'Avatar/Overview',
  component: 'sy-avatar',
  tags: [],
  render: (args) => {
    clearElements(avatarMeta.title);
    return Avatar(args);
  },
argTypes: {
    clickable: {
      control: 'boolean',
      description: 'Sets the avatar clickable.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the avatar.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    icon: {
      control: 'text',
      description: 'Displays an icon to the avatar',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    image: {
      control: 'text',
      description: 'Displays an image to the avatar',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    letter: {
      control: 'text',
      description: 'Sets letters in avatar manually',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the avatar.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'medium' },
        type: { summary: "small | medium | large" }

      },
    },
    text: {
      control: 'text',
      description: 'Displays the first letter of each word of initials.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    tooltipContent: {
      control: 'text',
      name: 'tooltipContent (tooltip-content)',
      description: 'Displays a tooltip when hovering over the avatar',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    variant: {
      control: 'select',
      options: ["lightgray", "red", "orange", "yellow", "lime", "green", "orange", "teal", "blue", "purple", "magenta", "darkgray"],
      description: 'Background color of the avatar',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'gray'},
        type: { summary: "lightgray | red | orange | yellow | lime | green | orange | teal | blue | purple | magenta | darkgray" }
      }
    },
    selected: {
      type: 'function',
      action: 'selected',
      description: 'Triggered when any item is selected.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('selected', (e) => {})`,
        },
      }
    },
    disableStatus: {
      type: 'function',
      action: 'disabledStatus',
      description: 'Triggered when the disabled status changes.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('disabledStatus', (e) => {})`,
        },
      }
    }
  },
  args: {
    clickable: false,
    disabled: false,
    image: 'avatar_default.png',
    text: 'Firstname Lastname',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg>`,
    letter: '',
    variant: 'lightgray',
    size: 'medium',
    tooltipContent: 'tooltip',
  },
};

export default avatarMeta;

type Story = StoryObj<SyAvatarProps>;

export const Default: Story = {};

