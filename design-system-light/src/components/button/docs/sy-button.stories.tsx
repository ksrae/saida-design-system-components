import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyButtonProps, Button } from './sy-button.main';
import { clearElements } from '../../clear-element';

const buttonMeta: Meta<SyButtonProps> = {
  title: 'Button/Overview',
  component: 'sy-button',
  tags: [],
/*   parameters: {
    layout: 'centered'
  }, */
  render: (args) => {
    clearElements(buttonMeta.title);
    return Button(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Sets button disabled.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    fullWidth: {
      control: 'boolean',
      name: 'fullWidth (full-width)',
      description: 'Expand the button to fill its parent container width.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    iconOnly: {
      control: 'boolean',
      name: 'iconOnly (icon-only)',
      description: 'Render the button as icon-only (no text label). Use with `tooltip` for accessibility.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text shown on hover. Required for icon-only buttons.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Shows spinner when the button is in the loading state.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The button’s size.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'medium'},
        type: { summary: 'small | medium | large' },
      }
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type of button.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'button' },
        type: { summary: 'button | submit | reset' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'default', 'secondary', 'borderless'],
      description: 'The style of button ',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'default'},
        type: { summary: 'primary | default | secondary | borderless' },
      }
    },
    slot: {
      control: 'text',
      description: 'The value of the button.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    setFocus: {
      type: 'function',
      description: 'Triggers focus event manually.',
      table: {
        category: 'Function',
        type: {
          summary: `setFocus()`,
        },
      }
    },
    setBlur: {
      type: 'function',
      description: 'Triggers blur event manually.',
      table: {
        category: 'Function',
        type: {
          summary: `setBlur()`,
        },
      }
    },
    setClick: {
      type: 'function',
      description: 'Triggers click event manually.',
      table: {
        category: 'Function',
        type: {
          summary: `setClick()`,
        },
      }
    },
    click: {
      type: 'function',
      action: 'click',
      description: 'Triggered when the click event fires.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('click', (e) => {})`,
        },
      }
    },
  },
};

export default buttonMeta;

type Story = StoryObj<SyButtonProps>;

export const Default: Story = {
  args: {
    slot: 'Button',
    variant: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
    tooltip: '',
    type: 'button',
  },
};
