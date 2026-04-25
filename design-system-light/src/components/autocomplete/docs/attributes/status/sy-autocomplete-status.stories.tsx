import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteStatus } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Status',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteStatus(args as { status: 'default' | 'warning' | 'error' | 'success' }),
  argTypes: {
    status: autocompleteMeta?.argTypes?.status,
  },
  args: {
    status: 'warning',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
