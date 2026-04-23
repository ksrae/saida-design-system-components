import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SySpinnerProps, Spinner } from './sy-spinner.main';
import { clearElements } from '../../clear-element';

const spinnerMeta: Meta<SySpinnerProps> = {
  title: 'Spinner/Overview',
  component: 'sy-spinner',
  tags: [],
  render: (args) => {
    clearElements(spinnerMeta.title);
    return Spinner(args);
  },
  argTypes: {
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before the spinner appears.',
      table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } },
    },
    description: {
      control: 'text',
      description: 'Text displayed beside/below the spinner.',
      table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } },
    },
    hidden: {
      control: 'boolean',
      description: 'Hides the spinner while preserving layout.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    inline: {
      control: 'boolean',
      description: 'Renders the spinner inline with surrounding content.',
      table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Spinner size.',
      table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large | xlarge' } },
    },
  },
};

export default spinnerMeta;
type Story = StoryObj<SySpinnerProps>;

export const Default: Story = {
  args: { delay: 0, description: 'Loading...', hidden: false, inline: false, size: 'medium' },
};
