import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompleteChanged } from '../../sy-autocomplete.main';

const meta: Meta = {
  title: 'Autocomplete/Events/Changed',
  component: 'sy-autocomplete',
  tags: [],
  render: () => AutocompleteChanged(),
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
