import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SyStepsProps, Steps } from './sy-steps.main';
import { clearElements } from '../../clear-element';

const stepsMeta: Meta<SyStepsProps> = {
  title: 'Steps/Overview',
  component: 'sy-steps',
  tags: [],
  render: (args) => { clearElements(stepsMeta.title); return Steps(args); },
  argTypes: {
    current: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    clickable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    complete: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    type: { control: 'radio', options: ['horizontal','vertical'], table: { category: 'Parameter', defaultValue: { summary: 'horizontal' }, type: { summary: 'horizontal | vertical' } } },
    size: { control: 'radio', options: ['small','medium'], table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium' } } },
    startIndex: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
  },
};

export default stepsMeta;
type Story = StoryObj<SyStepsProps>;
export const Default: Story = { args: { current: 1, clickable: false, complete: false, type: 'horizontal', size: 'medium', startIndex: 0 } };
