import { Meta, StoryObj } from "@storybook/web-components-vite";
import { clearElements } from '../../clear-element';
import { Empty, SyEmptyProps } from './sy-empty.main';

const emptyMeta: Meta<SyEmptyProps> = {
  title: 'Empty/Overview',
  component: 'sy-empty',
  render: (args) => {
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
type Story = StoryObj<SyEmptyProps>;

export const Default: Story = {
  args: {
    description: 'No data available',
  },
};
