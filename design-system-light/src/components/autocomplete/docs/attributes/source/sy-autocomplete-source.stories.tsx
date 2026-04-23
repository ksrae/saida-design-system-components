import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteSource } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Source',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteSource(args as { source: string[] }),
  argTypes: {
    source: autocompleteMeta?.argTypes?.source,
  },
  args: {
    source: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
