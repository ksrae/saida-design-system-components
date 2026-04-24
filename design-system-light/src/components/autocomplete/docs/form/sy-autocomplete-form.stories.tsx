import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteFormData } from '../sy-autocomplete.main';

const meta: Meta = {
  title: 'Autocomplete/Form Integration',
  component: 'sy-autocomplete',
  tags: [],
  render: () => AutocompleteFormData(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
