import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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
      description: 'Makes the avatar clickable. Emits `selected` on click / keyboard activation.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the avatar (50% opacity, not clickable). Emits `disableStatus` on change.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    icon: {
      control: 'text',
      description: 'SVG string to render. Rendered only if `image` is empty.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    image: {
      control: 'text',
      description: 'Profile image URL. Highest rendering priority.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    letter: {
      control: 'text',
      description: 'Manual ≤2-char initials. Rendered only if `image`, `icon`, `text` are empty. Auto-uppercased and truncated.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
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
        type: { summary: 'small | medium | large' }
      },
    },
    text: {
      control: 'text',
      description: 'Full name. Initials (≤2 chars) are extracted automatically. Rendered only if `image` and `icon` are empty.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    tooltipContent: {
      control: 'text',
      name: 'tooltipContent (tooltip-content)',
      description: 'Custom tooltip text. Falls back to image → icon → text → letter when empty. HTML is sanitized.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    variant: {
      control: 'select',
      options: [
        'lightgray', 'red', 'orange', 'yellow', 'lime', 'green',
        'teal', 'blue', 'purple', 'magenta', 'darkgray',
      ],
      description: 'Background + border + text color variant.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'lightgray' },
        type: {
          summary:
            'lightgray | red | orange | yellow | lime | green | teal | blue | purple | magenta | darkgray'
        }
      }
    },
    selected: {
      type: 'function',
      description: 'Emitted when a clickable, non-disabled avatar is clicked or activated via keyboard.',
      table: {
        category: 'Callback',
        type: { summary: `.addEventListener('selected', (e) => {})` },
      }
    },
    disableStatus: {
      type: 'function',
      description: 'Emitted when the `disabled` prop transitions.',
      table: {
        category: 'Callback',
        type: { summary: `.addEventListener('disableStatus', (e) => {})` },
      }
    }
  },
  args: {
    clickable: false,
    disabled: false,
    image: '',
    text: 'Firstname Lastname',
    icon: '',
    letter: '',
    variant: 'lightgray',
    size: 'medium',
    tooltipContent: '',
  },
};

export default avatarMeta;

type Story = StoryObj<SyAvatarProps>;

export const Default: Story = {};
