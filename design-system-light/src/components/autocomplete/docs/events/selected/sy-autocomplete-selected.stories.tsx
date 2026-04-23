import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteSelected } from '../../sy-autocomplete.main';

const meta: Meta = {
  title: 'Autocomplete/Events/Selected',
  component: 'sy-autocomplete',
  tags: [],
  render: () => AutocompleteSelected(),
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
