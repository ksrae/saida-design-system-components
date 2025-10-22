import type { Meta, StoryObj } from '@storybook/web-components';
import { ProgressBarProps, ProgressBar } from './progress-bar';
import { clearElements } from '../../clear-element';

const progressBarMeta: Meta<ProgressBarProps> = {
  title: 'ProgressBar/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(progressBarMeta.title);
    return ProgressBar(args);
  },
  argTypes: {
    hidePercent: {
      control: 'boolean',
      name: 'hidePercent (hide-percent)',
      description: 'Determines the visiblity of the percent text.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any }, 
        type: { summary: 'boolean' }
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'When true, the percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state.', 
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
        type: { summary: 'number' }
      }      
    }, 
    segment: {
      control: 'text',
      description: 'The segment value of the Progress bar. json array type with percent and status are required.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: `` }, 
        type: { summary: 'string' }
      },
    }, 
    status: {
      control: 'select',
      options: ['default', 'error', 'complete'],
      description: 'The state of the progress bar.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'default'}, 
        type: {summary: 'default | error | complete'}
      }
    },
    tooltipTitle: {
      name: 'tooltipTitle (tooltip-title)',
      control: 'text',
      description: 'The tooltip title of the Progress bar.', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: `` }, 
        type: { summary: 'string' }
      },
    }, 
    valuePosition: {
      control: 'select',
      name: 'valuePosition (value-position)',
      options: ['progress-left', 'progress-center', 'progress-right', 'center', 'right', 'left'],
      description: 'The position of the progress value.',   
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' }, 
        type: {summary: 'progress-left | progress-center | progress-right | center | right | left'}
      }
    },
  },
};

export default progressBarMeta;
type Story = StoryObj<ProgressBarProps>;


export const Default: Story = {
  args: {
    hidePercent: false,
    indeterminate: false,
    // max: 100,
    // min: 0,
    percent: 50,
    status: 'default',
    tooltipTitle: '',
    valuePosition: 'center'
  },
  
  
}
