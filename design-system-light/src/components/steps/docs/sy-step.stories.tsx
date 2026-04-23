import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyStepProps, Step } from './sy-steps.main';
import { clearElements } from '../../clear-element';

const stepMeta: Meta<SyStepProps> = {
  title: 'Steps/Item Overview',
  component: 'sy-step',
  tags: [],
  render: (args) => { clearElements(stepMeta.title); return Step(args); },
  argTypes: {
    description: { control: 'text', table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } } },
    disabled: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    loading: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    status: { control: 'select', options: ['finish','current','wait','error','none'], table: { category: 'Parameter', defaultValue: { summary: 'none' }, type: { summary: 'finish | current | wait | error | none' } } },
    small: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    clickable: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
    index: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    current: { control: 'number', table: { category: 'Parameter', defaultValue: { summary: 0 as any }, type: { summary: 'number' } } },
    size: { control: 'radio', options: ['small','medium'], table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'small | medium' } } },
    parentStatus: { control: 'select', options: ['finish','current','wait','error','none'], table: { category: 'Parameter', defaultValue: { summary: 'none' }, type: { summary: 'finish | current | wait | error | none' } } },
    currentStatus: { control: 'select', options: ['finish','current','wait','error','none'], table: { category: 'Parameter', defaultValue: { summary: 'none' }, type: { summary: 'finish | current | wait | error | none' } } },
    type: { control: 'radio', options: ['horizontal','vertical'], table: { category: 'Parameter', defaultValue: { summary: 'horizontal' }, type: { summary: 'horizontal | vertical' } } },
    lastStep: { control: 'boolean', table: { category: 'Parameter', defaultValue: { summary: false as any }, type: { summary: 'boolean' } } },
  },
};

export default stepMeta;
type Story = StoryObj<SyStepProps>;
export const Default: Story = {
  args: {
    description: '', disabled: false, loading: false, status: 'current' as any, small: false, clickable: false,
    index: 0, current: 0, size: 'medium', parentStatus: 'none' as any, currentStatus: 'none' as any, type: 'horizontal', lastStep: false,
  },
};
