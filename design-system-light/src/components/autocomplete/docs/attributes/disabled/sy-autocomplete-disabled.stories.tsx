import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteDisabled } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Disabled',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteDisabled(args as { disabled: boolean }),
  argTypes: {
    disabled: autocompleteMeta?.argTypes?.disabled,
  },
  args: {
    disabled: true,
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
