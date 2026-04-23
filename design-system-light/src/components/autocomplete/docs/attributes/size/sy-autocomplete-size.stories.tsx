import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AutocompleteSize } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Size',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompleteSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: {
    size: autocompleteMeta?.argTypes?.size,
  },
  args: {
    size: 'medium',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
