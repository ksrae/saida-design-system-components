import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteRequired } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Required',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteRequired(args as { required: boolean }),
  argTypes: {
    required: autocompleteMeta?.argTypes?.required,
  },
  args: {
    required: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
