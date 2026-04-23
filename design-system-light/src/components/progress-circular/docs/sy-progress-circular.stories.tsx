import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyProgressCircularProps, ProgressCircular } from './sy-progress-circular.main';
import { clearElements } from '../../clear-element';

const progressCircularMeta: Meta<SyProgressCircularProps> = {
  title: 'ProgressCircular/Overview',
  component: 'sy-progress-circular',
  tags: [],
  render: (args) => {
    clearElements(progressCircularMeta.title);
    return ProgressCircular(args);
  },
  argTypes: {
    percent: { control: { type: 'number', min: 0, max: 100 }, description: 'Current percentage value.', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    segment: { control: 'text', description: 'Comma-separated segment breakpoints.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    status: { control: 'select', options: ['default', 'error', 'complete'], description: 'Progress status.', table: { category: 'Parameter', defaultValue: { summary: 'default' }, type: { summary: 'default | error | complete' } } },
    hideText: { control: 'boolean', name: 'hideText (hide-text)', description: 'Hide the percentage label.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Circular size.', table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } } },
    tooltipTitle: { control: 'text', name: 'tooltipTitle (tooltip-title)', description: 'Optional tooltip.', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    indeterminate: { control: 'boolean', description: 'Indeterminate animation.', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
  },
};

export default progressCircularMeta;
type Story = StoryObj<SyProgressCircularProps>;

export const Default: Story = {
  args: { percent: 60, segment: '', status: 'default', hideText: false, size: 'medium', tooltipTitle: '', indeterminate: false },
};
