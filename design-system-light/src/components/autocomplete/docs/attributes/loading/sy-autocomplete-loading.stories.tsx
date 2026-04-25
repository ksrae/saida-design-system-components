import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteLoading } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Loading',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteLoading(args as { loading: boolean }),
  argTypes: {
    loading: autocompleteMeta?.argTypes?.loading,
  },
  args: {
    loading: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
