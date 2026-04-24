import type { Meta, StoryObj } from '@storybook/web-components-vite';
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
