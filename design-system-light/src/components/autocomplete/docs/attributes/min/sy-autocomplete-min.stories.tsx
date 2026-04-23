import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteMin } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Min',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteMin(args as { min: number }),
  argTypes: {
    min: autocompleteMeta?.argTypes?.min,
  },
  args: {
    min: 3,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
