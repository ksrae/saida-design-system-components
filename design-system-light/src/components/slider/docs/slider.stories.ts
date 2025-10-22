import type { Meta, StoryObj } from '@storybook/web-components';
import { SilderProps, Slider } from './slider';
import { clearElements } from '../../clear-element';

const sliderMeta: Meta<SilderProps> = {
  title: 'Slider/Overview',
  tags: ['false'],
  render: (args) => {
    return Slider(args);
  },
  argTypes: {
    min: {
      control: 'number', 
      description: 'Sets the minimum value. Default value is 0.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: 0 as any},
        type: { summary: 'number' }
      }
    },
    max: {
      control: 'number', 
      description: 'Sets the maximum value. Default value is 100.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: 100 as any},
        type: { summary: 'number' }
      }
    },
    label:{
      control: 'text', 
      description: 'Sets the label of the slider.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'string' }
      }
    },
    hideMarks: {
      name: 'hideMarks(hide-marks)',
      control: 'boolean',
      description: 'Hide the marks in the slider.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    }, 
    step: {
      control: 'number',
      description: 'The granularity the slider can step through values. <br/> Must greater than 0, and be divided by (max - min) .',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 1 as any },
        type: { summary: 'number' }
      }      
    },
    snapToMarks: {
      name: 'snapToMarks(snap-to-marks)',
      control: 'boolean',
      description: 'Whether the thumb can drag over marks only.(marks must be set)',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    }, 
    value: {
      control: 'number', 
      description: 'Use when setting the <b>default value</b> of slider. <br/>Use `rangeValue` when setting the value of range slider instead of this.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: 0 as any},
        type: { summary: 'number' }
      }
    },
    disabled: {
      control: 'boolean', 
      description: 'Disables the slider.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      control: 'boolean', 
      description: 'Sets the slider in readonly state.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    range: {
      control: 'boolean', 
      description: 'Sets whether slider in range.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    rangeValue: {
      name: 'rangeValue(range-value)',
      control: 'object', 
      description: 'Sets the <b>default range value</b> in the slider. The `range` property must be set to true.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: '[ ]' as any},
        type: {summary: 'Number[ ]'}
      }
    },
    reverse: {
      control: 'boolean',
      description: 'Sets the slider in reverse direction.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    }, 
    hideTrackFill: {
      name: 'hideTrackFill(hide-track-fill)',
      control: 'boolean', 
      description: 'Hide the track in the slider.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    marks: {
      control: 'object', 
      description: 'Sets the slider marks. You can have custom marks by providing a rich array to the marks prop.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: ''},
        type: { summary: 'object' }
      }
    },
    showTooltip: {
      name: 'showTooltip(show-tooltip)',
      control: 'select',
      options: ['always', 'default', 'never'],
      description: 'Sets the tooltip display mode.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'default'},
        type: {summary: 'always | default | never'}
      }
    },
    tooltipPlacement: {
      name: 'tooltipPlacement(tooltip-placement)',
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Sets the tooltip display mode.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: 'top'},
        type: {summary: 'top | bottom | left | right'}
      }
    },
    vertical: {
      control: 'boolean', 
      description: 'Whether rendering slider as a vertical.', 
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    changed: {
      type: 'function',
      action: 'selected', 
      description: 'Triggered when slider values has been changed.', 
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('changed', (e) => {})`,
        },
      }
    },
  },
};

export default sliderMeta;
type Story = StoryObj<SilderProps>;


export const Default: Story = {
  args: {
    disabled: false,
    hideTrackFill: false,
    label: 'Slider',
    marks: {
      0: '0',
      25: '25',
      50: '50',
      75: '75',
      100: '100'
    },
    max: 100,
    min: 0,
    range: false,
    rangeValue: [25, 75],
    readonly: false,
    reverse: false,
    showTooltip: 'default',
    hideMarks: false,
    snapToMarks: false,
    step: 1,
    tooltipPlacement: 'top',
    value: 50,
    vertical: false,
  }
}
