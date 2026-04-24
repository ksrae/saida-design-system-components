import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteReadonly } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Readonly',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteReadonly(args as { readonly: boolean }),
  argTypes: {
    readonly: autocompleteMeta?.argTypes?.readonly,
  },
  args: {
    readonly: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
