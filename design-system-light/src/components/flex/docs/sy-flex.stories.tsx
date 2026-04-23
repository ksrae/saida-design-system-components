import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SyFlexProps, Flex } from './sy-flex.main';
import { clearElements } from '../../clear-element';

const flexMeta: Meta<SyFlexProps> = {
  title: 'Flex/Overview',
  component: 'sy-flex',
  tags: [],
  render: (args) => {
    clearElements(flexMeta.title);
    return Flex(args);
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
      description: 'Cross-axis alignment.',
      table: { category: 'Parameter', defaultValue: { summary: 'start' }, type: { summary: 'start | end | center | stretch | baseline' } },
    },
    rowGap: {
      control: 'select',
      options: ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
      name: 'rowGap (row-gap)',
      description: 'Row gap between flex items.',
      table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'none | xsmall | small | medium | large | xlarge' } },
    },
    columnGap: {
      control: 'select',
      options: ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
      name: 'columnGap (column-gap)',
      description: 'Column gap between flex items.',
      table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'none | xsmall | small | medium | large | xlarge' } },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between'],
      description: 'Main-axis distribution.',
      table: { category: 'Parameter', defaultValue: { summary: 'start' }, type: { summary: 'start | center | end | space-between' } },
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse'],
      description: 'Flex direction.',
      table: { category: 'Parameter', defaultValue: { summary: 'horizontal' }, type: { summary: 'horizontal | vertical | horizontal-reverse | vertical-reverse' } },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap mode.',
      table: { category: 'Parameter', defaultValue: { summary: 'nowrap' }, type: { summary: 'nowrap | wrap | wrap-reverse' } },
    },
    padding: {
      control: 'select',
      options: ['none', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: 'Inner padding on the flex container.',
      table: { category: 'Parameter', defaultValue: { summary: 'medium' }, type: { summary: 'none | xsmall | small | medium | large | xlarge' } },
    },
    width: {
      control: 'text',
      description: 'Width (number treated as px, or CSS value).',
      table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } },
    },
    height: {
      control: 'text',
      description: 'Height (number treated as px, or CSS value).',
      table: { category: 'Parameter', defaultValue: { summary: '' }, type: { summary: 'string' } },
    },
    slot: {
      control: 'text',
      description: 'Default slot content for flex children.',
      table: { category: 'Parameter', defaultValue: { summary: '' } },
    },
  },
};

export default flexMeta;
type Story = StoryObj<SyFlexProps>;

export const Default: Story = {
  args: {
    align: 'start',
    rowGap: 'medium',
    columnGap: 'medium',
    justify: 'start',
    direction: 'horizontal',
    wrap: 'nowrap',
    padding: 'medium',
    width: '',
    height: '',
    slot: `
      <div style="background:#e0f0ff;padding:8px;">A</div>
      <div style="background:#ffe0e0;padding:8px;">B</div>
      <div style="background:#e0ffd0;padding:8px;">C</div>
    `,
  },
};
