import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteDebounce } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Debounce Time',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteDebounce(args as { debounceTime: number }),
  argTypes: {
    debounceTime: autocompleteMeta?.argTypes?.debounceTime,
  },
  args: {
    debounceTime: 300,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
