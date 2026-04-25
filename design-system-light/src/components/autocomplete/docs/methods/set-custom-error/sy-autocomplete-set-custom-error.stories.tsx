import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteSetCustomError } from '../../sy-autocomplete.main';

const meta: Meta = {
  title: 'Autocomplete/Methods/setCustomError',
  component: 'sy-autocomplete',
  tags: [],
  render: () => AutocompleteSetCustomError(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
