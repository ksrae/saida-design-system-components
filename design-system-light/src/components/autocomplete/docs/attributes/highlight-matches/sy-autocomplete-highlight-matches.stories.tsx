import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteHighlight } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Highlight Matches',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteHighlight(args as { highlightMatches: boolean }),
  argTypes: {
    highlightMatches: autocompleteMeta?.argTypes?.highlightMatches,
  },
  args: {
    highlightMatches: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
