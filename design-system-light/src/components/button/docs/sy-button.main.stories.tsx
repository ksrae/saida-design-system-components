import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyButtonProps, Button } from './sy-button.main';

const buttonMeta: Meta<SyButtonProps> = {
  title: 'Button/Overview (Dev)',
  component: 'sy-button',
  tags: [],
/*   parameters: {
    layout: 'centered'
  }, */
  render: (args) => {
    return Button(args);
  },
  argTypes: {
    slot: {
      control: 'text',
      description: 'Button text content (slot)',
      defaultValue: 'Button',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'borderless'],
      description: 'Button variant style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    justified: {
      control: 'boolean',
      description: 'Full width button',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
    },
    setFocus: {
      action: 'setFocus',
      description: 'Trigger setFocus method',
      table: {
        category: 'Methods',
        type: { summary: 'function' },
      },
    },
    setBlur: {
      action: 'setBlur',
      description: 'Trigger setBlur method',
      table: {
        category: 'Methods',
        type: { summary: 'function' },
      },
    },
    setClick: {
      action: 'setClick',
      description: 'Trigger setClick method',
      table: {
        category: 'Methods',
        type: { summary: 'function' },
      },
    },
    click: {
      action: 'clicked',
      description: 'Fired when button is clicked',
      table: {
        category: 'Events',
        type: { summary: 'MouseEvent' },
      },
    },
  },
  args: {
    slot: 'Button',
    variant: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
    justified: false,
    type: 'button',
  },
};

export default buttonMeta;

type Story = StoryObj<SyButtonProps>;

export const Default: Story = {
  args: {
    slot: 'Default Button',
    variant: 'default',
    size: 'medium',
  },
};
