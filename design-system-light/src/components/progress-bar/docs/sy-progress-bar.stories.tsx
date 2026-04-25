import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyProgressBarProps, ProgressBar } from './sy-progress-bar.main';
import { clearElements } from '../../clear-element';

const progressBarMeta: Meta<SyProgressBarProps> = {
  title: 'ProgressBar/Overview',
  component: 'sy-progress-bar',
  tags: [],
  render: (args) => {
    clearElements(progressBarMeta.title);
    return ProgressBar(args);
  },
  argTypes: {
    indeterminate: { control: 'boolean', description: 'Shows indeterminate animation.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    percent: { control: { type: 'number', min: 0, max: 100 }, description: 'Current progress (0–100).', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    status: { control: 'select', options: ['default', 'error', 'complete'], description: 'Progress status.', table: { category: 'Parameter', defaultValue: { summary: 'default' }, type: { summary: 'default | error | complete' } } },
    valuePosition: { control: 'select', options: ['progress-left', 'progress-center', 'progress-right', 'center', 'left', 'right'], name: 'valuePosition (value-position)', description: 'Position of the percentage label.', table: { category: 'Parameter', defaultValue: { summary: 'center' }, type: { summary: 'progress-left | progress-center | progress-right | center | left | right' } } },
    hidePercent: { control: 'boolean', name: 'hidePercent (hide-percent)', description: 'Hide the percent label.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    segment: { control: 'text', description: 'Comma-separated segment breakpoints.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    tooltipTitle: { control: 'text', name: 'tooltipTitle (tooltip-title)', description: 'Optional tooltip content.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
  },
};

export default progressBarMeta;
type Story = StoryObj<SyProgressBarProps>;

export const Default: Story = {
  args: { indeterminate: false, percent: 40, status: 'default', valuePosition: 'center', hidePercent: false, segment: '', tooltipTitle: '' },
};
