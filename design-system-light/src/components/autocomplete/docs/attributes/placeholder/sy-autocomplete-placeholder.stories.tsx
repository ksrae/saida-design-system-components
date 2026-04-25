import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { AutocompletePlaceholder } from '../../sy-autocomplete.main';
import autocompleteMeta from '../../sy-autocomplete.stories';

const meta: Meta = {
  title: 'Autocomplete/Attributes/Placeholder',
  component: 'sy-autocomplete',
  tags: [],
  render: (args) => AutocompletePlaceholder(args as { placeholder: string }),
  argTypes: {
    placeholder: autocompleteMeta?.argTypes?.placeholder,
  },
  args: {
    placeholder: 'Search here...',
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
