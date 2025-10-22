import type { Meta, StoryObj } from '@storybook/web-components';
import { Empty, EmptyProps } from './empty';
import { clearElements } from '../../clear-element';

const emptyMeta: Meta<EmptyProps> = {
  title: 'Empty/Overview',
  tags: ['false'],
  render: (args:any) => {
    clearElements(emptyMeta.title);
    return Empty(args);
  },
  argTypes: {
    description:  {
        control: 'text',
        description: 'Adds description to the empty image',
        table: {
          category: 'Parameter',
          defaultValue: {summary: 'No data'},
          type: { summary: 'string' }
        }
      },
  },
};

export default emptyMeta;
type Story = StoryObj<EmptyProps>;


export const Default: Story = {
  args: {
    description : 'No data', 
  },
}
