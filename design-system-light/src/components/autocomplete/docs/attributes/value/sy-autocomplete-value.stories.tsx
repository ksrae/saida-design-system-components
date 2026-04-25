import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteValue } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Value',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteValue(args as { value: string }),
  argTypes: {
    value: autocompleteMeta?.argTypes?.value,
  },
  args: {
    value: 'Apple',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
