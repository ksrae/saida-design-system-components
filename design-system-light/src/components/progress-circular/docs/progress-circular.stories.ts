import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressCircularProps, ProgressCircular } from './progress-circular';
import { clearElements } from '../../clear-element';

const progressCircularMeta: Meta<ProgressCircularProps> = {
  title: 'ProgressCircular/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(progressCircularMeta.title);
    return ProgressCircular(args);
  },
  argTypes: {
    status: {
      control: 'select',
      options: ["default", "error", "complete"],
      description: 'The status of the Progress Circular.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'default' }, 
        type: { summary: 'default | error | complete' },
      },
    },
    hideText: {
      control: 'boolean',
      name: 'hideText (hide-text)',
      description: 'Determines the visiblity of the text in the progress circular.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any }, 
        type: { summary: 'boolean' }
      },
    },
    indeterminate: {
      control: 'boolean',
      name: 'indeterminate',
      description: 'Determines whether the progress circular is indeterminate or not.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any }, 
        type: { summary: 'boolean' }
      },
    },
    percent: {
      control: 'number',
      description: 'The value as a percentage, 0 to 100.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary : 0 as any},
        type: { summary: 'number' },
      }      
    },
    segment: {
      control: 'text',
      description: 'The segment value of the Progress Circular. json array type with percent and color are required.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: `` }, 
        type: { summary: 'string' }
      },
    }, 
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the Progress Circular.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'medium'}, 
        type: { summary: 'small | medium | large' }
      }
    },
    tooltipTitle: {
      name: 'tooltipTitle (tooltip-title)',
      control: 'text',
      description: 'The tooltip title of the Progress Circular.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: `` }, 
        type: { summary: 'string' }
      },
    },
  },
};

export default progressCircularMeta;
type Story = StoryObj<ProgressCircularProps>;


export const Default: Story = {
  args: {
    status: 'default',
    hideText: false,
    indeterminate: false,
    percent: 30,
    segment: ``,
    size: 'medium',
    // thick: 'medium',
    tooltipTitle: ''
  },
  
  
}
