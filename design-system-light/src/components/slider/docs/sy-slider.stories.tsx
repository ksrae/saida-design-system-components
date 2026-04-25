import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SySliderProps, Slider } from './sy-slider.main';
import { clearElements } from '../../clear-element';

const sliderMeta: Meta<SySliderProps> = {
  title: 'Slider/Overview',
  component: 'sy-slider',
  tags: [],
  render: (args) => {
    clearElements(sliderMeta.title);
    return Slider(args);
  },
  argTypes: {
    min: { control: 'number', description: 'Minimum value.', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    max: { control: 'number', description: 'Maximum value.', table: { category: 'Parameter', defaultValue: { summary: 100 as any }, type: { summary: 'number' } } },
    step: { control: 'number', description: 'Step increment.', table: { category: 'Parameter', defaultValue: { summary: 1 as any }, type: { summary: 'number' } } },
    value: { control: 'number', description: 'Current value.', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    disabled: { control: 'boolean', description: 'Disables the slider.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    readonly: { control: 'boolean', description: 'Readonly mode.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    showTooltip: { control: 'radio', options: ['default', 'always', 'never'], name: 'showTooltip', description: 'Tooltip visibility mode.', table: { category: 'Parameter', defaultValue: { summary: 'default' }, type: { summary: 'default | always | never' } } },
    tooltipPlacement: { control: 'select', options: ['top', 'bottom', 'right', 'left'], name: 'tooltipPlacement', description: 'Tooltip placement.', table: { category: 'Parameter', defaultValue: { summary: 'top' }, type: { summary: 'top | bottom | right | left' } } },
    marks: { control: 'object', description: 'Marks object { value: label }.', table: { category: 'Parameter', type: { summary: '{ [key: number]: string }' } } },
    hideMarks: { control: 'boolean', name: 'hideMarks', description: 'Hide marks indicators.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    range: { control: 'boolean', description: 'Enable range selection.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    rangeValue: { control: 'object', name: 'rangeValue', description: 'Range values [from, to].', table: { category: 'Parameter', type: { summary: 'number[]' } } },
    reverse: { control: 'boolean', description: 'Reverse direction.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    label: { control: 'text', description: 'Label text.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    hideTrackFill: { control: 'boolean', name: 'hideTrackFill', description: 'Hide filled track segment.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    snapToMarks: { control: 'boolean', name: 'snapToMarks', description: 'Snap thumb to mark values.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    vertical: { control: 'boolean', description: 'Vertical orientation.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
  },
};

export default sliderMeta;
type Story = StoryObj<SySliderProps>;

export const Default: Story = {
  args: {
    min: 0, max: 100, step: 1, value: 40, disabled: false, readonly: false,
    showTooltip: 'default', tooltipPlacement: 'top', marks: {}, hideMarks: false,
    range: false, rangeValue: [], reverse: false, label: '', hideTrackFill: false,
    snapToMarks: false, vertical: false,
  },
};
