import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteRequiredSlotError } from '../../sy-autocomplete.main';

const meta: Meta = {
  title: 'Autocomplete/Form Integration/Required + Slot Error',
  component: 'sy-autocomplete',
  tags: [],
  render: () => AutocompleteRequiredSlotError(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
