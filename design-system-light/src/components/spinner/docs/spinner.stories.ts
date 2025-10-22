import type { Meta, StoryObj } from '@storybook/web-components';
import { Spinner, SpinnerProps } from './spinner';
import { clearElements } from '../../clear-element';

const spinnerMeta: Meta<SpinnerProps> = {
  title: 'Spinner/Overview',
  tags: ['false'],
  render: (args:any) => {
    clearElements(spinnerMeta.title);
    return Spinner(args);
  },
  argTypes: {
    delay: {
      control: 'number', 
      description : 'Delay of the spinner.(unit:millisecond)',
      table: {
        category : 'Parameter',
        defaultValue : { summary : 0 as any},
        type: { summary: 'number' }
      }
    },
    description: {
      control: 'text', 
      description: 'Description of the spinner.', 
      table: {
          category: 'Parameter',
          defaultValue: { summary : 'Loading...'},
          type: { summary: 'string' }
      }
    },
    hidden: {
      control: 'boolean',
      description: 'Show/Hide Spinner',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    inline: {
      control: 'boolean',
      description: 'Indicates ongoing processes or loading states while being displayed alongside other content.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    size:{
      control: "select",
      options: ["small", "medium", "large", "xlarge"],
      description: "Size of the spinner. Only applicable when `inline` is true.",
      table: {
        category: "Parameter",
        defaultValue: { summary: "medium" },
        type: { summary: "small | medium | large | xlarge" },
      }
    },
    slotContent: {
      control: false,
      description: 'Customizing content of the spinner.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'Bottom'},
      }
    },
  },
  
};

export default spinnerMeta;
type Story = StoryObj<SpinnerProps>;


export const Default: Story = {
  args: {
    delay: 0,
    description: 'Loading...',
    hidden: false,
    inline: false,
    size: 'medium',
    //overlay: false,
    // stop: false,
    slotContent: '',
  },  
}
