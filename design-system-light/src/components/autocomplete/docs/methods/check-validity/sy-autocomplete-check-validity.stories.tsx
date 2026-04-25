import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteCheckValidity } from '../../sy-autocomplete.main';

const meta: Meta = {
  title: 'Autocomplete/Methods/checkValidity',
  component: 'sy-autocomplete',
  tags: [],
  render: () => AutocompleteCheckValidity(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
